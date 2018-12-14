<template>
  <wx-layout>
    <div class="my-slider center-content">
      <wx-slider
        v-model="similar"
        :step="10"
        :min="min"
        :max="max"
        show-input
        :show-input-controls="false"
        show-stops
        reverse-stops
        tooltip-class="wx-slider-tooltip"
        @change="changeSimilar">
      </wx-slider>
    </div>
  </wx-layout>
</template>

<script>
import wxLayout from '@/components/layout/index'
import wxSlider from '@/components/slider/index'

export default {
  components: {
    wxLayout,
    wxSlider
  },
  data () {
    return {
      similar: 85,
      min: 50,
      max: 100
    }
  },
  methods: {
    changeSimilar () {
      console.log(this.similar)
    }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss">
  .my-slider {
    width: 350px;
    margin-top: 30px;
    font-size: 14px;
    color: #666;
  }
</style>
