export function resolveInput(arg: string | any) {
  if (typeof arg === 'string') {
    return document.getElementById(arg)
  }
  return arg
}