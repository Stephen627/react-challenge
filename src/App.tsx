import { useEffect, useState } from 'react'
import { fetchBreeds, fetchRandomDogs } from './service/dog'
import { Status } from './interface/dog.d'
import Loading from './components/loading/Loading'
import Search from './components/search/Search'

function App() {
  const [ error, setError ] = useState<string>('')
  const [ breeds, setBreeds ] = useState<{[key: string]: string[]}>({})
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

  const getImages = (selectedBreed: string, selectedSubBreed: string, amount: number) => {
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

  const imageJsx = images.map(src => {
      return <img src={src} />
  })

  return <div className="App">
    <Search
      breeds={breeds}
      onSubmit={getImages}
    />
    <div>
      {imageJsx}
    </div>
  </div>
}

export default App;
