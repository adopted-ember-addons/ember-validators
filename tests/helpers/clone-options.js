import { assign, merge } from '@ember/polyfills';

const assign = assign || merge;

export default function cloneOptions(o) {
  return assign({}, o);
}
