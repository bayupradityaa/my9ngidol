// JKT48 roster (active members, grouped by team).
// Names are used for identification only; all rights belong to their owners.
// Update this file when the official lineup changes.
// `color` is the member's oshi color used across the neobrutalist UI + avatar.
//
// Photos are intentionally omitted for now (copyright-safe): the UI renders an
// initials avatar on the oshi color. To add photos later, drop files into
// public/members/<id>.jpg (or point VITE_MEMBER_PHOTO_BASE to a CDN/R2 bucket)
// and set `photo: true` on the member.

const PHOTO_BASE = import.meta.env.VITE_MEMBER_PHOTO_BASE || '/members'

export function getPhotoUrl(member) {
  return `${PHOTO_BASE}/${member.id}.jpg`
}

export function initials(name) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Team ids are lowercase; labels are what the UI shows.
export const teams = [
  { value: 'love', label: 'Team Love' },
  { value: 'dream', label: 'Team Dream' },
  { value: 'passion', label: 'Team Passion' },
  { value: 'trainee', label: 'Trainee' },
]

export function getTeamLabel(value) {
  return teams.find((t) => t.value === value)?.label || value
}

// Oshi colors cycle through a vivid, high-contrast palette (neobrutalism-safe).
const PALETTE = [
  '#FF5252', '#2196F3', '#FFEB3B', '#4ECDC4', '#FF6B6B', '#7C4DFF',
  '#00BCD4', '#FF7043', '#8BC34A', '#E91E63', '#3F51B5', '#009688',
  '#F44336', '#673AB7', '#FFC107', '#03A9F4', '#CDDC39', '#FF4081',
  '#00E5FF', '#FFAB40', '#B2FF59', '#EA80FC', '#FF6E40', '#40C4FF',
  '#F06292', '#69F0AE', '#FFD740', '#7E57C2', '#26A69A', '#EC407A',
  '#42A5F5', '#FFA726', '#66BB6A', '#AB47BC', '#29B6F6', '#D4E157',
  '#FF8A65', '#BA68C8', '#FFDB58', '#80DEEA',
]

const roster = [
  // ---- Team Love (15 names listed) ----
  ['alya-amanda', 'Alya Amanda', 'love'],
  ['anindya-ramadhani', 'Anindya Ramadhani', 'love'],
  ['aurellia', 'Aurellia', 'love'],
  ['aurhel-alana', 'Aurhel Alana', 'love'],
  ['cathleen-nixie', 'Cathleen Nixie', 'love'],
  ['celline-thefani', 'Celline Thefani', 'love'],
  ['cynthia-yaputera', 'Cynthia Yaputera', 'love'],
  ['fiony-alveria', 'Fiony Alveria', 'love'],
  ['fritzy-rosmerian', 'Fritzy Rosmerian', 'love'],
  ['grace-octaviani', 'Grace Octaviani', 'love'],
  ['hillary-abigail', 'Hillary Abigail', 'love'],
  ['indah-cahya', 'Indah Cahya', 'love'],
  ['jazzlyn-trisha', 'Jazzlyn Trisha', 'love'],
  ['michelle-alexandra', 'Michelle Alexandra', 'love'],
  ['nayla-suji', 'Nayla Suji', 'love'],

  // ---- Team Dream ----
  ['adeline-wijaya', 'Adeline Wijaya', 'dream'],
  ['febriola-sinambela', 'Febriola Sinambela', 'dream'],
  ['freya-jayawardana', 'Freya Jayawardana', 'dream'],
  ['gabriela-abigail', 'Gabriela Abigail', 'dream'],
  ['gita-sekar-andarini', 'Gita Sekar Andarini', 'dream'],
  ['greesella-adhalia', 'Greesella Adhalia', 'dream'],
  ['helisma-putri', 'Helisma Putri', 'dream'],
  ['jesslyn-elly', 'Jesslyn Elly', 'dream'],
  ['marsha-lenathea', 'Marsha Lenathea', 'dream'],
  ['nina-tutachia', 'Nina Tutachia', 'dream'],
  ['oline-manuel', 'Oline Manuel', 'dream'],
  ['shabilqis-naila', 'Shabilqis Naila', 'dream'],

  // ---- Team Passion ----
  ['abigail-rachel', 'Abigail Rachel', 'passion'],
  ['angelina-christy', 'Angelina Christy', 'passion'],
  ['catherina-vallencia', 'Catherina Vallencia', 'passion'],
  ['cornelia-vanisa', 'Cornelia Vanisa', 'passion'],
  ['dena-natalia', 'Dena Natalia', 'passion'],
  ['desy-natalia', 'Desy Natalia', 'passion'],
  ['feni-fitriyanti', 'Feni Fitriyanti', 'passion'],
  ['jessica-chandra', 'Jessica Chandra', 'passion'],
  ['kathrina-irene', 'Kathrina Irene', 'passion'],
  ['lulu-salsabila', 'Lulu Salsabila', 'passion'],
  ['michelle-levia', 'Michelle Levia', 'passion'],
  ['mutiara-azzahra', 'Mutiara Azzahra', 'passion'],
  ['raisha-syifa', 'Raisha Syifa', 'passion'],
  ['ribka-budiman', 'Ribka Budiman', 'passion'],
  ['victoria-kimberly', 'Victoria Kimberly', 'passion'],

  // ---- Trainee ----
  ['afera-thalia', 'Afera Thalia', 'trainee'],
  ['astrella-virgiananda', 'Astrella Virgiananda', 'trainee'],
  ['aulia-riza', 'Aulia Riza', 'trainee'],
  ['bong-aprilli', 'Bong Aprilli', 'trainee'],
  ['carissa-dini', 'Carissa Dini', 'trainee'],
  ['christabella-bonita', 'Christabella Bonita', 'trainee'],
  ['fahira-putri', 'Fahira Putri', 'trainee'],
  ['fatimah-azzahra', 'Fatimah Azzahra', 'trainee'],
  ['hagia-sopia', 'Hagia Sopia', 'trainee'],
  ['heidi-suyangga', 'Heidi Suyangga', 'trainee'],
  ['humaira-ramadhani', 'Humaira Ramadhani', 'trainee'],
  ['jacqueline-immanuela', 'Jacqueline Immanuela', 'trainee'],
  ['jemima-evodie', 'Jemima Evodie', 'trainee'],
  ['maxine-faye-lee', 'Maxine Faye Lee', 'trainee'],
  ['mikaela-kusjanto', 'Mikaela Kusjanto', 'trainee'],
  ['nur-intan', 'Nur Intan', 'trainee'],
  ['putry-jazyta', 'Putry Jazyta', 'trainee'],
  ['ralyne-van-irwan', 'Ralyne Van Irwan', 'trainee'],
  ['sona-kalyana', 'Sona Kalyana', 'trainee'],
]

export const members = roster.map(([id, name, team], i) => ({
  id,
  name,
  team,
  color: PALETTE[i % PALETTE.length],
}))

export function getMemberById(id) {
  return members.find((m) => m.id === id)
}
