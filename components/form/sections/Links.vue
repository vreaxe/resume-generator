<template>
  <div>
    <div class="buttons">
      <b-button type="is-primary" expanded @click="add">
        <b-icon icon="plus" size="is-small"> </b-icon>
        Add link
      </b-button>
    </div>
    <draggable v-model="links" handle=".handle">
      <b-collapse
        v-for="(link, index) in links"
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
            <span class="mt-1 mr-2" v-html="link.icon"></span>
            {{ link.url }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-up' : 'menu-down'"></b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            <b-field label="URL" label-position="on-border">
              <b-input
                :value="link.url"
                @input="update(`links[${index}].url`, $event, index)"
              ></b-input>
            </b-field>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="deleteItem(`links`, index)">
            Delete
          </a>
        </footer>
      </b-collapse>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import linksIcons, { defaultIcon } from '@/data/links-icon'
import find from 'lodash/find'
import result from 'lodash/result'

export default {
  props: ['resume'],

  components: {
    draggable,
  },

  computed: {
    links: {
      get() {
        return this.$store.state.resume.current.links
      },
      set(value) {
        this.update('links', value)
      },
    },
  },

  methods: {
    add() {
      let linksLength = 0
      if (this.links) {
        linksLength = this.links.length
      }
      this.update(`links[${linksLength}]`, { url: '', icon: '' })
    },

    update(property, value, index) {
      this.$store.dispatch('resume/updateCurrent', { property, value })

      if (typeof index !== 'undefined') {
        let linkItem = find(linksIcons, function (o) {
          return value.includes(o.name)
        })
        this.$store.dispatch('resume/updateCurrent', {
          property: `links[${index}].icon`,
          value: linkItem ? linkItem.icon : defaultIcon,
        })
      }
    },

    deleteItem(property, index) {
      this.$store.dispatch('resume/deleteItemCurrent', { property, index })
    },
  },
}
</script>
