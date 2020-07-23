import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface, PaintingQuery } from './state'
import { Painting } from 'src/components/models'
import { Router } from 'src/router'

const actions: ActionTree<PaintingsStateInterface, StoreInterface> = {
  INCREMENT (context) {
    context.commit('increment')
  },
  setToken (context, payload) {
    context.commit('setToken', payload)
  },
  async loadPaintings (context, { page, title, year, medium, height, width }: PaintingQuery) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${context.getters.token}`)

    const requestOptions = {
      method: 'GET',
      headers
    }

    let url = 'http://localhost:8000/paintings/'
    url += `?page=${page}`
    if (title) url += `&title=${title}`
    if (year) url += `&date=${year}`
    if (medium) url += `&media=${medium}`
    if (height?.max) url += `&height_min=${height.min}&height_max=${height.max}`
    if (width?.max) url += `&width_min=${width.min}&width_max=${width.max}`
    const response = await fetch(url, requestOptions)
    const json = await response.json() as PaintingsData & { code: string }

    if (json.code === 'token_not_valid') {
      Router.push('login')
    } else {
      context.commit('setPaintingsData', json)
    }
  }
}

export default actions
