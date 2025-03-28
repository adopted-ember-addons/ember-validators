import { canInvoke } from './can-invoke.ts';

export default function isPromise(p: unknown): boolean {
  return !!(p && canInvoke(p, 'then'));
}
