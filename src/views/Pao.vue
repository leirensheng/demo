<template>
  <div class="pao">
    <div class="top">
      <div
        v-for="(one,index) in items"
        :key="one.name"
        class="item"
      >
        <div class="left">{{one.name}}</div>
        <div
          class="right-icon"
          @click="add(index)"
        >+</div>
      </div>
    </div>
    <pao></pao>
    <div class="bottom">
      <el-badge :value="num">
        <i class="el-icon-shopping-cart-1
"></i>
      </el-badge>

    </div>
  </div>
</template>

<script>
import Pao from '@/components/pao'
export default {
  data () {
    return {
      num: 0,
      items: [
        { name: '土豆' },
        { name: '黄瓜' },
        { name: '香蕉' },
        { name: '玉米' }
      ]
    }
  },
  components: {
    Pao
  },

  methods: {
    add (index) {
      const el = document.querySelectorAll('.right-icon')[index]
      const anim = this.$create(Pao)
      anim.start(el)
      anim.$on('transitionend', anim.remove)
      setTimeout(() => {
        this.num++
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.pao {
  .top {
    padding: 16px;
    .item {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .right-icon {
        cursor: pointer;
      }
    }
  }

  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 40px;
    background-color: gold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>template
