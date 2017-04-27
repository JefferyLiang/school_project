import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0,
    loadding: true,
    currentUser: null,
    filterType: ''
  },
  mutations:{
    loaddingNow: (state) => {
      state.loadding = true;
    },
    loaddingFinish: (state) => {
      state.loadding = false;
    },
    setUser: (state, payload) => {
      state.currentUser = payload.list;
    },
    changeType: (state,payload) => {
      state.filterType = payload.typeName;
    },
    initialType: state => {
      state.filterType = '';
    }
  }
})

export default store;