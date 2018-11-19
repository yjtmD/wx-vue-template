<template>
  <el-footer height="40px" class="wx-footer">
    copyright © {{ year }} <a href="https://github.com/yjtmD">https://github.com/yjtmD</a>
  </el-footer>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      year: ''
    }
  },
  methods: {
  },
  created () {
    this.year = new Date().getFullYear()
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss">
  .wx-footer {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    background: #2b4055;
    a {
      margin-left: 10px;
      color: #42b983;
    }
  }
</style>
