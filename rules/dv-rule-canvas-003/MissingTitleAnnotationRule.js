const LintRule = require("pingone-davinci-linter/lib/LintRule");
// const DVUtils = require("pingone-davinci-linter/lib/DaVinciUtil");

class MissingTitleAnnotationRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-canvas-003",
      description: "Verify flow contains title annotation",
      cleans: false,
      reference: "https://library.pingidentity.com/page/flow-title-annotation",
    });

    this.addCode("dv-bp-missing-title-annotation-001", {
      description: "Title annotation node not found",
      message:
        "Each flow should contain a title annotation node with a background color of #4462ed",
      type: "best-practice",
      recommendation: "Add a title annotation node (%)",
    });
  }

  runRule() {
    try {
      const annotationNodes = this.dvUtil.getNodesByType("annotationConnector");
      const titleAnnotationColor = "#4462edff";
      let titleNodePresent;

      annotationNodes.forEach((node) => {
        const { data } = node;
        if (data.properties?.backgroundColor?.value === titleAnnotationColor) {
          titleNodePresent = true;
        }
      });

      if (!titleNodePresent) {
        this.addError("dv-bp-missing-title-annotation-001", {});
      }
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = MissingTitleAnnotationRule;
