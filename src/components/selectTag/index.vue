<template>
  <div class="wrap">
    <Filter-tree class="left" @change="getTags" :value="tagIds" :options="treeOptions" :title="treeTitle"></Filter-tree>
    <Tree-tag :value="tags"  @delete="handleDelete" :title="tagTitle"></Tree-tag>
  </div>
</template>

<script>
import FilterTree from './FilterTree.vue'
import TreeTag from './TreeTag.vue'

export default {
  name: 'Home',
  components: {
    FilterTree,
    TreeTag
  },
  data () {
    return {
      tags: [],
      tagIds: []
    }
  },
  props: {
    tagTitle: {
      type: String,
      default: () => '已选部门'
    },
    treeTitle: {
      type: String,
      default: () => '部门'
    },
    treeOptions: {
      type: Array
    }
  },
  methods: {
    handleDelete (id) {
      const idx = this.tagIds.indexOf(id)
      this.tagIds.splice(idx, 1)
    },

    getTags (arr) {
      console.log(arr)
      const ids = []
      const res = []
      for (const one of arr) {
        if (ids.every(secondId => one.secondId.indexOf(secondId) !== 0)) {
          res.push(one)
          ids.push(one.secondId)
        }
      }
      this.tags = res
      this.tagIds = res.map(one => one.id)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  display: flex;
  .left{
    margin-right:20px ;
    border: 1px solid #e4e8f3;
    border-radius: 4px;  }
}
</style>
