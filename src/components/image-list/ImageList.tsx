import './ImageList.css'
import { FunctionComponent } from 'react'

export interface Props {
  images: string[]
}

const ImageList: FunctionComponent<Props> = (props: Props) => {
  const { images } = props

  const imageJsx = images.map((image, index) => {
    return <div className="image-list__image">
      <img key={index} src={image} />
    </div>
  })

  return <div className="image-list">
    {imageJsx}
  </div>
}

export default ImageList

