<template>
  <div class="add_address">
    <vhead message="搜索">
      <span class="fa fa-angle-left" slot="angle" @click="backToAddAddress"></span>
    </vhead>
    <div class="warn_wrapper">
      <p>找不到地址？</p>
      <p>尝试输入小区，写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入</p>
    </div>
    <div></div>
  </div>
</template>
<script>
  import vhead from '../../../../../components/header/header.vue'
  export default {
    data () {
      return {}
    },
    components: {
      vhead
    },
    methods: {
      backToAddAddress () {
        this.$router.push({path: './confirmOrder/confirmOrder/address'})
      }
    }
  }
</script>
<style scoped>
  @import 'addAddress.css';
</style>
