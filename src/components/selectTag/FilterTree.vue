<template>
  <div class="filter-tree">
    <div class="title" v-if="title">{{title}}</div>
    <el-input
      class="search"
      size="medium"
      placeholder="查询"
      v-model="filterText"
      prefix-icon="el-icon-search"
    >
    </el-input>
    <div class="sub-title" v-if="subTitle">{{subTitle}}</div>
    <el-tree
      class="tree"
      show-checkbox
      :data="options"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
      node-key="id"
      @check-change="handleCheckChange"
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
    value: {
      deep: true,
      handler (val) {
        this.setCheckedKeys(val)
      }
    },
    'options.length' () {
      this.addSecondName(this.options)
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    },
    subTitle: {
      type: String,
      default: () => ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    addSecondName (options, secondName, parenIds = []) {
      options.forEach(one => {
        one.secondName = secondName ? secondName + '/' + one.name : one.name
        one.parenIds = parenIds
        one.secondId = [...parenIds, one.id].join('/')
        if (one.children) {
          this.addSecondName(one.children, one.secondName, [...one.parenIds, one.id])
        }
      })
    },
    getCheckedKeys () {
      return this.$refs.tree.getCheckedKeys()
    },
    getCheckedNodes () {
      return this.$refs.tree.getCheckedNodes()
    },
    setCheckedKeys (val) {
      this.$refs.tree.setCheckedKeys(val)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleCheckChange (data, checked, indeterminate) {
      clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        const res = this.getCheckedNodes()
        this.$emit('change', res)
      }, 200)
    }
  },
  data () {
    return {
      orgImg,
      timmer: null,
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
  min-width: 306px;
  padding: 16px;
  // border: 1px solid #E4E8F3;
  // border-radius: 4px;
  .title{
     font-size: 14px;
     font-weight: 500;
     line-height: 20px;
     margin-bottom: 12px;
  }
  .sub-title{
    font-size: 14px;
     font-weight: 500;
     line-height: 20px;
     color: #A7A8AD;
  }
  .search{
    margin-bottom:12px;
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
