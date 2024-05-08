const LintRule = require("pingone-davinci-linter/lib/LintRule");
// const DVUtils = require("pingone-davinci-linter/lib/DaVinciUtil");

class IncorrectAnnotationColorRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-canvas-002",
      description: "Verify and clean font family for node annotations",
      cleans: true,
      reference: "",
    });

    this.addCode("dv-bp-annotation-002", {
      description: "Found non-standard fontFamily used for Annotation",
      message: "Annotation font is not in sans-serif [%] (%)",
      type: "best-practice",
      recommendation: "Use sans-serif fontFamily for Annotations",
    });
  }

  runRule() {
    try {
      const annotationNodes = this.dvUtil.getNodesByType("annotationConnector");
      const fontFamily = "sans-serif";

      annotationNodes.forEach((node) => {
        const { data } = node;
        if (
          data.properties?.fontFamily?.value?.toLowerCase() !==
          fontFamily.toLowerCase()
        ) {
          this.addError("dv-bp-annotation-002", {
            messageArgs: [data.properties.fontFamily.value, data.id],
            nodeId: data.id,
          });

          if (this.cleanFlow) {
            data.properties.fontFamily.value = fontFamily;
            this.addCleanResult(
              "Set annotation font to sans-serif",
              data.id,
              "fontFamily"
            );
          }
        }
      });
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = IncorrectAnnotationColorRule;
