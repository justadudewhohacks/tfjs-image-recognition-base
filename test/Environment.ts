export type TestEnv = {
  loadImage: (uri: string) => Promise<HTMLImageElement>
  loadJson: <T> (uri: string) => Promise<T>
}