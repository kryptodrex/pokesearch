import { defineStore } from 'pinia'

export const useHistoryStore = defineStore('history', {
  state: () => ({ idHistory: [] }),
  actions: {
    addIdToHistory (id) {
      this.idHistory.push(id)
    }
  }
})
