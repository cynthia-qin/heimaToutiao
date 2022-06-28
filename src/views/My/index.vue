<template>
  <div>
    <div
      class="header header-login"
      v-if="$store.state.user && $store.state.user.token"
    >
      <div class="avatar">
        <div class="left">
          <van-image
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span>{{userInfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <span>{{userInfo.art_count}}</span>
          <span>头条</span>
        </li>
        <li>
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </li>
        <li>
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </li>
        <li>
          <span>{{userInfo.like_count}}</span>
          <span>获赞</span>
        </li>
      </ul>
    </div>
    <div class="header header-notlogin" v-else>
      <div class="mobile" @click="$router.push({ name: 'login' })">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录 / 注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" value="内容" is-link />
      <van-cell title="小智同学" value="内容" is-link />
    </van-cell-group>
    <van-button
      type="default"
      block
      class="logout-btn"
      v-if="$store.state.user && $store.state.user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          message: '确定退出吗？'
        })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
  // opacity: 0.7;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  .mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 132px;
      height: 132px;
    }
    p {
      font-size: 28px;
      color: #fff;
      margin-bottom: 0;
      margin-top: 15px;
    }
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    margin-bottom: 55px;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      letter-spacing: 1px;
      text-align: center;
      line-height: 33px;
      color: #666666;
    }
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-image {
        width: 132px;
        height: 132px;
        margin-right: 22px;
        background-color: #ffffff;
        border: solid 2px #ffffff;
      }
      span {
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 23px;
      color: #fff;
      span {
        &:nth-child(1) {
          font-size: 36px;
        }
      }
    }
  }
}
.van-grid-item {
  color: #333;
  font-size: 28px;
  .toutiao {
    font-size: 45px;
    color: #eb5253;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
}
.van-cell-group {
  margin: 9px 0;
}
.logout-btn {
  color: #d86262;
}
</style>
