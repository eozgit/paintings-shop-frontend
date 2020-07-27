import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface } from './state'
import { Router } from 'src/router'
import { loadPaintingData, loadPaintingDetails } from 'src/client'
import { PaintingDimensions } from 'src/components/models'

const actions: ActionTree<PaintingsStateInterface, StoreInterface> = {
  INCREMENT (context) {
    context.commit('increment')
  },
  setToken (context, { token }) {
    context.commit('setToken', token)
  },
  async loadPaintings (context, { query }) {
    const json = await loadPaintingData(context.getters.token, query)

    if (json.code === 'token_not_valid') {
      Router.push('/login')
    } else {
      context.commit('setPaintingsData', json)
    }
  },
  async loadPainting (context, { id }) {
    const json = await loadPaintingDetails(context.getters.token, id)

    const imageDims: PaintingDimensions = await new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve({ imageHeight: image.height, imageWidth: image.width })
      image.onerror = reject
      image.src = json.imageUrl
    })

    if (json.code === 'token_not_valid') {
      Router.push('/login')
    } else {
      context.commit('setPaintingDetails', { ...json, ...imageDims })
      context.commit('setPaintingById', json)
    }
  },
  addToBasket (context, { painting }) {
    context.commit('addToBasket', painting.id)
    context.commit('setPaintingById', painting)
    localStorage.setItem('basket', JSON.stringify(context.state.basket))
  },
  removeFromBasket (context, { id }) {
    context.commit('removeFromBasket', id)
    localStorage.setItem('basket', JSON.stringify(context.state.basket))
  },
  emptyBasket (context) {
    context.commit('emptyBasket')
    localStorage.setItem('basket', JSON.stringify(context.state.basket))
    localStorage.setItem('outOfStock', JSON.stringify(context.state.outOfStock))
  }
}

export default actions
