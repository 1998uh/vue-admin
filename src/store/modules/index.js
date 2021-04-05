const files = require.context('.', true, /\.js$/);
const modules = {};
files.keys().forEach((v) => {
  const isDir = /\w\/\w/.test(v);
  if (v === './index.js') return;
  if (!isDir) {
    modules[v.replace(/(\.\/|\.js)/g, '')] = files(v).default;
  } else {
    // 若有子文件夹
    const module = v.replace(/\.\/|\/\w+\.js/g, '');
    modules[module] = modules[module] || {
      state: {},
      getters: {},
      actions: {},
      mutations: {}
    };
    modules[module] = {
      namespaced: true,
      state: Object.assign(modules[module].state || {}, files(v).default.state),
      getters: Object.assign(modules[module].getters || {}, files(v).default.getters),
      actions: Object.assign(modules[module].actions || {}, files(v).default.actions),
      mutations: Object.assign(modules[module].mutations || {}, files(v).default.mutations)
    };
  }
});
export default modules;
