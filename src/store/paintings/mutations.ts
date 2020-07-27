import Vue from 'vue'
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
  },
  addToBasket (state: PaintingsStateInterface, id) {
    state.basket = [...state.basket, id]
  },
  removeFromBasket (state: PaintingsStateInterface, id) {
    state.basket = state.basket.filter(i => i !== id)
  },
  setPaintingById (state: PaintingsStateInterface, painting: Painting) {
    Vue.set(state.paintingsById, painting.id, painting)
  },
  emptyBasket (state: PaintingsStateInterface) {
    state.outOfStock = [...new Set([...state.outOfStock, ...state.basket])]
    state.basket = []
  }
}

export default mutation
