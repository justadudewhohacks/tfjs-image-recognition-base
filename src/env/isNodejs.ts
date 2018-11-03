export function isNodejs(): boolean {
  return typeof module !== 'undefined' && !!module.exports
    && typeof process !== 'undefined' && !!process.version
}