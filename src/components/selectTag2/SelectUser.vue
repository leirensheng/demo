<template>
 <div class="select-user">
    <el-input v-model="searchText" size="medium"
    placeholder="查询"
    prefix-icon="el-icon-search"
    ></el-input>
    <div class="title">请选择用户</div>
    <div class="content">
      <div v-for="one in showUsers" :key="one.id" class="one-user">
        <div class="left">
          <img :src="userImg" alt="">
          <span>{{one.name}}</span>
        </div>
        <el-checkbox class="right" :value="value.includes(one.id)" @input="(val)=>handleChange(val,one)"></el-checkbox>
      </div>
    </div>
 </div>
</template>
<script>

const userImg = require('@/assets/user.png')
export default {
  data () {
    return {
      userImg,
      searchText: ''
    }
  },
  computed: {
    showUsers () {
      return this.searchText ? this.users.filter(one => one.name.indexOf(this.searchText) !== -1) : this.users
    }
  },
  methods: {
    handleChange (isChecked, user) {
      this.$emit('change', user, isChecked)
    }
  },
  props: {
    users: {
      type: Array
    },
    value: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.select-user{
  min-width: 298px;
  padding: 16px;
  .el-input{
    margin-bottom: 12px;
  }
  .title{
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: #A7A8AD;
    margin-bottom: 4px;
  }
  .content{
    .one-user{
      padding: 6px 8px;
      height: 32px;
      display: flex;
      justify-content: space-between;
      &:hover{
        background-color: #F5F6F9;
      }
    }
  }
}
</style>
