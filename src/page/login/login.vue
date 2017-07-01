<template>
  <div class="login_wrapper">
    <vhead message="密码登陆">
      <span class="fa fa-angle-left" slot="angle" @click="$router.go(-1)"></span>
     </vhead>
    <div class="login_box">
      <div class="user_name_input">
        <input type="text" placeholder="账号">
      </div>
      <div class="user_pwd_input">
        <input type="password" placeholder="密码" v-show="">
        <input type="text" placeholder="密码">
      </div>
      <div class="user_yzm_input">
        <input type="text" placeholder="验证码">
        <div>
          <img src="" alt="">
          <div>
            <p>看不请</p>
            <a>换一张</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vhead from '../../components/header/header.vue'
  export default {
    data () {
      return {}
    },
    components: {
      vhead
    }
  }
</script>
<style lang="less" scoped>
  @import 'login.css';
</style>
