import { useState } from 'react'

function Gallery({ images, house_id }) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="grid md:grid-cols-2 gap-5 p-2">
      <img
        src={selectedImage}
        alt={`House ${house_id.id} `}
        className="rounded h-full"
      />
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, id) => (
          <img
            src={image}
            key={id}
            alt={`House ${house_id.id} image ${[id]}`}
            className="rounded h-full cursor-pointer hover:opacity-50"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  )
}
export default Gallery
