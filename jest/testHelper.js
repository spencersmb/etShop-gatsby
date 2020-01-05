const consoleError = console.error
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    if (!args[0].includes("Warning: It looks like you're using the wrong act() around your test interactions.")) {
      consoleError(...args)
    }
  })
})
