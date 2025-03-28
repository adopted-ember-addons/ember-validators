export function canInvoke(obj: unknown, methodName: string): boolean {
  return (
    obj != null &&
    typeof (obj as Record<string, unknown>)[methodName] === 'function'
  );
}
