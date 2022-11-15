import { useEffect, useState } from 'react'
import { fetchBreeds, fetchRandomDogs } from './service/dog'
import { Status } from './interface/dog.d'
import Loading from './components/loading/Loading'
import Search from './components/search/Search'
import ImageList from './components/image-list/ImageList'

function App() {
  const [ error, setError ] = useState<string>('')
  const [ breeds, setBreeds ] = useState<{[key: string]: string[]}>({})
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ images, setImages ] = useState<string[]>([])
  const [ errorOnFields, setErrorOnFields ] = useState<any>([])

  useEffect(() => {
    fetchBreeds().then(data => {
      if (data === null || data.status === Status.ERROR) {
        setError('Something went wrong, please refresh to try again')
      }

      setBreeds(data.message)
      setLoading(false)
    })
  }, [])

  const getImages = (selectedBreed: string, selectedSubBreed: string, amount: number, hasSubBreeds: boolean) => {
    if (!selectedBreed) {
      setErrorOnFields([ 'breed' ])
      return
    }
    if (hasSubBreeds && !selectedSubBreed) {
      setErrorOnFields([ 'sub-breed' ])
      return
    }

    fetchRandomDogs(selectedBreed, amount, selectedSubBreed).then(res => {
      setImages(res.message)
    })
  }

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <Loading />
  }

  return <div className="App">
    <Search
      breeds={breeds}
      onSubmit={getImages}
      errorOnFields={errorOnFields}
      resetFieldErrors={() => setErrorOnFields([])}
    />
    <ImageList
      images={images}
    />
  </div>
}

export default App;

