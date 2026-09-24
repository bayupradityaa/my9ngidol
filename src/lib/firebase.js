// Firebase is OPTIONAL. If env vars are missing, everything falls back to
// localStorage so the app still works end-to-end during development.
//
// NOTE: the Firebase web config below is PUBLIC by design. Real security must
// come from Firestore Security Rules (see README), not from hiding these keys.
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit as fbLimit,
  increment,
  setDoc,
  writeBatch,
} from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

export const isFirebaseEnabled = Boolean(config.apiKey && config.projectId)

let db = null
if (isFirebaseEnabled) {
  try {
    const app = initializeApp(config)
    db = getFirestore(app)
    // Google Analytics (optional): lazy-init only when the browser supports it.
    if (config.measurementId) {
      import('firebase/analytics')
        .then(({ getAnalytics, isSupported }) =>
          isSupported().then((ok) => {
            if (ok) getAnalytics(app)
          }),
        )
        .catch(() => {})
    }
  } catch (err) {
    console.warn('[9oshi] Firebase init failed, using local fallback:', err)
    db = null
  }
}

const COLLECTION = 'memberStats'
const LOCAL_KEY = '9oshi:stats'
const COUNTER_DOC = 'meta/downloads'
const COUNTER_LOCAL_KEY = '9oshi:downloads'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}')
  } catch {
    return {}
  }
}
function writeLocal(map) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(map))
}

/** Increment the pick count for each selected member id. */
export async function submitPicks(memberIds = []) {
  const ids = memberIds.filter(Boolean)
  if (ids.length === 0) return { ok: false, source: 'none' }

  if (db) {
    try {
      const batch = writeBatch(db)
      ids.forEach((id) => {
        batch.set(doc(db, COLLECTION, id), { count: increment(1) }, { merge: true })
      })
      await batch.commit()
      return { ok: true, source: 'live' }
    } catch (err) {
      console.warn('[9oshi] submitPicks failed, falling back to local:', err)
    }
  }

  const map = readLocal()
  ids.forEach((id) => {
    map[id] = (map[id] || 0) + 1
  })
  writeLocal(map)
  return { ok: true, source: 'local' }
}

/** Increment the global "formations created" counter (one per successful download). */
export async function incrementDownloadCount() {
  if (db) {
    try {
      await setDoc(doc(db, COUNTER_DOC), { count: increment(1) }, { merge: true })
      return { ok: true, source: 'live' }
    } catch (err) {
      console.warn('[9oshi] incrementDownloadCount failed, falling back to local:', err)
    }
  }
  const n = Number(localStorage.getItem(COUNTER_LOCAL_KEY) || 0) + 1
  localStorage.setItem(COUNTER_LOCAL_KEY, String(n))
  return { ok: true, source: 'local', count: n }
}

/** Read the current "formations created" total. Returns { count, source }. */
export async function getDownloadCount() {
  if (db) {
    try {
      const snap = await getDoc(doc(db, COUNTER_DOC))
      return { count: snap.exists() ? snap.data().count || 0 : 0, source: 'live' }
    } catch (err) {
      console.warn('[9oshi] getDownloadCount failed, falling back to local:', err)
    }
  }
  return { count: Number(localStorage.getItem(COUNTER_LOCAL_KEY) || 0), source: 'local' }
}

/** Return [{ id, count }] sorted desc, limited to `max`. */
export async function getTopMembers(max = 9) {
  if (db) {
    try {
      const q = query(collection(db, COLLECTION), orderBy('count', 'desc'), fbLimit(max))
      const snap = await getDocs(q)
      const rows = snap.docs.map((d) => ({ id: d.id, count: d.data().count || 0 }))
      return { rows, source: 'live' }
    } catch (err) {
      console.warn('[9oshi] getTopMembers failed, falling back to local:', err)
    }
  }

  const map = readLocal()
  const rows = Object.entries(map)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, max)
  return { rows, source: 'local' }
}
