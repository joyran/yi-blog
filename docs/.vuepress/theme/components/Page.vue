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

    <ThemeChange />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ThemeChange from '@theme/components/ThemeChange.vue'

export default {
  components: { PageEdit, PageNav, ThemeChange },
  props: ['sidebarItems']
}
</script>

<style lang="stylus" scoped>
@require '../styles/wrapper.styl'

.page
  padding-bottom: 2rem
  display: block
  background: var(--color-background)

.page-header
  max-width: 740px
  padding: 5.6rem 2.5rem 0
  margin: 0 auto -3.6rem
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
