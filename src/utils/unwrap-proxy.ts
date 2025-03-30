import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';

export default function unwrapProxy<T>(o: T): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return isProxy(o) ? unwrapProxy(o.content) : o;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isProxy(o: unknown): o is ObjectProxy<any> | ArrayProxy<any> {
  return !!(o && (o instanceof ObjectProxy || o instanceof ArrayProxy));
}
