export const delay = (millis: number) =>
  new Promise<void>((resolve) => {
    setTimeout((_) => resolve(), millis)
  })
