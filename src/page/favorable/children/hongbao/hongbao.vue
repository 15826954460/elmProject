<template>
  <div class="hongbao-wrapper">

    <vheader message='兑换红包'>
      <span class='fa fa-angle-left' slot='angle' @click="backToFavorable"></span>
    </vheader>

    <div class="exchange_code">
      <input type="text" placeholder="请输入兑换码" v-model="exchangeCode" class="exchange_input" @input="dhm" maxlength="10">
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber" @input="yzm">
        <div class="img_change_img">
          <img :src="yzm_img">
          <div class="change_img" @click="">
            <p>换一张</p>
          </div>
        </div>
      </section>
    </div>

    <div class="determine" @click="exchange" :class="{active: status}">兑换</div>

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
        yzm_img: require('../../../../../static/img/yzm.jpg'),
        exchangeCode: '',
        codeNumber: '',
        showAlert: false,  // 弹框
        alertText: '',
        status: false,  // 背景颜色
        dhm_pass: '',
        yzm_pass: '',
        allTrue: false
      }
    },
    methods: {
      exchange () {
        this.showAlert = true
        if (this.allTrue === true) {
          this.alertText = '您的输入有误'
        } else {
          this.alertText = '验证码和兑换码不能为空'
        }
      },
      dhm () { // 模拟验证
        let reg = /^\w{6,10}$/
        this.dhm_pass = reg.test(this.exchangeCode)
        this.comment()
      },
      yzm () {
        let reg = /^\w{4}$/
        this.yzm_pass = reg.test(this.codeNumber)
        this.comment()
      },
      comment () { // 提取公用代码
        if (this.dhm_pass === true && this.yzm_pass === true) {
          this.allTrue = true
          this.status = true
        } else {
          this.status = false
        }
      },
      backToFavorable () {
        this.$root.showintro = true
        window.localStorage.setItem('showintro', true)
        this.$router.push({path: '/favorable'})
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  .hongbao-wrapper {
    .pt(.8rem);
    background: @f7;
    min-height: 100vh;
    .exchange_code {
      font-size: 0;
      padding: .2rem;
      .exchange_input {
        width: 100%;
        height: .6rem;
        outline: none;
        border: none;
        .pl(.2rem);
        .b-r(5px);
      }
      .input_container {
        .mt(.2rem);
        height: .6rem;
        .flex;
        input {
          flex: 4;
          height: .6rem;
          line-height: .6rem;
          .b-r(5px);
          outline: none;
          border: none;
          .pl(.2rem);
          .mr(.1rem);
        }
        .img_change_img {
          background: @default;
          flex:3;
          .inb;
          padding: .1rem;
          .rf;
          > img {
            height: 100%;
            width:50%;
            .lf;
          }
          .change_img {
            font-size:.24rem;
            .rf;
            p{
              line-height:.4rem;
            }
          }
        }
      }
    }
    .determine {
      .ml(.2rem);
      .mr(.2rem);
      color: @default;
      font-size: .32rem;
      background: rgba(0, 0, 0, 0.2);
      .b-r(5px);
      .tc;
      line-height: .6rem;
    }
    .active {
      background: @button;
    }
  }
</style>
