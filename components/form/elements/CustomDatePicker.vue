<template>
  <client-only>
    <date-picker
      placeholder="DD/MM/YYYY"
      format="dd/MM/yyyy"
      :clear-button="true"
      v-model="computedValue" 
      :open-date="computedValue"
      :disabled-dates="disabledDates"
      @input="onDateChange" />
  </client-only>
</template>

<script>
export default {
  props: ['value'],

  computed: {
    computedValue: {
      get() {
        let newValue = this.newValue
        if (typeof newValue === 'string') newValue = new Date(this.newValue)
        return newValue
      },
      set(value) {
        this.newValue = value
        this.$emit('input', value)
      },
    },
  },

  data () {
    return {
      newValue: this.value,
      disabledDates: {
        from: new Date(), 
      }
    }
  },

  methods: {
    onDateChange(date) {
      this.$emit('input', date)
    },
  },
}
</script>

<style lang="postcss">
.vdp-datepicker {
  input {
    box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
    max-width: 100%;
    width: 100%;
    background-color: white;
    border-width: 1px;
    border-style: solid;
    border-color: #dbdbdb;
    border-radius: 4px;
    color: #363636;
    display: inline-flex;
    font-size: 1rem;
    height: 2.5em;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    line-height: 1.5;
    padding-bottom: calc(0.5em - 1px);
    padding-left: calc(0.75em - 1px);
    padding-right: calc(0.75em - 1px);
    padding-top: calc(0.5em - 1px);
    position: relative;
    vertical-align: top;
    outline: none;
    &:focus {
      border-color: #7957d5 !important;
    }
    &:hover {
      border-color: #b5b5b5;
    }
  }
  .vdp-datepicker__calendar {
    .cell.selected {
      background: #7957d5;
      color: white;
      &:hover {
        border-color: #7957d5;
        background: #7957d5;
      }
    }
    .cell:not(.blank):not(.disabled) {
      &.day:hover, &.month:hover, &.year:hover {
        border-color: #7957d5;
      }
    }
  }
  .vdp-datepicker__clear-button, .vdp-datepicker__calendar-button {
    position: absolute;
    right: 10px;
    font-size: 20px;
    top: 4px;
  }
}
</style>