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
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  .reset-wrapper {
    .box;
    .rel;
    .pt(1rem);
    font-size: 0;
    min-height: 100vh;
    .reset-box {
      width: 100%;
      background: @default;
      .mb(.3rem);
      .input_container {
        height: .8rem;
        width: 100%;
        .flex;
        .pl(.2rem);
        .pr(.2rem);
        .pt(.1rem);
        .pb(.1rem);
        border-bottom: 1px solid @ddd;
        > input {
          margin: 0;
          padding: 0;
          flex:3;
          font-size: .28rem;
          outline: none;
          background: @default;
          border: none;
        }
        > button {
          flex:1;
          border: none;
          font-size: .28rem;
          color: @default;
          background: @button;
          .b-r(5px);
          .ml(.2rem);
          outline:none;
        }
        > .rightPhoneNumber {
          background: @ddd;
          color: @black;
        }
      }
    }
    .update-wrapper {
      .pl(.2rem);
      .pr(.2rem);
      width: 100%;
      > button {
        width: 100%;
        border: none;
        font-size: .32rem;
        color: @default;
        line-height: .6rem;
        background: @button;
        .b-r(5px);
        outline:none;
      }
    }

    .alert-warning {
      width: 80%;
      .abs;
      top: 50%;
      left: 50%;
      z-index: 5;
      background: @default;
      .b-r(5px);
      .trsl();
      font-size: 1.2rem;
      .warning {
        .tc;
        .pt(.4rem);
        .fa-warning {
          font-size: 1.2rem;
          color: #F8CB86;
        }
      }
      .text {
        .tc;
        line-height: .4rem;
        font-size: .32rem;
      }
      .sure {
        border: none;
        background: #4CD964;
        font-size: .36rem;
        color: @default;
        width: 100%;
        line-height: .6rem;
        .fw;
        border-radius: 0 0 5px 5px;
      }
    }
  }

  .alert-warning-enter-active {
    animation: alert-warning-in .3s linear;
  }

  .alert-warning-leave-active {
    animation: alert-warning-out .3s linear;
  }

  @keyframes alert-warning-in {
    0% {
      transform: translate(-50%, -50%) scale(0.2) rotateY(360deg)
    }
    100% {
      transform: translate(-50%, -50%) scale(1) rotateY(0deg)
    }
  }

  @keyframes alert-warning-out {
    0% {
      transform: translate(-50%, -50%)
    }
    100% {
      transform: translate(-50%, -50%) scale(0.1)
    }
  }
</style>
