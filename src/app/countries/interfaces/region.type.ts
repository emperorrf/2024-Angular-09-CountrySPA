export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | '';

// Metemos '' al final para poder inicializar la propiedad cacheStore en el servicio,
// tb podríamos quitar el '' e inicializar cacheStore con un valor por defecto del array
// o tb poner countries?: Region; en la interface RegionCountries
