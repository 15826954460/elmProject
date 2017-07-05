<template>
  <div class="menu_detail_wrapper" v-if="foods">
    <vheader :message="foods.name">
      <span class="fa fa-angle-left" slot="angle" @click="closeMenuDetail"></span>
    </vheader>
    <section class="content_wrapper">

      <img :src="getImgPath(foods.image_path)">
      <div class="content">
        <p>{{foods.description}}</p>
        <div>
          <h3>{{foods.name}}</h3>
          <p><span>评分 </span>
            <vstar :rating="foods.rating"></vstar>
            <span>{{foods.rating}}</span></p>
          <p><span>月销 {{foods.month_sales}} 单</span><span class="sale_pay">售价￥{{foods.specfoods[0].price}}起</span></p>
          <p><span>评论数 {{foods.satisfy_count}} </span><span class="good_appraise">好评率{{foods.satisfy_rate}}%</span></p>
        </div>
      </div>

    </section>
  </div>
</template>
<script>
  import vheader from '../header/header.vue'
  import vstar from '../start/star.vue'
  import {getImgPath} from '../../mixin/getPath'
  export default {
    props: ['foods'],
    components: {
      vheader,
      vstar
    },
    mixins: [getImgPath],
    methods: {
      closeMenuDetail () {
        this.$emit('childSay')
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/comment.less';
  .menu_detail_wrapper {
    .pt(.8rem);
    width: 100%;
    .content_wrapper {
      img {
        width: 100%;
      }
      .content {
        padding: .2rem;
        div {
          h3 {
            line-height: .5rem;
          }
          p {
            line-height:.4rem;
            .sale_pay {
              color: @org;
              .ml(.2rem);
            }
            .good_appraise {
              .ml(.2rem);
            }
          }
        }
      }
    }
  }
</style>
