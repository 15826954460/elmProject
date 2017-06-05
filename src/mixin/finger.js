/**
 * Created by lele on 2017/5/9.
 */
//  根据手指的移动方向来移动
export const finger = {
  methods: {
    finger () {
      let startx = null
      let starty = null
      // 获得角度
      function getAngle (angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI
      }
      // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
      function getDirection (startx, starty, endx, endy) {
        let angx = endx - startx
        let angy = endy - starty
        let result = 0
        // 如果滑动距离太短，返回0
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
          return result
        }
        // 否则调用函数getAngle获得角度 返回相对应的值
        let angle = getAngle(angx, angy)
        if (angle >= -135 && angle <= -45) {
          result = 1
        } else if (angle > 45 && angle < 135) {
          result = 2
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
          result = 3
        } else if (angle >= -45 && angle <= 45) {
          result = 4
        }
        return result
      }
      // 手指接触屏幕
      document.addEventListener('touchstart', (e) => {
        startx = e.touches[0].pageX
        starty = e.touches[0].pageY
      }, false)
      // 手指离开屏幕
      document.addEventListener('touchend', (e) => {
        let endx = e.changedTouches[0].pageX
        let endy = e.changedTouches[0].pageY
        let direction = getDirection(startx, starty, endx, endy)
        switch (direction) {
          case 0:
            // alert('未滑动')
            break
          case 1:
            // alert('向上')
            break
          case 2:
            // alert('向下')
            break
          case 3:
            // alert('向左')
            this.showNavContent === 0 ? this.showNavContent = 1 : this.showNavContent = 0
            break
          case 4:
            // alert('向右')
            break
          default:
        }
      }, false)
    }
  }
}
