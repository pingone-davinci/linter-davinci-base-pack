const LintRule = require("pingone-davinci-linter/lib/LintRule");

class MissingAnnotationsRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-canvas-005",
      description: "Verify flow contains annotations",
      cleans: false,
      reference: "",
    });

    this.addCode("dv-bp-annotation-003", {
      description:
        "It is a best practice to include annotations to document your flow",
      message: "Flow contains no annotations",
      type: "best-practice",
      recommendation: "Add annotations to flow",
    });
  }

  runRule() {
    try {
      const annotationType = "annotationConnector";
      const flowNodeTypes = this.dvUtil.getFlowNodeTypes();

      if (!flowNodeTypes.includes(annotationType)) {
        this.addError("dv-bp-annotation-003", {});
      }
    } catch (err) {
      // console.error(`Error occurred: ${err}`);
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = MissingAnnotationsRule;
