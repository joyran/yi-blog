---
title: 自定义音频播放组件 AudioPlay
date: 2021-09-02
---

项目中音频播放用原生组件 `audio` 就可以了，界面也挺美观，功能也很齐全，但是界面样式每个浏览器不一样，所以设计师都会设计一套独立的音频播放组件。

先来看看浏览器原生 `audio` 组件长什么样，一定要加 `controls`，显示原生控制按钮。

<div styles="margin-top: 16px;">
  <audio src="https://apply-public-cdn.wezhuiyi.com/43811bd2-e03a-1630316869303.mp3" preload controls />
</div>

<!-- more -->
再来看看自定义音频组件长什么样，是可以正常播放的。

<AudioPlay src="https://apply-public-cdn.wezhuiyi.com/43811bd2-e03a-1630316869303.mp3" />

### 实现思路

想要实现一个自定义音频播放组件，还得使用原生 `audio` 组件，只不过不加 `controls` 属性，播放控制按钮以及进度条手动实现，UI实现起来比较简单，难点也只有进度条的拖动，要用到三个鼠标事件，在控制进度的小圆点上监听 `mousedown` 事件，`mousemove` 事件监听鼠标移动，实时计算鼠标偏移量并设置小圆点的 `left` 属性，设置播放进度条的 `width` 属性，达到进度条跟随鼠标移动的效果，`mouseup` 监听鼠标松开事件，更新音频播放进度。

要特别注意的是 `mousedown` 事件可以绑定在小圆点上，`mousemove` 不能绑定在小圆点上，必须绑定在 `document` 上，如果绑定在小圆点上会出现鼠标拖动太快，小圆点位置没有及时更新，下次 `mousemove` 就监听不到了，所以需要在 `mousedown` 时绑定 `mousemove` 和 `mouseup` 事件到 `document` 上，然后在 `mouseup` 的时候解绑。

```js
thumbMouseDown(e) {
  e.stopImmediatePropagation()
  e.preventDefault()
  document.addEventListener('mousemove', this.thumbMouseMove, false)
  document.addEventListener('mouseup', this.thumbMouseUp, false)
},

thumbMouseMove(e) {
  console.log(e)
}

thumbMouseUp() {
  document.removeEventListener('mousemove', this.thumbMouseMove, false)
  document.removeEventListener('mouseup', this.thumbMouseUp, false)
},
```

音频文件下载一般都需要个过程，如果还没准备好是不能播放的，canplay 事件在音频可以开始播放时触发。完整的事件[参考手册](https://www.runoob.com/tags/ref-av-dom.html)

### 音频流

如果后端返回的不是一个可以播放的 url，而是通过流推送过来，则需要特殊处理下，需要用到 [createObjectURL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL) 创建一个 url。**后端返回的 content-type 要设置为 `audio/wav`**

```js
fetch('/url')
  .then(res => {
    return res.blob()
  })
  .then(res => {
    const blob = new Blob([res])
    const url = URL.createObjectURL(blob)
    
    // 这里的 url 可以直接赋值给 audio src 播放
  })
```

完整代码
```vue
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
```