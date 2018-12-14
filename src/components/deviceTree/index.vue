<template>
  <div class="qn-device-tree">
    <el-input
      class="tree-search"
      size="small"
      placeholder="请输入检索内容"
      v-model="filterText"
      @keyup.native="searchTree">
      <i slot="suffix" class="el-icon-search" @click="searchTree"></i>
    </el-input>
    <div class="scroll-content">
      <el-scrollbar>
        <el-tree
          ref="qnTree"
          class="tree-content"
          :data="deviceTree"
          :props="props1"
          node-key="id"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode">
          <span class="custom-tree-node" :class="{'device__disabled': node.data.status == 0}" slot-scope="{ node, data }">
            <i v-if="!node.data.index_code" class="iconfont icon-tree"></i>
            <template v-else>
              <i class="iconfont icon-device" :class="[node.data.status == 0 ? 'icon-device__disabled': '', 'icon-device' + node.data.type]"></i>
              <i v-if="node.checked" class="icon-video"></i>
            </template>
            <el-tooltip :content="node.label" placement="top">
              <span class="node-text">{{ node.label }}</span>
            </el-tooltip>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    videoLimit: {
      type: [String, Number],
      default: 1
    }
  },
  data () {
    return {
      deviceTree: [],
      checkedNodes: new Array(this.videoLimit), // 选中的node集合
      replaceNum: 0, // 替换的视频index
      props1: {
        label: 'name',
        children: 'children'
      },
      videoNum: -1, // 点击的视频位置
      filterText: ''
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    searchTree () {
      this.$refs.qnTree.filter(this.filterText)
    },
    handleNodeClick (data, node, self) {
      // 首先判断点击的是 已启用状态的设备
      if (data.index_code && data.status != 0) {
        if (this.videoNum == -1) { // 如果未选中视频播放器
          // 当前点击节点处于选中还是未选中状态
          if (node.checked) { // 当前选中 找到元素清空
            let position = this.getNodePositionByKey(data.index_code)
            node.checked = false
            this.checkedNodes[position] = undefined
            this.$emit('node-click', data, node.checked, position)
          } else { // 当前未选中 找到位置插入
            let position = this.getInsertPosition()
            node.checked = true
            this.checkedNodes[position] = node
            this.$emit('node-click', data, node.checked, position)
          }
        } else { // 选中了某一个视频播放器
          if (node.checked) {
            // 先找到原视频播放器位置关掉
            let position = this.getNodePositionByKey(data.index_code)
            if (position != this.videoNum) {
              this.$emit('node-click', data, false, position)
              this.checkedNodes[position] = undefined
              if (this.checkedNodes[this.videoNum] != undefined) {
                this.checkedNodes[this.videoNum].checked = false
              }
              this.checkedNodes[this.videoNum] = node
              this.$emit('node-click', data, node.checked, this.videoNum)
            } else {
              node.checked = false
              this.checkedNodes[position] = undefined
              this.$emit('node-click', data, node.checked, position)
            }
          } else {
            if (this.checkedNodes[this.videoNum] != undefined) {
              this.checkedNodes[this.videoNum].checked = false
            }
            node.checked = true
            this.checkedNodes[this.videoNum] = node
            this.$emit('node-click', data, node.checked, this.videoNum)
          }
        }
      }
    },
    getInsertPosition () {
      let position = -1
      for (let i = 0; i < this.checkedNodes.length; i++) {
        // 如果有空位置，返回第一个空位置作为插入点
        if (position === -1 && this.checkedNodes[i] == undefined) {
          position = i
          break
        }
      }
      if (position === -1) {
        // 没有空位置了，按照replaceNum替换视频
        position = this.replaceNum % this.videoLimit
        this.replaceNum++
        // 需要将替换掉的node checked 置为false
        let removeNode = this.checkedNodes[position]
        removeNode.checked = false
      }
      return position
    },
    getNodePositionByKey (key) {
      let position = -1
      for (let i = 0; i < this.checkedNodes.length; i++) {
        if (this.checkedNodes[i] && this.checkedNodes[i].data.index_code == key) {
          position = i
          break
        }
      }
      return position
    },
    changePosition (position) {
      this.videoNum = position
    },
    closeVideo (position) {
      let removeNode = this.checkedNodes[position]
      removeNode.checked = false
      this.$emit('node-click', removeNode.data, false, position)
      this.checkedNodes[position] = undefined
    },
    chooseBannerVideo (remindval) {
      // 从当前checkedNodes中选取remindval个播放视频，不够的undefined补足
      let j = 0
      let resultArr = []
      for (let i = 0; i < this.checkedNodes.length; i++) {
        if (this.checkedNodes[i] && this.checkedNodes[i].checked && i != this.videoNum) {
          if (j < remindval) {
            resultArr.push(this.checkedNodes[i])
          } else {
            this.checkedNodes[i].checked = false
          }
          j++
        }
      }
      if (j < remindval) {
        for (let k = 0; k < remindval - j; k++) {
          resultArr.push(undefined)
        }
      }
      return resultArr
    },
    // 外部组件设置点击树事件
    outSideNodeClick (indexCode) {
      let node = this.$refs.qnTree.getNode(indexCode)
      if (node) {
        this.handleNodeClick(node.data, node, null)
      }
    },
    getTreeData () {
      let _this = this
      this.$http.get('/getDeviceTree', null, (res) => {
        this.deviceTree = res.data
        this.$nextTick(() => {
          _this.$refs.qnTree.store._getAllNodes()[0].expand(null, true)
        })
      })
    }
  },
  mounted () {
    this.getTreeData()
  },
  watch: {
    videoLimit (newVal, oldVal) {
      let remindval = newVal < oldVal ? newVal : oldVal // 需要保留填充的视频
      // 从checkedNodes中挑选指定个数的保留视频
      let resultArr = []
      if (this.videoNum != -1) {
        // 有选中的视频
        resultArr.push(this.checkedNodes[this.videoNum])
        remindval = remindval - 1
      }
      let getArr = this.chooseBannerVideo(remindval)
      resultArr = [...resultArr, ...getArr]
      this.replaceNum = 0
      this.videoNum = -1
      this.checkedNodes = new Array(newVal)
      for (let i = 0; i < resultArr.length; i++) {
        this.checkedNodes[i] = resultArr[i]
        if (resultArr[i]) {
          this.$emit('node-click', resultArr[i].data, resultArr[i].checked, i)
        } else {
          this.$emit('node-click', null, false, i)
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .qn-device-tree {
    $color-primary: #42b983;
    $font-primary: #333;
    font-size: 14px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .tree-search {
      margin-bottom: 5px;
      .el-icon-search {
        font-size: 20px;
        cursor: pointer;
        position: relative;
        top: 5px;
        color: $color-primary;
      }
    }
    .scroll-content {
      height: calc(100% - 40px);
    }
    .tree-content {
      width: 100%;
      height: 100%;
    }
    .el-scrollbar {
      height: 100%;
    }
    .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-scrollbar__bar.is-horizontal {
      display: none;
    }
    .el-tree-node {
      width: 100% !important;
    }
    .el-tree-node__content {
      width: 100%;
      padding-right: 10px;
    }
    .el-tree-node__expand-icon {
      font-family: "iconfont" !important;
      font-size: 12px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &.el-icon-caret-right:before {
        content: "\e663";
      }
      &.is-leaf {
        color: transparent !important;
      }
    }
    .el-icon-caret-right {
      color: $color-primary;
    }
    .custom-tree-node {
      position: relative;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      .icon-tree {
        color: $color-primary;
        margin-right: 3px;
      }
      .icon-device {
        color: $color-primary;
        margin-right: 2px;
      }
      .icon-video {
        position: absolute;
        left: 8px;
        top: 5px;
        width: 14px;
        height: 14px;
        display: inline-block;
        background-image: url("img/video.png");
        background-size: cover;
      }
      .node-text {
        color: $font-primary;
      }
      &.device__disabled {
        cursor: not-allowed;
        color: rgb(134, 134, 134);
        .icon-device__disabled {
          color: rgb(134, 134, 134);
        }
      }
    }
  }
</style>
