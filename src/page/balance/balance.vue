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
                <img :src="description_icon">
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
          <img :src="no_log_png">
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
    data () {
      return {
        description_icon: require('../../../static/icon/description.png'),
        no_log_png: require('../../../static/img/no-log.png'),
        showAlert: false,
        alertText: ''
      }
    },
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
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/headerComment.less';
  @import '../../common/animate.less';
  .balance-box{
    .balance-wrapper{
      .box;
      min-height: 100vh;
      font-size: .24rem;
      width: 100%;
      .content_container {
        padding: 0 .2rem .2rem .2rem;
        background: @background;
        .content {
          background: @default;
          .b-r(2px);
          padding: .2rem;
          .content_header {
            .flex;
            .content_title_style {
              flex: 3;
            }
            .contetn_description {
              flex: 2;
              .tr;
              img {
                width: .2rem;
                .rel;
                top: -0.04rem;
              }
            }
          }
          .content_num {
            color: @4D;
            .mb(.2rem);
            .strong_num {
              font-size: .6rem;
            }
          }
          .promit_button {
            background: rgba(0,0,0,0.2);
            color: @default;
            font-size: .32rem;
            line-height: .6rem;
            .tc;
            .b-r(3px);
          }
        }
      }
      .deal_detail {
        padding: .3rem;
      }
      .no_log {
        .tc;
        img {
          width: 3rem;
        }
        p {
          line-height: .6rem;
        }
      }

    }
    .animateChildren;
    .animateParent;
  }
</style>
