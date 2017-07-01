<template>
  <div class="order_note_wrapper">
    <vhead message="订单备注">
      <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
    </vhead>
    <div class="speed_note">
      <span v-for="item in nodeType">{{item}}</span>
    </div>
    <div class="other_note">
      <span>其他备注</span>
      <textarea name="" id="" cols="30" rows="4" placeholder="请输入备注内容（可不填）"></textarea>
    </div>
    <span>确定</span>
  </div>
</template>
<script>
  import vhead from '../../../components/header/header.vue'
  export default {
    data () {
      return {
        nodeType: [
          '不要辣', '少点辣', '多点辣', '不要香菜', '不要洋葱', '多点醋', '多点葱', '去冰', '少冰'
        ]
      }
    },
    components: {
      vhead
    },
    methods: {
      backToConfirmOrder () {
        this.$router.push({path: '/confirmOrder'})
        window.sessionStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import './orderNote.css';
</style>
