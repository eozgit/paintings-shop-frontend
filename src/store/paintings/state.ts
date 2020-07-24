import { Painting } from 'src/components/models'

export interface PaintingsData {
  count: number,
  next: string | null,
  previous: string | null
  results: Painting[]
}

export interface PaintingsStateInterface {
  count: number;
  token: string;
  paintingsData: PaintingsData;
  detail: Painting | null;
}

const state: PaintingsStateInterface = {
  count: 0,
  token: '',
  paintingsData: {
    count: 0,
    next: null,
    previous: null,
    results: []
  },
  detail: null
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
