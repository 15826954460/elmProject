<template>
  <div class="star">
    <i v-for="n in parseInt(countType.onCount)" class="onCount" :style="{backgroundImage:'url('+ onCount_bg + ')'}"></i>
    <i v-for="n in parseInt(countType.halfCount)" class="halfCount" :style="{backgroundImage:'url('+ halfCount_bg + ')'}"></i>
    <i v-for="n in parseInt(countType.offCount)" class="offCount" :style="{backgroundImage:'url('+ offCount_bg + ')'}"></i>
  </div>
</template>

<script>
  export default {
    props: ['rating'],
    data: function () {
      return {
        start: 0,
        onCount: 0, // 满星的个数
        offCount: 0, // 全灰的个数
        halfCount: 0, // 半星的个数
        allNum: 5,
        onCount_bg: require('../../../static/star/star36_on@2x.png'),
        offCount_bg: require('../../../static/star/star36_off@2x.png'),
        halfCount_bg: require('../../../static/star/star36_half@2x.png')
      }
    },
    computed: {
      countType () {
        let obj = {}
        this.start = parseFloat(parseInt(parseFloat(this.rating) * 2) / 2)
        this.onCount = parseInt(this.start)
        if (this.start % 1 === 0) {
          this.offCount = this.allNum - this.start
          this.halfCount = 0
        } else {
          this.halfCount = 1
          this.offCount = this.allNum - this.onCount - 1
        }
        obj.onCount = this.onCount
        obj.halfCount = this.halfCount
        obj.offCount = this.offCount
        return obj
      }
    }
  }
</script>

<style lang="less" scoped>
  @import 'star.css';
</style>

