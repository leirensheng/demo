<template>
   <div class="home">
      <Select-tag :tree-options="options" tree-title="部门" tag-title="已选部门"></Select-tag>
   </div>
</template>

<script>
import SelectTag from '@/components/selectTag'
import options from './components/options'
export default {
  name: 'Home',
  components: {
    SelectTag
  },
  data () {
    return {
      options: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.options = options
    }, 200)
  }
}
</script>
<style lang="scss" scoped>
.home{
  display: flex;
  justify-content: center;
}
</style>
