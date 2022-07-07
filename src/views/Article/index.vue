<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <template v-else>
        <!-- 加载失败：404 -->
        <div class="error-wrap" v-if="isError404">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-else-if="!!article.art_id">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{ article.aut_name }}</div>
            <div slot="label" class="publish-date">
              {{ article.pubdate | dateFormat }}
            </div>
            <FollowUser
              v-model="article.is_followed"
              :target="article.aut_id"
            />
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            v-html="article.content"
          ></div>
          <van-divider>正文结束</van-divider>
          <!-- 评论组件 -->
          <ArticleComment
            :source="article.art_id"
            type="a"
            @set-count="count = $event"
            :commentList="commentList"
            @reply-show="
              comment = $event;
              isReplyShow = true;
            "
          />
        </div>
        <!-- /加载完成-文章详情 -->

        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div class="error-wrap" v-else>
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="!isLoading && !!article.art_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="addCommentShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="count" color="#777" />
      <CollectArticle :isCollected.sync="article.is_collected" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <ArticleLike v-model="article.attitude" />
      <van-icon name="share" color="#777777" @click="showShare = true" />
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
    <!-- /底部区域 -->
    <!-- 在vue组件中，我们默认把不属于当前文档流的东西放在最底部 -->

    <!-- 写评论的弹出层 -->
    <van-popup v-model="addCommentShow" position="bottom">
      <!-- 高度默认由内容撑开 -->
      <!-- 给组件绑定v-if事件，让组件每次关闭就销毁，弹出就创建，不断地执行组件内部的mounted事件，才能每次打开都会获取焦点 -->
      <AbbComment
        v-if="addCommentShow"
        :target="articleId"
        @add-comment="
          commentList.unshift($event);
          addCommentShow = false;
          count++;
        "
      />
    </van-popup>
    <!-- 写评论的弹出层 -->

    <!-- 回复评论的弹出层 -->
    <van-popup position="bottom" v-model="isReplyShow" style="height: 100%">
      <!-- v-if要加在子组件上，不能加在弹出层上 不然弹出层的弹出动画会消失 -->
      <RelyComment
        :comment="comment"
        @close="isReplyShow = $event"
        v-if="isReplyShow"
      />
    </van-popup>
    <!-- 回复评论的弹出层 -->
  </div>
</template>

<script>
import AbbComment from './components/AddComment.vue'
import ArticleComment from './components/ArticleComment.vue'
import RelyComment from './components/ReplyComment.vue'
import { getArticle } from '@/api/article'
import 'github-markdown-css'
// ImagePreview 是一个函数，调用函数后会直接在页面中展示图片预览界面。
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleComment,
    AbbComment,
    RelyComment
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      isLoading: true,
      article: {},
      isError404: false,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      count: null,
      addCommentShow: false,
      commentList: [],
      isReplyShow: false,
      comment: {}
    }
  },
  computed: {},
  watch: {},
  async created () {
    try {
      const res = await getArticle(this.articleId)
      // console.log(res)
      this.article = res.data.data
    } catch (err) {
      console.log(err)
      // 可选链 err.response?.status等同于err.response && err.response.status
      if (err.response?.status === 404) {
        this.isError404 = true
      }
    }
    this.isLoading = false
    this.$nextTick(() => {
      // 我们想获取dom元素，必须在数据准备好后，的nextTick的回调函数里获取
      // console.log(document.querySelectorAll('.article-content img'))
      const arr = document.querySelectorAll('.article-content img')
      // 防御代码，防止当前文章没有图片，后面代码无意义运行
      if (arr.length === 0) return
      const images = []
      arr.forEach((img, index) => {
        images.push(img.src)
        img.onclick = function () {
          ImagePreview({
            // 预览图片的路径，是一个数组
            images,
            // 预览器起始位置
            startPosition: index,
            // 是否显示页码
            showIndex: false,
            // 是否显示轮播指示器
            showIndicators: true,
            // 手势缩放时，最大缩放比例
            maxZoom: 3
          })
        }
      })
    })
  },
  mounted () { },
  methods: {
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
