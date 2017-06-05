<template>
  <div class="foot-guide">
    <ul class="flex-wrapper">
      <router-link class="item-flex" to="/menu" tag="li">
        <dl>
          <dd><s class="fa fa-opencart"></s></dd>
          <dd>外卖</dd>
        </dl>
      </router-link>
      <router-link class="item-flex" to="/search" tag="li">
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
  export default {
    methods: {
    }
  }
</script>
<style scoped>
  @import './foot.css';
</style>
