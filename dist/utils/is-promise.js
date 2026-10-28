import { canInvoke } from './can-invoke.js';

function isPromise(p) {
  return !!(p && canInvoke(p, 'then'));
}

export { isPromise as default };
//# sourceMappingURL=is-promise.js.map
