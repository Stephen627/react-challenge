import { ListBreedsResponse } from '../interface/dog'
const ROOT_URL = 'https://dog.ceo/api/'
const LIST_BREEDS_URL = ROOT_URL + 'breeds/list/all'
const URL = ''

export const transformName = (breed: string): string => {
  return breed.charAt(0).toUpperCase() + breed.slice(1)
}

export const fetchBreeds = (): Promise<ListBreedsResponse> => {
  return fetch(LIST_BREEDS_URL)
    .then(res => res.json())
}

export const fetchRandomDogs = (): void => {
  fetch(URL)
    .then(res => res.json())
    .then(res => console.debug(res))
}
