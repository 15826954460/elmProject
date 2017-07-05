<template>
  <div class="foot-guide">
    <ul class="flex-wrapper">
      <router-link class="item-flex" to="/menu" tag="li">
        <dl>
          <dd><s class="fa fa-opencart"></s></dd>
          <dd>外卖</dd>
        </dl>
      </router-link>
      <router-link class="item-flex" to="/searchBusiness" tag="li">
        <dl>
          <dd><i class="fa fa-search"></i></dd>
          <dd>搜索</dd>
        </dl>
      </router-link>
      <router-link class="item-flex" to="/order" tag="li">
        <dl>
          <dd><i class="fa fa-reorder"></i></dd>
          <dd>订单</dd>
        </dl>
      </router-link>
      <router-link class="item-flex" to="/user" tag="li">
        <dl>
          <dd><i class="fa fa-user-o"></i></dd>
          <dd>我的</dd>
        </dl>
      </router-link>
    </ul>
  </div>
</template>
<script>
</script>
<style scoped lang="less">
  @import '../../common/comment.less';
  @background: #3190E8;
  @4d: #4d4d4d;
  .foot-guide {
    .fix;
    bottom: 0;
    z-index: 5;
    width: 100%;
    background: @default;
    .flex-wrapper {
      .flex;
      line-height: .4rem;
      .item-flex {
        border-top: 2px solid @ddd;
        .tc;
        flex: 1;
        font-size: 0.24rem;
      }
      .fa-opencart, .fa-search, .fa-reorder, .fa-user-o {
        font-size: .3rem;
      }
    }
  }
  .router-link-active {
    color: @background;
  }
</style>
