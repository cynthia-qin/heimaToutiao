<template>
  <div v-if="list[0] !== null">
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="hightLight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: []
    }
  },
  methods: {
    hightLight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler (val) {
        // console.log(val)
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestion(val)
            // console.log(res)
            this.list = res.data.data.options
          } catch (err) {
            console.log(err)
          }
          // console.log(val)
        }, 900)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
