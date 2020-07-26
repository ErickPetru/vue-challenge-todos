import Vue from 'vue'
import dateFormat from 'intl-dateformat'

Vue.filter(
  'dateFormat',
  (date, format = 'YYYY-MM-DD HH:mm:ss', config = {}) => {
    const result = dateFormat(date, format, config)
    return result
  }
)
