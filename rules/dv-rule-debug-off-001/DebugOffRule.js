const LintRule = require("pingone-davinci-linter/lib/LintRule");

class DebugOffRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-debug-off-001",
      description: "Ensure the flow has debug mode turned off",
      cleans: false,
      reference: "",
    });

    this.addCode("dv-bp-debug-off-001", {
      description: "In flow settings, log level is currently set to Debug",
      message: "Log level set to Debug",
      type: "best-practice",
      recommendation: "Change flow log level to Info or None",
    });
  }

  runRule() {
    try {
      for (const flow of this.allFlows) {
        /* Checks the flow settings to determine if debug is on (loglevel === 3) or off (loglevel === 1 or 2) */
        if (flow.settings?.logLevel === 3) {
          this.addError("dv-bp-debug-off-001");
        }
      }
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = DebugOffRule;
