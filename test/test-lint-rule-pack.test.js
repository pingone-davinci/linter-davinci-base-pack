const TestLinter = require("pingone-davinci-linter/lib/TestLinter");
const { name } = require("../package.json");

const tester = new TestLinter(__dirname, name);
tester.runTests();
