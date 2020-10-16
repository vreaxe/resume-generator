<template>
  <client-only>
    <quill-editor
      :content="computedValue"
      :options="editorOption"
      :class="{ focused: focused }"
      @blur="focused = false"
      @focus="focused = true"
      @change="onEditorChange($event)"
    />
  </client-only>
</template>

<script>
export default {
  props: ['value'],

  computed: {
    computedValue: {
      get() {
        return this.newValue
      },
      set(value) {
        this.newValue = value
        this.$emit('input', value)
      },
    },
  },

  watch: {
    value(value) {
      this.newValue = value
    },
  },

  data() {
    return {
      focused: false,
      newValue: this.value,
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['clean'],
            ['link'],
          ],
        },
      },
    }
  },

  methods: {
    onEditorChange(editor) {
      this.$emit('input', editor)
    },
  },
}
</script>

<style scoped></style>
