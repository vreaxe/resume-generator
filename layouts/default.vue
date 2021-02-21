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
          :class="{ 'is-active': mobileMenuActive }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-main"
          @click="toggleMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbar-main"
        class="navbar-menu"
        :class="{ 'is-active': mobileMenuActive }"
      >
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <b-button
                title="Create file"
                type="is-primary is-light"
                v-if="$route.name == 'index'"
                @click="createFile"
              >
                <b-icon icon="plus" size="is-small"> </b-icon>
              </b-button>
              <b-button
                title="Save"
                type="is-primary is-light"
                v-if="$route.name == 'edit-id'"
                @click="saveFile"
              >
                <b-icon icon="content-save" size="is-small"> </b-icon>
              </b-button>
              <b-button
                title="Export to PNG"
                type="is-primary is-light"
                v-if="$route.name == 'edit-id'"
                @click="goPng"
              >
                <b-icon icon="image-size-select-actual" size="is-small">
                </b-icon>
              </b-button>
              <b-button
                title="Export to PDF"
                type="is-primary is-light"
                v-if="$route.name == 'edit-id'"
                @click="goPDF"
              >
                <b-icon icon="pdf-box" size="is-small"> </b-icon>
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
  data() {
    return {
      mobileMenuActive: false,
    }
  },

  methods: {
    toggleMenu() {
      this.mobileMenuActive = !this.mobileMenuActive
    },

    createFile() {
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
      let win = window.open(`/api/pdf/${this.$route.params.id}`, '_blank')
      win.focus()
    },

    goPng() {
      this.$store.dispatch('resume/saveFile', {
        id: this.$route.params.id,
        resume: this.$store.state.resume.current,
      })
      let win = window.open(`/api/png/${this.$route.params.id}`, '_blank')
      win.focus()
    },
  },
}
</script>
