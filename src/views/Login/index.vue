<template>
  <div>
    <!-- 登录顶部导航栏 -->
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 登录顶部导航栏 -->

    <!-- 表单输入框 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model.trim="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位' },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <!-- 发送验证码 -->
          <van-button
            round
            color="#ededed"
            class="yzm"
            native-type="button"
            v-else
            @click="sendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 表单输入框 -->
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '18311111111',
      code: '246810',
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
      try {
        const res = await login(values)
        console.log(res)
        // 将返回的token,和refresh_token 保存到vuex里，
        this.$store.commit('setUser', res.data.data)
        this.$toast('登录成功')
      } catch (err) {
        // console.log(err)
        this.$toast.fail('登录失败，请重试')
      }
    },
    async sendSms () {
      // 校验手机号
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送验证码成功')
        } catch (err) {
          this.$toast.fail('发送验证码失败，请重试')
        }
      } catch (err) {
        this.$toast.fail('手机号格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  padding: 0;
  width: 152px;
  height: 46px;
  line-height: 46px;
  font-size: 22px;
  .van-button__text {
    color: #666;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border: none;
  border-radius: 10px;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 40px;
}
.yzm {
  position: fixed;
  right: 20px;
}
</style>
