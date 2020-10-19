<template>
  <div>
    <b-field label="Image" label-position="on-border">
      <image-picker :value="resume.image" @input="update('image', $event)" />
    </b-field>
    <b-field label="Name" label-position="on-border">
      <b-input :value="resume.name" @input="update('name', $event)"></b-input>
    </b-field>
    <b-field label="Surnames" label-position="on-border">
      <b-input
        :value="resume.surnames"
        @input="update('surnames', $event)"
      ></b-input>
    </b-field>
    <b-field label="Job Position" label-position="on-border">
      <b-input
        :value="resume.position"
        @input="update('position', $event)"
      ></b-input>
    </b-field>
    <b-field label="Email" label-position="on-border">
      <b-input :value="resume.email" @input="update('email', $event)"></b-input>
    </b-field>
    <b-field label="Phone" label-position="on-border">
      <b-input :value="resume.phone" @input="update('phone', $event)"></b-input>
    </b-field>
    <b-field label="Location" label-position="on-border">
      <b-input
        :value="resume.location"
        @input="update('location', $event)"
      ></b-input>
    </b-field>
    <b-field label="Introduction" label-position="on-border">
      <editor
        :value="resume.introduction"
        @input="update('introduction', $event)"
      />
    </b-field>
    <hr />
    <skills />
    <hr />
    <languages />
    <hr />
    <links />
  </div>
</template>

<script>
export default {
  props: ['resume'],

  methods: {
    update(property, value) {
      if (property === 'introduction') value = value.html
      this.$store.dispatch('resume/updateCurrent', { property, value })
    },
  },
}
</script>
