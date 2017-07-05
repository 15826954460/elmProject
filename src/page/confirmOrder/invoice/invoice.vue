<template>
  <div class="invoice_wrapper">
    <vhead message="选择发票抬头">
      <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
    </vhead>
    <p class="invoice_info">不需要开发票 <i class="fa fa-check-circle" :class="{click:getInvioce}" @click="getInvioce = !getInvioce"></i></p>
    <p class="btn" @click="backToConfirmOrder">确定</p>
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
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../common/comment.less';
  .invoice_wrapper{
    font-size:12px;
    .pt(1.2rem);
    min-height:100vh;
    background:@f7;
    .invoice_info{
      background:@default;
      padding:.2rem;
      font-size:14px;
      .mb(.2rem);
      i{
        .rf;
        font-size:20px;
      }
      .click{
        color:@btn;
      }
    }
    .btn{
      width:95%;
      background: @btn;
      color:@default;
      font-size:16px;
      line-height:.8rem;
      .tc;
      margin:0 auto;
      .b-r(5px);
    }
  }
</style>
