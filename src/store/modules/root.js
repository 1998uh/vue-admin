const state = {
  userName: 'admin',
  titleName: [],
  routerAct: 0
};
const getters = {};
const mutations = {
  setNewsRefresh(state, item) {
    state.newsRefresh = item;
  },
  setNewTaskData(state, item) {
    state.newTaskData[item[0]] = item[1];
  },

  setTitleNameList(state, obj) {
    state.titleName.unshift(obj);
    function unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.name) && res.set(arr.name, 1));
    }
    let newArray = unique(state.titleName);
    newArray.map((i, index) => {
      if (i.name === obj.name || i.path === obj.path) {
        state.routerAct = index;
      }
    });

    state.titleName = newArray;
  },

  setRouterAct(state, val) {
    state.titleName.map((i, index) => {
      if (i.name === val.name || i.path === val.path) {
        state.routerAct = index;
      }
    });
  },
  MENU_TOGGLE_COLLAPSE(state) {
    state.isMenuCollapse = !state.isMenuCollapse;
    localStorage.setItem('collapse', state.isMenuCollapse);
  },
  SET_USERINFO: (state, data) => {
    state.userRole = data && data.roleNames[0];
    state.userName = data && data.userName;
  }
};
const actions = {
  // turnToken({ commit }, data) {
  //   console.log(data);
  //   return new Promise((resolve) => {
  //     getToken(data).then((res) => {
  //       if (res.data && res.data.access_token) {
  //         resolve(res.data.access_token);
  //       } else {
  //         sessionStorage.setItem('locUrl', window.location.href);
  //         window.location.href = loginHomeUrl; //暂时注释
  //       }
  //     });
  //   });
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
