<template>
  <div class="audio-play">
    <audio
      ref="audio"
      preload
      :src="src"
      @canplay="canplay"
      @pause="pause"
      @timeupdate="timeupdate"
    >
      您的浏览器不支持音频
    </audio>
    <div class="audio-controls">
      <div class="audio-play-icons" @click="play">
        <i v-if="playing" class="iconfont iconzanting1 color-primary"></i>
        <i
          v-else
          class="iconfont iconbofang1"
          :class="[audio ? 'color-primary' : 'is-disabled']"
        ></i>
      </div>
      <div ref="progress" class="audio-progress">
        <div class="audio-progress__background" @click.self="clickProgress"></div>
        <div class="audio-progress__track" :style="trackStyle" @click.self="clickProgress"></div>
        <div
          class="audio-progress__thumb"
          ref="thumb"
          :style="thumbStyle"
          :class="{ 'is-disabled': !audio }"
          @mousedown="thumbMouseDown"
        ></div>
      </div>
      <div class="flex-center">
        <p class="font-small color-text-3">{{ currentTime }}/</p>
        <p class="font-small color-text-3">{{ totalTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String
  },

  data() {
    return {
      duration: 0, // 总时长
      currentTime: '00:00',
      totalTime: '00:00',
      playing: false,
      audio: null,
      progress: 0,
      initClientX: 0,
      initOffsetX: 0
    }
  },

  computed: {
    trackStyle() {
      return {
        width: `${this.progress}%`
      }
    },

    thumbStyle() {
      return {
        left: `${this.progress}%`
      }
    }
  },

  methods: {
    // 播放
    play() {
      if (this.audio) {
        // 播放当前录音前先停止当前页面所有 audio 播放
        if (!this.playing) {
          const audios = document.getElementsByTagName('audio')
          audios.forEach(audio => {
            audio.pause()
          })
        }

        this.playing ? this.audio.pause() : this.audio.play()
        this.playing = !this.playing
      }
    },

    pause() {
      this.playing = false
    },

    // 切换进度
    clickProgress(e) {
      const progress = e.offsetX / this.$refs.progress.clientWidth
      this.audio.currentTime = this.duration * progress
    },

    canplay() {
      this.audio = this.$refs.audio
      if (this.audio) {
        this.duration = this.audio.duration
        this.totalTime = this.formatDuration(Math.ceil(this.duration))
      }
    },

    // 进度条更新
    timeupdate() {
      if (this.audio) {
        this.currentTime = this.formatDuration(Math.ceil(this.audio.currentTime))
        this.progress = (this.audio.currentTime / this.duration) * 100
        if (this.audio.currentTime === this.audio.duration) {
          this.audio.pause()
          this.playing = false
        }
      }
    },

    // 小圆点鼠标按下事件
    thumbMouseDown(e) {
      if (!this.audio) return

      this.audio.pause()
      this.playing = false
      this.initClientX = e.clientX
      this.initOffsetX = (this.$refs.progress.clientWidth * this.progress) / 100

      e.stopImmediatePropagation()
      e.preventDefault()
      document.addEventListener('mousemove', this.thumbMouseMove, false)
      document.addEventListener('mouseup', this.thumbMouseUp, false)
    },

    thumbMouseMove(e) {
      let progress =
        (e.clientX - this.initClientX + this.initOffsetX) / this.$refs.progress.clientWidth
      progress = progress <= 1 ? (progress >= 0 ? progress : 0) : 1
      this.progress = progress * 100
    },

    thumbMouseUp() {
      this.audio.currentTime = (this.duration * this.progress) / 100
      document.removeEventListener('mousemove', this.thumbMouseMove, false)
      document.removeEventListener('mouseup', this.thumbMouseUp, false)
    },

    // 格式化分钟
    formatDuration(duration) {
      if (duration > 0) {
        let minute = Math.floor(duration / 60)
        minute = minute < 10 ? '0' + String(minute) : String(minute)
        let second = duration % 60
        second = second < 10 ? '0' + String(second) : String(second)
        return minute + ':' + second
      } else {
        return '00:00'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_2436495_253nh3fvpe5.css');

.audio-play {
  display: flex;
  align-items: center;
  height: 32px;
  background: #F7F7F7;
  border-radius: 16px;
  padding-right: 16px;
  
  div {
    box-sizing: border-box;
  }
}

.audio-controls {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.audio-play-icons__text {
  font-size: 12px;
  line-height: 18px;
  color: #FFFFFF;
}

.audio-play-icons {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 12px;
  height: 24px;
  width: 24px;

  i {
    font-size: 24px;

    &.is-disabled {
      color: #999999;
      cursor: not-allowed;
    }
  }
}

.audio-progress {
  height: 4px;
  position: relative;
  width: 100%;
  margin: 0 8px;
  flex-grow: 1;
  cursor: pointer;
}

.audio-progress__background {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #DDDDDD;
  border-radius: 4px;
}

.audio-progress__track {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #466796;
  border-radius: 4px;
}

.audio-progress__thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
  background: #466796;
  top: -4px;
  margin-left: -5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

  &.is-disabled {
    background: #999999;
    cursor: not-allowed;
  }
}

.font-small {
  font-size: 12px;
  line-height: 18px;
}

.flex-center {
  display: flex;
  align-items: center;
}

.color-primary {
  color: #466796;
}
</style>
