import { mount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(AppButton, {
      props: { size: 'medium', color: 'ps-red' },
      slots: { default: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
    expect(wrapper.classes()).toContain('bg-ps-red')
    expect(wrapper.classes()).toContain('medium')
  })

  it('uses the inverted color class when inverted', () => {
    const wrapper = mount(AppButton, {
      props: { color: 'ps-red', inverted: true }
    })
    expect(wrapper.classes()).toContain('bgInv-ps-red')
  })
})
