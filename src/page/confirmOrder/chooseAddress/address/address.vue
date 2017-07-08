<template>
  <div class="add_address_box">
    <transition name="parent-slide" mode="out-in">
      <div class="address_wrapper" v-show="!isShowAddAddress">
        <vhead message="添加地址">
          <span class="fa fa-angle-left" slot="angle" @click="backToChooseAddress"></span>
        </vhead>
        <section class="address_content">
          <div class="input_box">
            <label for="name">联系人</label>
            <div class="input_wrapper">
              <input type="text" placeholder="你的名字" id="name" v-model="inputname">
              <div class="six">
                <p class="man"><i class="fa fa-check-circle"
                                  :class="{sixActive:changeMan}"
                                  @click="changeSixMan"></i><span>先生</span></p>
                <p class="woman"><i class="fa fa-check-circle"
                                    :class="{sixActive:!changeMan}"
                                    @click="changeSixWoman"></i><span>女士</span></p>
              </div>
            </div>
          </div>
          <div class="input_box">
            <label for="phone">联系电话</label>
            <div class="input_wrapper">
              <div class="phone_wrapper">
                <input type="text" id="phone" placeholder="你的手机号" v-model="inputTelephone">
                <i class="fa fa-plus-square" @click="showRemark = !showRemark"></i>
              </div>
              <input type="text" placeholder="备选电话" v-show="showRemark" v-model="remarkTelephone">
            </div>
          </div>
          <div class="input_box">
            <label for="address">送餐地址</label>
            <div class="input_wrapper">
              <p class="change_address" @click="goToAddAddress"
                 v-if="changeAddress === ''">小区/写字楼/学校等</p>
              <p class="change_address" @click="goToAddAddress" v-else>{{changeAddress}}</p>
              <input type="text" placeholder="详细地址(如门排号)" id="address" v-model="inputDetailAddress">
            </div>
          </div>
          <div class="input_box">
            <label for="biaoqian">标签</label>
            <div class="input_wrapper">
              <input type="text" id="biaoqian" placeholder="无/家/学校/公司" v-model="inputTab">
            </div>
          </div>
        </section>
        <p class="btn" @click="confirm">确定</p>

        <alertBounced v-if="showAlert" @closeBounced="showAlert = false" :alertText="alertText">
        </alertBounced>

      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>

</template>
<script>
  import vhead from '../../../../components/header/header.vue'
  import alertBounced from '../../../../components/bounced/bounced'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        showAlert: false,
        alertText: '',
        showRemark: false,
        changeMan: true,
        inputname: '', // 姓名
        inputTelephone: '', // 电话号码
        remarkTelephone: '', // 备选电话
        inputDetailAddress: '', // 详细地址
        inputTab: '', // 标签
        listObj: {sex: '先生'}  // 用户当前编辑的地址
      }
    },
    components: {
      vhead,
      alertBounced
    },
    computed: {
      ...mapGetters(['isShowAddAddress', 'addressList', 'changeAddress'])
    },
    mounted () {
      let win = window.localStorage
      if (win.getItem('isShowAddAddress') === null || win.getItem('isShowAddAddress') === 'false') {
        this.$store.commit('setIsShowAddAddress', false)
      } else {
        this.$store.commit('setIsShowAddAddress', true)
      }
    },
    methods: {
      backToChooseAddress () { // 跳转到父路由
        this.$router.push({path: '/confirmOrder/chooseAddress'})
        window.localStorage.setItem('showChildrenAddress', false)
        this.$store.commit('setShowChildrenAddress', false)
      },
      changeSixMan () { // 选择男士
        this.changeMan = true
        this.listObj.sex = '先生'
      },
      changeSixWoman () { // 选择女士
        this.changeMan = false
        this.listObj.sex = '女士'
      },
      confirm () { // 确认
        if (this.inputname === '') {
          this.alertText = '请输入您的姓名'
          this.showAlert = true
        } else if (this.inputTelephone === '') {
          this.alertText = '请输入您的联系电话'
          this.showAlert = true
        } else if (this.inputDetailAddress === '') {
          this.alertText = '请输入您的详细地址'
          this.showAlert = true
        } else if (this.inputTab === '') {
          this.alertText = '标签不能为空'
          this.showAlert = true
        } else if (this.changeAddress === '') {
          this.alertText = '请选择送餐地址'
          this.showAlert = true
        } else {
          this.listObj.name = this.inputname
          this.listObj.phone = this.inputTelephone
          this.listObj.remarkphone = this.remarkTelephone
          this.listObj.detailaddress = this.inputDetailAddress
          this.listObj.tab = this.inputTab
          this.listObj.address = this.changeAddress
          this.addressList.push(this.listObj)
          this.$store.commit('setAddressList', this.addressList)
          window.localStorage.setItem('addressList', JSON.stringify(this.addressList))
          this.$store.commit('setShowChildrenAddress', false)
          window.localStorage.setItem('showChildrenAddress', false)
          this.$router.push({path: '/confirmOrder/chooseAddress'})
        }
      },
      goToAddAddress () { // 切换到添加地址页
        this.$store.commit('setIsShowAddAddress', true)
        window.localStorage.setItem('isShowAddAddress', true)
        this.$router.push({path: '/confirmOrder/chooseAddress/address/addAddress'})
      }
    }
  }
</script>
<style scoped lang="less">
  @import '../../../../common/comment.less';
  .address_wrapper{
    .pt(1.1rem);
    min-height:100vh;
    background:@f7;
  }
  .address_content{
    font-size:.24rem;
    background:@default;
    .input_box{
      padding:0 .2rem;
      width:100%;
      .flex;
      label{
        flex:1;
        font-size:.32rem;
        .pt(.2rem);
      }
      .input_wrapper{
        flex:3;
        .change_address{
          border-bottom:1px solid @ddd;
          line-height:1rem;
          font-size:.32rem;
          color:@999;
        }
        .six{
          .man,.woman{
            font-size:.32rem;
            .inb;
            line-height:1rem;
            .fa-check-circle{
              .mr(.1rem);
              font-size:.36rem;
            }
            .sixActive{
              color:@btn;
            }
          }
          .man{
            .mr(.2rem);
          }
        }
        .phone_wrapper{
          .rel;
          .fa-plus-square{
            font-size:.4rem;
            color:@background;
            .abs;
            right:.2rem;
            .vc;
          }
        }
      }
    }
  }
  .placeHolderColor(@999,.32rem);

  input[type="text"]{
    padding:.3rem 0;
    width:100%;
    border:none;
    border-bottom:1px solid #ddd;
    outline: none;
  }

  .btn{
    width:95%;
    background:#4CD964;
    color:#fff;
    margin:0 auto;
    font-size:.32rem;
  .b-r(5px);
  .tc;
  .mt(.4rem);
    line-height:.8rem;
  }
</style>
