import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import set from 'lodash/set'

export const state = () => ({
  list: [],
  current: {}
})

export const actions = {
  async getList({commit}) {
    const res = await this.$axios.get('/resume')
    commit('setList', res.data)
  },

  async getCurrent({commit}, {id}) {
    const res = await this.$axios.get(`/resume/${id}`)
    commit('setCurrent', res.data)
  },

  updateCurrent({commit}, payload) {
    commit('updateCurrent', payload)
  },

  deleteItemCurrent({commit}, payload) {
    commit('deleteItemCurrent', payload)
  },

  async delete({commit}, {id}) {
    await this.$axios.delete(`/resume/${id}`)
  },

  async createFile() {
    const res = await this.$axios.post('/create-file')
    const id = res.data.filename.split(".")[0]
    this.$router.push({name: 'edit-id', params: { id }})
  },

  async saveFile({commit}, {id, resume}) {
    await this.$axios.post(`/resume/${id}`, {resume})
  },
}

export const mutations = {
  setCurrent(state, current) {
    state.current = current
  },

  updateCurrent(state, {property, value}) {
    const copyCurrent = cloneDeep(state.current)
    set(copyCurrent, property, value)
    Vue.set(state, 'current', copyCurrent);
  },

  deleteItemCurrent(state, {property, index}) {
    state.current[property].splice(index, 1)
  },
  
  setList(state, list) {
    state.list = list
  },
}
