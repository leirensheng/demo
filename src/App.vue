<template>
  <div id="app">
    <div id="nav">
       <router-link class="link" v-for="one in tabs" :key="one.name" :to="one.route">{{one.name}}</router-link>
    </div>
      <router-view />
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
        // { route: '/org-man', name: '部门管理组件' }

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
  .link{
    margin-right: 12px;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
