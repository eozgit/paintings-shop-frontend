export interface Painting {
  id: number
  title: string
  date: string
  media: string
  height: number
  width: number
  imageUrl: string
  price: number
}

export interface PaintingDimensions {
  imageHeight: number
  imageWidth: number
}
