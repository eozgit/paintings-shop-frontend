import { Painting, PaintingDimensions } from 'src/components/models'

export interface PaintingsData {
  count: number
  next: string | null
  previous: string | null
  results: Painting[]
}

export interface PaintingsStateInterface {
  count: number
  token: string
  paintingsData: PaintingsData
  detail: Painting & PaintingDimensions | null
  basket: number[]
  outOfStock: number[]
}

const basket = localStorage.getItem('basket')
const outOfStock = localStorage.getItem('outOfStock')

const state: PaintingsStateInterface = {
  count: 0,
  token: localStorage.getItem('token') || '',
  paintingsData: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  detail: null,
  basket: basket ? JSON.parse(basket) : [],
  outOfStock: outOfStock ? outOfStock.split(',').map(i => +i) : []
}

interface Range {
  min: number
  max: number
}

export interface PaintingQuery {
  page: number
  title?: string
  year?: string
  medium: string
  height: Range
  width: Range
}

export default state
