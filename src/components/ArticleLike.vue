<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    :color="attitude === 1 ? 'red' : '#777'"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="onClick"
  />
</template>

<script>
import { addLike, delLike } from '@/api/article'
export default {
  name: 'ArticleLike',
  model: {
    prop: 'attitude'
  },
  props: {
    attitude: {
      type: Number,
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
      try {
        if (this.attitude === -1) {
          // 点赞文章
          await addLike(target)
          this.$emit('input', 1)
        } else {
          // 取消点赞文章
          await delLike(target)
          this.$emit('input', -1)
        }
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
