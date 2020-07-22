import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface } from './state'
import { Painting } from 'src/components/models'
import { Router } from 'src/router'

const actions: ActionTree<PaintingsStateInterface, StoreInterface> = {
  INCREMENT (context) {
    context.commit('increment')
  },
  setToken (context, payload) {
    context.commit('setToken', payload)
  },
  async loadPaintings (context) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${context.getters.token}`)

    const requestOptions = {
      method: 'GET',
      headers
    }

    const response = await fetch('http://localhost:8000/paintings/', requestOptions)
    const json = await response.json() as Painting[] & { code: string }

    if (json.code === 'token_not_valid') {
      Router.push('login')
    } else {
      context.commit('setPaintings', json)
    }
  }
}

export default actions
