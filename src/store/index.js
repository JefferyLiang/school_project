import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0,
    loadding: true,
  },
  mutations:{
    loaddingNow: (state) => {
      state.loadding = true;
    },
    loaddingFinish: (state) => {
      state.loadding = false;
    }
  }
})

export default store;