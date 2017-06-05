<template>
  <div class="reset-wrapper">

    <vheader message="重置密码">
      <router-link to="/user/info" tag="span" class="fa fa-angle-left" slot="angle" ></router-link>
    </vheader>

        <section class="reset-box">
      <section class="input_container phone_number">
        <input type="text" placeholder="请输入手机号" name="phone" v-model="phone_num" @input="phoneNumber()">
        <button @click="getCode()" v-show="!showComputedTime">获取验证码</button>
        <button v-show="showComputedTime" :class="{rightPhoneNumber:right_Phone_Number}">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="secret" @input="newPassWord()">
      </section>
      <section class="input_container">
        <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="sure_secret" @input="confirmPassWord()">
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" v-model="validate_code" @input="mobileCode()">
      </section>
    </section>

    <div class="update-wrapper" @click="sureupdate">
      <button>确认修改</button>
    </div>

    <transition name="alert-warning">
      <div class="alert-warning" v-show="isShowAlert">
        <div class="warning"><span class="fa fa-warning"></span></div>
        <p class="text" v-show="!phone_pass">手机号填写有误</p>
        <p class="text" v-show="!secret_pass">密码必须是6到12位</p>
        <p class="text" v-show="!confirm_secret_pass ">两次输入密码不一致!!!</p>
        <p class="text" v-show="!code_pass">验证码必须是6位数字</p>
        <button class="sure" @click="know">确认</button>
      </div>
    </transition>

  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    data () {
      return {
        phone_num: '', // 电话号码
        secret: '', // 密码
        sure_secret: '', // 确认密码
        validate_code: '',  // 验证码
        right_Phone_Number: false, // 禁止点击
        showComputedTime: false, // 发送时间
        timer: null,
        phone_pass: '',  // 手机验证是否通过
        secret_pass: '',  // 密码验证是否通过
        confirm_secret_pass: '',  // 确认是否通过
        code_pass: '',  // 确认是否通过
        isShowAlert: false
      }
    },
    computed: {
      computedTime () {
        return this.$store.getters.computedTime
      }
    },
    methods: {
      phoneNumber () { // 验证手机号
        let reg = /^[1][35][0-9]{9}/
        this.phone_pass = reg.test(this.phone_num)
      },
      newPassWord () {  // 验证密码
        let reg = /^\w{6,12}$/
        this.secret_pass = reg.test(this.secret)
      },
      confirmPassWord () {
        if (this.secret !== this.sure_secret) {
          this.confirm_secret_pass = true
        }
      },
      mobileCode () { // 验证输入码
        let reg = /^\w{6}$/
        this.code_pass = reg.test(this.validate_code)
      },
      getCode () { // 获取验证码
        if (this.phone_pass === true) { // 手机符合要求就可以获取验证码
          this.right_Phone_Number = true  // 显示时间
          this.showComputedTime = true   // 显示背景
          this.timer = setInterval(() => { // 设置定时器
            if (this.computedTime > 0) {
              let num = this.computedTime
              num--
              this.$store.commit('setComputedTime', num)
            } else {
              clearInterval(this.timer)  // 清楚定时器
              this.right_Phone_Number = false  // 隐藏时间
              this.showComputedTime = false // 取消背景
              this.$store.commit('setComputedTime', 30)
            }
          }, 1000)
        }
      },
      sureupdate () {  // 条件不满足就显示弹出框
        if (this.phone_pass && this.secret_pass && this.confirm_secret_pass && this.code_pass) {
          this.isShowAlert = false
        } else {
          this.isShowAlert = true
        }
      },
      know () {
        this.isShowAlert = false
      }
    }
  }
</script>
<style scoped>
  @import './reset.css';
</style>
