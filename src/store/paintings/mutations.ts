import { MutationTree } from 'vuex'
import { PaintingsStateInterface } from './state'
import { Painting } from 'src/components/models'

const mutation: MutationTree<PaintingsStateInterface> = {
  increment (state: PaintingsStateInterface) {
    state.count++
  },
  setToken (state: PaintingsStateInterface, payload: string) {
    state.token = payload
  },
  setPaintings (state: PaintingsStateInterface, payload: Painting[]) {
    state.paintings = payload
  }
}

export default mutation
