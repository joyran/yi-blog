<!-- 博客文章列表 -->
<template lang="html">
  <div class="theme-default-content">
    <div v-for="(page, index) in pages" :key="index">
      <!-- 只渲染 frontmatter 中包含 title 的文章 -->
      <div v-if="page.frontmatter.title" class="blog">
        <p class="title">
          <router-link :to="{ path: page.path }">{{ page.title }}</router-link>
        </p>
        <p class="date">{{ page.frontmatter.date | formatDate }}</p>
        <!-- 文章摘要，取 md 文章 more 之前的内容 -->
        <div class="excerpt" v-html="page.excerpt" />
        <div class="read-more">
          <router-link :to="{ path: page.path }">阅读更多 -></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      pages: []
    }
  },

  mounted () {
    this.pages = this.$site.pages.filter(v => v.frontmatter.title)
  },

  filters: {
    formatDate: function (value) {
      return moment(value).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  padding-bottom: 2rem;
  border-bottom: 1px solid #ebebeb;

  .title {
    margin: 1rem 0;

    a {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.6;
      color: #2c3e50;

      &:hover {
        text-decoration: none;
      }
    }
  }

  .date {
    color: #757575;
    font-size: 0.9rem;
  }

  img {
    max-width: 100%;
    display: block;
  }

  .read-more {
    margin-top: 1.4rem;

    a:hover {
      text-decoration: none;
    }
  }
}

@media (max-width: 419px) {
  .blog .title > a {
    font-size: 1.6rem;
  }
}
</style>
