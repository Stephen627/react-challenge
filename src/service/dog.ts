import { ListBreedsResponse, RandomDogImagesResponse } from '../interface/dog'
const ROOT_URL = 'https://dog.ceo/api/'
const LIST_BREEDS_URL = ROOT_URL + 'breeds/list/all'
const FETCH_IMAGES_URL = ROOT_URL + 'breed/{breed}/images/random/{amount}'

export const transformName = (breed: string): string => {
  return breed.charAt(0).toUpperCase() + breed.slice(1)
}

export const fetchBreeds = (): Promise<ListBreedsResponse> => {
  return fetch(LIST_BREEDS_URL)
    .then(res => res.json())
}

export const fetchRandomDogs = (breed: string, amount: number, subBreed?: string): Promise<RandomDogImagesResponse> => {
  const concatBreed = breed + (subBreed ? '/' + subBreed : '')
  const url = FETCH_IMAGES_URL
    .replace('{breed}', concatBreed)
    .replace('{amount}', '' + amount)

  return fetch(url)
    .then(res => res.json())
}
