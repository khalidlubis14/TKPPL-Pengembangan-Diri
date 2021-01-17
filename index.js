const bespoke = require('bespoke')
const theme = require('bespoke-theme-build-wars')
const keys = require('bespoke-keys')
const touch = require('bespoke-touch')
const bullets = require('bespoke-bullets')
const backdrop = require('bespoke-backdrop')
const scale = require('bespoke-scale')
const hash = require('bespoke-hash')
const progress = require('bespoke-progress')

const root = document.querySelector('article')
root.innerHTML = require('./slides.jade')()

bespoke.from(root, [
  theme(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  hash(),
  progress()
])

require('prismjs')
require('prismjs/components/prism-ruby')
require('./style.sass')
