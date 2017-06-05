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
<style scoped>
  @import './bounced.css';
</style>
