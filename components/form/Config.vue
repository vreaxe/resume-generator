<template>
  <div>
    <b-field label="Language" label-position="on-border">
      <b-select
        placeholder="Select a language"
        expanded
        :value="$i18n.locale"
        @input="
          update('language', $event)
          $i18n.setLocale($event)
        "
      >
        <option
          v-for="locale in locales"
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </b-select>
    </b-field>
    <b-field label="Theme" label-position="on-border">
      <b-select
        placeholder="Select a theme"
        expanded
        :value="resume.theme"
        @input="update('theme', $event)"
      >
        <option value="minimal">Minimal</option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  props: ['resume'],

  computed: {
    locales() {
      return this.$i18n.locales
    },
  },

  methods: {
    update(property, value) {
      this.$store.dispatch('resume/updateCurrent', { property, value })
    },
  },
}
</script>
