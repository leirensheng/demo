<template>
  <el-tree
    class="org-tree"
    :data="options"
    :expand-on-click-node="false"
    node-key="id"
    default-expand-all
    @node-drag-start="handleDragStart"
    @node-drag-enter="handleDragEnter"
    @node-drag-leave="handleDragLeave"
    @node-drag-over="handleDragOver"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
    @node-click="handleClick"
    draggable
    :allow-drop="allowDrop"
    :props="defaultProps"
    :allow-drag="allowDrag"
  >
    <span class="custom-tree-node" slot-scope="{node, data}">
      <span>{{ node.label }}</span>
      <div class="icon-group" v-if="!noAction">
        <svg-icon
          icon-class="icon_opinion_fill"
          class="icon"
          @click="() => edit(data, node)"
        ></svg-icon>
        <svg-icon
          icon-class="icon_delete"
          class="icon"
          @click="() => remove(node, data)"
        ></svg-icon>
      </div>
    </span>
  </el-tree>
</template>

<script>
export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dragParentNode: null
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    noAction: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    handleDrop () {
      if (this.dragParentNode.data.children.length === 0) {
        delete this.dragParentNode.data.children
      }
      this.dragParentNode = null
    },
    allowDrop () {
      return true
    },
    allowDrag () {
      return !this.noAction
    },

    edit (data, node) {
      this.$emit('edit', { ...data }, node)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      this.$emit('delete')
    },
    handleClick (data, node) {
      if (this.noAction) {
        return
      }
      this.$emit('node-click', data, node)
    }
  }
}
</script>
<style lang="scss" scoped>
.org-tree {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 14px;
    .icon-group {
      opacity: 0;
      display: flex;
      .icon {
        color: #c6c7ca;
        width: 16px;
        height: 16px;
        &:first-child {
          margin-right: 9px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.org-tree {
  .el-tree-node {
    &:focus {
      > .el-tree-node__content {
        .icon-group {
          opacity: 1;
        }
      }
    }
  }

  .el-tree-node__content {
    &:hover {
      .icon-group {
        opacity: 1;
      }
    }
  }
}
</style>
