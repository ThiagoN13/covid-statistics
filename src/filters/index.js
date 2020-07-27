import Vue from 'vue'

Vue.filter('formatNumber', function (value) {
  if (!value) return 0

  return value.toLocaleString('pt-BR')
})

Vue.filter('formatDate', function (value) {
  if (!value) return ''

  const date = new Date(value)

  return `${date.toLocaleString('pt-BR')}`
})
