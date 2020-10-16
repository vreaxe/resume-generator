<template>
  <div>
    <div class="buttons">
      <b-button type="is-primary" expanded @click="add">
        <b-icon icon="plus" size="is-small"> </b-icon>
        Add education
      </b-button>
    </div>
    <draggable v-model="education" handle=".handle">
      <b-collapse
        v-for="(education, index) in education"
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
            {{ education.title }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field label="Title" label-position="on-border">
              <b-input
                :value="education.title"
                @input="update(`education[${index}].title`, $event)"
              ></b-input>
            </b-field>
            <b-field label="School" label-position="on-border">
              <b-input
                :value="education.school"
                @input="update(`education[${index}].school`, $event)"
              ></b-input>
            </b-field>
            <b-field label="Time Period" label-position="on-border">
              <b-input
                :value="education.timeperiod"
                @input="update(`education[${index}].timeperiod`, $event)"
              ></b-input>
            </b-field>
            <b-field label="Description" label-position="on-border">
              <editor
                :value="education.description"
                @input="update(`education[${index}].description`, $event)"
              />
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="deleteItem(`education`, index)">
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
    education: {
      get() {
        return this.$store.state.resume.current.education
      },
      set(value) {
        this.update('education', value)
      },
    },
  },

  data() {
    return {
      timeperiod: '',
    }
  },

  methods: {
    add() {
      let educationLength = 0
      if (this.education) {
        educationLength = this.education.length
      }
      this.update(`education[${educationLength}]`, {
        title: '',
        school: '',
        timeperiod: '',
        description: '',
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
