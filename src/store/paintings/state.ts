import { Painting } from 'src/components/models'

export interface PaintingsStateInterface {
  count: number;
  token: string;
  paintings: Painting[];
}

const state: PaintingsStateInterface = {
  count: 0,
  token: '',
  paintings: []
}

export default state
