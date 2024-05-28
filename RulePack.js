const LintRulePack = require("pingone-davinci-linter/lib/LintRulePack");
const {
  name,
  version,
  description,
  homepage,
  author,
} = require("./package.json");

class RulePack extends LintRulePack {
  constructor() {
    super({
      directory: __dirname,
      version,
      name,
      description,
      homepage,
      author,
    });
  }
}

module.exports = RulePack;
