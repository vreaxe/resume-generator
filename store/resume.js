import Vue from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import set from 'lodash/set'

export const state = () => ({
  list: [],
  current: {},
  saved: true,
})

export const actions = {
  async getList({ commit }) {
    const res = await this.$axios.get('/resume')
    commit('setList', res.data)
  },

  async getCurrent({ commit }, { id }) {
    const res = await this.$axios.get(`/resume/${id}`)
    commit('setCurrent', res.data)
  },

  updateCurrent({ commit }, payload) {
    commit('updateCurrent', payload)
    commit('setSaved', false)
  },

  deleteItemCurrent({ commit }, payload) {
    commit('deleteItemCurrent', payload)
    commit('setSaved', false)
  },

  async delete({ commit }, { id }) {
    await this.$axios.delete(`/resume/${id}`)
  },

  async createFile() {
    const res = await this.$axios.post('/create-file')
    const id = res.data.filename.split('.')[0]
    this.$router.push({ name: 'edit-id', params: { id } })
  },

  async saveFile({ commit }, { id, resume }) {
    await this.$axios.post(`/resume/${id}`, { resume })
    commit('setSaved', true)
  },
}

export const mutations = {
  setCurrent(state, current) {
    state.current = current
  },

  updateCurrent(state, { property, value }) {
    const copyCurrent = cloneDeep(state.current)
    set(copyCurrent, property, value)
    Vue.set(state, 'current', copyCurrent)
  },

  deleteItemCurrent(state, { property, index }) {
    state.current[property].splice(index, 1)
  },

  setList(state, list) {
    state.list = list
  },

  setSaved(state, value) {
    state.saved = value
  },
}
