const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://docs.taxd.co.uk/',
    env:{
      "apiUrl": "https://api.taxd.co.uk/adminview",
      "accessToken": "YOUR_ACCESS_TOKEN",
      "refreshToken": "YOUR_REFRESH_TOKEN"
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
