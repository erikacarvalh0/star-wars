import { getId } from "./getId.ts"

export const filterPeople = (listedPeople, filters) => {
  const filterKeys = Object.keys(filters)
	let filtered = listedPeople

	filterKeys.map(filter => {
      filtered = filtered.filter(char => {
        const id = getId(char[filter])
        return filters[filter].includes(id)
      })
	})

	return filtered
}