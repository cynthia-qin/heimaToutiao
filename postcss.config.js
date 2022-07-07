module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      // propList 表示需要设置适配的样式名称，*表示所有样式，
      propList: ['*']
      // 如果有少数的样式不需要适配可以用exclude排除适配
      // exclude:'github-markdown' 表示这个不进行适配
    }
  }
}
