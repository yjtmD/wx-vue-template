<template>
  <div class="wx-time-input">
    <input
      :id="id"
      type="text"
      class="wx-input__inner"
      autocomplete="off"
      v-model="userInput"
      :placeholder="holderText"
      @keyup="timeChange"
      @mouseenter="handleMouseEnter"
      @mouseleave="showClose = false" />
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
    }
  },
  components: {
  },
  data () {
    return {
      userInput: '',
      showClose: false
    }
  },
  computed: {
  },
  methods: {
    timeChange (e) {
      this.$emit('input', this.userInput)
    },
    handleMouseEnter (e) {
    }
  },
  created () {
  },
  mounted () {
    window.laydate.render({
      elem: '#' + this.id,
      value: this.userInput,
      type: 'datetime',
      done: (value, date, endDate) => {
      }
    })
    if (this.value !== '') {
      this.userInput = this.value
    }
  },
  destroyed () {
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
  }
</style>
