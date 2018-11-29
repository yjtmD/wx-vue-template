<template>
  <wx-layout>
    <div class="wx-time-page">
      <wx-time
        id="demoTime"
        class="time-demo-1"
        v-model="time">
      </wx-time>
      <div class="wx-time-range">
        <wx-time-range
          ref="dateTime1"
          disableDate="after"
          @beginTimeChange="beginTimeChange"
          @endTimeChange="endTimeChange">
        </wx-time-range>
      </div>
    </div>
  </wx-layout>
</template>

<script>
import wxLayout from '@/components/layout/index'
import wxTime from '@/components/dateTime/index'
import wxTimeRange from '@/components/dateTimeRange/index'

export default {
  components: {
    wxLayout,
    wxTime,
    wxTimeRange
  },
  data () {
    return {
      time: '',
      beginTime: '', // yyyy-MM-dd HH:mm:ss
      endTime: ''
    }
  },
  methods: {
    beginTimeChange (val) {
      this.beginTime = val
      console.log(val)
    },
    endTimeChange (val) {
      this.endTime = val
      console.log(val)
    }
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
      display: inline-block;
    }
    .wx-time-range {
      display: inline-block;
      vertical-align: bottom;
      margin-left: 30px;
    }
  }
</style>
