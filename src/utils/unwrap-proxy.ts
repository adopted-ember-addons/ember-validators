import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';

export default function unwrapProxy(o) {
  return isProxy(o) ? unwrapProxy(o.content) : o;
}

export function isProxy(o) {
  return !!(o && (o instanceof ObjectProxy || o instanceof ArrayProxy));
}
