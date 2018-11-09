Testing: 
dev-dependencies
npm i --save-dev expect@1.20.2 mocha@3.0.2 nodemon@1.10.2 supertest@2.0.0
write test for employee
package json:
"test": "mocha employee-server/**/*.test.js",
"test-watch": "nodemon --exec 'npm test'"

to run testcases:
npm run test-watch

date-format caused - Bad request!

to run server: node .\employee-server\employee-server.js