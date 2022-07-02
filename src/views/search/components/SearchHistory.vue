<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete">
        <span @click="$store.commit('delAllHistoryList')">全部删除</span
        >&nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isDelete = true" />
    </van-cell>
    <van-cell
      @click="$emit('search', item)"
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
    >
      <van-icon
        name="close"
        v-if="isDelete"
        @click.stop="$store.commit('delHistoryList', index)"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
