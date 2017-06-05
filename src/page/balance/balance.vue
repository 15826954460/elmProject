<template>
  <div class="balance-box">

    <transition name="parent-slide" mode="out-in">

      <div class="balance-wrapper" v-show="$root.showDetail">

        <vheader message='我的余额'>
          <router-link to='/user' class='fa fa-angle-left' slot='angle' tag="span"></router-link>
        </vheader>

        <section class="content_container">
          <section class="content">
            <header class="content_header">
              <span class="content_title_style">当前余额</span>
              <section class="contetn_description">
                <img src="../../../static/icon/description.png">
                <span class="content_title_style" @click="balancedetail">余额说明</span>
              </section>
            </header>
            <p class="content_num">
              <span class="strong_num">0.00</span>
              <span>分</span>
            </p>
            <div class="promit_button" @click="usePoint">提现</div>
          </section>
        </section>

        <p class="deal_detail">交易明细</p>
        <div class="no_log">
          <img src="../../../static/img/no-log.png">
          <p>暂无明细记录</p>
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
    components: {
      vheader,
      alertBounced
    },
    created () {
      let detail = window.localStorage.getItem('showDetail')
      if (detail === null) { // 本地没有值得情况下，就手动赋值
        this.$root.showDetail = true
      } else if (detail === 'false') {
        this.$root.showDetail = false
      } else {
        this.$root.showDetail = true
      }
    },
    data () {
      return {
        showAlert: false,
        alertText: ''
      }
    },
    methods: {
      usePoint () {
        this.showAlert = true
        this.alertText = '您暂时还没有余额，赶紧去充值吧'
      },
      balancedetail () {
        this.$root.showDetail = false
        window.localStorage.setItem('showDetail', false)
        this.$router.push({path: '/balance/balancedetail'})
      }
    }
  }
</script>
<style scoped>
  @import './balance.css';
</style>
