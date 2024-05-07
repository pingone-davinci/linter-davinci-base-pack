const LintRule = require("pingone-davinci-linter/lib/LintRule");

class IncorrectAnnotationColorRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-canvas-001",
      description: "Verify colors for node annotations",
      cleans: false,
    });
    this.addCode("dv-bp-annotation-001", {
      description:
        "Found color not included in best practices list for annotation node",
      message: "Annotation color is not in palette [%] (%)",
      type: "best-practice",
      reference: "https://library.pingidentity.com/page/davinci-color-palette",
      recommendation: "Use recommended CSS settings for Ping developed flows",
    });
  }

  runRule() {
    try {
      const annotationNodes = this.dvUtil.getNodesByType("annotationConnector");
      const palette = [
        "#4462edff",
        "#5d00d6ff",
        "#f2f3f4ff",
        "#fffaa0ff",
        "fffaa0ff",
        "50e3c2ff",
        "ffffffff",
      ];

      annotationNodes.forEach((node) => {
        const { data } = node;
        const backgroundColor =
          data.properties?.backgroundColor?.value?.toLowerCase();

        if (!palette.includes(backgroundColor)) {
          this.addError("dv-bp-annotation-001", {
            messageArgs: [data.properties.backgroundColor.value, data.id],
            nodeId: data.id,
          });
        }
      });
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = IncorrectAnnotationColorRule;
