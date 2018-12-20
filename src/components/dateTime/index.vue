<template>
  <div class="wx-time-input" @mouseenter="handleMouseEnter" @mouseleave="showClose = false">
    <input
      :id="id"
      type="text"
      class="wx-input__inner"
      readonly
      autocomplete="off"
      v-model="userInput"
      :placeholder="holderText"
      @keyup="timeChange"/>
    <i
      v-if="showClose"
      class="wx-input__icon"
      @click="handleClickIcon"
      :class="[showClose ? '' + clearIcon : '']">
    </i>
  </div>
</template>

<script>
import './laydate/theme/default/laydate.css'
import './laydate/laydate'
export default {
  props: {
    holderText: {
      type: String,
      default: '请选择时间'
    },
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    },
    min: {
      type: String,
      default: ''
    },
    max: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  data () {
    return {
      userInput: '',
      showClose: false,
      key: ''
    }
  },
  computed: {
  },
  methods: {
    timeChange () {
      this.$emit('input', this.userInput)
      this.$emit('change', this.userInput)
    },
    handleMouseEnter () {
      if (this.clearable && this.userInput !== '') {
        this.showClose = true
      }
    },
    handleClickIcon () {
      this.userInput = ''
      this.showClose = false
      this.$emit('input', this.userInput)
      this.$emit('change', this.userInput)
    }
  },
  created () {
  },
  mounted () {
    window.laydate.render({
      elem: '#' + this.id,
      value: this.userInput,
      min: this.min || '1900-1-1', // 时间范围下限 2017-10-25 12:25:34
      max: this.max || '2099-12-31', // 时间范围上限 2018-11-23 01:43:21
      type: 'datetime', // date datetime
      done: (value, date, endDate) => {
        this.userInput = value
        this.$emit('input', this.userInput)
        this.$emit('change', this.userInput)
      }
    })
    this.key = window.lay('#' + this.id).attr('lay-key')
    if (this.value !== '') {
      this.userInput = this.value
    }
  },
  beforeDestroy () {
    window.lay('#layui-laydate' + this.key).remove()
  },
  watch: {
    value (newVal, oldVal) {
      this.userInput = newVal
    }
  }
}
</script>

<style lang="scss">
  .wx-time-input {
    position: relative;
    display: inline-block;
    width: 100%;
    font-size: 13px;
    .wx-input__inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 32px;
      line-height: 32px;
      outline: none;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      &:hover{
        border-color: #c0c4cc;
      }
      &:focus {
        outline: none;
        border-color: #409eff;
      }
    }
    .wx-input__icon {
      position: absolute;
      width: 25px;
      height: 100%;
      text-align: center;
      transition: all .3s;
      line-height: 32px;
      color: #c0c4cc;
      top: 0;
      right: 0;
      cursor: pointer;
    }
  }
</style>
