import savedSearchData from '../mockData/savedSearch.json'

// Utility function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage
let savedSearches = [...savedSearchData.map(search => ({ ...search }))]

export const getAll = async () => {
  await delay(250)
  return [...savedSearches]
}

export const getById = async (id) => {
  await delay(200)
  const search = savedSearches.find(s => s.id === id)
  if (!search) {
    throw new Error('Saved search not found')
  }
  return { ...search }
}

export const create = async (searchData) => {
  await delay(300)
  const newSearch = {
    ...searchData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  savedSearches.unshift(newSearch)
  return { ...newSearch }
}

export const update = async (id, updates) => {
  await delay(300)
  const index = savedSearches.findIndex(s => s.id === id)
  if (index === -1) {
    throw new Error('Saved search not found')
  }
  savedSearches[index] = { ...savedSearches[index], ...updates }
  return { ...savedSearches[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  const index = savedSearches.findIndex(s => s.id === id)
  if (index === -1) {
    throw new Error('Saved search not found')
  }
  const deletedSearch = { ...savedSearches[index] }
  savedSearches.splice(index, 1)
  return deletedSearch
}

// Alias for delete (since delete is a reserved keyword)
export { delete_ as delete }