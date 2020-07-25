import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface } from './state'
import { Router } from 'src/router'
import { loadPaintingData, loadPaintingDetails } from 'src/client'

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

    const imageDims = await new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve({ imageHeight: image.height, imageWidth: image.width })
      image.onerror = reject
      image.src = json.imageUrl
    })

    if (json.code === 'token_not_valid') {
      Router.push('/login')
    } else {
      context.commit('setPaintingDetails', { ...json, ...imageDims })
    }
  },
  addToBasket (context, { id }) {
    context.commit('addToBasket', id)
    localStorage.setItem('basket', JSON.stringify(context.state.basket))
  },
  removeFromBasket (context, { id }) {
    context.commit('removeFromBasket', id)
    localStorage.setItem('basket', JSON.stringify(context.state.basket))
  }
}

export default actions
