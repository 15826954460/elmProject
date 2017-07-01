<template>
  <div class="invoice_wrapper">
    <vhead message="选择发票抬头">
      <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
    </vhead>
  </div>
</template>
<script>
  import vhead from '../../../components/header/header.vue'
  export default {
    data () {
      return {}
    },
    components: {
      vhead
    },
    methods: {
      backToConfirmOrder () {
        this.$router.push({path: '/confirmOrder'})
        window.sessionStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './invoice.css';
</style>
