<template>
  <wx-layout>
    <div class="wx-hello">
      <span class="user-pic"></span>
      <p>Hello {{userName}}</p>
    </div>
  </wx-layout>
</template>
<script>
import wxLayout from '@/components/layout/index'
export default {
  components: {
    wxLayout
  },
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
  .wx-hello {
    height: 100%;
    color: aliceblue;
    font-size: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .user-pic {
      display: inline-block;
      box-sizing: border-box;
      border: 1px solid aliceblue;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 30px;
      background: url("../../assets/images/avater.jpeg") 50% no-repeat;
      background-size: cover;
    }
  }
</style>
