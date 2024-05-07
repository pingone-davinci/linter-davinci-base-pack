const TestLinter = require("pingone-davinci-linter/lib/TestLinter");

const tester = new TestLinter(__dirname, "../.");
tester.runTests();
