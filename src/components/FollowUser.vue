<template>
<!-- disabled 表示禁用按钮 loading 按钮显示转圈加载模式 防止用户在ajax请求还没结束之前频繁点击， -->
  <van-button
  :disabled="isAjax"
  :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="isFollowed ? '' : 'plus'"
    :plain="isFollowed"
    @click="onClick"
    >{{ isFollowed ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addFollowUser, deleteFollowUser } from '@/api/article'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      if (this.isFollowed) {
        // 取消关注
        try {
          await deleteFollowUser(this.target)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 关注用户
        try {
          await addFollowUser(this.target)
        } catch (err) {
          console.log(err)
        }
      }
      this.$emit('input', !this.isFollowed)
      this.isAjax = false
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
