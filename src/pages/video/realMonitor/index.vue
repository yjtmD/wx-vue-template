<template>
  <wx-layout>
    <el-row :gutter="20" class="wx-real-monitor">
      <el-col :span="3" style="height: 100%" class="percent-screen-left">
        <div class="source-tree">
          <div class="panel-title">
            <span class="title-name">资源列表</span>
          </div>
          <div class="tree-container">
            <DeviceTree
              ref="qnDeviceTree"
              :videoLimit="videoLimit"
              @node-click="clickTree">
            </DeviceTree>
          </div>
        </div>
      </el-col>
      <el-col :span="21" style="height: 100%" class="percent-screen-right">
        <div class="video-content" :class="'video-item-' + videoLimit">
          <div v-for="i in videoLimit" class="video-item" :key="i">
            <DeviceVideoPlayer
              :bindClick="true"
              :ref="'videoPlayer' + (i - 1)"
              @select="videoSelect($event, (i-1))"
              @closeVideo="closeVideo(i-1)"
              @shotVideo="shotVideo($event, (i-1))">
            </DeviceVideoPlayer>
          </div>
        </div>
        <div class="video-banner">
          <i class="iconfont icon-video-banner1" :class="{'active': videoLimit === 1}" @click="changeLimit(1)"></i>
          <i class="iconfont icon-video-banner4" :class="{'active': videoLimit === 4}" @click="changeLimit(4)"></i>
          <i class="iconfont icon-video-banner9" :class="{'active': videoLimit === 9}" @click="changeLimit(9)"></i>
        </div>
      </el-col>
    </el-row>
  </wx-layout>
</template>

<script>
import wxLayout from '@/components/layout/index'
import DeviceTree from '@/components/DeviceTree/index'
import DeviceVideoPlayer from '@/components/DeviceVideoPlayer/index'

