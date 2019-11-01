<!-- 模仿华为 EMUI 桌面时钟 -->
<template lang="html">
  <div class="clock-wrapper"
    :style="{ width: width + 'px', height: width + 'px', fontSize: width / 10 + 'px' }"
  >
    <div class="clock">
      <!-- 秒针刻度 -->
      <div class="marks">
        <div
          v-for="(item, index) in 30"
          :class="[
            'mark',
            index % 5 === 0 ? 'mark-hour' : ''
          ]"
        />
      </div>
      <!-- 时针数字刻度 -->
      <ul class="hour-number-marks">
        <li class="hour-number-mark" v-for="(item, index) in 12">
          {{ index + 1 }}
        </li>
      </ul>
      <!-- 时针 -->
      <div
        class="hour-hand"
        :style="{ transition: 'all ' + transition.hour + 's', transform: 'translateX(-50%) rotate(' + rotate.hour + 'deg)' }"
      />
      <!-- 分针 -->
      <div
        class="minute-hand"
        :style="{ transition: 'all ' + transition.minute + 's', transform: 'translateX(-50%) rotate(' + rotate.minute + 'deg)' }"
      />
      <!-- 秒针 -->
      <div
        class="second-hand"
        :style="{ transition: 'all ' + transition.second + 's', transform: 'translateX(-50%) rotate(' + rotate.second + 'deg)' }"
      />
      <!-- 时钟中心点 -->
      <div class="inner-circle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 100
    }
  },

  data () {
    return {
      // 时针分针秒针的当前旋转角度
      rotate: {
        hour: 0,
        minute: 0,
        second: 0
      },
      transition: {
        hour: 0.3,
        minute: 0.3,
        second: 0.3
      },
      interval: null
    }
  },

  created () {
    // 初始时间
    this.calcRotate()

    // 每隔一秒执行一次
    this.interval = setInterval(() => {
      this.calcRotate()
    }, 1000)
  },

  destoryed () {
    clearInterval(this.interval)
  },

  methods: {
    // 根据时间计算时针的旋转角度
    calcRotate () {
      const time = new Date()
      const hour = time.getHours() % 12
      const minute = time.getMinutes()
      const second = time.getSeconds()

      // 时针一个刻度30°，分针和秒针一个刻度6°
      this.rotate.hour = hour * 30
      this.rotate.minute = minute * 6
      this.rotate.second = second * 6

      this.transition.hour = hour / 12 === 0 ? 0 : 0.3
      this.transition.minute = minute === 0 ? 0 : 0.3
      this.transition.second = second === 0 ? 0 : 0.3
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass-math.scss';
$background-color: #2a2a2a;

.clock-wrapper {
  background-color: #ebebeb;
  border-radius: 2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .clock {
    background-color: $background-color;
    width: 80%;
    height: 80%;
    border-radius: 100%;
    border: 0.3em solid #fafafa;
    position: relative;
  }

  .mark {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform-origin: center center;

    &::before {
      content: '';
      display: inline-block;
      height: 0.1em;
      width: 1px;
      background-color: #fafafa;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0.1em;
    }

    &::after {
      content: '';
      display: inline-block;
      height: 0.1em;
      width: 1px;
      background-color: #fafafa;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.1em;
    }

    &.mark-hour {
      &::after, &::before {
        height: 0.2em;
        background-color: #00ffff;
      }
    }
  }

  // 时针数字刻度
  .hour-number-marks {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
  }

  .hour-number-mark {
    position: absolute;
    color: #fff;
    list-style-type: none;
    transform: translateX(-50%) translateY(50%) scale(0.6);
    z-index: 10;
  }

  .hour-hand {
    position: absolute;
    top: 20%;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 0.1em bottom;
    width: 0.2em;
    height: 30%;
    border-radius: 0.2em;
    background-color: #fff;
    transition: all 0.3s;
  }

  .minute-hand {
    position: absolute;
    top: 12%;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 0.075em bottom;
    width: 0.15em;
    height: 38%;
    border-radius: 0.15em;
    background-color: #fff;
    transition: all 0.3s;
  }

  .second-hand {
    position: absolute;
    top: 5%;
    right: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 0.05em bottom;
    width: 0.1em;
    height: 45%;
    border-radius: 0.1em;
    background-color: #0ff;
  }

  .inner-circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.3em;
    height: 0.3em;
    border-radius: 100%;
    background: $background-color;
    border: 0.1em solid #fff;
  }
}

// 通过循环函数计算秒针刻度的 rotate 偏移
@for $i from 1 through 30 {
  .mark:nth-child(#{$i}) {
    transform: rotate(6deg * ($i - 1));
  }
}

// 通过循环函数计算时针数字刻度的 rotate 偏移
@for $i from 1 through 12 {
  .hour-number-mark:nth-child(#{$i}) {
    left: 4em + 4em * cos((90 - $i * 30) * pi() / 180);
    bottom: 4em + 4em * sin((90 - $i * 30) * pi() / 180);

    @if $i == 1 {
      margin-left: -0.5em;
      margin-bottom: -0.5em;
    }

    @if $i == 2 {
      margin-left: -0.7em;
      margin-bottom: -0.3em;
    }

    @if $i == 3 {
      margin-left: -0.7em;
    }

    @if $i == 4 {
      margin-left: -0.7em;
      margin-bottom: 0.3em;
    }

    @if $i == 5 {
      margin-left: -0.5em;
      margin-bottom: 0.5em;
    }

    @if $i == 6 {
      margin-bottom: 0.7em;
    }

    @if $i == 7 {
      margin-left: 0.5em;
      margin-bottom: 0.5em;
    }

    @if $i == 8 {
      margin-left: 0.7em;
      margin-bottom: 0.3em;
    }

    @if $i == 9 {
      margin-left: 0.7em;
    }

    @if $i == 10 {
      margin-left: 0.7em;
      margin-bottom: -0.3em;
    }

    @if $i == 11 {
      margin-left: 0.5em;
      margin-bottom: -0.5em;
    }

    @if $i == 12 {
      margin-bottom: -0.7em;
    }
  }
}
</style>
