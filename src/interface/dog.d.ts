// Error status found by calling api with an unknown breed
// Needed to find the error status this way because it was not documentated
export enum Status {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface RandomDogImagesResponse {
  message: string[]
  status: Status
}

export interface ListBreedsResponse {
  message: {[key: string]: string[]}
  status: Status
}
