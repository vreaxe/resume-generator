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

<style lang="postcss">
/* Quill customizations */
.quill-editor.focused {
  .ql-toolbar.ql-snow {
    border-color: #7957d5 !important;
  }
  .ql-container.ql-snow {
    border-color: #7957d5 !important;
  }
}
.quill-editor {
  &:hover {
    .ql-toolbar.ql-snow {
      border-color: #b5b5b5;
    }
    .ql-container.ql-snow {
      border-color: #b5b5b5;
    }
  }
}
.ql-toolbar.ql-snow {
  border-color: #dbdbdb;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.ql-container.ql-snow {
  border-color: #dbdbdb;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
