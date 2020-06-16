<template>
 <div class="user">
   <Select-org :options="options" @click-node="getCurUsers"></Select-org>
   <Select-user :users="users" v-bind="$attrs" v-on="$listeners"></Select-user>
 </div>
</template>
<script>
import SelectOrg from './SelectOrg'
import SelectUser from './SelectUser'

export default {
  data () {
    return {
      users: [],
      optionsForTree: [],
      orgUserMap: {},
      allUsers: [] // 去重的
    }
  },
  watch: {
    'options.length' (val, old) {
      if (val && old === 0) {
        this.getOrgUserMap(this.options)
        this.$emit('getAllUsers', this.allUsers)
      }
    }
  },
  props: {
    options: {
      type: Array
    }
  },
  methods: {
    getCurUsers (data) {
      this.users = this.orgUserMap[data.id] || []
    },
    getUser (user) {
      const target = this.allUsers.find(one => one.id === user.id)
      if (target === undefined) {
        this.allUsers = [...this.allUsers, user]
      }
      return target || user
    },
    getOrgUserMap (arr, parentId) {
      const length = arr.length
      for (let i = length - 1; i >= 0; i--) {
        const one = arr[i]
        if (one.type === 'user') {
          let users = this.orgUserMap[parentId]
          if (!users) {
            this.orgUserMap[parentId] = []
            users = this.orgUserMap[parentId]
          }
          const user = this.getUser(one)
          this.orgUserMap[parentId] = [...users, user]
          arr.splice(i, 1)
        } else if (one.children) {
          this.getOrgUserMap(one.children, one.id)
        }
      }
    }
  },
  components: {
    SelectOrg,
    SelectUser
  }
}
</script>
<style lang="scss" scoped>
.user{
  display: flex;
}
</style>
