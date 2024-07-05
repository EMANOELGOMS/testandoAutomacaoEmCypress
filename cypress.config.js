const { defineConfig } = require('cypress')

module.exports = defineConfig({
    //chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://wlsf82-hacker-stories.web.app/',
    testIsolation: false
  },
})