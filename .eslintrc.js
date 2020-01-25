module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "node": true
  },
  "extends": "airbnb",
  "ignorePatterns": ["bundle.js", "node_modules"],
  "rules": {
    "no-console": "off",
  }
}