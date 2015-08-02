var expect = require("chai").expect;
var path   = require("path");

var Robot       = require("hubot/src/robot");
var TextMessage = require("hubot/src/message").TextMessage;

describe("Hubot-script Functionality", function() {
  var robot;
  var user;
  var adapter;

  beforeEach(function(done) {
    // create new robot, without http, using the mock adapter
    robot = new Robot(null, "mock-adapter", false, "TestBot");

    robot.adapter.on("connected", function() {
      // load the module under test and configure it for the
      // robot.  This is in place of external-scripts
      require("../index")(robot);

      // create a user
      user = robot.brain.userForId("1", {
        name: "mocha",
        room: "#mocha"
      });

      adapter = robot.adapter;

      setTimeout(done, 250);
    });
    robot.run();
  });

  afterEach(function() {
    robot.shutdown();
  });

  describe("Creating an Agar.io party", function() {

    it("responds to 'create agario party'", function(done) {
      adapter.on("reply", function(envelope, strings) {
        try {
          expect(strings[0]).to.match(/^http:\/\/agar\.io\/#/);
          done();
        } catch(e) {
          done(e);
        }
      });

      // Send from first user
      adapter.receive(new TextMessage(user, robot.name+" create agario party"));
    });
  });
});
