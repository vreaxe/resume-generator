<template>
  <component :is="resume.theme" :resume="resume" />
</template>

<script>
export default {
  layout: 'empty',

  async asyncData({ store, params }) {
    await store.dispatch('resume/getCurrent', { id: params.id })
  },

  created() {
    this.$i18n.setLocale(this.resume.language)
  },

  computed: {
    resume() {
      return this.$store.state.resume.current
    },
  },
}
</script>
