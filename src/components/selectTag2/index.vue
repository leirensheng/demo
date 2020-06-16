<template>
  <div class="select-user-org">
    <el-tabs
      class="left"
      v-model="curTab"
    >
      <el-tab-pane
        label="用户"
        name="user"
      >
        <User
          class="user"
          :options="options"
          :value="selectedUserIds"
          @getAllUsers="handleGetAllUsers"
          @change="handleUserChange"
        ></User>
      </el-tab-pane>
      <el-tab-pane
        label="部门"
        name="org"
      >
        <Filter-tree
          @change="getTags"
          :value="orgTagIds"
          :options="options"
          subTitle='请选择部门'
        ></Filter-tree>
      </el-tab-pane>
    </el-tabs>
    <Tree-tag
      :value="tags"
      @delete="handleDelete"
      title="已选用户/部门"
    ></Tree-tag>

  </div>
</template>
<script>
import TreeTag from '../selectTag/TreeTag.vue'
import FilterTree from '../selectTag/FilterTree.vue'

import User from './User.vue'
import options from './options'

export default {
  data () {
    return {
      // tags: [],
      curTab: 'user',
      options: [],
      allUsers: [],
      selectedUserIds: [115],
      orgTagIds: [],
      orgTags: []
    }
  },
  computed: {
    userTags () {
      return this.allUsers.filter(one => this.selectedUserIds.includes(one.id))
    },
    tags () {
      const userTags = JSON.parse(JSON.stringify(this.userTags))
      userTags.forEach(one => {
        one.type = 'user'
      })
      return [...userTags, ...this.orgTags]
    }
  },
  methods: {
    handleDelete (id, type) {
      const arr = type === 'user' ? this.selectedUserIds : this.orgTagIds
      const idx = arr.indexOf(id)
      arr.splice(idx, 1)
    },
    getTags (arr) {
      const ids = []
      const res = []
      for (const one of arr) {
        if (ids.every(secondId => one.secondId.indexOf(secondId) !== 0)) {
          res.push(one)
          ids.push(one.secondId)
        }
      }
      this.orgTags = res
      this.orgTagIds = res.map(one => one.id)
    },

    handleGetAllUsers (allUsers) {
      this.allUsers = allUsers
    },

    handleUserChange (user, isChecked) {
      const id = user.id
      if (isChecked) {
        this.selectedUserIds = [...this.selectedUserIds, id]
      } else {
        const idx = this.selectedUserIds.indexOf(id)
        this.selectedUserIds.splice(idx, 1)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.options = options
    }, 200)
  },
  components: {
    FilterTree,
    User,
    TreeTag
  }
}
</script>
<style lang="scss" scoped>
.select-user-org {
  display: flex;
  .left {
    padding-top: 4px;
    min-height: 400px;
    margin-right: 20px;
    border: 1px solid #e4e8f3;
    border-radius: 4px;
    .filter-tree {
      min-height: 400;
    }
  }
}
</style>
<style lang="scss">
.select-user-org {
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 16px;
  }
  #tab-org {
    padding-left: 4px;
  }
  .el-tabs__header {
    min-width: 596px;
    margin-bottom: 0;
  }
}
</style>
