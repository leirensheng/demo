<template>
  <div id="app">
    <div id="nav">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :key="one.name"
          v-for="one in tabs"
          :label="one.name"
          :name="one.route"
        >

        </el-tab-pane>
      </el-tabs>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '/',
      tabs: [
        { route: '/', name: 'json编辑器' },
        { route: '/3d', name: '3D页面' },
        { route: '/org', name: '部门选择组件' },
        { route: '/user', name: '部门用户选择组件' }
      ]
    }
  },
  methods: {
    handleClick (tab) {
      if (tab.name) {
        this.$router.push(tab.name)
      }
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
