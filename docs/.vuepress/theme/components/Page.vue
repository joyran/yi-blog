<template>
  <main class="page">
    <slot name="top" />

    <!-- 新增文章标题 -->
    <section v-if="$page.frontmatter.title" class="page-header">
      <div class="page-title">{{ $page.frontmatter.title }}</div>
    </section>

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

.page-header
  max-width: 740px
  padding: 0 2.5rem
  margin: 5rem auto -3.6rem;
  @media (max-width: $MQMobileNarrow)
    padding: 1.5rem
    margin: 3rem auto -5rem;

.page-title
  font-size: 2rem
  font-weight: 600
  line-height: 1.6
  @media (max-width: $MQMobileNarrow)
    font-size: 1.5rem
</style>
