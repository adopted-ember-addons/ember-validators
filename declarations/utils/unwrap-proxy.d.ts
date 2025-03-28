export default function unwrapProxy(o: any): any;
export function isProxy(o: any): o is ObjectProxy<any> | ArrayProxy<any>;
import ObjectProxy from '@ember/object/proxy';
import ArrayProxy from '@ember/array/proxy';
