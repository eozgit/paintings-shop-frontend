import { MutationTree } from 'vuex'
import { PaintingsStateInterface, PaintingsData } from './state'

const mutation: MutationTree<PaintingsStateInterface> = {
  increment (state: PaintingsStateInterface) {
    state.count++
  },
  setToken (state: PaintingsStateInterface, payload: string) {
    state.token = payload
  },
  setPaintingsData (state: PaintingsStateInterface, payload: PaintingsData) {
    state.paintingsData = payload
  }
}

export default mutation
