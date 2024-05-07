const LintRule = require("pingone-davinci-linter/lib/LintRule");

class DisabledNodeRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-node-002",
      description: "Disabled node found",
      cleans: false,
    });

    this.addCode("dv-er-node-001", {
      description: "Disabled Node Found",
      message: "Disabled node % found",
      type: "best-practice",
      recommendation: "Remove disabled node from flow.",
    });
  }

  runRule() {
    try {
      const dvFlow = this.mainFlow;

      dvFlow?.enabledGraphData?.elements?.nodes?.forEach((node) => {
        const { data } = node;

        if (data.isDisabled === true) {
          this.addError("dv-er-node-001", {
            messageArgs: [`(${data.id})`],
            nodeId: data.id,
          });
        }
      });
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = DisabledNodeRule;
