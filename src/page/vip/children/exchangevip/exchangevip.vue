<template>
  <div class="exchangevip-wrapper">

    <vheader message="兑换会员">
      <span class="fa fa-angle-left" @click="goToVip" slot="angle"></span>
    </vheader>

    <p class="buy_for">成功兑换后将关联到当前帐号： <span>{{userInfo.uName}}</span></p>
    <input type="text" class="input-comment" v-model="cartNumber" placeholder="请输入16位卡号" maxlength="16"
           @input="cardTest">
    <input type="text" class="input-comment style_input" v-model="passWord" placeholder="请输入6位卡密" maxlength="6"
           @input="pwdTest">
    <p class="determine" :class="{could_pay: couldPay}" @click="confrimPay">兑换</p>
    <footer class="Binding">
      <h3>——温馨提示——</h3>
      <p class="comment-sweet">新兑换的会员服务，权益以「会员说明」为准。</p>
      <p class="comment-sweet">月卡：<b>30次</b>减免配送费。</p>
      <p class="comment-sweet">季卡：<b>90次</b>减免配送费。</p>
      <p class="comment-sweet">年卡：<b>360</b>次减免配送费。</p>
      <p class="comment-sweet">＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
    </footer>

    <alertBounced @closeBounced="isShowExchangevip = false" :alertText="alertText" v-show="isShowExchangevip">
    </alertBounced>

  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  import alertBounced from '../../../../components/bounced/bounced.vue'
  export default {
    components: {
      vheader,
      alertBounced
    },
    data () {
      return {
        cartNumber: '',  // 卡号
        passWord: '',  //  密码
        couldPay: false,  // 背景颜色变亮
        showAlert: false,  // 弹框
        ctrl1: false,
        ctrl2: false,
        isShowExchangevip: false,
        alertText: null // 弹框消息
      }
    },
    methods: {
      goToVip () {  // 回到vip页面
        this.$root.isShowChildren = false
        window.localStorage.setItem('isShowChildren', false)
        this.$router.push({path: '/vip'})
      },
      cardTest () {  // 验证卡号
        let reg = /^\d{16}$/
        if (reg.test(this.cartNumber)) {
          this.ctrl1 = true
        } else {
          this.ctrl1 = false
        }
        if (this.ctrl2 === true && this.ctrl1 === true) {
          this.couldPay = true
        }
      },
      pwdTest () {  // 验证密码
        let reg = /^\d{6}$/
        if (reg.test(this.passWord)) {
          this.ctrl2 = true
        } else {
          this.ctrl2 = false
        }
        if (this.ctrl2 === true && this.ctrl1 === true) {
          this.couldPay = true
        }
      },
      confrimPay () { // 显示弹框
        this.isShowExchangevip = true
        if (this.couldPay === true) {
          this.alertText = '配送会员卡不存在'
        } else {
          this.alertText = '您的输入有误,请重新输入'
        }
        // 清除消息
        this.cartNumber = ''
        this.passWord = ''
      }
    },
    computed: {
      userInfo () {
        return this.$store.getters.userInfo
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  .exchangevip-wrapper{
    background:@f7;
    min-height:100vh;
    width:100%;
    .box;
    font-size:0;
    .rel;
    .buy_for{
      font-size:.28rem;
      .pl(.3rem);
      line-height:.8rem;
    }
    .input-comment{
      width:100%;
      background:@default;
      height:.7rem;
      .pl(.2rem);
      font-size:.28rem;
      border:none;
      outline: none;
    }
    .determine{
      width:90%;
      margin:0 auto;
      font-size:.32rem;
      color:@default;
      background:@ddd;
      .tc;
      line-height:.6rem;
      .b-r(5px);
      .fw;
      .mb(.4rem);
    }
    .could_pay{
      background:@button;
    }
    .style_input{
      .mb(.3rem);
      border-top:1px solid #ddd;
    }
    .Binding{
      h3{
        .tc;
        font-size:.36rem;
        font-weight:normal;
        .mb(.2rem);
      }
    }
    .comment-sweet{
      width:80%;
      font-size:.2rem;
      margin:0 auto;
      line-height:.4rem;
    }
  }
</style>
