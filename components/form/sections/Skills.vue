<template>
  <div>
    <div class="buttons">
      <b-button type="is-primary" expanded @click="add">
        <b-icon icon="plus" size="is-small"> </b-icon>
        Add skill
      </b-button>
    </div>
    <draggable v-model="skills" handle=".handle">
      <b-collapse
        v-for="(skill, index) in skills"
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
            {{ skill.title }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field label="Title" label-position="on-border">
              <b-input
                :value="skill.title"
                @input="update(`skills[${index}].title`, $event)"
              ></b-input>
            </b-field>
            <b-field>
              <b-slider
                :min="0"
                :max="10"
                ticks
                :value="skill.level"
                @input="update(`skills[${index}].level`, $event)"
              ></b-slider>
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="deleteItem(`skills`, index)">
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
    skills: {
      get() {
        return this.$store.state.resume.current.skills
      },
      set(value) {
        this.update('skills', value)
      },
    },
  },

  methods: {
    add() {
      let skillsLength = 0
      if (this.skills) {
        skillsLength = this.skills.length
      }
      this.update(`skills[${skillsLength}]`, { title: '', level: 0 })
    },

    update(property, value) {
      this.$store.dispatch('resume/updateCurrent', { property, value })
    },

    deleteItem(property, index) {
      this.$store.dispatch('resume/deleteItemCurrent', { property, index })
    },
  },
}
</script>
