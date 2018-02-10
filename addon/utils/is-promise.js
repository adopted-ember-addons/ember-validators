import Ember from 'ember';

const {
  canInvoke
} = Ember;

export default function isPromise(p) {
  return !!(p && canInvoke(p, 'then'));
}
