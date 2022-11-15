import { useEffect, useState, useMemo } from 'react'
import Dropdown, { Option } from './components/dropdown/Dropdown'
import { fetchBreeds, fetchRandomDogs, transformName } from './service/dog'
import { Status } from './interface/dog.d'
import Loading from './components/loading/Loading'

function App() {
  const [ error, setError ] = useState<string>('')
  const [ breeds, setBreeds ] = useState<{[key: string]: string[]}>({})
  const [ selectedBreed, setSelectedBreed ] = useState<string>('')
  const [ selectedSubBreed, setSelectedSubBreed ] = useState<string>('')
  const [ selectedNumberOfImages, setSelectedNumberOfImages ] = useState<string>('1')
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ images, setImages ] = useState<string[]>([])

  useEffect(() => {
    fetchBreeds().then(data => {
      if (data === null || data.status === Status.ERROR) {
        setError('Something went wrong, please refresh to try again')
      }

      setBreeds(data.message)
      setLoading(false)
    })
  }, [])

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

  const getImages = () => {
    fetchRandomDogs(selectedBreed, parseInt(selectedNumberOfImages), selectedSubBreed).then(res => {
      setImages(res.message)
    })
  }

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <Loading />
  }

  const imageJsx = images.map(src => {
      return <img src={src} />
  })

  const numberOfImages: Option[] = [
    { name: '1', value: '1' },
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
    { name: '5', value: '5' },
    { name: '6', value: '6' },
  ]

  return <div className="App">
    <header>
      <Dropdown 
        options={breedOptions}
        selectedOption={selectedBreed}
        onChange={setSelectedBreed}
      />
      {subBreedOptions.length > 0 &&
        <Dropdown
          options={subBreedOptions}
          selectedOption={selectedSubBreed}
          onChange={setSelectedSubBreed}
        />
      }
      <Dropdown
        options={numberOfImages}
        selectedOption={selectedNumberOfImages}
        onChange={setSelectedNumberOfImages}
      />
      <input type={'submit'} value={'View Images'} onClick={getImages} />
    </header>
    <div>
      {imageJsx}
    </div>
  </div>
}

export default App;
