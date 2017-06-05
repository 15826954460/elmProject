<template>

  <div class="points_box">
    <transition name="parent-slide" mode="out-in">
      <div class="points-wrapper" v-show="$root.showDetail">

        <vheader message="我的积分">
          <router-link to="/user" class="fa fa-angle-left" tag="span" slot="angle"></router-link>
        </vheader>

        <section class="content_container">
          <section class="content">
            <header class="content_header">
              <span class="content_title_style">当前积分</span>
              <section class="contetn_description">
                <img src="../../../static/icon/description.png">
                <span class="content_title_style" @click="pointdetail">积分说明</span>
              </section>
            </header>
            <p class="content_num">
              <span class="strong_num">0</span>
              <span>分</span>
            </p>
            <div class="promit_button" @click="usePoint">积分兑换商品</div>
          </section>
        </section>

        <p class="deal_detail">最近30天积分纪录</p>
        <div class="no_log">
          <img src="../../../static/img/no-log.png">
          <p>最近30天无积分纪录</p>
          <p>快去下单赚取大量积分吧</p>
        </div>
      </div>
    </transition>

    <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
    </alertBounced>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import vheader from '../../components/header/header.vue'
  import alertBounced from '../../components/bounced/bounced.vue'
  export default {
    data () {
      return {
        showAlert: false,
        alertText: null
      }
    },
    created () {
      let detail = window.localStorage.getItem('showDetail')
      console.log(detail)
      if (detail === null) { // 本地没有值得情况下，就显示
        this.$root.showDetail = true
      } else if (detail === 'false') {
        this.$root.showDetail = false
      } else {
        this.$root.showDetail = true
      }
    },
    components: {
      vheader,
      alertBounced
    },
    computed: {},
    methods: {
      usePoint () {
        this.showAlert = true
        this.alertText = '快去下单赚取大量积分吧'
      },
      know () {
        this.showAlert = false
      },
      pointdetail () {
        this.$root.showDetail = false
        window.localStorage.setItem('showDetail', false)
        this.$router.push({path: '/points/pointsdetail'})
      }
    }
  }
</script>

<style scoped>
  @import './points.css';
</style>
