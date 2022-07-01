<template>
  <div>
    <div class="channel-panel">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          size="mini"
          type="danger"
          round
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: index === active ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              v-show="isCloseShow"
            ></van-icon>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-panel">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendList" :key="item.id">
          <div class="inner van-ellipsis" @click="addMyChannels(item.id)">
            + {{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'

export default {
  model: {
    prop: 'active'
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  name: 'chanelPanel',
  created () {
    this.loadAllList()
  },
  data () {
    return {
      recommendList: [],
      isCloseShow: false
    }
  },
  methods: {
    async loadAllList () {
      try {
        const res = await getAllArticleList()
        // console.log(res)
        this.recommendList = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      } catch (err) {
        console.log(err)
      }
    },
    addMyChannels (id) {
      const index = this.recommendList.findIndex(item => item.id === id)
      // eslint-disable-next-line vue/no-mutating-props
      this.channels.push(this.recommendList[index])
      this.recommendList.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 如果索引为0，就表示当前点击的是推荐频道，不能被删除，直接退出
        if (index === 0) return
        // 删除
        this.recommendList.push(this.channels[index])
        // eslint-disable-next-line vue/no-mutating-props
        this.channels.splice(index, 1)
        if (index < this.active) {
          this.$emit('del-preEvent', this.active - 1)
        }
      } else {
        // 跳转
        this.$emit('input', index)
      }
    }
  },
  computed: {},
  watch: {
    // 对频道数据做持久化
    channels: {
      deep: true,
      // immediate: true,
      async handler (newVal) {
        console.log(123)
        // console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 已登录
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          // console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 未登录
          setItem(newVal)
        }
      }
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 0 24px;
  margin-bottom: 16px;
  h3 {
    font-size: 32px;
    font-weight: normal;
  }
  .van-button {
    width: 104px;
    height: 46px;
    border-radius: 20px;
  }
}
.inner {
  position: relative;
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  color: #222222;
  line-height: 86px;
  text-align: center;
  margin-left: 14px;
  margin-bottom: 22px;
  .van-icon {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
