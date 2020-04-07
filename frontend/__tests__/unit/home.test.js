import { mount } from '@vue/test-utils'
import Home from '../../src/views/Home.vue'

describe('Home View', () => {
  const wrapper = mount(Home)

  it('renders the correct markup', () => {
    console.log(wrapper)
    // expect(wrapper.html()).toContain('<h2>Cubo Network Challenge</h2>')
  })
})

describe('Test Hooks', () => {
  it('should have a created hook', () => {
    expect(typeof Home.created).toBe('function')
  })

  it('should have a mounted hook', () => {
    expect(typeof Home.mounted).toBe('function')
  })
})
