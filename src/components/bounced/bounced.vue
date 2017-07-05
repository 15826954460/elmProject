<template>
  <div class="bounced">
    <div class="comment_alert">
      <div class="alert-icon"><span class="fa fa-warning"></span></div>
      <p class="alert-text">{{alertText}}</p>
      <div class="close_alert" @click="closeAlert">确认</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    props: ['alertText'],
    methods: {
      closeAlert () {
        this.$emit('closeBounced')  //  触发组件中的 closeBounced 事件
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  .bounced {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: transparent;
  }
  .comment_alert {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    font-size: 0.24rem;
    animation: alert_move .4s linear;
    .alert-icon {
      font-size: 1.2rem;
      text-align: center;
      color: #F8CB86;
    }
    .alert-text {
      text-align: center;
      color: @4D;
      font-size:0.28rem;
    }
    .close_alert {
      width: 100%;
      background: @button;
      text-align: center;
      color: @default;
      line-height: .6rem;
      font-size: .4rem;
      margin-top: .4rem;
      border-radius: 0 0 5px 5px;
    }
  }

  @keyframes alert_move {
    0% {
      transform: translate(-50%, -50%) scale(.6);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -35%) scale(1.1)
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
</style>
