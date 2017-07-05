<template>
  <div class="login_wrapper">
    <vhead message="密码登陆">
      <span class="fa fa-angle-left" slot="angle" @click="$router.go(-1)"></span>
    </vhead>
    <div class="login_box">
      <div class="user_name_input input_box">
        <input type="text" placeholder="账号"
               v-model="inputzh"
               @input="enterAccount" maxlength="16">
      </div>
      <div class="user_pwd_input input_box">
        <input type="text" placeholder="密码"
               v-show="showInputText" maxlength="16"
               v-model="inputpwd" @input="enterPwd">
        <input type="password" placeholder="密码" maxlength="16"
               v-show="!showInputText"
               v-model="inputpwd" @input="enterPwd">

        <div class="ctrl_btn" :class="{background: !showPwd}">
          <p class="show_pwd" :class="{pwd: showPwd}" v-show="showPwd">......</p>
          <p class="show_abc" :class="{abc: !showPwd}" v-show="!showPwd">abcabc</p>
          <i class="round_doct" :class="{pwd: showPwd, abc: !showPwd}" @click="changeShowPwd"></i>
        </div>
      </div>
    </div>
    <p class="warm_prompt">温馨提示：未注册过的账号，登陆时将自动注册 <br>注册过的用户可凭账号密码登陆</p>
    <p class="login_btn" @click="login">登陆</p>
    <router-link to="/resetSecret" class="reset_pwd" tag="p">重置密码 ？</router-link>
    <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
    </alertBounced>
  </div>
</template>
<script>
  import vhead from '../../components/header/header.vue'
  import alertBounced from '../../components/bounced/bounced'
  export default {
    data () {
      return {
        showInputText: true,
        showPwd: true,
        inputzh: '',
        inputtext: '',
        inputpwd: '',
        showAlert: false,
        alertText: '',
        inputzhYz: false,
        inputpwdYz: false
      }
    },
    components: {
      vhead,
      alertBounced
    },
    methods: {
      changeShowPwd () { // 控制以何种方式显示密码
        this.showPwd = !this.showPwd
        if (this.showPwd === false) {
          this.showInputText = true
//          this.inputtext = this.inputpwd
        } else {
          this.showInputText = false
        }
      },
      enterAccount () {
        let reg = /^[0-9][a-z][A-Z]\w{6,16}/
        this.inputzhYz = reg.test(this.inputzh)
      },
      enterPwd () {
        this.showInputText = false
        let reg = /^\w{6,16}/
        this.inputpwdYz = reg.test(this.inputpwd)
      },
      login () {
        if (this.inputzh === '' || this.inputzh === false) {
          this.alertText = '请输入有效的账号'
          this.showAlert = true
        } else if (this.inputpwd === '' || this.inputpwd === false) {
          this.alertText = '请输入有效的密码'
          this.showAlert = true
        } else {
          let userInfo = {}
          this.$router.go(-1)
          userInfo.userName = this.inputzh
          userInfo.pwd = this.inputpwd
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  @f7: #f7f7f7;
  .login_wrapper {
    min-height: 100vh;
    background: @f7;
    font-size: 0;
    .pt(1.2rem);
    .login_box {
      .input_box {
        padding: 0.2rem 0.4rem;
        background: @default;
        font-size: 0;
        line-height: 1rem;
        .flex;
        >input {
          font-size: 14px;
          border: none;
          outline: none;
        }
      }
      .user_pwd_input {
        border-top: 1px solid @ddd;
        border-bottom: 1px solid @ddd;
        .rel;
        .background {
          background: @btn;
        }
        .ctrl_btn {
          .abs;
          .vc;
          border: 1px solid #ddd;
          height: .4rem;
          width: 1.2rem;
          .b-r(.2rem);
          right: .2rem;
          .show_pwd {
            font-size: 20px;
            width: 100%;
            height: .35rem;
            line-height: .35rem;
            .rel;
            top: -.1rem;
            .pl(.2rem);
          }
          .show_abc {
            font-size: 12px;
            width: 100%;
            height: .35rem;
            line-height: .35rem;
            .pl(.2rem);
          }
          .round_doct {
            width: .5rem;
            height: .5rem;
            background: @ddd;
            .b-r(50%);
            .abs;
            top: -0.08rem;
          }
          .pwd {
            left: -0.1rem;
          }
          .abc {
            right: -0.1rem;
          }
        }
      }
    }
    .warm_prompt {
      color: red;
      .pl(10px);
      font-size: 12px;
      line-height: .6rem;
    }
    .login_btn {
      width: 95%;
      color: @default;
      background: @btn;
      font-size: 16px;
      .tc;
      margin: 0 auto;
      .b-r(5px);
      line-height: .8rem;
    }
    .reset_pwd {
      color: @background;
      font-size: 14px;
      .mt(.4rem);
      .tr;
      .pr(.2rem);
    }
  }

</style>
