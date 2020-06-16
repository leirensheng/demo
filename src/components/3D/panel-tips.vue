<template>
  <div class="item-tip" ref="wrap" v-show="name">
    <div class="box">
      <div class="title">{{ name }}</div>
      <div class="desc">{{ statusText }}</div>
      <div class="btn" v-if="isCustom && customPageLength !== 0 && !isCustomReady">
        <el-button type="primary" :disabled="isDeploying" @click="deploy">{{
          isDeploying ? '部署中' : '部署'
        }}</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="dot"></div>
  </div>
</template>

<script>

const interval = 10000

export default {
  data () {
    return {
      appStatus: 'ready',
      appId: this.$route.query.appKey,
      queryStatus: null
    }
  },
  watch: {
    isCustomReady: {
      immediate: true,
      handler (val) {
        console.log('emit')
        this.$emit('customStatusChange', val)
      }
    }
  },
  computed: {
    isCustom () {
      return this.name === '自定义功能'
    },
    statusText () {
      if (this.isReady) {
        return '已就绪，可预览'
      }
      const map = {
        ready: '未就绪，请先部署',
        deploying: '未就绪，部署中',
        deployed: '已就绪，可预览',
        deployFail: '未就绪，部署失败'
      }
      return this.customPageLength > 0 ? map[this.appStatus] : ''
    },
    showBtn () {
      return ['ready', 'deployFail'].includes(this.appStatus)
    },
    isDeploying () {
      return this.appStatus === 'deploying'
    },
    isReady () {
      if (this.name !== '自定义功能') {
        return true
      }
      return this.isCustomReady
    },
    isCustomReady () {
      return this.appId ? this.appStatus === 'deployed' : true
    }
  },
  methods: {
    async getApplicationDetail () {
      // const res = await getApplicationDetail(this.appId)
      this.appStatus = Math.random() - 0.5 > 0 ? 'deployed' : 'deploying'
      if (this.appStatus === 'deploying') {
        this.queryStatus = setTimeout(() => {
          this.getApplicationDetail()
        }, interval)
      }
    },
    async deploy () {
      try {
        this.appStatus = 'deploying'
        // await deploy({ id: this.appId })
        this.queryStatus = setTimeout(() => {
          this.getApplicationDetail()
        }, interval)
      } catch (e) {
        this.appStatus = 'ready'
      }
    }
  },
  mounted () {
    this.getApplicationDetail()
  },
  activated () {
    this.getApplicationDetail()
  },
  destroyed () {
    clearTimeout(this.queryStatus)
  },
  props: {
    name: {
      type: String,
      default: () => ''
    },
    customPageLength: {
      type: Number,
      default: () => 0
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
    width: 200px;
    padding: 20px;
    .title {
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .desc {
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      opacity: 0.7;
    }
    .btn {
      margin-top: 21px;
      margin-bottom: 6px;
      button {
        border: 1px solid white;
      }
    }
  }
  .line {
    position: absolute;
    bottom: -30px;
    left: 57px;
    height: 30px;
    width: 3px;
    background-color: #2460e0;
  }
  .dot {
    position: absolute;
    bottom: -30px;
    width: 13px;
    height: 13px;
    left: 52px;
    border-radius: 50%;
    background-color: #2460e0;
  }
}
</style>
