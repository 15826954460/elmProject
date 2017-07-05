<template>
  <header class="comment_header">
    <slot name="angle"></slot>
    <slot name="elm"></slot>
    <span class="title_text" v-if="message">{{message}}</span>
    <slot name="fa-user-o"></slot>
    <slot name="change_city"></slot>
    <slot name="fa-search"></slot>
    <slot name="edit"></slot>
    <slot name="login"></slot>
    <slot name="reset_secret"></slot>
  </header>
</template>
<script>
  export default {
    props: ['message', 'back'] // 接受父组件传过来的值
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  .comment_header {
    height: .8rem;
    line-height: .8rem;
    background: @background;
    color: @default;
    text-align: center;
    font-size: .36rem;
    position: fixed;
    width:100%;
    top: 0;
    z-index: 5;
    .fa-angle-left {
      font-size: .6rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: .3rem;
      color: @default;
    }
    .head_logo {
      font-size: .4rem;
      .abs;
      top: 50%;
      .trsy();
      left: .3rem;
    }
    .fa-user-o {
      font-size: .5rem;
      .abs;
      right: .3rem;
      top: 50%;
      .trsy();
    }
    .fa-chevron-left {
      .abs;
      left: .3rem;
      top: 50%;
      .trsy();
    }
    .change_city {
      color: @default;
      .abs;
      right: .3rem;
      top: 50%;
      .trsy();
      font-size: .28rem;
    }
    .fa-search {
      .abs;
      top: 50%;
      .trsy();
      left: .3rem;
    }
    .edit,
    .login,
    .reset_secret
    {
      .abs;
      .vc;
      right:.3rem;
      font-weight:normal;
    }
  }

</style>
