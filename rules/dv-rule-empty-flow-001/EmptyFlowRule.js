const LintRule = require("pingone-davinci-linter/lib/LintRule");

class EmptyFlow extends LintRule {
  constructor() {
    super({
      id: "dv-rule-empty-flow-001",
      description: "Ensure the flow is not empty",
      cleans: false,
    });

    this.addCode("dv-er-empty-flow-001", {
      description: "The flow has no nodes, it is empty",
      message: "Flow is empty",
      type: "error",
      recommendation: "Remove the flow if not in use",
    });
  }

  runRule() {
    try {
      const dvFlow = this.mainFlow;

      if (Object.keys(dvFlow.enabledGraphData.elements).length === 0) {
        this.addError("dv-er-empty-flow-001");
      }
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err.message}`] });
    }
  }
}

module.exports = EmptyFlow;
