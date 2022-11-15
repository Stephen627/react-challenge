import './Search.css'
import { FunctionComponent, useState, useMemo } from 'react'
import { transformName } from '../../service/dog'
import Dropdown, { Option } from '../dropdown/Dropdown'

export interface Props {
  breeds: {[key: string]: string[]}
  onSubmit: (selectedBreed: string, selectedSubBreed: string, amount: number) => void
}

const Search: FunctionComponent<Props> = (props: Props) => {
  const { breeds, onSubmit } = props

  const [ selectedBreed, setSelectedBreed ] = useState<string>('')
  const [ selectedSubBreed, setSelectedSubBreed ] = useState<string>('')
  const [ selectedNumberOfImages, setSelectedNumberOfImages ] = useState<string>('1')

  const breedOptions: any[] = Object.keys(breeds).map(breed => {
    return {
      name: transformName(breed),
      value: breed,
    }
  })

  const subBreedOptions = useMemo(() => {
    const subBreeds = selectedBreed && breeds[selectedBreed] && breeds[selectedBreed].length ? breeds[selectedBreed] : []
    return subBreeds.map(subBreed => {
      return {
        name: transformName(subBreed),
        value: subBreed,
      }
    })
  }, [ selectedBreed ])

  const numberOfImages: Option[] = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: '6', value: '6' },
  ]

  return <header className="search">
    <Dropdown 
      label={'Breed'}
      options={breedOptions}
      selectedOption={selectedBreed}
      onChange={setSelectedBreed}
    />
    {subBreedOptions.length > 0 &&
      <Dropdown
        label={'Sub Breed'}
        options={subBreedOptions}
        selectedOption={selectedSubBreed}
        onChange={setSelectedSubBreed}
      />
    }
    <Dropdown
      label={'Number of Images'}
      options={numberOfImages}
      selectedOption={selectedNumberOfImages}
      onChange={setSelectedNumberOfImages}
    />
    <input type={'submit'} value={'View Images'} onClick={() => onSubmit(selectedBreed, selectedSubBreed, parseInt(selectedNumberOfImages)) } />
  </header>
}

export default Search

