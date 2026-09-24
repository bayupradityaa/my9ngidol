import { useEffect, useState, useCallback } from 'react'
import { getTopMembers } from '../lib/firebase.js'
import { getMemberById } from '../data/members.js'

/**
 * Loads the top-N members from Firestore (or localStorage fallback).
 * Returns hydrated rows: [{ member, count, rank }] plus `source`.
 */
export function useTopMembers(max = 9) {
  const [rows, setRows] = useState([])
  const [source, setSource] = useState('local')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { rows: raw, source: src } = await getTopMembers(max)
      const hydrated = raw
        .map((r) => ({ member: getMemberById(r.id), count: r.count }))
        .filter((r) => r.member)
        .map((r, i) => ({ ...r, rank: i + 1 }))
      setRows(hydrated)
      setSource(src)
    } catch (err) {
      console.warn('[9oshi] useTopMembers error:', err)
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [max])

  useEffect(() => {
    load()
  }, [load])

  return { rows, source, loading, reload: load }
}
