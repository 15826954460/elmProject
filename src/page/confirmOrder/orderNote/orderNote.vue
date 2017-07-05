<template>
  <div class="order_note_wrapper">
    <vhead message="订单备注">
      <span class="fa fa-angle-left" slot="angle" @click="backToConfirmOrder"></span>
    </vhead>
    <div class="speed_note">
      <p class="speed_note_title">快速备注</p>
      <ul class="speed_note_type" v-if="remark">
        <li v-for="(items, itemsIndex) in remark.remarks" class="remark_list_li">
          <span v-for="(item, itemIndex) in items"
                class="remark_list_span"
                :class="{other: itemIndex !== 0 && itemIndex !== (items.length -1),
                first: itemIndex === 0, last: itemIndex === (items.length -1), choose: remarkObj[itemsIndex]&&(remarkObj[itemsIndex][0] === itemIndex)}"
                @click="chioceType(item, itemsIndex, itemIndex)">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="other_note">
      <p class="other_note_p">其他备注</p>
      <textarea name="" id="" cols="30" rows="4" placeholder="请输入备注内容（可不填）"></textarea>
    </div>
    <p class="speed_btn" @click="goToConfirmOrder">确定</p>
  </div>
</template>
<script>
  import vhead from '../../../components/header/header.vue'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        remarkObj: {}
      }
    },
    computed: {
      ...mapGetters(['remark'])
    },
    components: {
      vhead
    },
    methods: {
      backToConfirmOrder () {
        this.$router.push({path: '/confirmOrder'})
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      },
      // 多个列表累加选择
      chioceType (item, itemsIndex, itemIndex) {
        this.remarkObj[itemsIndex] = [itemIndex, item]
        this.remarkObj = Object.assign({}, this.remarkObj)
        window.localStorage.setItem('remarkObj', JSON.stringify(this.remarkObj))
        this.$store.commit('setRemarkObj', this.remarkObj)
      },
      goToConfirmOrder () {
        this.$router.push({path: '/confirmOrder'})
        window.localStorage.setItem('cnofirmShowChildren', false)
        this.$store.commit('setCnofirmShowChildren', false)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../common/comment.less';
  .order_note_wrapper{
    min-height:100vh;
    background:@f7;
    .pt(1rem);
    font-size:12px;
    .speed_note{
      background:@default;
      padding:10px;
      .speed_note_title{
        color:@333;
        font-size:16px;
      }
      .speed_note_type{
        .remark_list_li{
          .mt(.2rem);
          border:1px solid @background;
          .b-r(3px);
          .inb;
          .mr(.2rem);
          .remark_list_span{
            .inb;
            padding:.2rem;
            font-size:14px;
          }
          .first{
            border-right:1px solid @background;
          }
          .other{
            border-right:1px solid @background;
          }
          .last{
            border:none;
          }
          .choose{
            background: @background;
            color:@default;
          }
        }
      }
    }
    .other_note{
      padding:10px;
      background:@default;
      .mt(.2rem);
      .other_note_p{
        .mb(.2rem);
        font-size:14px;
      }
      textarea{
        width:100%;
        .b-r(5px);
        padding:10px;
      }
    }
    .speed_btn{
      margin:0 auto;
      .tc;
      width:95%;
      color:@default;
      font-size:16px;
      background:@btn;
      .b-r(5px);
      line-height:.8rem;
    }
  }
</style>
