<template>
  <el-header class="wx-header" height="60px">
    <a class="wx-logo" href="#">WX-TEMPLATE</a>
    <el-menu
      :default-active="$route.name"
      class="wx-menu"
      mode="horizontal"
      @select="changeRouter"
      background-color="#2b4055"
      text-color="#42b983"
      active-text-color="#ffd04b">
      <template v-for="(item, index) in menuList">
        <el-menu-item v-if="item.children.length === 0" :index="item.pathName" :key="item.id">{{item.name}}</el-menu-item>
        <el-submenu v-else :index="String(index)" :key="item.id">
          <template slot="title">{{item.name}}</template>
          <el-menu-item v-for="nav in item.children" :index="nav.pathName" :key="nav.id">{{ nav.name }}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <span class="user-info">
      <i class="user-pic"></i>
      <em>yjtmD</em>
    </span>
  </el-header>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      // eslint-disable-next-line
      menuList: WXCONF.menu
    }
  },
  methods: {
    changeRouter (routerName) {
      this.$router.push({
        name: routerName
      })
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
  .wx-header {
    background: #2b4055;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wx-logo {
      color: #fff;
    }
    .wx-menu {
      &.el-menu--horizontal {
        border-bottom: 0;
      }
    }
    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-pic {
        display: inline-block;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        background: url("../../assets/images/avater.jpeg") 50% no-repeat;
        background-size: cover;
      }
    }
  }
</style>
