import Ember from 'ember';

const {
  canInvoke
} = Ember;
function isPromise(p) {
  return !!(p && canInvoke(p, 'then'));
}

export { isPromise as default };
//# sourceMappingURL=is-promise.js.map
