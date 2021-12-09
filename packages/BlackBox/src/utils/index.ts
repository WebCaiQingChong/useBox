export const pureObject = () => {
  return Object.create(null)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (data: any) => {
  return toString.call(data) === '[object Object]'
}
