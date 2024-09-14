export const formatMeters = (value: string) => {
	return parseInt(value)/100 + `m`
}

export const formatKg = (value: string) => {
	return `${value}kg`
}