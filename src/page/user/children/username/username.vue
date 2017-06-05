<template>
  <div class="username-wrapper">

    <vheader message="修改用户名" back="true">
      <router-link to="/user/info" tag="span" class="fa fa-angle-left" slot="angle"></router-link>
    </vheader>

    <div class="set-name-box">
      <div class="set-name">
        <input type="text" placeholder="请输入用户名" v-model="nameText">
        <span class="waring-info" v-show="isShowWarning">请输入正确的用户名</span>
      </div>
      <h5>用户名只能修改一次 （5-24字符之间）</h5>
      <button @click="sureReplay()">确认修改</button>
    </div>
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
        nameText: '',
        isShowWarning: false
      }
    },
    created () {
    },
    methods: {
      sureReplay () {
          // 验证用户名是否符合要求
        let reg = /^\w.{5,24}$/
        if (reg.test(this.nameText)) {
          this.$store.commit('setUserInfoName', this.nameText)
          this.nameText = ''
          setTimeout(() => {
            this.$root.isShowUser = true
            window.localStorage.setItem('state', true)  // 保存本地属性
            this.$router.push({path: '/user'})
          }, 100)
          setTimeout(() => {
            this.$root.isShowUser = false
            window.localStorage.setItem('state', false)  // 保存本地属性
            this.$router.push({path: '/user/info'})
          }, 1000)
        } else {
          this.isShowWarning = true
        }
      }
    }
  }
</script>
<style scoped>
  @import './username.css';
</style>
