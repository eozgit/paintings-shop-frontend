import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface, PaintingQuery } from './state'
import { Router } from 'src/router'
import { loadPaintingData, loadPaintingDetails } from 'src/client'

const actions: ActionTree<PaintingsStateInterface, StoreInterface> = {
  INCREMENT (context) {
    context.commit('increment')
  },
  setToken (context, payload) {
    context.commit('setToken', payload)
  },
  async loadPaintings (context, query: PaintingQuery) {
    const json = await loadPaintingData(context.getters.token, query)

    if (json.code === 'token_not_valid') {
      Router.push('/login')
    } else {
      context.commit('setPaintingsData', json)
    }
  },
  async loadPainting (context, id: number) {
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
  }
}

export default actions
