import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';

function unwrapProxy(o) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isProxy(o) ? unwrapProxy(o.content) : o;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isProxy(o) {
  return !!(o && (o instanceof ObjectProxy || o instanceof ArrayProxy));
}

export { unwrapProxy as default, isProxy };
//# sourceMappingURL=unwrap-proxy.js.map
