<template>
  <div class="vip-big-box">

    <transition name="parent-slide" mode="out-in">
      <div class="vip-wrapper" v-show="!$root.isShowChildren">

        <vheader message="会员中心">
          <router-link to="/user" class="fa fa-angle-left" tag="header" slot="angle"></router-link>
        </vheader>

        <div class="pay-for-vip">为账户 {{userInfo.uName}} 购买会员</div>
        <ul>
          <li @click="goToChildren(description)" class="about-vip no-mt">
            <h4 class="about-vip-content">
              <span>会员特权</span>
              <span class="intro">会员说明</span>
            </h4>
            <span class="fa fa-angle-right"></span>
          </li>
          <li class="vip_detail">
            <div class="vip_detail_left"><img :src="sheng"></div>
            <div class="vip_detail_right">
              <h4>减免配送费</h4>
              <p>每月减免30单，每日可减免3单，每单最高减4元</p>
              <p>蜂鸟专送专享</p>
            </div>
          </li>
          <li class="vip_detail">
            <div class="vip_detail_left"><img :src="jifen"></div>
            <div class="vip_detail_right">
              <h4>减免配送费</h4>
              <p>每月减免30单，每日可减免3单，每单最高减4元</p>
              <p>蜂鸟专送专享</p>
            </div>
          </li>
        </ul>

        <section class="apply_vip">

          <div class="header_style">
            开通会员

          </div>
          <section class="apply_vip_buy">
            <div class="apply_vip_buy_left">
              <span>1个月</span>
              <span> ¥20</span>
            </div>
            <router-link to="/pay" tag="div" class="apply_vip_buy_right" @click="buyCart">购买</router-link>
          </section>

        </section>

        <div class="about-vip" @click="goToChildren(exchangevip)">
          <h4 class="about-vip-content">
            <span>兑换会员</span>
            <span class="">使用卡号密码</span>
          </h4>
          <span class="fa fa-angle-right"></span>
        </div>

        <div class="about-vip" @click="goToChildren(shopHistory)">
          <h4 class="about-vip-content">
            <span>购买记录</span>
            <span class="">开发票</span>
          </h4>
          <span class="fa fa-angle-right"></span>
        </div>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import vheader from '../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    data () {
      return {
        sheng: require('../../../static/img/sheng.jpeg'),
        jifen: require('../../../static/img/jifen.jpeg'),
        description: '/vip/description',
        exchangevip: '/vip/exchangeVip',
        shopHistory: '/vip/shophistory'
      }
    },
    computed: {
      userInfo () {
        return this.$store.getters.userInfo
      }
    },
    created () {
      // 页面第一次加载，以及子页面刷新，依然显示当前页面
      window.localStorage.getItem('isShowChildren') === 'false' ? this.$root.isShowChildren = false : window.localStorage.getItem('isShowChildren') === null ? this.$root.isShowChildren = false : this.$root.isShowChildren = true
    },
    methods: {
      goToChildren (variable) {
        this.$root.isShowChildren = true
        window.localStorage.setItem('isShowChildren', true)
        this.$router.push({path: variable})
      },
      buyCart () {
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @import '../../common/headerComment.less';
  @import '../../common/animate.less';
  .vip-big-box{
    overflow: hidden;
    width:100%;
    min-height:100vh;
    background:@f7;
    .vip-wrapper {
      min-height: 100vh;
      width: 100%;
      .box;
      .pt(.8rem);
      .pay-for-vip {
        font-size: .28rem;
        line-height: .6rem;
        font-weight: normal;
        .pl(.4rem);
        .pr(.4rem);
      }
      > ul {
        background: @default;
        .pl(.4rem);
        > li:not(:last-child) {
          border-bottom: 1px solid @ddd;
        }
        >.no-mt{
          .mt();
          .pl();
          .pt();
          .pb();
        }
        > li {
          width: 100%;
          .pt(.2rem);
          .pb(.2rem);
        }
        .vip_detail {
          .flex;
          height:1.4rem;
          .pr(.2rem);
          .vip_detail_left {
            flex:1;
            .rel;
            .tc;
            img {
              .abs;
              top:.1rem;
              left:50%;
              .trsx();
              width:80%;
            }
          }
          .vip_detail_right {
            flex:9;
            .pl(.1rem);
            > h4, > p {
              line-height: .3rem;
              .ellipsis;
              font-size: .24rem;
            }
          }
        }
      }
      .apply_vip {
        .mt(.2rem);
        background: @default;
        .pl(.4rem);
        .header_style {
          border-bottom: 1px solid #ddd;
          font-size: .28rem;
          line-height:.6rem;
          .mb(.2rem);
        }
        .apply_vip_buy {
          .flex;
          .pb(.2rem);
          .apply_vip_buy_left {
            .rel;
            height:.4rem;
            flex: 80%;
            line-height: .4rem;
            span{
              .abs;
              font-size:.24rem;
            }
            span + span {
              color: @org;
              .fw;
              font-size: .28rem;
              left:3.5rem;
            }
          }
          .apply_vip_buy_right {
            flex: 20%;
            .tc;
            color: @org;
            border: 1px solid @org;
            .b-r(5px);
            line-height:.4rem;
            .mr(.4rem);
            font-size:.28rem;
          }
        }
      }
    }
    .animateChildren;
    .animateParent
  }

  .about-vip {
    .pl(.4rem);
    .pr(.4rem);
    font-size: .28rem;
    color: @black;
    .mt(.2rem);
    background: @default;
    line-height: .6rem;
    .rel;
    .about-vip-content {
      .flex;
      font-weight: normal;
      > span {
        flex: 1;
        font-size:.24rem;
      }
      > span + span {
        .tr;
        color: #999;
        .pr(.3rem);
      }
    }
    .fa-angle-right {
      .vc;
      right: .4rem;
      font-size: .4rem;
    }
  }
</style>
