<template>
  <div class="tree-tag">
    <div class="title">{{title}} （{{length}}）</div>
    <div class="content">
      <div
        class="tag"
        v-for="one in value"
        :key="one.id"
        :class="curTag===one.id && 'active'"
        @mouseenter="handleClick(one)"
        @click="handleClick(one)"
      >

        <div class="left">
          <img :src="one.type!=='user'?orgImg:userImg" alt="">
          {{one.type==='user'? one.name:one.secondName}}
          </div>
        <i class="el-icon-close" v-if="curTag===one.id " @click="handleClose(one.id, one.type)"></i>
      </div>
    </div>

  </div>
</template>
<script>
const orgImg = require('@/assets/org.png')
const userImg = require('@/assets/user.png')

export default {
  data () {
    return {
      curTag: '',
      orgImg,
      userImg
    }
  },
  computed: {
    length () {
      return this.value.length
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
    }
  },
  methods: {
    handleClose (id, type) {
      this.$emit('delete', id, type)
    },
    handleClick (tag) {
      this.curTag = tag.id
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-tag {
  border: 1px solid #e4e8f3;
  padding: 16px;
  border-radius: 4px;
  min-width: 306px;
  .title {
    color: #2d303b;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 12px;
  }
  .content {
    .tag {
      // box-sizing: border-box;
      font-weight: 400;
      font-size: 14px;
      color: #2D303B;
      height: 32px;
      cursor: pointer;
      padding: 6px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        font-weight: 400;
        line-height: 20px;
        font-size: 14px;
        img{
          margin-right: 2px;
        }
      }
      &.active{
        background-color: #F5F6F9;
      }

    }

  }
}
</style>