export default {
  components: {
    wxLayout,
    DeviceTree,
    DeviceVideoPlayer
  },
  data () {
    return {
      cameraIds: [], // 选中的设备Id
      // 视频和树联动相关变量
      videoLimit: 9,
      videoChoosePosition: -1, // 视频选择
      rtmpSrc: ''
    }
  },
  methods: {
    clickTree (data, checked, position) {
      let _this = this
      if (checked) {
        this.$refs['videoPlayer' + position][0].videoSrc = data.stream_addr
        this.$refs['videoPlayer' + position][0].videoTitle = data.name
        this.$nextTick(function () {
          _this.$refs['videoPlayer' + position][0].playerOptions.sources[0].src = data.stream_addr
          if (_this.videoChoosePosition != -1) {
            _this.rtmpSrc = data.stream_addr
          }
        })
      } else {
        this.$refs['videoPlayer' + position][0].videoSrc = ''
        this.$nextTick(function () {
          _this.$refs['videoPlayer' + position][0].playerOptions.sources[0].src = ''
          if (_this.videoChoosePosition != -1) {
            _this.rtmpSrc = ''
          }
        })
      }
      let resArr = []
      let checkArr = this.$refs.qnDeviceTree.checkedNodes
      for (let i = 0; i < checkArr.length; i++) {
        if (checkArr[i]) {
          resArr.push(checkArr[i].data.index_code)
        }
      }
      this.cameraIds = [...resArr]
    },
    videoSelect (checked, position) {
      let _this = this
      if (checked) {
        // 选中了某一个播放器
        if (this.videoChoosePosition != -1) {
          this.$refs['videoPlayer' + this.videoChoosePosition][0].setChoose(false)
        }
        this.videoChoosePosition = position
        this.rtmpSrc = this.$refs['videoPlayer' + position][0].videoSrc
      } else {
        // 取消选中某一个播放器
        this.videoChoosePosition = -1
        this.rtmpSrc = ''
      }
      this.$refs.qnDeviceTree.changePosition(this.videoChoosePosition)
    },
    closeVideo (position) {
      // 关闭一个视频
      this.$refs.qnDeviceTree.closeVideo(position)
    },
    shotVideo (time, position) {
      // 截图请求
      // time 当前播放时间 url rtmp地址
      let url = this.$refs['videoPlayer' + position][0].videoSrc
      console.log(time, url)
    },
    changeLimit (num) {
      if (this.videoChoosePosition != -1) {
        this.$refs['videoPlayer' + this.videoChoosePosition][0].setChoose(false)
      }
      this.videoChoosePosition = -1
      this.rtmpSrc = ''
      this.videoLimit = num
    },
    handleSentTree (indexCode) {
      this.$refs.qnDeviceTree.outSideNodeClick(indexCode)
    }
  },
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
</script>

<style lang="scss">
  .wx-real-monitor {
    $color-primary: #42b983;
    $font-primary: #333;
    $font-info: #e8e8e8;
    height: 100%;
    box-sizing: border-box;
    .percent-screen-left {
      width: 270px !important;
    }
    .percent-screen-right {
      width: calc(100% - 270px) !important;
      display: flex;
      flex-direction: column;
    }
    .source-tree {
      height: 100%;
      padding: 8px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow:0px 0px 8px 0px rgba(0,0,0,0.18);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .panel-title {
        position: relative;
        text-align: left;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(230, 230, 231, 1);
        margin-bottom: 10px;
        .title-name {
          padding-left: 14px;
          font-size: 18px;
          font-weight: 500;
          color: $font-primary;
        }
        .title-banner {
          position: absolute;
          right: 14px;
          top: 12px;
          font-size: 12px;
          span {
            display: inline-block;
            cursor: pointer;
            border-bottom: 1px solid #fff;
            &:first-child {
              margin-right: 10px;
            }
            &.active {
              color: $color-primary;
              border-color: $color-primary;
            }
          }
        }
      }
      .tree-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .history-list {
          height: 100%;
          .no-history {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .has-history {
            height: 100%;
            display: flex;
            flex-direction: column;
            .scroll-content {
              height: 100%;
              .el-scrollbar__wrap {
                overflow-x: hidden;
              }
              .el-scrollbar__bar.is-horizontal {
                display: none;
              }
            }
            .clear-btn {
              text-align: center;
              width: 90px;
              margin: 10px auto 0 auto;
              border-color: $color-primary;
              color: $color-primary;
            }
          }
          .scroll-history {
            height: 100%;
            .item-one {
              cursor: pointer;
              position: relative;
              margin-top: 20px;
              &:first-child {
                margin-top: 0px;
              }
              &:hover {
                .device-icon {
                  color: $color-primary;
                }
                .device-name {
                  color: $color-primary;
                }
              }
              .device-icon {
                font-size: 18px;
                position: relative;
                top: 2px;
                left: 5px;
                color: $font-primary;
              }
              .device-name {
                font-size: 14px;
                color: $font-primary;
                letter-spacing: 0;
              }
              .device-time {
                font-size: 12px;
                color: $font-info;
                letter-spacing: 0;
              }
              .icon-play2 {
                color: $color-primary;
                font-size: 14px;
                position: relative;
                top: 9px;
              }
            }
          }
        }
      }
    }
    .video-content {
      width: 100%;
      height: 100%;
      background:rgba(238, 238, 238, 1);
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: stretch;
      .video-item {
        background: #000;
        display: inline-block;
        overflow: hidden;
      }
      &.video-item-9 .video-item {
        width: 33.3%;
        height: 33.1%;
      }
      &.video-item-4 .video-item {
        width: 49.95%;
        height: 49.8%;
      }
      &.video-item-1 .video-item {
        width: 100%;
        height: 100%;
      }
    }
    .video-banner {
      width: 100%;
      height: 58px;
      background:rgba(238, 238, 238, 1);
      border-radius:0px 0px 8px 8px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .iconfont {
        margin-right: 20px;
        cursor: pointer;
        color: #bbb;
        font-size: 26px;
        &.active {
          color: $color-primary;
        }
      }
    }
  }
</style>
