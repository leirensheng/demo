<template>
  <div id="panel">
    <div ref="text-ture" class="three-wrapper"></div>

    <item-tips
      :style="tipStyle"
      :item="curItemData"
      :type="itemType"
      :no-desc="isCustom"
      ref="itemTips"
      class="item-tips"
    ></item-tips>

    <panel-tips
      :style="tipStyle"
      :name="curShowTipsPanelName"
      ref="panelTips"
      :custom-page-length="customData.length"
      class="item-tips"
      @customStatusChange="customStatusChange"
    ></panel-tips>
  </div>
</template>

<script>
/* eslint-disable global-require */
import * as THREE from 'three'
import ItemTips from './item-tips.vue'
import PanelTips from './panel-tips.vue'
import bus from '@/utils/bus'
const customBlueHaveData = require('@/assets/image/custom_highlight_0.png')
const customBlueNoData = require('@/assets/image/custom_highlight_1.png')
const customRedHaveData = require('@/assets/image/custom_0_red.png')
const customRedNoData = require('@/assets/image/custom_1_red.png')
const customGreyNoData = require('@/assets/image/custom_1.png')
const customGreyHaveData = require('@/assets/image/custom_0.png')

const images = {
  basic: {
    highlight: {
      haveData: require('@/assets/image/basic_highlight_0.png'),
      noData: require('@/assets/image/basic_highlight_1.png')
    },
    noHighlight: {
      haveData: require('@/assets/image/basic_0.png'),
      noData: require('@/assets/image/basic_1.png')
    }
  },
  extent: {
    highlight: {
      haveData: require('@/assets/image/extent_highlight_0.png'),
      noData: require('@/assets/image/extent_highlight_1.png')
    },
    noHighlight: {
      haveData: require('@/assets/image/extent_0.png'),
      noData: require('@/assets/image/extent_1.png')
    }
  },
  custom: {
    highlight: {
      haveData: customBlueHaveData,
      noData: customBlueNoData
    },
    noHighlight: {
      haveData: customGreyHaveData,
      noData: customGreyNoData
    }
  },
  ai: {
    highlight: {
      haveData: require('@/assets/image/ai_highlight_0.png'),
      noData: require('@/assets/image/ai_highlight_1.png')
    },
    noHighlight: {
      haveData: require('@/assets/image/ai_0.png'),
      noData: require('@/assets/image/ai_1.png')
    }
  }
}
export default {
  name: 'three-3d-view',
  components: {
    ItemTips,
    PanelTips
  },
  data () {
    return {
      images: images,
      oneRowLength: {
        custom: 2,
        extent: 2,
        ai: 2
      },
      appId: this.$route.query.appKey,
      dom: '',
      renderer: null,
      renderWidth: '',
      renderHeight: '',
      scene: '',
      camera: '',
      width: 900, // 最大面板大小
      height: 600, // 最大面板大小
      depth: 15, // 最大面板大小
      itemTopRatio: 2 / 3,
      isSmaller: false,
      curItemGroup: null,
      curItemData: {},
      distance: 150,
      color: '#F0F2F5',
      tipStyle: {
        top: 0,
        left: 0
      },
      topGroup: null,
      bottomGroup: null,
      customHoverColor: '#E1D8DB',
      hoverPanel: ['basic-panel', 'extent-panel', 'custom-panel', 'ai-panel'],
      timmer: null,
      isShowLeft: false,
      currentMesh: null, // 当前鼠标所在的mesh
      panelLeftColor: '#CFD2D8',
      panelLeftHoverColor: '#D1DCF6',
      curShowTipsPanel: '',
      hasHightLightPanels: [],
      defaultItemConfig: {
        top: { circle: '#BABFC9', side: '#F0F2F5' },
        color: '#6A6C73',
        bottom: {
          left: '#CFD2D8',
          front: '#BABFC9',
          top: '#F0F2F5'
        }
      },
      isCustomReady: false,
      itemType: 'top'
    }
  },
  computed: {
    extentData () {
      return this.dropData.find(one => one.title === '扩展场景').boxes
    },
    customData () {
      return this.dropData.find(one => one.title === '自定义功能').boxes
    },
    aiData () {
      return this.dropData.find(one => one.title === 'AI加持').boxes
    },
    basicData () {
      return this.dropData.find(one => one.title === '基础功能').boxes
    },
    panelX () {
      return this.height
    },
    panelZ () {
      return (this.panelX * 3) / 7
    },
    itemWidth () {
      return {
        custom:
          (this.panelZ -
            this.topPanelPadding.custom * 2 -
            (this.oneRowLength.custom - 1) * this.itemMargin.custom) /
          this.oneRowLength.custom,
        ai:
          (this.panelZ -
            this.topPanelPadding.ai * 2 -
            (this.oneRowLength.ai - 1) * this.itemMargin.ai) /
          this.oneRowLength.ai,
        extent:
          (this.panelZ -
            this.topPanelPadding.extent * 2 -
            (this.oneRowLength.extent - 1) * this.itemMargin.extent) /
          this.oneRowLength.extent,
        basic: (this.height * 4) / 25
      }
    },
    topPanelPadding () {
      const map = {
        2: 20,
        3: 15,
        4: 10
      }
      return {
        extent: map[this.oneRowLength.extent],
        custom: map[this.oneRowLength.custom],
        ai: map[this.oneRowLength.ai],
        basic: 10
      }
    },
    itemMargin () {
      const map = {
        2: 20,
        3: 15,
        4: 10
      }
      return {
        extent: map[this.oneRowLength.extent],
        custom: map[this.oneRowLength.custom],
        ai: map[this.oneRowLength.ai],
        basic: 20
      }
    },
    itemTopHeight () {
      return {
        extent: (this.itemWidth.extent * 2) / 9,
        custom: (this.itemWidth.custom * 2) / 9,
        ai: (this.itemWidth.ai * 2) / 9,
        basic: (this.itemWidth.ai * 2) / 9
      }
    },
    isCustom () {
      return this.curItemGroup && this.curItemGroup.children[0].name.indexOf('custom') !== -1
    },
    curShowTipsPanelName () {
      const map = {
        'basic-panel': '基础功能',
        'extent-panel': '扩展场景',
        'custom-panel': '自定义功能',
        'ai-panel': 'AI加持'
      }
      return map[this.curShowTipsPanel] || ''
    }
  },
  watch: {
    extentData: {
      deep: true,
      handler (val) {
        this.handleDataChange(val, 'extent')
      }
    },
    customData: {
      deep: true,
      handler (val) {
        this.handleDataChange(val, 'custom')
      }
    },
    aiData: {
      deep: true,
      handler (val) {
        this.handleDataChange(val, 'ai')
      }
    },
    basicData: {
      deep: true,
      handler (val) {
        this.handleDataChange(val, 'basic')
      }
    },
    'basicData.length' (val, old) {
      this.handleLengthChange(val, old, 'basic-panel')
    },
    'aiData.length' (val, old) {
      this.handleLengthChange(val, old, 'ai-panel')
    },
    'extentData.length' (val, old) {
      this.handleLengthChange(val, old, 'extent-panel')
    },
    'customData.length' (val, old) {
      this.handleLengthChange(val, old, 'custom-panel')
    },
    hasHightLightPanels: {
      deep: true,
      handler (val) {
        const noHightLights = this.hoverPanel.filter(one => !val.includes(one))
        noHightLights.forEach(one => {
          this.setPanelStatus(one, false)
        })
        val.forEach(one => {
          this.setPanelStatus(one, true)
        })
      }
    }
  },
  mounted () {
    this.init()
    this.handleResize()
    bus.$on('change3DPosition', () => {
      this.handleResize(null, true)
    })
  },
  activated () {
    window.addEventListener('resize', this.handleResize)
    bus.$on('change3DPosition', () => {
      this.handleResize(null, true)
    })
  },
  deactivated () {
    window.removeEventListener('resize', this.handleResize)
    bus.$off('change3DPosition')
  },
  props: {
    dropData: {
      type: Array
    }
  },
  methods: {
    customStatusChange (isReady) {
      this.images.custom = {
        highlight: {
          haveData: isReady ? customBlueHaveData : customRedHaveData,
          noData: isReady ? customBlueNoData : customRedNoData
        },
        noHighlight: {
          haveData: isReady ? customGreyHaveData : customRedHaveData,
          noData: isReady ? customGreyNoData : customRedNoData
        }
      }
      this.isCustomReady = isReady
      this.scene && this.setPanelStatus('custom-panel')
      this.curShowTipsPanel === 'custom-panel' && this.getPanelTipsPosition(this.curShowTipsPanel)
    },
    handleLengthChange (val, old, panel) {
      if ((val === 0 && old > 0) || (val > 0 && old === 0)) {
        this.setPanelStatus(panel)
      }
    },

    handleDataChange (val, type) {
      this.resetCurPanel()
      this.resetCurItem()
      const oldItems = this.removeAllItems(type)
      if (type !== 'basic') {
        const oldLength = this.oneRowLength[type]
        this.oneRowLength[type] = val.length > 8 ? 3 : 2
        const isChangeLength = oldLength !== this.oneRowLength[type]
        val.forEach((one, i) => {
          const target = isChangeLength
            ? null
            : oldItems.find(oldItem => oldItem.name.indexOf(one.id) !== -1)
          this.addToTopPanel(type, one.id, target, i + 1)
        })
      } else {
        const value = [...val].reverse()
        value.forEach((one, i) => {
          const target = oldItems.find(oldItem => oldItem.name.indexOf(one.id) !== -1)
          this.addToBottomPanel(one.id, target, i + 1)
        })
      }
    },
    removeAllItems (name) {
      const group = this.scene.getObjectByName(`${name}-group`)
      const items = group.children.slice(1)
      group.children = [group.children[0]]
      return items
    },
    getRenderer () {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(this.renderWidth, this.renderHeight)
      this.renderer.setClearColor(0xffffff) // 设置背景颜色
      this.dom.appendChild(this.renderer.domElement)
    },
    getRenderSize () {
      this.renderWidth = this.dom.clientWidth
      this.renderHeight = this.dom.clientHeight
    },
    getScene () {
      this.scene = new THREE.Scene(0xffffff)
      this.scene.background = new THREE.Color()
    },
    getCamera () {
      const k = this.renderWidth / this.renderHeight
      const s = this.getS(k)
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 2000)

      this.camera.position.set(800, 800, 800)
      this.camera.lookAt(this.scene.position)
    },
    addAxisHelper () {
      this.scene.add(new THREE.AxesHelper(650))
    },
    addLight () {
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(500, 950, 700)
      this.scene.add(light)
      // 环境光
      const ambient = new THREE.AmbientLight(0x444444)
      this.scene.add(ambient)
    },
    getBasicGroup () {
      const basicGroup = new THREE.Group()
      basicGroup.name = 'basic-group'
      const loader = new THREE.TextureLoader()
      loader.setCrossOrigin('Anonymous')
      const basicTexture = loader.load(this.images.basic.noHighlight.noData)
      const box = new THREE.BoxGeometry(this.height, this.depth, this.width)
      const material = this.createMaterialWithTexture('top', basicTexture, this.basiColor)
      const mesh = new THREE.Mesh(box, material)
      mesh.name = 'basic-panel'
      basicGroup.add(mesh)
      basicGroup.position.set(0, -this.distance / 2, 0)
      return basicGroup
    },
    getTopGroup () {
      const topGroup = new THREE.Group()
      topGroup.name = 'top-group'

      const box = new THREE.BoxGeometry(this.height, this.depth, this.panelZ)
      const loader = new THREE.TextureLoader()
      loader.setCrossOrigin('Anonymous')

      const types = ['extent', 'custom', 'ai']
      const typePositionMap = {
        extent: [0, 0, (this.width - this.panelZ) / 2],
        custom: [0, 0, 0],
        ai: [0, 0, -(this.width - this.panelZ) / 2]
      }
      types.forEach(type => {
        const group = new THREE.Group()
        group.name = `${type}-group`
        const texture = loader.load(this.images[type].noHighlight.noData)
        const material = this.createMaterialWithTexture('top', texture, this.color)
        const panel = new THREE.Mesh(box, material)
        panel.name = `${type}-panel`
        group.add(panel)
        group.position.set(...typePositionMap[type])
        topGroup.add(group)
      })
      topGroup.position.set(0, this.distance / 2, 0)
      return topGroup
    },
    smaller () {
      this.resetCurPanel()
      this.resetCurItem()
      this.move()
    },
    move (isRecover = false) {
      const direction = isRecover ? -1 : 1
      const time = 20
      const top = this.scene.getObjectByName('top-group')
      const originTopX = this.bottomGroup.position.x
      const xDistance = this.height / 2 + this.height / 2 / 3
      const zDistance = this.width / 4 - this.width / 2 / 4
      const scaleDistance = 0.5
      const condition = isRecover
        ? top.position.x < originTopX
        : top.position.x > originTopX - xDistance
      if (condition) {
        top.translateX((-direction * xDistance) / time)
        top.translateZ((-direction * zDistance) / time)
        const curScale = top.scale.x - (direction * scaleDistance) / time
        top.scale.set(curScale, curScale, curScale)
        window.requestAnimationFrame(() => this.move(isRecover))
      } else {
        this.isSmaller = !isRecover
        this.$emit('moveDone')
      }
    },
    recover () {
      this.resetCurPanel()
      this.resetCurItem()
      this.move(true)
    },

    getTopMaterial () {
      const option = {
        color: '#F0F2F5'
      }
      return [new THREE.MeshBasicMaterial({ color: '#BABFC9' }), new THREE.MeshBasicMaterial(option)]
    },
    getItem (id, panelName) {
      const itemGroup = new THREE.Group()
      itemGroup.name = `${id}-${panelName}`

      const width = this.itemWidth[panelName]
      const itemBottom = new THREE.BoxGeometry(width, width, width)
      const cubeMaterial = Array.from(
        { length: 6 },
        () => new THREE.MeshBasicMaterial({ color: 'white' })
      )
      const topMaterial = this.getTopMaterial()

      const itemTop = new THREE.CylinderGeometry(
        (width * this.itemTopRatio) / 2,
        (width * this.itemTopRatio) / 2,
        this.itemTopHeight[panelName],
        25
      )
      const bottomMesh = new THREE.Mesh(itemBottom, cubeMaterial)
      const config = {
        top: { circle: '#BABFC9', side: '#F0F2F5' },
        color: '#6A6C73',
        bottom: {
          left: '#CFD2D8',
          front: '#BABFC9',
          top: '#F0F2F5'
        }
      }

      const topMesh = new THREE.Mesh(itemTop, topMaterial)
      topMesh.name = `${id}-top-${panelName}`
      bottomMesh.name = `${id}-bottom-${panelName}`

      topMesh.translateY(width / 2 + 20 / 2)
      itemGroup.add(bottomMesh, topMesh)
      this.setItemColor(itemGroup, config)
      return itemGroup
    },
    addToTopPanel (panelName, id, item, order) {
      const direction = -1
      let isAsync = false
      if (!item) {
        item = this.getItem(id, panelName)
        isAsync = true
      } else {
        item.position.set(0, 0, 0)
      }
      const group = this.scene.getObjectByName(`${panelName}-group`)

      const oneRowLength = this.oneRowLength[panelName]
      const rowX = Math.floor((order - 1) / oneRowLength) + 1
      const rowZ = order % oneRowLength ? order % oneRowLength : oneRowLength
      const width = this.itemWidth[panelName]
      const topPanelPadding = this.topPanelPadding[panelName]
      const itemMargin = this.itemMargin[panelName]

      const translateZ =
        (this.panelZ / 2 - topPanelPadding - (rowZ - 1) * (width + itemMargin) - width / 2) *
        direction
      const translateX = -(
        this.panelX / 2 -
        topPanelPadding -
        (rowX - 1) * (width + itemMargin) -
        width / 2
      )

      item.translateZ(translateZ)
      item.translateY(width / 2)
      item.translateX(translateX)
      if (isAsync) {
        setTimeout(() => {
          group.add(item)
        }, 0)
      } else {
        group.add(item)
      }
    },
    addToBottomPanel (id, item, order) {
      const padding = 20
      const margin = 20
      let isAsync = false
      if (!item) {
        item = this.getItem(id, 'basic')
        isAsync = true
      } else {
        item.position.set(0, 0, 0)
      }
      const group = this.bottomGroup

      const rowZ = Math.floor((order - 1) / 4) + 1
      const rowX = order % 4 || 4
      const width = this.itemWidth.basic

      const translateZ = this.width / 2 - padding - (rowZ - 1) * (width + margin) - width / 2
      const translateX = this.height / 2 - padding - (rowX - 1) * (width + margin) - width / 2

      item.translateZ(translateZ)
      item.translateY(width / 2)
      item.translateX(-translateX)
      if (isAsync) {
        setTimeout(() => {
          group.add(item)
        }, 0)
      } else {
        group.add(item)
      }
    },
    resetCurItem () {
      this.curItemGroup && this.setItemColor(this.curItemGroup, this.defaultItemConfig)
      this.curItemData = {}
      this.curItemGroup = null
    },
    resetCurPanel () {
      this.curShowTipsPanel = ''
      if (this.hasHightLightPanels.length) {
        this.hasHightLightPanels = []
      }
    },
    getItemAllParts (group, name) {
      const arr = ['extent', 'custom', 'ai']
      const idx = arr.indexOf(name)
      const items =
        name === 'basic' ? group.children.slice(1) : group.children[idx].children.slice(1)
      const panel = name === 'basic' ? group.children[0] : group.children[idx].children[0]
      return {
        itemParts: items.reduce((prev, cur) => [...prev, ...cur.children], []),
        panel
      }
    },
    render () {
      this.renderer.render(this.scene, this.camera) // 执行渲染操作
      requestAnimationFrame(this.render)
    },
    changeItemColor (itemGroup) {
      if (this.curItemGroup) {
        this.setItemColor(this.curItemGroup, this.defaultItemConfig)
      }
      const config = {
        top: { side: '#DEE7FB', circle: '#C6D4F2' },
        color: '#2460E0',
        bottom: {
          left: '#D1DCF5',
          front: '#C6D4F2',
          top: '#DEE7FB'
        }
      }
      this.setItemColor(itemGroup, config)
      this.curItemGroup = itemGroup
    },
    setItemColor (itemGroup, config) {
      const {
        bottom: { top: topColor, front: frontColor, left: leftColor },
        color,
        top: { side: sideColor, circle: circleColor }
      } = config
      const [id, type] = itemGroup.name.split('-')
      const width = this.itemWidth[type]
      const bottomMaterial = itemGroup.children[0].material
      const topMaterial = itemGroup.children[1].material

      bottomMaterial[0].color.set(frontColor)
      bottomMaterial[2].color.set(topColor)
      const text = this[`${type}Data`].find(one => one.id === id).name
      const canvas = this.getTextCanvas({
        text,
        color,
        backgroundColor: leftColor,
        width,
        height: width
      })
      if (!bottomMaterial[4].map) {
        const faceText = new THREE.TextureLoader().load(canvas.toDataURL('image/png'))
        bottomMaterial[4].map = faceText
      } else {
        const image = new Image()
        image.src = canvas.toDataURL('image/png')
        image.onload = () => {
          bottomMaterial[4].map.image = image
          bottomMaterial[4].map.needsUpdate = true
        }
      }

      topMaterial[0].color.set(circleColor)
      topMaterial[1].color.set(sideColor)
    },
    addClickEvent (topGroup, basicGroup) {
      this.dom.addEventListener(
        'click',
        () => {
          if (this.currentMesh) {
            const topPanelName = ['ai', 'extent', 'custom']
            const targetName = this.currentMesh.name
            const [id, , type] = targetName.split('-')
            const isClickTop = topPanelName.some(name => targetName.indexOf(name) !== -1)
            const isClickBottom = targetName.indexOf('basic') !== -1
            const isClickItem = targetName.indexOf('panel') === -1
            const itemGroup = isClickItem && this.scene.getObjectByName(`${id}-${type}`)
            let showImmediately = true
            if (!this.isSmaller && isClickBottom) {
              showImmediately = false
              this.smaller()
            } else if (this.isSmaller && isClickTop) {
              showImmediately = false
              this.recover()
            } else {
              showImmediately = true
            }
            if (isClickItem) {
              if (itemGroup !== this.curItemGroup) {
                this.changeItemColor(itemGroup)
                if (showImmediately) {
                  this.showTips(targetName)
                } else {
                  this.$on('moveDone', () => {
                    this.showTips(targetName)
                    this.$off('moveDone')
                  })
                }
              }
            } else if (showImmediately) {
              targetName !== this.curShowTipsPanel && this.showPanelTips(targetName)
            } else {
              this.$on('moveDone', () => {
                targetName !== this.curShowTipsPanel && this.showPanelTips(targetName)
                this.$off('moveDone')
              })
            }
          } else {
            this.resetCurPanel()
            this.resetCurItem()
          }
        },
        false
      )
      this.dom.addEventListener(
        'mousemove',
        e => {
          e.preventDefault()
          const { left, top } = this.dom.getBoundingClientRect()
          const raycaster = new THREE.Raycaster() // 光线投射器
          const mouse = new THREE.Vector2() // 二维向量
          mouse.x = ((e.clientX - left) / this.dom.offsetWidth) * 2 - 1
          mouse.y = -((e.clientY - top) / this.dom.offsetHeight) * 2 + 1
          raycaster.setFromCamera(mouse, this.camera)
          const { panel: extentPanel, itemParts: extentItemParts } = this.getItemAllParts(
            topGroup,
            'extent'
          )
          const { panel: customPanel, itemParts: customItemParts } = this.getItemAllParts(
            topGroup,
            'custom'
          )
          const { panel: aiPanel, itemParts: aiItemParts } = this.getItemAllParts(topGroup, 'ai')
          const { panel: basicPanel, itemParts: basicItemParts } = this.getItemAllParts(
            basicGroup,
            'basic'
          )
          const intersects = raycaster.intersectObjects(
            [
              ...extentItemParts,
              ...customItemParts,
              ...aiItemParts,
              ...basicItemParts,
              extentPanel,
              customPanel,
              aiPanel,
              basicPanel
            ],
            true
          )
          let index = -1
          if (this.curShowTipsPanel) {
            index = this.hasHightLightPanels.indexOf(this.curShowTipsPanel)
          }
          if (intersects.length > 0) {
            const currentMesh = intersects[0].object
            this.currentMesh = currentMesh

            // 移动到面板
            if (this.hoverPanel.includes(currentMesh.name)) {
              const panelName = currentMesh.name
              if (!this.hasHightLightPanels.includes(panelName)) {
                const needToDeleteIdx = this.hasHightLightPanels.findIndex(
                  one => one !== this.curShowTipsPanel
                )
                this.hasHightLightPanels.splice(
                  needToDeleteIdx,
                  needToDeleteIdx === -1 ? 0 : 1,
                  panelName
                )
              } else if (this.curShowTipsPanel === panelName) {
                this.removeNoTipHight(index)
              }
            } else {
              this.removeNoTipHight(index)
            }
          } else {
            this.currentMesh = null
            this.removeNoTipHight(index)
          }
        },
        false
      )
    },
    removeNoTipHight (index) {
      if (index === -1) {
        this.resetCurPanel()
      } else if (this.hasHightLightPanels.length === 2) {
        const idx = index === 1 ? 0 : 1
        this.hasHightLightPanels.splice(idx, 1)
      }
    },

    showTips (name, id, type) {
      this.resetCurPanel()
      if (!id) {
        [id, , type] = name.split('-')
      }
      const topName = `${id}-top-${type}`
      this.tipStyle = {
        top: 0,
        left: 0,
        opacity: 0
      }
      this.curItemData = this[`${type}Data`].find(one => one.id === id)
      setTimeout(() => {
        this.getTipsPosition(topName)
      }, 20)
    },
    getTipsPosition (topName) {
      const topItem = this.scene.getObjectByName(topName)
      const position = new THREE.Vector3()
      topItem.getWorldPosition(position)
      const res = this.transPosition(position)
      const boxHeight = this.$refs.itemTips.$refs.wrap.clientHeight
      const boxWidth = this.$refs.itemTips.$refs.wrap.clientWidth
      const canShowTop =
        boxHeight + 30 < res.y && res.x + boxWidth / 2 < this.renderWidth && boxWidth / 2 < res.x
      let canShowRight = true
      if (!canShowTop) {
        canShowRight = res.x + 30 + boxWidth < this.renderWidth
      }

      if (canShowTop) {
        this.itemType = 'top'
        this.tipStyle = {
          top: `${res.y - boxHeight - 37}px`,
          left: `${res.x - boxWidth / 2}px`,
          opacity: 1
        }
      } else if (canShowRight) {
        this.itemType = 'right'
        this.tipStyle = {
          top: `${res.y - boxHeight / 2 - 10}px`,
          left: `${res.x + 30}px`,
          opacity: 1
        }
      } else {
        this.itemType = 'left'
        this.tipStyle = {
          top: `${res.y - boxHeight / 2 - 10}px`,
          left: `${res.x - boxWidth - 30}px`,
          opacity: 1
        }
      }
    },
    showPanelTips (name) {
      this.tipStyle = {
        top: 0,
        left: 0,
        opacity: 0
      }
      if (!this.hasHightLightPanels.includes(name)) {
        this.hasHightLightPanels.push(name)
      }
      this.resetCurItem()
      this.curShowTipsPanel = name
      this.hasHightLightPanels = [name]
      this.getPanelTipsPosition(name)
    },
    getPanelTipsPosition (name) {
      setTimeout(() => {
        const panel = this.scene.getObjectByName(name)
        const position = new THREE.Vector3()
        panel.getWorldPosition(position)
        position.x += (this.height / 2) * 0.8
        const res = this.transPosition(position)
        const itemTipHeight = this.$refs.panelTips.$refs.wrap.clientHeight + 30
        this.tipStyle = {
          top: `${res.y - itemTipHeight}px`,
          left: `${res.x - 58}px`,
          opacity: 1
        }
      }, 20)
    },
    getS (k) {
      if (k >= 1.09) {
        return 480
      } else if (k > 0.91) {
        return 600
      } else if (k > 0.85) {
        return 650
      } else {
        return 700
      }
    },
    handleResize (e, showImmediately) {
      this.tipStyle.opacity = 0
      const leftWidth = this.isShowLeft ? 408 : 104
      this.renderWidth = window.innerWidth - leftWidth
      this.renderHeight = window.innerHeight - 136
      this.renderer.setSize(this.renderWidth, this.renderHeight)
      const k = this.renderWidth / this.renderHeight
      const s = this.getS(k)
      this.camera.left = -s * k
      this.camera.right = s * k
      this.camera.top = s
      this.camera.bottom = -s
      this.camera.updateProjectionMatrix()

      if (showImmediately) {
        this.reShowTips()
      } else {
        clearTimeout(this.timmer)
        this.timmer = setTimeout(() => {
          this.reShowTips()
        }, 1000)
      }
    },
    reShowTips () {
      if (this.curItemGroup) {
        const [id, type] = this.curItemGroup.name.split('-')
        this.showTips('', id, type)
      } else if (this.curShowTipsPanel) {
        this.showPanelTips(this.curShowTipsPanel)
      }
    },
    init () {
      this.dom = this.$refs['text-ture']
      this.getRenderSize()
      this.getRenderer()
      this.getScene()
      this.getCamera()
      // this.addController();
      // this.addAxisHelper();
      // this.addLight();
      this.bottomGroup = this.getBasicGroup()
      this.topGroup = this.getTopGroup()

      this.scene.add(this.topGroup, this.bottomGroup)
      this.addClickEvent(this.topGroup, this.bottomGroup)
      window.addEventListener('resize', this.handleResize)
      this.render()
    },
    transPosition (position) {
      const worldVector = new THREE.Vector3(position.x, position.y, position.z)
      const vector = worldVector.project(this.camera)
      const halfWidth = this.renderWidth / 2
      const halfHeight = this.renderHeight / 2
      return {
        x: Math.round(vector.x * halfWidth + halfWidth),
        y: Math.round(-vector.y * halfHeight + halfHeight)
      }
    },
    // 设置小方块的名称贴图canvas
    getTextCanvas ({ text, width, height, color, dom, backgroundColor }) {
      const canvas = dom || document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)
      ctx.font = '30px Verdana'
      ctx.fillStyle = color // '#000000';
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      this.drawTextOnCanvas(ctx, text, width, height)
      return canvas
    },
    // 在canvas上绘制文字
    drawTextOnCanvas (context, text, width, height) {
      const result = this.breakLinesForCanvas(text, 60, '15px 微软雅黑', context)
      let lineHeight = 30
      let drawText = result
      // 最多三行，每行四个字符
      if (result.length >= 3) {
        drawText = result.splice(0, 3)
        if (drawText[2].length >= 3) {
          drawText[2] = `${drawText[2].slice(0, 2)}...`
        }
      }
      drawText.forEach((line, index) => {
        if (drawText.length === 1) {
          context.font = '25px Verdana'
          context.fillText(line, width / 2, height / 2)
        } else if (drawText.length === 2) {
          context.textAlign = 'start'
          context.font = '20px Verdana'
          lineHeight = 20
          context.fillText(line, 10, lineHeight * index + 25)
        } else {
          context.textAlign = 'start'
          context.font = '16px Verdana'
          lineHeight = 20
          context.fillText(line, 10, lineHeight * index + 25)
        }
      })
    },
    // 寻找切换断点
    findBreakPoint (text, width, context) {
      let min = 0
      let max = text.length - 1

      while (min <= max) {
        const middle = Math.floor((min + max) / 2)
        const middleWidth = context.measureText(text.substr(0, middle)).width
        const oneCharWiderThanMiddleWidth = context.measureText(text.substr(0, middle + 1)).width
        if (middleWidth <= width && oneCharWiderThanMiddleWidth > width) {
          return middle
        }
        if (middleWidth < width) {
          min = middle + 1
        } else {
          max = middle - 1
        }
      }

      return -1
    },
    //  canvas文字换行
    breakLinesForCanvas (text, width, font, context) {
      const result = []
      let breakPoint = 0

      if (font) {
        context.font = font
      }

      while ((breakPoint = this.findBreakPoint(text, width, context)) !== -1) {
        result.push(text.substr(0, breakPoint))
        text = text.substr(breakPoint)
      }

      if (text) {
        result.push(text)
      }

      return result
    },
    /*
    //  创建立方体的六个平面材质,指定某个面的纹理
    position: 位置 top,bottom,left,right,front,end
    textture: threejs纹理对象
    color: 其他面颜色
    */
    createMaterialWithTexture (position, texture, color, material = null) {
      const cube = []
      const positionIndexMap = {
        left: 4,
        top: 2
      }
      const index = positionIndexMap[position]
      for (let i = 0; i < 6; i++) {
        const option = {
          color
        }
        if (index === 2) {
          delete option.color
        }
        if (i === 0 || i === 4) {
          option.color = '#CFD2D8'
        }

        if (material) {
          // cube.push(new THREE.MeshNormalMaterial(option)); // 法线网格的材质
          cube.push(new THREE.MeshLambertMaterial(option)) // 非光泽表面的材质
        } else {
          cube.push(new THREE.MeshMatcapMaterial(option)) // 不对灯光反应的材质
          // cube.push(new THREE.MeshBasicMaterial(option)); // 基础材质
        }
      }
      if (index !== undefined) {
        cube[index].map = texture
      }
      return cube
    },
    createMaterialWithOptions (options, color, material) {
      const cube = []
      const indexPositionMap = {
        4: 'left',
        2: 'top',
        0: 'front'
      }
      for (let i = 0; i < 6; i++) {
        const option = {
          color
        }
        const position = indexPositionMap[i]
        if (position) {
          option.map = options[position]
        }
        if (material) {
          cube.push(new THREE.MeshLambertMaterial(option)) // 非光泽表面的材质
        } else {
          cube.push(new THREE.MeshBasicMaterial(option)) // 不对灯光反应的材质
        }
      }
      return cube
    },
    // 更新立方体的颜色和纹理状态
    /*
    name:  string 面板名称
    hover: boolean 是否hover状态
    */
    setPanelStatus (name, hover) {
      if (hover === undefined) {
        hover = this.hasHightLightPanels.includes(name)
      }
      const data = this[`${name.split('-')[0]}Data`]
      const haveData = data.length !== 0
      const currentPanel = this.scene.getObjectByName(name)
      const type = name.split('-')[0]
      currentPanel.material.forEach((ele, index) => {
        if (index === 2) {
          const image = new Image()
          const hoverName = hover ? 'highlight' : 'noHighlight'
          const dataName = haveData ? 'haveData' : 'noData'
          const picName = this.images[type][hoverName][dataName]

          image.src = picName
          image.onload = () => {
            ele.map.image = image
            ele.map.needsUpdate = true
          }
        } else {
          let color = hover ? this.panelLeftHoverColor : this.panelLeftColor
          if (type === 'custom' && !this.isCustomReady) {
            color = this.customHoverColor
          }
          ele.color.set(color)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#panel {
  position: relative;
  height: 100%;
  width: 100%;
  .three-wrapper {
    height: 100%;
    width: 100%;
    canvas {
      height: 100%;
      width: 100%;
    }
    // position: relative;
  }
  .item-tips {
    position: absolute;
  }
}
</style>
