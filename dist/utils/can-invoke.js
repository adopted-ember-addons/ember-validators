function canInvoke(obj, methodName) {
  return obj != null && typeof obj[methodName] === 'function';
}

export { canInvoke };
//# sourceMappingURL=can-invoke.js.map
