<template>
  <div class="invoice_wrapper">
    <vhead message="选择发票抬头">
      <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
    </vhead>
    <p class="invoice_info">不需要开发票 <i class="fa fa-check-circle" :class="{click:getInvioce}" @click="getInvioce = !getInvioce"></i></p>
    <p class="btn" @click="goToConfirmOrder">确定</p>
  </div>
</template>
<script>
  import vhead from '../../../components/header/header.vue'
  export default {
    data () {
      return {
        getInvioce: false
      }
    },
    components: {
      vhead
    },
    methods: {
      backToConfirmOrder () {
        this.$router.push({path: '/confirmOrder'})
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      },
      goToConfirmOrder () {
        this.$router.push({path: '/confirmOrder'})
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './invoice.css';
</style>
