<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to="/search">
          搜素</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>

      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>

    <!-- 点击汉堡弹出弹出层 -->
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :style="{ height: '100%', paddingTop: '1rem' }"
    >
      <ChannelPanel
        :channels="channels"
        v-model="active"
        @input="onInput"
        @del-preEvent="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleListr.vue'
import { getUserChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem()
      // console.log(channels)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        // 用户未登录，且本地存储有数据(代表用户操作了频道，所以被保存到了本地存储)
        this.channels = channels
      } else {
        // 用户已登录和未登录都是发起同一个接口的请求，如果已登录拦截器会自动发送token,请求回来的就是已登录状态的频道列表 ，未登录就不会传token请求回来的就是未登录状态的频道列表
        try {
          const res = await getUserChannels()
          // console.log(res)
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    },
    onInput (index) {
      this.active = index
      this.isChannelPanelShow = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang="less">
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/.van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  position: fixed;
  top: 92px;
  left: 0;
  width: 750px;
  z-index: 1;
}
// 解决不同频道切换影响
/deep/.van-pull-refresh {
  // calc() 自动计算
  // height: 1200px;
  height: calc(100vh - 280px);
  overflow: auto;
}
</style>
