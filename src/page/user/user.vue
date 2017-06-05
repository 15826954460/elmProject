<template>
  <div class="user-box">

    <transition name="parent-slide" mode="out-in">
      <div class="user-wrapper" v-show="$root.isShowUser">

        <vheader message='个人中心' back='true'>
          <span class="fa fa-angle-left" slot="angle" @click="$router.go(-1)"></span>
        </vheader>

        <div v-show="userInfomation">
          <div class="user-data" @click="addChildren()">
            <div class="user-logo">
              <img src="https://fuss10.elemecdn.com/e/3c/1b9262cfb2c65fa3054d54cfaec54jpeg.jpeg">
            </div>
            <div class="user-name">
              <p>{{userInfo.uName}}</p>
              <p><span>loaf</span><span>{{userInfo.phone}}</span></p>
            </div>
            <span class="fa fa-angle-right"></span>
          </div>

          <ul class="user-info">

            <router-link to="/balance" tag="li">
              <p><strong class="font-weight" style="color:#FF9900">{{userInfo.balance}}</strong>元</p>
              <p>我的余额</p>
            </router-link>

            <router-link to="/favorable" tag="li">
              <p><strong class="font-weight" style="color:#FF5F3E">{{userInfo.count}}</strong>个</p>
              <p>我的优惠</p>
            </router-link>

            <router-link to="/points" tag="li">
              <p><strong class="font-weight" style="color:#6AC20B">{{userInfo.pointNumber}}</strong>分</p>
              <p>我的积分</p>
            </router-link>
          </ul>
          <ul class="about-elm">
            <router-link tag="li" to="/order">
              <span><img src="../../../static/icon/01.png" alt=""></span><span>我的订单</span><span
              class="fa fa-angle-right"></span>
            </router-link>
            <router-link to="/integral" tag="li">
              <span><img src="../../../static/icon/02.png" alt=""></span><span>积分商城</span><span
              class="fa fa-angle-right"></span>
            </router-link>
            <router-link to="/vip" tag="li">
              <span><img src="../../../static/icon/03.png" alt=""></span><span>饿了么会员卡</span><span
              class="fa fa-angle-right"></span>
            </router-link>
            <router-link to="/service" tag="li">
              <span><img src="../../../static/icon/04.png" alt=""></span><span>服务中心</span><span
              class="fa fa-angle-right"></span>
            </router-link>
            <router-link tag="li" to="/download">
              <span><img src="../../../static/icon/05.png" alt=""></span><span>下载我了么APP</span><span
              class="fa fa-angle-right"></span>
            </router-link>
          </ul>
        </div>

        <vfoot></vfoot>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import vheader from '../../components/header/header.vue'
  import vfoot from '../../components/footer/footNav.vue'
  export default {
    data () {
      return {}
    },
    components: {
      vfoot,
      vheader
    },
    computed: {
      userInfo () {
        let obj = this.$store.getters.userInfo
        if (JSON.stringify(obj) === '{}') { // 如果用户还没有登陆，就显示登陆注册信息
          obj.uName = '登陆/注册'
          obj.phone = '登陆后享有更多特权'
          obj.count = 0
          obj.balance = '00.0'
          obj.pointNumber = 0
        }
        return obj
      },
      userInfomation () {
        return this.$store.getters.userInfomation
      }
    },
    created () {
      window.localStorage.getItem('state') === 'false' ? this.$root.isShowUser = false : window.localStorage.getItem('state') === null ? this.$root.isShowUser = true : this.$root.isShowUser = true
    },
    methods: {
      addChildren () {
        this.$root.isShowUser = false
        window.localStorage.setItem('state', false)
        this.$router.push({path: '/user/info'})
      }
    }
  }
</script>
<style scoped lang="less">
  @import './user.css';
</style>
