<template>
   <div class="home">
      <Select-tag2  ></Select-tag2>
   </div>
</template>

<script>
import SelectTag2 from '@/components/selectTag2'
export default {
  name: 'Home',
  components: {
    SelectTag2
  },
  data () {
    return {
      options: []
    }
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.home{
  display: flex;
  justify-content: center;
}
</style>
