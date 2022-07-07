<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    ref="filed"
  >
    <template #extra>
      <van-button type="default" :disabled="message === ''" @click="onClick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  nameL: 'AddComment',
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    // 不是必传项，只有在对评论发布评论时才需要
    art_id: {
      type: [Number, String]
    }
  },
  created () { },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      const target = this.target
      try {
        const res = await addComment({
          target,
          content: this.message,
          art_id: this.art_id
        })
        // console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    // 组件最终会变成dom结构，$el可以获取到当前绑定ref属性的元素的根标签
    this.$refs.filed.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.van-cell {
  align-items: center;
  .van-button {
    border: 0;
    color: #3296fa;
  }
}
</style>
