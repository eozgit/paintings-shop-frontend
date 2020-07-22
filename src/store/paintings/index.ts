import { Module } from 'vuex'
import { StoreInterface } from '../index'
import state, { PaintingsStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const paintingsModule: Module<PaintingsStateInterface, StoreInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default paintingsModule
