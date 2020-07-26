import Vue from 'vue'

function parse(input, format, key) {
  const index = format.indexOf(key)
  return input.slice(index, index + key.length)
}

Vue.filter('dateParse', function (
  input,
  format = 'YYYY-MM-DD HH.mm.ss',
  { epoch = 2000 } = {}
) {
  let year = 2000
  if (format.includes('YYYY')) {
    year = parseInt(parse(input, format, 'YYYY'), 10)
  } else if (input.includes('YY')) {
    year = parseInt(parse(input, format, 'YY'), 10) + epoch
  }

  let month = 0
  if (format.includes('MM')) {
    month = parseInt(parse(input, format, 'MM'), 10) - 1
  }

  let date = 1
  if (format.includes('DD')) {
    date = parseInt(parse(input, format, 'DD'), 10)
  }

  let hours = 0
  if (format.includes('HH')) {
    hours = parseInt(parse(input, format, 'HH'), 10)
  }

  let minutes = 0
  if (format.includes('mm')) {
    minutes = parseInt(parse(input, format, 'mm'), 10)
  }

  let seconds = 0
  if (format.includes('ss')) {
    seconds = parseInt(parse(input, format, 'ss'), 10)
  }

  return new Date(year, month, date, hours, minutes, seconds)
})
