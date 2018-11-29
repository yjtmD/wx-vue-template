<template>
  <el-row class="date-time-parent">
    <el-col :span="11">
      <wx-time
        :id="beginId"
        class="time-input"
        v-model="sTime"
        :holderText="beginText"
        :min="min"
        :max="max"
        @change="changeSTime">
      </wx-time>
    </el-col>
    <el-col :span="2" class="date-time-link">
      {{linkText}}
    </el-col>
    <el-col :span="11">
      <wx-time
        :id="endId"
        class="time-input"
        v-model="eTime"
        :holderText="endText"
        :min="min"
        :max="max"
        @change="changeETime">
      </wx-time>
    </el-col>
  </el-row>
</template>

<script>
import wxTime from '@/components/dateTime/index'

function qDateOneToTwo (num) {
  return parseInt(num) < 10 ? '0' + num : '' + num
}

function qDateFormat (date) {
  return date.getFullYear() + '-' + qDateOneToTwo(date.getMonth() + 1) + '-' + qDateOneToTwo(date.getDate()) + ' ' + qDateOneToTwo(date.getHours()) + ':' + qDateOneToTwo(date.getMinutes()) + ':' + qDateOneToTwo(date.getSeconds())
}

export default {
  props: {
    beginId: {
      type: String,
      default: 'startTime'
    },
    endId: {
      type: String,
      default: 'endTime'
    },
    beginText: {
      // 开始文字
      type: String,
      default: '选择开始时间'
    },
    endText: {
      // 结束文字
      type: String,
      default: '选择结束时间'
    },
    linkText: {
      // 两个时间选择框连接词
      type: String,
      default: '-'
    },
    beginTime: {
      // 开始时间
      type: Date
    },
    endTime: {
      // 结束时间
      type: Date
    },
    defaultValue: {
      // 默认时间 null:空着 today:当天0点到当前时间 afterThreeDay: 当前时间加三天
      type: String,
      default: 'today' // null today afterThreeDay
    },
    disableDate: {
      // 不可选日期
      type: String,
      default: 'none' // none after before
    }
  },
  components: {
    wxTime
  },
  data () {
    let date1 = ''
    let date2 = ''
    let dateMin = ''
    let dateMax = ''
    if (this.defaultValue === 'today') {
      let dt = new Date()
      dt.setHours(0, 0, 0, 0)
      date1 = qDateFormat(dt)
      date2 = qDateFormat(new Date())
    } else if (this.defaultValue === 'null') {
      date1 = null
      date2 = null
    } else if (this.defaultValue === 'afterThreeDay') {
      date1 = qDateFormat(new Date())
      let dt = new Date()
      let seconds = dt.getTime() + 1000 * 60 * 60 * 24 * 3
      dt.setTime(seconds)
      date2 = qDateFormat(dt)
    }
    if (this.disableDate === 'after') {
      dateMax = qDateFormat(new Date())
    } else if (this.disableDate === 'before') {
      dateMin = qDateFormat(new Date())
    }
    return {
      sTime: date1,
      eTime: date2,
      min: dateMin,
      max: dateMax,
      resetSTime: date1,
      resetETime: date2
    }
  },
  methods: {
    resetTime (val1, val2) {
      if (val1) {
        this.sTime = qDateFormat(val1)
      } else {
        this.sTime = this.resetSTime
      }
      if (val2) {
        this.eTime = qDateFormat(val2)
      } else {
        this.eTime = this.resetETime
      }
      this.$emit('beginTimeChange', this.sTime)
      this.$emit('endTimeChange', this.eTime)
    },
    changeSTime () {
      console.log(this.sTime)
      this.$emit('beginTimeChange', this.sTime)
    },
    changeETime () {
      this.$emit('endTimeChange', this.eTime)
    }
  },
  mounted () {
    this.$emit('beginTimeChange', this.sTime)
    this.$emit('endTimeChange', this.eTime)
  }
}
</script>

<style lang="scss">
  .date-time-parent {
    .time-input {
      width: 100%;
    }
    .date-time-link {
      text-align: center;
      color: #dcdfe6;
      position: relative;
      top: 6px;
    }
  }
</style>
