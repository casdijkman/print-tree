export function range(size: number, startAt = 0) {
  return Array.from({ length: size }).map((_, i) => i + startAt);
}

export function regexEscape(input: string): string {
  // eslint-disable-next-line no-useless-escape, unicorn/prefer-string-replace-all, unicorn/better-regex
  return input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
