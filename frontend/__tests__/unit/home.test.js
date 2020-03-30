import Home from '../../src/views/Home.vue'

describe('Hooks', () => {
  it('should have a created hook', () => {
    expect(typeof Home.created).toBe('function')
  })

  it('should have a mounted hook', () => {
    expect(typeof Home.mounted).toBe('function')
  })
})
