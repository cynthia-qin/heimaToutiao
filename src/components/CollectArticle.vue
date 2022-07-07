<template>
  <!-- 点击图标的时候加载图标显示，防止用户连续点击 -->
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="isCollected ? 'star' : 'star-o'"
    @click="onClick"
    :style="{ color: isCollected ? 'red' : '' }"
  />
</template>

<script>
import { delCollect, addCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    isCollected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      const target = this.$route.params.articleId
      if (this.isCollected) {
        // 取消收藏
        try {
          await delCollect(target)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 添加收藏
        try {
          await addCollect(target)
        } catch (err) {
          console.log(err)
        }
      }
      this.$emit('update:isCollected', !this.isCollected)
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
