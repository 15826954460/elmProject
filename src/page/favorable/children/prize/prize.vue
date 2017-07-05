<template>

  <div class="prize-wrapper">

    <vheader message='推荐有奖'>
      <span class='fa fa-angle-left' slot='angle' @click="backToFavorable"></span>
    </vheader>

    <section class="activity_banner">
      <img :src="activity_img">
    </section>
    <section class="invite_firend">
      <div class="invite_firend_style" @click="alert_bounced">
        <img :src="weixin_img">
        <p>邀请微信好友</p>
      </div>
      <div class="invite_firend_style" @click="alert_bounced">
        <img :src="qq_img">
        <p>邀请QQ好友</p>
      </div>
      <div class="invite_firend_style" @click="alert_bounced">
        <img :src="fenxiang_img">
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
      <img :src="qianbao_img">
      <p>还不赶紧去邀请好友</p>
    </section>

    <bounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText"></bounced>

  </div>

</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  import bounced from '../../../../components/bounced/bounced.vue'
  export default {
    data () {
      return {
        activity_img: require('../../../../../static/img/activity.png'),
        weixin_img: require('../../../../../static/img/weixin.png'),
        qq_img: require('../../../../../static/img/qq.png'),
        fenxiang_img: require('../../../../../static/img/fenxiang.png'),
        qianbao_img: require('../../../../../static/img/qianbao.png'),
        showAlert: false,
        alertText: ''
      }
    },
    components: {
      vheader,
      bounced
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
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  .prize-wrapper {
    .pt(.8rem);
    min-height: 100vh;
    background: @f7;
    .activity_banner {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .invite_firend {
      .flex;
      font-size: .24rem;
      .invite_firend_style {
        flex: 1;
        .tc;
        .pt(.3rem);
        .pb(.3rem);
        background: @default;
        img {
          width: .8rem;
        }
        p {
          line-height: .4rem;
        }
      }
    }
    .invite_num {
      .flex;
      .pt(.4rem);
      .pb(.4rem);
      .invite_num_style {
        flex: 1;
        .tc;
        font-size: .24rem;
        span {
          color: red;
          .fw;
          font-size: .4rem;
        }
      }
      .invite_people {
        border-left: 1px solid @ddd;
      }
    }
    .income_detail {
      font-size: .24rem;
      .tc;
    }
    .incom_tips {
      .tc;
      font-size: .24rem;
      .mt(.3rem);
      img {
        width: .6rem;
      }
      p {
        line-height: .4rem;
        .tc;
      }
    }
  }
</style>
