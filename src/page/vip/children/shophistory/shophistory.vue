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
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  .shop-history {
    .box;
    .rel;
    min-height:100vh;
    .no-shopping{
      .abs;
      top:50%;
      left:50%;
      .trsl();
      font-size:.28rem;
      .tc;
      width:100%;
      height:3rem;
      img{
        height:2rem;
      }
    }
  }
</style>
