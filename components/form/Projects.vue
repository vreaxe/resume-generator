<template>
  <div>
    <div class="buttons">
      <b-button type="is-primary" expanded @click="add">
        <b-icon icon="plus" size="is-small"> </b-icon>
        Add project
      </b-button>
    </div>
    <draggable v-model="projects" handle=".handle">
      <b-collapse
        v-for="(project, index) in projects"
        :key="index"
        class="card"
        animation="slide"
        :open="false"
      >
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
        >
          <p class="card-header-title truncate">
            <b-icon
              class="handle mr-2"
              icon="format-align-justify"
              size="is-small"
            >
            </b-icon>
            {{ project.name }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field label="Name" label-position="on-border">
              <b-input
                :value="project.name"
                @input="update(`projects[${index}].name`, $event)"
              ></b-input>
            </b-field>
            <b-field label="URL" label-position="on-border">
              <b-input
                :value="project.url"
                @input="update(`projects[${index}].url`, $event)"
              ></b-input>
            </b-field>
            <b-field label="Description" label-position="on-border">
              <editor
                :value="project.description"
                @input="update(`projects[${index}].description`, $event)"
              />
            </b-field>
            <b-field label="Tags" label-position="on-border">
              <b-taginput
                :value="project.tags"
                @input="update(`projects[${index}].tags`, $event)"
                rounded
              >
              </b-taginput>
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="deleteItem(`projects`, index)">
            Delete
          </a>
        </footer>
      </b-collapse>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },

  computed: {
    projects: {
      get() {
        return this.$store.state.resume.current.projects
      },
      set(value) {
        this.update('projects', value)
      },
    },
  },

  methods: {
    add() {
      let projectsLength = 0
      if (this.projects) {
        projectsLength = this.projects.length
      }
      this.update(`projects[${projectsLength}]`, {
        name: '',
        url: '',
        description: '',
        tags: [],
      })
    },

    update(property, value) {
      if (property.includes('description')) value = value.html
      this.$store.dispatch('resume/updateCurrent', { property, value })
    },

    deleteItem(property, index) {
      this.$store.dispatch('resume/deleteItemCurrent', { property, index })
    },
  },
}
</script>
