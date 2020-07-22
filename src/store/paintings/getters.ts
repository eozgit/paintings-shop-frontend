import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { PaintingsStateInterface } from './state'

const getters: GetterTree<PaintingsStateInterface, StoreInterface> = {
  count: state => state.count,
  token: state => state.token,
  paintings: state => state.paintings
}

export default getters
