import ArrayProxy from '@ember/array/proxy';
import ObjectProxy from '@ember/object/proxy';
export default function unwrapProxy<T>(o: T): T;
export declare function isProxy(o: unknown): o is ObjectProxy<any> | ArrayProxy<any>;
