import propertyData from '../mockData/property.json'

// Utility function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory storage to persist favorites
let properties = [...propertyData.map(property => ({ ...property }))]

export const getAll = async () => {
  await delay(300)
  return [...properties]
}

export const getById = async (id) => {
  await delay(200)
  const property = properties.find(p => p.id === id)
  if (!property) {
    throw new Error('Property not found')
  }
  return { ...property }
}

export const create = async (propertyData) => {
  await delay(400)
  const newProperty = {
    ...propertyData,
    id: Date.now().toString(),
    listingDate: new Date().toISOString(),
    isFavorite: false
  }
  properties.push(newProperty)
  return { ...newProperty }
}

export const update = async (id, updates) => {
  await delay(300)
  const index = properties.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Property not found')
  }
  properties[index] = { ...properties[index], ...updates }
  return { ...properties[index] }
}

export const delete_ = async (id) => {
  await delay(250)
  const index = properties.findIndex(p => p.id === id)
  if (index === -1) {
    throw new Error('Property not found')
  }
  const deletedProperty = { ...properties[index] }
  properties.splice(index, 1)
  return deletedProperty
}

// Alias for delete (since delete is a reserved keyword)
export { delete_ as delete }