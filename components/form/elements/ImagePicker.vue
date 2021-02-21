<template>
  <div>
    <b-upload
      :value="computedValue"
      drag-drop
      expanded
      @input="onFileChange"
      accept="image/*"
    >
      <section class="section">
        <div v-if="computedValue.base64" class="show-image">
          <span @click.stop.prevent="removeImage($event)">
            <b-icon icon="close-circle" size="is-small"> </b-icon>
          </span>
          <img :src="computedValue.base64" />
        </div>
        <div v-else class="content has-text-centered">
          <p>
            <b-icon icon="upload" size="is-large"> </b-icon>
          </p>
          <p>Drop your files here or click to upload</p>
        </div>
      </section>
    </b-upload>
  </div>
</template>

<script>
export default {
  props: ['value'],

  data() {
    return {
      newValue: { base64: this.value },
    }
  },

  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = { base64: value }
        this.$emit('input', value)
      },
    },
  },

  methods: {
    onFileChange(file) {
      if (file && !file.base64) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.computedValue = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removeImage(event) {
      event.preventDefault()
      this.computedValue = null
    },
  },
}
</script>

<style lang="postcss" scoped>
.upload {
  >>> .section {
    text-align: center;
    padding: 1.5rem;
    .show-image {
      position: relative;
      span {
        position: absolute;
        right: -10px;
        top: -10px;
      }
    }
  }
}
</style>
