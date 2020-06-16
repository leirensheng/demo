<template>
  <div class="item-tip" ref="wrap" v-if="item.name">
    <div class="box" v-if="!noDesc">
      <div class="left">
        <img :src="item.cover || defaultCover" alt="" />
      </div>
      <div class="right">
        <div class="title">{{ item.name }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>

    <div v-if="noDesc" class="box">{{ item.name }}</div>
    <div class="line" :style="lineStyle"></div>
    <div class="dot" :style="dotStyle"></div>
  </div>
</template>

<script>
const defaultCover = require('@/assets/image/no_attention.png')

export default {
  data () {
    return {
      defaultCover
    }
  },
  computed: {
    dotStyle () {
      if (this.type === 'right') {
        return {
          left: '-36.5px',
          top: '50%',
          transform: 'translate(0, -50%)'
        }
      } else if (this.type === 'top') {
        return {
          left: 'calc(50% - 6.5px)',
          bottom: '-36.5px'
        }
      } else {
        return {
          right: '-36.5px',
          top: '50%',
          transform: 'translate(0, -50%)'
        }
      }
    },
    lineStyle () {
      if (this.type === 'right') {
        return {
          width: '30px',
          height: '3px',
          left: '-30px',
          top: '50%',
          transform: 'translate(0, -50%)'
        }
      } else if (this.type === 'top') {
        return {
          left: 'calc(50% - 1.5px)',
          width: '3px',
          height: '30px',
          bottom: '-30px'
        }
      } else {
        return {
          width: '30px',
          height: '3px',
          right: '-30px',
          top: '50%',
          transform: 'translate(0, -50%)'
        }
      }
    }
  },
  watch: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    noDesc: {
      type: Boolean,
      default: () => false
    },
    type: {
      type: String,
      default: 'top'
    }
  }
}
</script>

<style lang="scss" scoped>
.item-tip {
  // transition: left linear 0.3s;
  border-radius: 4px;
  position: absolute;
  color: white;
  background-color: #2460e0;
  .box {
    display: flex;
    padding: 20px;
    max-width: 250px;
    .left {
      img {
        height: 40px;
        width: 40px;
        border-radius: 4px;
      }
      margin-right: 12px;
    }
    .right {
      .title {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
      }
      .desc {
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        opacity: 0.7;
      }
    }
  }
  .line {
    position: absolute;
    background-color: #2460e0;
  }
  .dot {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: #2460e0;
  }
}
</style>
