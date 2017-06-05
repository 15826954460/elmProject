<template>
  <div class="points_detail">

    <vheader message="余额问题">
      <span class="fa fa-angle-left" slot="angle" @click="backToBalance()"></span>
    </vheader>

    <div class="markdown">
      <h3 id="q1-">Q1: 使用余额的条件</h3>
      <p>为了保护账户安全，使用余额前必须先绑定手机号。</p>
      <h3 id="q2-">Q2: 余额可以怎么用？</h3>
      <p>余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</p>
      <h3 id="q3-">Q3:我要如何提现？</h3>
      <p>
        为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</p>
      <h3 id="q4-">Q4:为什么会提现失败？</h3>
      <p>可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</p>
    </div>
  </div>
</template>

<script>
  import vheader from '../../../components/header/header.vue'
  export default {
    components: {
      vheader
    },
    methods: {
      backToBalance () {
        this.$root.showDetail = true // 显示父路由
        window.localStorage.setItem('showDetail', true)  // 为保存刷新的时候用
        this.$router.push({path: '/balance'})  // 回到父级路由页面
      }
    }
  }
</script>

<style scoped lang="less">
  .points_detail {
    padding-top: .8rem;
    .markdown {
      padding: .2rem;
      font-size: .24rem;
      h3, p {
        line-height: .4rem;
      }
    }
  }
</style>
