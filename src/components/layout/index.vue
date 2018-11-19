<template>
  <el-container class="wx-layout">
    <wx-header></wx-header>
    <el-main class="wx-main">
      <slot></slot>
    </el-main>
    <wx-footer></wx-footer>
  </el-container>
</template>

<script>
import wxHeader from '@/components/header/index'
import wxFooter from '@/components/footer/index'

export default {
  components: {
    wxHeader,
    wxFooter
  },
  data () {
    return {
    }
  },
  methods: {
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
  .wx-layout {
    height: 100%;
    flex-direction: column;
    min-width: 800px;
    .wx-main {
      height: 100%;
      background: #202020;
    }
  }
</style>
