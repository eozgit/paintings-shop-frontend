import { MutationTree } from 'vuex'
import { PaintingsStateInterface, PaintingsData } from './state'
import { Painting, PaintingDimensions } from 'src/components/models'

const mutation: MutationTree<PaintingsStateInterface> = {
  increment (state: PaintingsStateInterface) {
    state.count++
  },
  setToken (state: PaintingsStateInterface, payload: string) {
    state.token = payload
  },
  setPaintingsData (state: PaintingsStateInterface, payload: PaintingsData) {
    state.paintingsData = payload
  },
  setPaintingDetails (state: PaintingsStateInterface, payload: Painting & PaintingDimensions) {
    state.detail = payload
  }
}

export default mutation
