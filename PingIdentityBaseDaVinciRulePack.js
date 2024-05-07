const LintRulePack = require("pingone-davinci-linter/lib/LintRulePack");
const { version } = require("./package.json");

class PingIdentityBaseDaVinciRulePack extends LintRulePack {
  constructor() {
    super({
      directory: __dirname,
      version,
      name: "pingidentity-base-davinci-rule-pack",
      description: "Collection of base rules used to lint DaVinci flows.",
      author: "Ping Identity - cloud-solutions@pingidentity.com",
    });
  }
}

module.exports = PingIdentityBaseDaVinciRulePack;
