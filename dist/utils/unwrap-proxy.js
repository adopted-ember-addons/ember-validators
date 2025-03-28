import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';

function unwrapProxy(o) {
  return isProxy(o) ? unwrapProxy(o.content) : o;
}
function isProxy(o) {
  return !!(o && (o instanceof ObjectProxy || o instanceof ArrayProxy));
}

export { unwrapProxy as default, isProxy };
//# sourceMappingURL=unwrap-proxy.js.map
