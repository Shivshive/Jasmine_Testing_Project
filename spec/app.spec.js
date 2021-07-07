const app = require('../app')
const request = require('request')
const SpecReporter = require('jasmine-spec-reporter').SpecReporter
var JSONReporter = require('jasmine-json-test-reporter');
const server = require('../app');

var myReporter = {
    jasmineStarted: function(suiteInfo) {
      console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
    },
  
    suiteStarted: function(result) {
      console.log('Suite started: ' + result.description
        + ' whose full description is: ' + result.fullName);
    },
  
    specStarted: function(result) {
    //   await somethingAsync();
      console.log('Spec started: ' + result.description
        + ' whose full description is: ' + result.fullName);
    },
  
    specDone: function(result) {
      console.log('Spec: ' + result.description + ' was ' + result.status);
  
      for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('Failure: ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
  
      console.log(result.passedExpectations.length);
    },
  
    suiteDone: function(result) {
      console.log('Suite: ' + result.description + ' was ' + result.status);
      for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('Suite ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
    },
  
    jasmineDone: function(result) {
      console.log('Finished suite: ' + result.overallStatus);
      for(var i = 0; i < result.failedExpectations.length; i++) {
        console.log('Global ' + result.failedExpectations[i].message);
        console.log(result.failedExpectations[i].stack);
      }
    }
  };


jasmine.getEnv().clearReporters() // remove default reporter logs

jasmine.getEnv().addReporter(new JSONReporter({
    file: 'jasmine-test-results.json',
    beautify: true,
    indentationLevel: 4 // used if beautify === true
}));

jasmine.getEnv().addReporter(
    new SpecReporter({
        // add jasmine-spec-reporter
        spec: {
            displayPending: true,
        },
    })
)
jasmine.getEnv().addReporter(myReporter);



const URI = 'http://localhost:3000'

describe('Express APP Test', () => {

    // Get Method test
    it('/GET Method Status Code Test', (done) => {
        request.get('/', { baseUrl: URI }, (error, response, body) => {

            if (error) {
                console.log('Test Case // GET TEST Error Occured')
                console.log(`${error}`)
                done()
            }
            expect(response.statusCode).toEqual(200)
            done()
        })
    })

    // Get method test
    it('/GET Method Message Test', (done) => {
        request.get('/', { baseUrl: URI }, (error, response, body) => {

            if (error) {
                console.log('Test Case // GET TEST Error Occured')
                console.log(`${error}`)
                done()
            }
            let response_body = JSON.parse(body)
            console.log(response_body)
            expect(response_body.message).toContain("success")
            done()
        })
    })

    // Post method test
    it('/POST Method Status Code Test', (done) => {
        request.post('/create', {
            baseUrl: URI, json: {
                "firstName": "Joe",
                "lastName": "Jackson",
                "gender": "male",
                "age": 28,
                "address": {
                    "streetAddress": "101",
                    "city": "San Diego",
                    "state": "CA"
                },
                "phoneNumbers": [
                    { "type": "home", "number": "7349282382" }
                ]
            }
        }, (error, response, body) => {

            if (error) {
                console.log('Test Case // GET TEST Error Occured')
                console.log(`${error}`)
                done()
            }
            expect(response.statusCode).toEqual(200)
            done()
        })
    })


    // Post method test
    it('/POST Method Body Match Test', (done) => {

        request.post('/create', {
            baseUrl: URI, json: {
                "firstName": "Joe",
                "lastName": "Jackson",
                "gender": "male",
                "age": 28,
                "address": {
                    "streetAddress": "101",
                    "city": "San Diego",
                    "state": "CA"
                },
                "phoneNumbers": [
                    { "type": "home", "number": "7349282382" }
                ]
            }
        }, (error, response, body) => {

            if (error) {
                console.log('Test Case // GET TEST Error Occured')
                console.log(`${error}`)
                done()
            }
            expect(JSON.stringify(body["request body"])).toBe(JSON.stringify(
                {
                    "firstName": "Joe",
                    "lastName": "Jackson",
                    "gender": "male",
                    "age": 28,
                    "address": {
                        "streetAddress": "101",
                        "city": "San Diego",
                        "state": "CA"
                    },
                    "phoneNumbers": [
                        { "type": "home", "number": "7349282382" }
                    ]
                }))
            done()
        })
    })
    afterAll(()=>{
        server.close()
    })
})

// command to find process using a specific port
// netstat -ano | findstr :<PORT>

// Command to kill process using with the PID obtained from above command
// taskkill /PID <PID> /F