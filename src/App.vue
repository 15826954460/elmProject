<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    created () {
      this.$nextTick(function () {
        this.$store.dispatch('hotCity')
        this.$store.dispatch('groupCity')
        this.$store.dispatch('searchData')
        this.$store.dispatch('foodTypesData')
        this.$store.dispatch('shopListData')
        this.$store.dispatch('businessData')
        this.$store.dispatch('orderListData')
        this.$store.dispatch('orderDetailData')
        this.$store.dispatch('addDetailData')
        this.$store.dispatch('service')
        this.$store.dispatch('hongbaoList')
        this.$store.dispatch('shopDetails')
        this.$store.dispatch('shopMenu')
        this.$store.dispatch('ratingList')
        this.$store.dispatch('scores')
        this.$store.dispatch('tage')
      })
    }
  }
</script>

<style>
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
