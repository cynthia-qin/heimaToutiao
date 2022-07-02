<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        autofocus
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        @focus="isSearch = false"
      />
    </form>
    <SearchHistory v-if="searchText === ''" @search="onSearch" />
    <SearchResults v-else-if="isSearch" :searchText="searchText" />
    <SearchSuggestion v-else :searchText="searchText" @search="onSearch" />
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResults from './components/SearchResults.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false
    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchResults,
    SearchSuggestion,
    SearchHistory
  }
}
</script>

<style scoped>
</style>
