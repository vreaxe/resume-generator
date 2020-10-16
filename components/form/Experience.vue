<template>
  <div>
    <div class="buttons">
      <b-button type="is-primary" expanded @click="add">
        <b-icon icon="plus" size="is-small"> </b-icon>
        Add experience
      </b-button>
    </div>
    <draggable v-model="experience" handle=".handle">
      <b-collapse
        v-for="(experience, index) in experience"
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
            {{ experience.company }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field label="Position" label-position="on-border">
              <b-input
                :value="experience.position"
                @input="update(`experience[${index}].position`, $event)"
              ></b-input>
            </b-field>
            <b-field label="Company" label-position="on-border">
              <b-input
                :value="experience.company"
                @input="update(`experience[${index}].company`, $event)"
              ></b-input>
            </b-field>
            <b-field label="URL" label-position="on-border">
              <b-input
                :value="experience.url"
                @input="update(`experience[${index}].url`, $event)"
              ></b-input>
            </b-field>
            <b-field label="Time Period" label-position="on-border">
              <b-taginput
                :value="experience.timeperiod"
                @input="update(`experience[${index}].timeperiod`, $event)"
                rounded
              >
              </b-taginput>
            </b-field>
            <b-field label="Description" label-position="on-border">
              <editor
                :value="experience.description"
                @input="update(`experience[${index}].description`, $event)"
              />
            </b-field>
            <b-field label="Tags" label-position="on-border">
              <b-taginput
                :value="experience.tags"
                @input="update(`experience[${index}].tags`, $event)"
                rounded
              >
              </b-taginput>
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="deleteItem(`experience`, index)">
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
    experience: {
      get() {
        return this.$store.state.resume.current.experience
      },
      set(value) {
        this.update('experience', value)
      },
    },
  },

  methods: {
    add() {
      let experienceLength = 0
      if (this.experience) {
        experienceLength = this.experience.length
      }
      this.update(`experience[${experienceLength}]`, {
        company: '',
        url: '',
        position: '',
        timeperiod: [],
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
