<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in resultList"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      resultList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.resultList.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
      // console.log(123)
    },
    onRefresh () {
      this.resultList = []
      this.page = 1
      this.getSearchResult()
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

<style scoped lang="less">
.container {
  overflow: auto;
  height: 1226px;
  // height: calc(100vh -54px);
}
</style>
