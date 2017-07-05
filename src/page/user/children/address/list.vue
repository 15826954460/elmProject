<template>
  <div class="address-detail-wrapper">

    <vheader message="搜索地址" back="true">
      <router-link to="/user/add" class="fa fa-angle-left" tag="span" slot="angle"></router-link>
    </vheader>

    <div class="add-detail">
      <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress" @input="inputThing">
      <button @click="sureChange()">确认</button>
    </div>
    <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
    <ul class="address-list-wrapper" v-show="!isShowWarning">
      <li v-for="(item, index) in addDetailList" @click="listClick(item, index)">
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
      </li>
    </ul>
    <div class="point" v-show="isShowWarning">
      <p>找不到地址？</p>
      <p>请尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入哦。</p>
    </div>
  </div>
</template>
<script>
  import vheader from '../../../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    data () {
      return {
        isShowWarning: true,  // 控制addresslist是否显示
        isJump: false,  // 控制是否跳转回到新增地址页
        inputAdress: '' // 地址
      }
    },
    computed: {
      addDetailList () {  // 计算属性获取数据
        return this.$store.getters.addDetail
      }
    },
    methods: {
      listClick (item, index) {  // 改变当前显示的详细地址
        window.localStorage.setItem('inputAdress', item.name)
        this.inputAdress = window.localStorage.getItem('inputAdress')
        this.isJump = true
      },
      inputThing () {  // 显示地址列表数据
        this.isShowWarning = false
      },
      sureChange () {
        if (this.isJump === true) {  // 所有输入过符合要求才能跳转页面
          this.$router.push({path: '/user/add'})
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../common/comment.less';
  @import '../../../../common/headerComment.less';
  .address-detail-wrapper{
    .box;
    min-height:100vh;
    padding-top:.8rem;
    background:#f2f2f2;
    .add-detail{
      background:@default;
      font-size:0;
      height:1.2rem;
      .flex;
      padding:.3rem .2rem;
      >input{
        border:1px solid @4D;
        outline:none;
        .b-r(5px);
        .mr(.2rem);
        width:80%;
        font-size:.28rem;
        .pl(.2rem);
        .b-r(5px)
      }
      >button{
        flex:1;
        border:none;
        color:@default;
        font-size:.28rem;
        background:@background;
        .b-r(3px);
        outline:none;
      }
    }
    .warnpart{
      line-height:.6rem;
      background:#FFF6E4;
      color:#FF883F;
      font-size:.24rem;
      .tc;
    }
    .address-list-wrapper{
      >li{
        padding:.2rem;
        border-bottom:1px solid @ddd;
        background:#F2F2F2;
        p{
          line-height:.4rem;
          font-size:.28rem;
          color:#999;
        }
      }
    }
    .point{
      .abs;
      top:50%;
      left:50%;
      .trsl();
      width:80%;
      font-size:.28rem;
      .tc;
      line-height:.6rem;
    }
  }
</style>
