<template>
  <div>
    <!-- 解决切换页面，没有缓存，比如点击了开发者频道，切换到我的页面再切换到首页时，显示的是默认显示的推荐频道 -->
    <!-- 因为keep-alive会让包裹的组件都缓存，我们只需要将首页缓存即可 -->
    <keep-alive :include="['HomeIndex']">
      <router-view class="main"></router-view>
    </keep-alive>

    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"
        >首页
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="search"
        >视频
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="friends-o"
        >问答
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="setting-o"
        >我的
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/.van-tabbar-item__text {
  font-size: 20px;
}
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
