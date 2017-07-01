<template>
  <div class="favorable-box" :class="{negative_page:$root.showintro}">

    <transition name="parent-slide" mode="out-in">
      <div class="favorable-wrapper" v-show="$root.showintro">
        <vheader message='我的优惠'>
          <router-link to='/user' tag='span' class='fa fa-angle-left' slot='angle'></router-link>
        </vheader>
        <ul class="favorable-nav">
          <li>
            <dl @click="hongbao">
              <dd><span :class="{active_span:negative}">红包</span></dd>
            </dl>
          </li>
          <li>
            <dl @click="jinjuan">
              <dd><span :class="{active_span:!negative}">商家代金卷</span></dd>
            </dl>
          </li>
        </ul>

        <header class="content_header">
          <p class="content_title_style" v-show="negative">有 <span style="color:red;font-weight:bold;">7</span> 个红包即将到期
        </p>
          <section class="contetn_description">
            <img :src="description_png">
            <span @click="favorableIntro('favorableIntro')" class="content_title_style" v-show="negative">积分说明
          </span>
            <span class="content_title_style" v-show="!negative" @click="favorableIntro('jinjuan')">商家代金卷</span>
          </section>
        </header>

        <transition name="hongbao-slide" mode="out-in">
          <ul class="hongbao_list_ul" v-show="negative">
            <li class="hongbao_list_li" v-for="item in hongbaoList" :key="item.id">
              <section class="list_item">
                <div class="list_item_left">
                  <span class="fuhao">¥</span>
                  <span class="big_num">{{String(item.amount).split('.')[0]}}</span>
                  <span class="dot">.</span>
                  <span class="sm_num">{{String(item.amount).split('.')[1] || 0}}</span>
                </div>
                <div class="list_item_right">
                  <h4>{{item.name}}</h4>
                  <ul>
                    <li v-for="(descriptions, index) in item.descriptions" :key="index">{{descriptions}}</li>
                  </ul>
                </div>
              </section>

              <footer class="list_item_footer" v-if="item.extra_limit">
                <ul>
                  <li v-for="(limit, index) in item.extra_limit" :key="index">
                    {{limit}}
                  </li>
                </ul>
              </footer>
            </li>
          </ul>
        </transition>
        <transition name="router-fade" mode="out-in">
          <section class="unable_use" v-show="!negative">
            <img :src="voucher_png" height="170" width="300">
            <p>无法使用代金券</p>
            <p>非客户端或客户端版本过低</p>
            <router-link to="/download" class="download_app" tag="button">
              下载或升级客户端
            </router-link>
          </section>
        </transition>

        <router-link to="" class="history_hongbao" tag="p" v-show="negative">
          <span class="check_history">查看历史红包</span>
          <span class="fa fa-angle-right"></span>
        </router-link>

        <footer class="hongbao_footer" v-show="negative">
          <p class="hongbao_style" style="border-right: 1px solid #f5f5f5" @click="favorableIntro('hongbao')">
            兑换红包
          </p>
          <p class="hongbao_style" @click="favorableIntro('prize')">
            推荐有奖
          </p>
        </footer>
      </div>
    </transition>

    <transition name="children-slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import vheader from '../../components/header/header.vue'
  export default {
    data () {
      return {
        description_png: require('../../../static/icon/description.png'),
        voucher_png: require('../../../static/img/voucher.png'),
        negative: true
      }
    },
    components: {
      vheader
    },
    computed: {
      hongbaoList () {
        return this.$store.getters.hongbaoList
      }
    },
    created () { // 页面重新加载，获取本地状态
      let negative = window.localStorage.getItem('negative')
      let showintro = window.localStorage.getItem('showintro')
      negative === null ? this.negative = true : negative === 'false' ? this.negative = false : this.negative = true
      showintro === null ? this.$root.showintro = true : showintro === 'false' ? this.$root.showintro = false : this.$root.showintro = true
    },
    methods: {
      hongbao () {
        this.negative = true
        window.localStorage.setItem('negative', true)
      },
      jinjuan () {
        this.negative = false
        window.localStorage.setItem('negative', false)
      },
      favorableIntro (adv) {
        this.$root.showintro = false
        window.localStorage.setItem('showintro', false)
        this.$router.push({path: '/favorable/' + adv})
      }
    }
  }
</script>
<style scoped>
  @import './favorable.css';
</style>
