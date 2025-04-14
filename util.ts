export function range(size: number, startAt = 0) {
  return Array.from({ length: size }).map((_, i) => i + startAt);
}
