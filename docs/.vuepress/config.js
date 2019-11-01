module.exports = {
  title: '梦了然然',
  description: '梦了然然',
  base: '/yi-blog/',
  cache: false,
  themeConfig: {
    smoothScroll: true,
    navbar: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '博文', link: '/blog/' },
      { text: '收藏', link: '/star' },
      { text: '心路', link: '/timeline' },
      { text: 'Github', link: 'https://github.com/joyran' },
    ]
  },
  head:[
  	['link', { rel: '/shortcut icon', href: '/favicon.png' }]
  ]
}
