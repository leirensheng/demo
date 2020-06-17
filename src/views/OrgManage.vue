<template>
  <div class="wrap">
    <div class="title">
      管理部门</div>
    <div class="content">
      <div class="left">
        <tree
        :options="options"
        :noAction="mode!==''"
        @node-click="handleNodeClick"
        @edit="showEditForm"></tree>
      </div>
      <div
        class="right"
        :class="noShowForm&&'flex'"
      >
        <div
          v-if="noShowForm"
          class="no-form"
        >
          <el-button
            type="primary"
            size="medium"
            @click="showAddForm"
          >+ 添加部门</el-button>
        </div>
        <Form
          v-else
          :mode="mode"
          :options="optionsForForm"
          :form="defaultForm"
          @cancel="showAddBtn"
          @save="handleSave"
        ></Form>
      </div>
    </div>
  </div>
</template>

<script>
import Tree from './components/Tree'
import Form from './components/Form'
import options from './components/options'
export default {
  data () {
    return {
      options,
      mode: '',
      curNode: null,
      defaultForm: {},
      noShowForm: true,
      curData: {},
      optionsForForm: []
    }
  },
  computed: {

  },
  components: {
    Tree,
    Form
  },
  methods: {
    handleNodeClick (data, node) {
      this.curData = data
      this.curNode = node
    },
    getOrgs (node) {
      if (!node || (node.level === 0)) return []
      if (node.parent) {
        return [...this.getOrgs(node.parent), node.data.id]
      } else {
        return [node.data.id]
      }
    },
    showAddForm () {
      if (this.curNode) {
        const org = this.getOrgs(this.curNode)
        this.defaultForm = { org: org }
      }
      this.mode = 'add'
      this.noShowForm = false
      this.optionsForForm = JSON.parse(JSON.stringify(this.options))

      //
    },
    showAddBtn () {
      this.noShowForm = true
      this.mode = ''
      this.curNode = null
      this.curData = {}
      this.defaultForm = {}
    },
    showEditForm (data, node) {
      this.curData = data
      this.mode = 'edit'
      this.noShowForm = false
      const org = this.getOrgs(node.parent)
      this.defaultForm = { ...this.curData, org }
      const options = JSON.parse(JSON.stringify(this.options))

      const target = this.findById(options, data.id)
      this.handleDisableData(target)
      this.optionsForForm = options
    },

    handleDisableData (data) {
      this.$set(data, 'disabled', true)
      if (data.children) {
        data.children.forEach(one => {
          this.handleDisableData(one)
        })
      }
    },

    findById (options, id) {
      const target = options.find(one => one.id === id)
      if (target) {
        return target
      }
      for (const option of options) {
        if (option.children) {
          const target2 = this.findById(option.children, id)
          if (target2) return target2
        }
      }
    },
    handleSave (data) {
      console.log(data)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  .title {
    height: 56px;
    font-weight: 500;
    color: #2d303b;
    font-size: 14px;
    line-height: 56px;
    // box-shadow:0px -1px 0px 0px rgba(228,232,243,1);
  }
  .content {
    display: flex;
    border-top: 1px solid rgba(228, 232, 243, 1);
    .left {
      padding: 16px 24px 24px 24px;
      border-right: 1px solid rgba(228, 232, 243, 1);
      flex: 1;
    }
    .right {
      width: 472px;
      padding: 24px;
      &.flex {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .no-form {
        height: auto;
      }
    }
  }
}
</style>
