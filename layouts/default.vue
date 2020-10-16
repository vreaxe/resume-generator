<template>
  <div>
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">Resume Generator</a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-main"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbar-main" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <b-button
                type="is-primary is-light"
                v-if="$route.name == 'index'"
                @click="addFile"
              >
                <span class="icon">
                  <i class="mdi mdi-plus"></i>
                </span>
              </b-button>
              <b-button
                type="is-primary is-light"
                v-if="$route.name == 'edit-id'"
                @click="saveFile"
              >
                <span class="icon">
                  <i class="mdi mdi-content-save"></i>
                </span>
              </b-button>
              <b-button
                type="is-primary is-light"
                v-if="$route.name == 'edit-id'"
                @click="goPDF"
              >
                <span class="icon">
                  <i class="mdi mdi-pdf-box"></i>
                </span>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    addFile() {
      this.$store.dispatch('resume/createFile')
    },

    saveFile() {
      this.$store.dispatch('resume/saveFile', {
        id: this.$route.params.id,
        resume: this.$store.state.resume.current,
      })
    },

    goPDF() {
      this.$store.dispatch('resume/saveFile', {
        id: this.$route.params.id,
        resume: this.$store.state.resume.current,
      })
      const win = window.open(`/api/pdf/${this.$route.params.id}`, '_blank')
      win.focus()
    },
  },
}
</script>
