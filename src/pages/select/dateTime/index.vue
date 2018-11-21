<template>
  <wx-layout>
    <div class="wx-time-page">
      <wx-time
        id="demoTime"
        class="time-demo-1"
        v-model="time">
      </wx-time>
    </div>
  </wx-layout>
</template>

<script>
import wxLayout from '@/components/layout/index'
import wxTime from '@/components/dateTime/index'

export default {
  components: {
    wxLayout,
    wxTime
  },
  data () {
    return {
      time: '',
      showClose: true
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  },
  watch: {
  }
}
</script>

<style lang="scss">
  .wx-time-page {
    .time-demo-1 {
      width: 220px;
    }
  }
</style>
