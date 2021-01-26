const fs = require('fs')
const TurndownService = require('turndown')
const moment = require('moment')
const { createDirectory, mapDayFR } =  require('./utils.js')

createDirectory('working')
createDirectory('dest')

const turndownService = new TurndownService({'preformattedCode': true})

const files = fs.readdirSync('./working')

const moveAndReplace = files
  .filter(item => !item.match(/(2020|2021).html$/))
  .map(item => ({
    origin: item,
    source: item
  }))
  .map(({origin, source}) => ({
    origin,
    source: source.substring(0, source.length-5) + ' 2020.html'
  }))

files
  .filter(item => item.match(/(2020|2021).html$/))
  .map(item => ({
    origin: item,
    source: item
  }))
  .concat(moveAndReplace)
  .filter(({origin}) => !origin.match(/^\./))
  .map(({origin, source}) => ({
    origin,
    source,
    wow: source.substring(0, source.length - 5).replace(/  /, ' ').split(' ')
  }))
  .map(({origin, source, wow: [_day, day, month, year], ...rest}) => ({
    ...rest,
    origin,
    date: moment(`${year}-${mapDayFR[month.normalize()]}-${('00' + day).slice(-2)}`),
    dest: `${year}-${mapDayFR[month.normalize()]}-${('00' + day).slice(-2)}`
  }))
  .sort((a, b) => a.date - b.date)
  .map(({origin, ...rest}) => ({
    origin,
    ...rest,
    data: turndownService.turndown(fs.readFileSync(`./working/${origin}`, {encoding: 'utf-8', flag: 'r'})).split('\n\n') // .replace(/\n\n/g, '\n')
  }))
  .map(({data: [head, ...tail], ...rest}) => ({
    ...rest,
    data: `Partenamut: ${[head.toLowerCase(), ...tail].join('\n\n')}`
  }))
  .forEach(({dest, data}) => {
    fs.writeFileSync(`./dest/${dest}.md`, data, {encoding: 'utf8'})
  })
