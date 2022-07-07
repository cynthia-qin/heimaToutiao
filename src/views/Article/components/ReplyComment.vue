<template>
  <div class="main">
    <van-nav-bar :title="title" fixed>
      <template #left>
        <van-icon name="cross" @click="$emit('close', false)" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment" />
    <van-cell title="全部回复"></van-cell>
    <CommentItem v-for="(item, index) in list" :key="index" :item="item" />
    <div class="bottom">
      <van-button type="default" round plain @click="isAddCommentShow = true"
        >发布评论</van-button
      >
    </div>
    <!-- 发布评论弹出层 -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.articleId"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
        v-if="isAddCommentShow"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
export default {
  name: 'ReplyComment',
  props: {
    comment: {
      type: Object,
      default: () => ({}) // 默认值是一个空对象
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      offset: null,
      limit: 999999, // 一次性将所有的数据获取
      list: [],
      isAddCommentShow: false
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      return count === 0 ? '暂无回复' : count + '条回复'
    }
  },
  watch: {},
  filters: {},
  components: {
    CommentItem,
    AddComment
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        // console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.main {
  padding-bottom: 120px;
}
.comment {
  margin-top: 92px;
}
.bottom {
  padding: 10px 30px;
  position: fixed;
  background-color: #f5f6f9;
  box-sizing: border-box;
  // width: 750px;
  left: 0;
  right: 0;
  bottom: 0;
  .van-button {
    position: unset;
    width: 100%;
  }
}
</style>
