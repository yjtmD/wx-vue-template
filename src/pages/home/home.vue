<template>
  <div class="wx-home">
    Hello World {{userName}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: ''
    }
  },
  methods: {
    getUserName () {
      let _this = this
      this.$http.get('/getUser', null, (res) => {
        _this.userName = res.name
      })
    }
  },
  mounted () {
    this.getUserName()
  }
}
</script>
<style lang="scss">
  .wx-home {
    font-size: 20px;
    text-align: center;
  }
</style>
