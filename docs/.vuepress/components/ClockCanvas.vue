<template>
  <div class="clock-canvas-wrapper">
    <canvas class="clock" ref="clock" width="160" height="160">

    </canvas>
  </div>
</template>

<script>
export default {
  mounted () {
    const canvas = this.$refs.clock
    const ctx = canvas.getContext('2d')

    this.drawHand(ctx)
    setInterval(() => {
      this.drawHand(ctx)
    }, 1000)
  },

  methods: {
    // 根据时间画分针，时针，秒针
    // 由于 Canvas 不能清空上一个画的直线，所以只能每隔一秒整个时钟重新绘画一次
    drawHand (ctx) {
      const time = new Date()
      const hour = time.getHours() % 12
      const minute = time.getMinutes()
      const second = time.getSeconds()

      ctx.clearRect(0, 0, 160, 160)
      // 背景
      ctx.beginPath()
      ctx.arc(80, 80, 78, 0, 2*Math.PI)
      ctx.fillStyle='#000'
      ctx.closePath()
      ctx.fill()

      // 刻度
      for (var i = 0; i < 60; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.translate(80, 80)
        ctx.rotate(i * 6 * Math.PI/180)
        if (i % 5 === 0) {
          ctx.moveTo(0, 70)
          ctx.strokeStyle='#00ffff'
        } else {
          ctx.moveTo(0, 74)
          ctx.strokeStyle='#fafafa'
        }
        ctx.lineTo(0, 77)
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      }

      // 时针一个刻度30°，分针和秒针一个刻度6°
      // 时针
      ctx.save()
      ctx.beginPath()
      ctx.translate(80, 80)
      ctx.clearRect(0, 0, 0, -48)
      ctx.rotate(hour * 30 * Math.PI/180)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -48)
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 4
      ctx.stroke()
      ctx.restore()

      // 分针
      ctx.save()
      ctx.beginPath()
      ctx.translate(80, 80)
      ctx.rotate(minute * 6 * Math.PI/180)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -60)
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()

      // 秒针
      ctx.save()
      ctx.beginPath()
      ctx.translate(80, 80)
      ctx.clearRect(0, 0, 0, -68)
      ctx.rotate(second * 6 * Math.PI/180)
      ctx.moveTo(0, 0)
      ctx.lineTo(0, -68)
      ctx.lineCap = 'round'
      ctx.strokeStyle = '#0ff'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      // 时钟中心点
      ctx.save()
      ctx.beginPath()
      ctx.arc(80, 80, 5, 0, 2*Math.PI)
      ctx.fillStyle = '#fff'
      ctx.closePath()
      ctx.fill()

      ctx.beginPath()
      ctx.arc(80, 80, 2, 0, 2*Math.PI)
      ctx.fillStyle = '#000'
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }
  }
}
</script>

<style lang='scss' scoped>
.clock-canvas-wrapper {
  background-color: #ebebeb;
  width: 200px;
  height: 200px;
  border-radius: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .clock {
    border: 4px solid #fff;
    border-radius: 100%;
  }
}
</style>
