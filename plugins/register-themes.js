import Vue from 'vue'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

export default function () {
  const requireComponentThemes = require.context(
    '@/components/themes',
    false,
    /.*\.vue$/
  )

  requireComponentThemes.keys().forEach((fileName) => {
    const componentConfig = requireComponentThemes(fileName)
    const componentName = upperFirst(
      camelCase(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}
