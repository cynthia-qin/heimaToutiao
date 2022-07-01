<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" ref="refresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null // 定义一个全局变量用于表示滚动元素
let scrollTop = 0 // 定义一个全局变量 表示滚动的位置
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {

  },
  mounted () {
    // console.log(this.$refs.refresh)
    ele = this.$refs.refresh.$el
    this.$refs.refresh.$el.addEventListener('scroll', function () {
      // console.log(this.scrollTop)
      scrollTop = this.scrollTop
    })
  },
  activated () {
    // 因为当前组件被keep-alive包裹起来了，有缓存，created和mounted钩子函数只会执行一次，但是激活状态的钩子函数会当页面显示时就执行一次
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    onLoad () {
      this.loadArticleList()
    },
    async loadArticleList () {
      // 判断是否触发了下拉刷新 如果触发了refreshing为被自动设置为true
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        // console.log(res)
        this.articleList.push(...res.data.data.results)
        this.timestamp = res.data.data.pre_timestamp
        // 当数据全部加载完，timestamp就为null此时应把finished的状态设置为true
        if (this.timestamp === null) {
          this.finished = true
        }
        // 每次加载完都要把loading重新设置为false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onRefresh () {
      console.log('下拉刷新触发了')
      // 触发刷新的时候重置状态
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.loadArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped >
.van-pull-refresh {
  margin-top: 174px;
}
</style>
