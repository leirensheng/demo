<template>
  <div class="filter-tree">
    <el-input
      class="search"
      size="medium"
      placeholder="查询"
      v-model="filterText"
      prefix-icon="el-icon-search"
    >
    </el-input>
    <div class="title">部门列表</div>
    <el-tree
      class="tree"
       :data="options"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
      node-key="id"
      @node-click="handleNodeClick"
    >
    <span slot-scope="{ node}" class="one-node">
      <img :src="orgImg" alt="">
      <span class="text">{{node.label}}</span>
    </span>
    </el-tree>
  </div>
</template>
<script>
const orgImg = require('@/assets/org.png')

export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleNodeClick (data, node) {
      this.$emit('click-node', data, node)
    }
  },
  data () {
    return {
      orgImg,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-tree{
  min-width: 298px;
  padding: 16px;
  border-right: 1px solid #E4E8F3;

  .search{
    margin-bottom:12px;
  }
  .title{
     font-size: 14px;
     font-weight: 500;
     line-height: 20px;
     color:#A7A8AD
  }
  .tree{
    .one-node{
      display: flex;
      align-items: center;
      .text{
        font-weight: 400;
        line-height: 20px;
        font-size: 14px;
        margin-left: 2px;
      }
    }
  }
}
</style>
