import { assign } from '@ember/polyfills';

export default function cloneOptions(o) {
  return assign({}, o);
}
