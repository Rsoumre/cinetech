export type DebounceFunction<T extends (...args: any[]) => void> = (
  func: T,
  delay: number
) => (...args: Parameters<T>) => void;