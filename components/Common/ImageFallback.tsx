import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageFallbackProps {
  src: string
  fallbackSrc: string
  alt: string

  [key: string]: any
}

export default function ImageFallback({
  src,
  fallbackSrc,
  alt,
  ...rest
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc)
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}
