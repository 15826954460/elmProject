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
          <img src="../../../../../static/img/yzm.jpg">
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
<style scoped>
  @import './hongbao.css';
</style>
