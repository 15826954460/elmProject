<template>
  <div class='menuWrapper'>

    <vheader message="上海人民广场">
      <router-link to="/search" tag="span" class='fa fa-search' slot="fa-search"></router-link>
      <router-link to="/user" tag="span" class='fa fa-user-o' slot="fa-user-o"></router-link>
    </vheader>

    <nav class='menu_nav'>
      <div class='swiper-container swiper-box'>
        <div class='menuNav swiper-wrapper'>
          <ul class="swiper-slide">
            <li v-for='(item, footTypePreIndex) in footTypePre'>
              <dl style='text-align:center'>
                <dd class='imgWrapper'><img :src='imgBaseUrl + item.image_url' alt=''></dd>
                <dd class='title'>{{item.title}}</dd>
              </dl>
            </li>
          </ul>
          <ul class="swiper-slide">
            <li v-for='(item, footTypeNextIndex) in footTypeNext'>
              <dl style='text-align:center'>
                <dd class='imgWrapper'><img :src='imgBaseUrl + item.image_url' alt=''></dd>
                <dd class='title'>{{item.title}}</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class='swiper-pagination swiper-pagination-clickable swiper-pagination-bullets pagination' id="pagination">
        </div>
      </div>
    </nav>
    <vshopList></vshopList>
    <vfoot></vfoot>
  </div>
</template>
<script>
  import vfoot from '../../components/footer/footNav.vue'
  import vshopList from './shoplist.vue'
  import Swiper from '../../../static/swiper.min' // 引入swiperjs
  import vheader from '../../components/header/header.vue'
  export default {
    components: {
      vheader,
      vfoot,
      vshopList
    },
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com',
        startPosition: 0,
        showNavContent: 0,
        length: null,
        timer: null,
        guide: 'nav'
      }
    },
    computed: {
//        获取前半部分
      footTypePre () {
        this.length = this.$store.getters.foodTypes.length
        return this.$store.getters.foodTypes.slice(this.startPosition, Math.ceil(this.length / 2))
      },
//      获取后半部分
      footTypeNext () {
        return this.$store.getters.foodTypes.slice(Math.ceil(this.length / 2))
      }
    },
    mounted () { // 页面元素挂在完成调用swiper方法
      this.$nextTick(function () {
        this.swiper()
      })
    },
    methods: {
      halfPre () {
        this.showNavContent = 0
      },
      halfNext () {
        this.showNavContent = 1
      },
      // 所有关于轮播的方法
      carousel () {
//        let _this = this
//        // 改变轮播中的显示和隐藏
//        function changeNavContent () {
//          _this.showNavContent === 0 ? _this.showNavContent = 1 : _this.showNavContent = 0
//        }
//
//        // 建立一个通用的轮播函数
//        function go () {
//          _this.timer = setInterval(() => {
//            changeNavContent()
//          }, 2000)
//        }
//
//        // 鼠标进入停止轮播
//        function stopAuto () {
//          clearInterval(_this.timer)
//        }
//
//        return {
//          go: go,
//          stopAuto: stopAuto
//        }
      },
      // 手指滑动方向的判断
      finger () {
//        let startx = null
//        let starty = null
//        // 获得角度
//        function getAngle (angx, angy) {
//          return Math.atan2(angy, angx) * 180 / Math.PI
//        }
//
//        // 根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
//        function getDirection (startx, starty, endx, endy) {
//          let angx = endx - startx
//          let angy = endy - starty
//          let result = 0
//          // 如果滑动距离太短，返回0
//          if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
//            return result
//          }
//          // 否则调用函数getAngle获得角度 返回相对应的值
//          let angle = getAngle(angx, angy)
//          if (angle >= -135 && angle <= -45) {
//            result = 1
//          } else if (angle > 45 && angle < 135) {
//            result = 2
//          } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
//            result = 3
//          } else if (angle >= -45 && angle <= 45) {
//            result = 4
//          }
//          return result
//        }
//
//        // 手指接触屏幕
//        document.addEventListener('touchstart', (e) => {
//          startx = e.touches[0].pageX
//          starty = e.touches[0].pageY
//        }, false)
//        // 手指离开屏幕
//        document.addEventListener('touchend', (e) => {
//          let endx = e.changedTouches[0].pageX
//          let endy = e.changedTouches[0].pageY
//          let direction = getDirection(startx, starty, endx, endy)
//          switch (direction) {
//            case 0:
//              // alert('未滑动')
//              break
//            case 1:
//              // alert('向上')
//              break
//            case 2:
//              // alert('向下')
//              break
//            case 3:
//              // alert('向左')
//              this.showNavContent === 0 ? this.showNavContent = 1 : this.showNavContent = 0
//              break
//            case 4:
//              // alert('向右')
//              break
//            default:
//          }
//        }, false)
      },
      swiper () {
        Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          loop: true
        })
      }
    }
  }
</script>
<style scoped>
  @import './menu.css';
  @import '../../../src/assets/swiper.min.css';
</style>
