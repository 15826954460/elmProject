<template>
  <div class="star">
    <i v-for="n in parseInt(countType.onCount)" class="onCount"></i>
    <i v-for="n in parseInt(countType.halfCount)" class="halfCount"></i>
    <i v-for="n in parseInt(countType.offCount)" class="offCount"></i>
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
        allNum: 5
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

