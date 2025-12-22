import { once, on } from 'element-ui-ce/src/utils/dom';
import { isMac } from 'element-ui-ce/src/utils/util';

export default {
  bind(el, binding, vnode) {
    let interval = null;
    let startTime;
    const maxIntervals = isMac() ? 100 : 200;
    const handler = () => vnode.context[binding.expression].apply();
    const clear = () => {
      if (Date.now() - startTime < maxIntervals) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };

    on(el, 'mousedown', (e) => {
      if (e.button !== 0) return;
      startTime = Date.now();
      once(document, 'mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, maxIntervals);
    });
  }
};
