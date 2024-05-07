const LintRule = require("pingone-davinci-linter/lib/LintRule");
// const DVUtils = require("pingone-davinci-linter/lib/DaVinciUtil");

class TitleNotOnTopRule extends LintRule {
  constructor() {
    super({
      id: "dv-rule-canvas-004",
      description: "Verify Title Annotation is on top",
      cleans: false,
    });

    this.addCode("dv-bp-title-not-on-top-001", {
      description: "Title annotation not on top of flow",
      message: "The topmost node in your flow should be a title annotation (%)",
      type: "best-practice",
      recommendation: "Position title annotation at top of the flow",
    });
  }

  runRule() {
    try {
      const annotationType = "annotationConnector";
      const annotationColor = "#4462edff";

      const flowNodeTypes = this.dvUtil.getFlowNodeTypes();
      let nodeTopYCoord = Number.MAX_SAFE_INTEGER;

      // Ensure annotationConnector is in list of nodes
      if (flowNodeTypes && flowNodeTypes.includes(annotationType)) {
        flowNodeTypes.forEach((nodeType) => {
          if (nodeType === annotationType) {
            return; // Skip annotation nodes
          }
          const nodesByType = this.dvUtil.getNodesByType(nodeType);
          if (nodesByType) {
            nodesByType.forEach((node) => {
              const { position } = node;
              // Capture the node with the smallest y coord
              if (position.y < nodeTopYCoord) {
                nodeTopYCoord = position.y;
              }
            });
          }
        });

        const annotationNodes = this.dvUtil.getNodesByType(annotationType);
        const titleAnnotation = annotationNodes.filter(
          (obj) =>
            obj.data?.properties?.backgroundColor?.value === annotationColor
        );

        if (titleAnnotation.length > 0) {
          const { position, data } = titleAnnotation[0];
          if (position?.y > nodeTopYCoord) {
            this.addError("dv-bp-title-not-on-top-001", {
              messageArgs: [data.id],
              nodeId: data.id,
            });
          }
        }
      }
    } catch (err) {
      // console.error(`Error occurred: ${err}`);
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = TitleNotOnTopRule;
