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
  </header>
</template>
<script>
  export default {
    props: ['message', 'back'] // 接受父组件传过来的值
  }
</script>
<style scoped>
  @import 'header.css';
</style>
