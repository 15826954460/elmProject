<template>
  <div class="integral-wrapper">

    <div class="integral-content">
      <router-link to='/user' class="downLoad-top" tag="h2">
        您还没有积分
      </router-link>
      <p>请返回积分商城重新登陆......</p>
      <img src="//yun.duiba.com.cn/webapp/img/retrylogin.png" alt="">
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  .integral-wrapper {
    min-height: 100vh;
    .rel;
    font-size:0;
    .integral-content{
      .tc;
      .abs;
      top:50%;
      left:50%;
      .trsl();
      >h2{
        font-size:.4rem;
        color:@background;
      }
      >p{
        font-size:.28rem;
        line-height:.8rem;
      }
      >img{
        width:2rem;
      }
    }
  }
</style>
