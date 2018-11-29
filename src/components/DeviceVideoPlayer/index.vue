<template>
  <div class="qn-video-item" @click="selectVideo()" :class="{'select': videoChoose}">
    <div v-if="videoSrc == ''" class="no-video">
      暂未播放视频
    </div>
    <video-player
      v-else
      class="vjs-custom-skin"
      :options="playerOptions"
      :playsinline="true"
      @ready="changePlayerBtn">
    </video-player>
  </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import SWF_URL from 'videojs-swf/dist/video-js.swf'

videojs.options.flash.swf = SWF_URL

export default {
  props: {
    bindClick: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        live: true,
        autoplay: true,
        // fluid: true, // 自适应容器大小
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        },
        techOrder: ['flash'], // 兼容顺序
        flash: {
          hls: {
            withCredentials: false
          },
          swf: SWF_URL
        },
        sources: [{
          type: 'rtmp/flv',
          src: ''
        }]
      },
      videoSrc: '',
      videoChoose: false,
      videoTitle: ''
    }
  },
  methods: {
    selectVideo () {
      if (this.bindClick) {
        this.videoChoose = !this.videoChoose
        this.$emit('select', this.videoChoose)
      }
    },
    setChoose (val) {
      this.videoChoose = val
    },
    changePlayerBtn (player) {
      this.addCloseBtn(player)
      this.addShotBtn(player)
      this.addVideoTitle(player)
    },
    addCloseBtn (player) {
      let _this = this
      let closeBtn = player.controlBar.addChild('button')
      closeBtn.addClass('el-icon-close')
      closeBtn.addClass('vjs-control')
      closeBtn.addClass('vjs-button')
      closeBtn.addClass('vjs-close-control')
      closeBtn.on('click', () => {
        _this.$emit('closeVideo')
      })
    },
    addShotBtn (player) {
      let _this = this
      let shotBtn = player.controlBar.addChild('button')
      shotBtn.addClass('iconfont')
      shotBtn.addClass('icon-shot')
      shotBtn.addClass('vjs-control')
      shotBtn.addClass('vjs-button')
      shotBtn.addClass('vjs-shot-control')
      shotBtn.on('click', () => {
        _this.$emit('shotVideo', player.currentTime())
      })
    },
    addVideoTitle (player) {
      let _this = this
      let titleDiv = player.controlBar.addChild('button')
      titleDiv.addClass('vjs-video-title')
      videojs.dom.appendContent(titleDiv.el_, _this.videoTitle)
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
  .qn-video-item {
    font-size: 14px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    &.select {
      border: 2px solid #FF3C57;
    }
    .video-player {
      width: 100%;
      height: 100%;
    }
    .video-js {
      height: 100%;
      outline: none !important;
      &.vjs-playing .vjs-tech {
        pointer-events: none;
      }
      .vjs-big-play-button {
        // 播放按钮换成圆形
        height: 2em;
        width: 2em;
        line-height: 2em;
        border-radius: 1em;
      }
      .vjs-control-bar {
        top: 0;
        height: 28px;
        .vjs-button > .vjs-icon-placeholder:before {
          line-height: 1;
          font-size: 22px;
        }
        .vjs-play-control {
          display: none;
        }
        .vjs-current-time {
          display: none;
        }
        .vjs-time-divider {
          display: none;
        }
        .vjs-time-control {
          display: none !important;
        }
        .vjs-progress-control {
          visibility: hidden;
        }
        .vjs-fullscreen-control {
          margin-right: 25px;
          margin-top: 2px;
        }
        .vjs-volume-panel {
          position: absolute;
          right: 90px;
          top: 2px;
          .vjs-volume-bar {
            margin: 0.7em 0.45em;
          }
        }
        .vjs-close-control {
          position: absolute;
          right: 0;
          font-weight: bold;
          font-size: 20px;
          width: 42px;
          cursor: pointer;
        }
        .vjs-shot-control {
          position: absolute;
          right: 53px;
          top: -1px;
          font-size: 20px;
          width: 42px;
          cursor: pointer;
        }
        .vjs-video-title {
          position: absolute;
          left: 5px;
          width: calc(100% - 210px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: break-all;
          text-align: left;
        }
      }
      .vjs-error-display {
        background: #000;
        &:before {
          content: ''
        }
        .vjs-modal-dialog-content {
          padding-top: 25%;
        }
      }
    }
    .no-video {
      background: #000;
      color: #fff;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
