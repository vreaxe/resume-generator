<template>
  <div class="container">
    <div v-if="resumes.length">
      <section class="section columns is-multiline">
        <div
          class="column is-one-quarter"
          v-for="resume in resumes"
          :key="resume.id"
        >
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">
                    {{ name(resume.name, resume.surnames) }}
                  </p>
                  <p class="subtitle is-6">
                    {{
                      resume.language ? locales[resume.language].name : '&nbsp;'
                    }}
                  </p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link
                class="button is-light card-footer-item"
                :to="{ name: 'edit-id', params: { id: resume.id } }"
              >
                <span>Edit</span>
                <b-icon icon="pencil" size="is-small"></b-icon>
              </nuxt-link>
              <a
                class="button is-light card-footer-item"
                @click="deleteResume(resume.id)"
              >
                <span>Delete</span>
                <b-icon icon="delete" size="is-small" type="is-danger"></b-icon>
              </a>
            </footer>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <p class="title is-4 has-text-centered mt-5">There were no resumes</p>
    </div>
  </div>
</template>

<script>
import keyBy from 'lodash/keyBy'

export default {
  head() {
    return {
      title: 'Resume list',
    }
  },

  async asyncData({ store }) {
    await store.dispatch('resume/getList')
  },

  computed: {
    resumes() {
      return this.$store.state.resume.list
    },

    locales() {
      return keyBy(this.$i18n.locales, 'code')
    },
  },

  methods: {
    name(name, surnames) {
      let nameRes = ''
      if (name) {
        nameRes = name
        if (surnames) {
          nameRes += ' ' + surnames
        }
      } else {
        nameRes = 'No name'
      }
      return nameRes
    },

    deleteResume(id) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to delete this resume?',
        onConfirm: async () => {
          try {
            await this.$store.dispatch('resume/delete', { id })
            await this.$store.dispatch('resume/getList')
            this.$buefy.toast.open({
              message: 'Resume deleted!',
              position: 'is-bottom-right',
              type: 'is-success',
            })
          } catch (e) {
            this.$buefy.toast.open({
              message: `Error: ${e}`,
              position: 'is-bottom-right',
              type: 'is-danger',
            })
          }
        },
      })
    },
  },
}
</script>
