<template>

  <div class="prize-wrapper">

    <vheader message='推荐有奖'>
      <span class='fa fa-angle-left' slot='angle' @click="backToFavorable"></span>
    </vheader>

    <section class="activity_banner">
      <img src="../../../../../static/img/activity.png">
    </section>
    <section class="invite_firend">
      <div class="invite_firend_style" @click="alert_bounced">
        <img src="../../../../../static/img/weixin.png" @click="fenxiang">
        <p>邀请微信好友</p>
      </div>
      <div class="invite_firend_style" @click="alert_bounced">
        <img src="../../../../../static/img/qq.png" @click="fenxiang">
        <p>邀请QQ好友</p>
      </div>
      <div class="invite_firend_style" @click="alert_bounced">
        <img src="../../../../../static/img/fenxiang.png" @click="fenxiang">
        <p>面对面邀请</p>
      </div>
    </section>
    <section class="invite_num">
      <div class="invite_num_style">
        <p>累计收益</p>
        <p><span>0</span>元</p>
      </div>
      <div class="invite_num_style invite_people">
        <p>成功邀请</p>
        <p><span>0</span>人</p>
      </div>
    </section>
    <p class="income_detail">-收益明细-</p>
    <section class="incom_tips">
      <img src="../../../../../static/img/qianbao.png">
      <p>还不赶紧去邀请好友</p>
    </section>

    <bounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText"></bounced>

  </div>

</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  import bounced from '../../../../components/bounced/bounced.vue'
  export default {
    components: {
      vheader,
      bounced
    },
    data () {
      return {
        showAlert: false,
        alertText: ''
      }
    },
    methods: {
      backToFavorable () {
        this.$root.showintro = true
        window.localStorage.setItem('showintro', true)
        this.$router.push({path: '/favorable'})
      },
      alert_bounced () {
        this.showAlert = true
        this.alertText = '请在app中打开'
      }
    }
  }
</script>
<style scoped>
  @import './prize.css';
</style>
