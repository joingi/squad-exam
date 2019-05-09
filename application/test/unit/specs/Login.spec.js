import Vue from 'vue';
import BaseBanner from '@/components/Banner/BaseBanner';

describe('BaseBanner.vue', () => {
  it('should render content correctly', () => {
    const Constructor = Vue.extend(BaseBanner)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.banner-section h1').textContent).to.equal(
      'Finndu leiðbeinanda sem kemur þér af stað'
    )
  })
})
