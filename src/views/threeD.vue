<template>
  <div class="wrap">
    <div class="left">
      <div
        class="card"
        :class="aiIds.includes(one.id)&&'active'"
        v-for="one in testData"
        :key="one.id"
        @click="changeSelect(one)"
      >
        {{one.name}}
      </div>
    </div>
    <three-d class="right" :dropData="data"></three-d>
  </div>
</template>

<script>
import ThreeD from '@/components/3D'
let id = 1
export default {
  computed: {
    aiData () {
      return this.data[2].boxes
    },
    aiIds () {
      return this.aiData.map(one => one.id)
    }
  },
  methods: {
    changeSelect (item) {
      const i = this.aiIds.indexOf(item.id)
      if (i === -1) {
        this.aiData.push(item)
      } else {
        this.aiData.splice(i, 1)
      }
    }
  },
  data () {
    return {
      testData: [],
      // test:[{}],
      data: [
        {
          title: '扩展场景',
          boxes: []
        },
        {
          title: '自定义功能',
          boxes: []
        },
        {
          title: 'AI加持',
          boxes: []
        },
        {
          title: '基础功能',
          boxes: []
        }
      ]
    }
  },
  components: {
    ThreeD
  },
  mounted () {
    this.testData = Array.from({ length: 10 }, () => ({
      id: String(id++),
      name: Math.random().toFixed(3),
      desc: Math.random().toFixed(5)
    }))
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  .left {
    display: flex;
    flex-wrap: wrap;
    width: 384px;
    .card {
      cursor: pointer;
      margin: 10px;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid grey;
      &.active{
        border: 3px dotted red;
      }
    }
  }
  .right{
    width: calc(100% - 384px);
  }
}
</style>
