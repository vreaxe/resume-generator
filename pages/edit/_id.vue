<template>
  <div class="columns">
    <div class="column is-3 is-relative is-fullheight">
      <section class="px-1 py-1">
        <b-tabs type="is-boxed" v-model="activeTab">
          <b-tab-item label="Config"> <config :resume="resume" /></b-tab-item>
          <b-tab-item label="About"> <about :resume="resume" /> </b-tab-item>
          <b-tab-item label="Education">
            <education />
          </b-tab-item>
          <b-tab-item label="Experience">
            <experience />
          </b-tab-item>
          <b-tab-item label="Projects">
            <projects />
          </b-tab-item>
        </b-tabs>
      </section>
    </div>
    <div class="column is-9">
      <component :is="resume.theme" :resume="resume" />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.resume.name
        ? `${this.resume.name} ${
            this.resume.surnames ? this.resume.surnames : ''
          } - ${this.resume.language.toUpperCase()}`
        : 'No name',
    }
  },

  async asyncData({ store, params }) {
    await store.dispatch('resume/getCurrent', { id: params.id })
  },

  created() {
    if (!this.resume.language) {
      this.$store.dispatch('resume/updateCurrent', {
        property: 'language',
        value: this.$i18n.locale,
      })
    }
    this.$i18n.setLocale(this.resume.language)

    if (!this.resume.theme) {
      this.$store.dispatch('resume/updateCurrent', {
        property: 'theme',
        value: 'minimal',
      })
    }
  },

  mounted() {
    document.addEventListener('keydown', this.saveFile)
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.saveFile)
  },

  data() {
    return {
      activeTab: 0,
    }
  },

  computed: {
    resume() {
      return this.$store.state.resume.current
    },
  },

  methods: {
    saveFile(e) {
      if (!(e.keyCode === 83 && e.ctrlKey)) {
        return
      }

      e.preventDefault()
      this.$store.dispatch('resume/saveFile', {
        id: this.$route.params.id,
        resume: this.$store.state.resume.current,
      })
    },
  },
}
</script>
