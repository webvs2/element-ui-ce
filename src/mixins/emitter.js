function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    /**
     *
     * @param {*} componentName  组件名
     * @param {*} eventName  事件名
     * @param {*} params  参数
     */
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; // 获取当前的父实例，如果当前实例有的话。如果当前实例没有父实例，那么它就是根实例。
      var name = parent.$options.componentName;// 获取当前实例的组件名（建议：最好是实例是提供了一个组件name）

      while (parent && (!name || name !== componentName)) { // 如果当前实例存在并且当前实例的组件名不等于传入的组件名
        parent = parent.$parent;// 那么就将当前实例的父实例赋值给当前实例，将一直向上遍历，直到找到组件名相同的实例或者没有父实例为止。

        if (parent) {// 如果当前实例找到了，就进行赋值name操作
          name = parent.$options.componentName;
        }
      }
      // 会一直向上找，直到root节点还没有，就会退出，说明上面没有需要的实例

      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));// 触发事件
      }
    },
    /**
     *
     * @param {*} componentName  组件名
     * @param {*} eventName  事件名
     * @param {*} params  参数
     */
    broadcast(componentName, eventName, params) { // 向下广播
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
