import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface, PaintingQuery } from './state'
import { Router } from 'src/router'
import { loadPaintingData } from 'src/client'

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
      Router.push('login')
    } else {
      context.commit('setPaintingsData', json)
    }
  }
}

export default actions
