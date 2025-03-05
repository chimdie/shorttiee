export function clone(instance: Object) {
  return Object.assign(
    Object.create(Object.getPrototypeOf(instance)),
    JSON.parse(JSON.stringify(instance))
  );
}
