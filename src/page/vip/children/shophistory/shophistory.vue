<template>
  <div class="shop-history">
    <vheader message="购买记录">
      <span class="fa fa-angle-left" @click="goToVip" slot="angle"></span>
    </vheader>
    <div class="no-shopping">
      <img :src="no_log_img" alt="">
      <p>您暂时还没有购买记录</p>
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
        no_log_img: require('../../../../../static/img/no-log.png')
      }
    },
    methods: {
      goToVip () {
        this.$root.isShowChildren = false
        window.localStorage.setItem('isShowChildren', false)
        this.$router.push({path: '/vip'})
      }
    }
  }
</script>
<style scoped>
  @import './shophistory.css';
</style>
