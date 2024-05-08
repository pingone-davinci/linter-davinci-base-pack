const LintRule = require("pingone-davinci-linter/lib/LintRule");

class LogoRule extends LintRule {
  constructor() {
    super({
      id: "dv-bp-logo-001",
      description:
        "Ensure logos are not hard coded and useCSS is used with a css logo tag.  Does not apply to subflows",
      cleans: false,
      reference: "https://library.pingidentity.com/page/ping-ux-css",
    });

    this.addCode("dv-bp-logo-001", {
      description: "In flow settings, useCustomCSS not set to true",
      message: "useCustomCSS not set to true",
      type: "best-practice",
      recommendation: "Use recommended CSS settings for Ping developed flows",
    });
    this.addCode("dv-bp-logo-002", {
      description:
        "In flow settings, companyLogo class not included in custom CSS",
      message: "companyLogo class not included in custom CSS",
      type: "best-practice",
      recommendation: "Use recommended CSS settings for Ping developed flows",
    });
    this.addCode("dv-bp-logo-003", {
      description:
        "Found companyLogo environment variable in variables connector, this should be handled in custom CSS settings",
      message: "companyLogo environment variable found",
      type: "best-practice",
      recommendation: "Use recommended CSS settings for Ping developed flows",
    });
  }

  runRule() {
    try {
      const dvFlow = this.mainFlow;
      const { allFlows } = this;

      // Ignore this rule in subflows, CSS should be applied at the main flow level
      if (this.dvUtil.getAllSubFlows(allFlows).includes(dvFlow.flowId)) {
        return;
      }
      // Check for custom CSS enabled
      if (!dvFlow.settings?.useCustomCSS) {
        this.addError("dv-bp-logo-001");
      }
      // Check for companyLogo class in custom CSS
      if (!dvFlow.settings?.css?.includes(".companyLogo")) {
        this.addError("dv-bp-logo-002");
      }

      // Search for companyLogo environment variable
      dvFlow.graphData?.elements?.nodes?.forEach((node) => {
        const { data } = node;

        if (data.connectorId === "variablesConnector") {
          data.properties?.saveVariables?.value?.forEach((obj) => {
            if (obj.name === "companyLogo") {
              this.addError("dv-bp-logo-003", {
                nodeId: data.id,
              });
            }
          });
        }
      });
    } catch (err) {
      this.addError(undefined, { messageArgs: [`${err}`] });
    }
  }
}

module.exports = LogoRule;
