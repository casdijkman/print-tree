export function areAllEqual(values: any[]): boolean {
  return values.every((value) => value === values[0]);
}
