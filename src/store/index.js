import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0,
    loadding: true,
    currentUser: null,
    filterType: '',
    filterStr: ''
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
    },
    setFilterStr: (state,payload) => {
      state.filterStr = payload.filterStr;
    }
  }
})

export default store;