<template>
  <div class="choose_address_box">
    <transition name="parent-slide" mode="out-in">
      <div class="choose_address_wrapper" v-show="!showChildrenAddress">
        <vhead message="选择地址">
          <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
        </vhead>
        <p class="add_address" @click="goToChildrenComponent"><i class="fa fa-plus-square"></i>新增收获地址</p>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import vhead from '../../../components/header/header.vue'
  export default {
    data () {
      return {}
    },
    components: {
      vhead
    },
    computed: {
      ...mapGetters(['showChildrenAddress'])
    },
    mounted () {
      // 页面刷新，保持当前状态
      let win = window.localStorage
      if (win.getItem('showChildrenAddress') === null || win.getItem('showChildrenAddress') === 'false') {
        this.$store.commit('setShowChildrenAddress', false)
      } else {
        this.$store.commit('setShowChildrenAddress', true)
      }
    },
    methods: {
      backToConfirmOrder () { // 跳回到确认订单页
        this.$router.push({path: '/confirmOrder'})
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      },
      goToChildrenComponent () { // 跳转到子路由
        this.$store.commit('setShowChildrenAddress', true)
        window.localStorage.setItem('showChildrenAddress', true)
        this.$router.push({path: '/confirmOrder/chooseAddress/address'})
      }
    }
  }
</script>
<style scoped>
  @import './chooseAddress.css';
</style>
