<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="(item, index) in commentList" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | dateFormat
            }}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @reply-show="$emit('reply-show',$event)"
      />
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { getCommentList } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].indexOf(value) !== -1
      }
    },
    commentList: {
      type: Array,
      required: true
    },
    source: {
      type: [Number, String],
      required: true
    }
  },
  created () {
    this.loadCommentList()
  },
  data () {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      paramsObj: {
        type: this.type,
        source: this.source,
        offset: null,
        limit: 10
      }
      // commentList: []
    }
  },
  components: {
    CommentItem
  },

  methods: {
    onLoad () {
      this.loadCommentList()
    },
    async loadCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        // console.log(res)
        // 当数据全部请求完毕的时候，把finished设置为true，表示没有数据了
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        // 每次请求新的数据都保留原来的数据，把新的数据往后添加
        // eslint-disable-next-line vue/no-mutating-props
        this.commentList.push(...res.data.data.results)
        this.paramsObj.offset = res.data.data.last_id
        // this.$emit('set-count', this.commentList.length)
        this.$emit('set-count', res.data.data.total_count)
      } catch (err) {
        console.log(err)
      }
      // 每次请求完数据都把loading设置为false
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
