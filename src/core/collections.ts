import collections from './icon-sets.json'

export { collections }

export function hasCollection(collection: string) {
  return collections.includes(collection)
}
