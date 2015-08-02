// Description:
//   Searches an Agar.io party
//
// Commands:
//   hubot create agario party - Searches for an available Agar.io party
//


var errMsg = 'There was an error, please try again later';
module.exports = function(robot) {
  robot.respond(/create agario party/i, function(msg) {
    robot.http('http://m.agar.io/findServer')
    .post('EU-London:party\n154669603')(function(err, res, body) {
      if (err) {
        msg.reply(errMsg);
        robot.logger.error('Error finding an Agar.io server: ' + err);
      } else {
        try {
          msg.reply('http://agar.io/#' + JSON.parse(body).token);
        } catch (e) {
          msg.reply(errMsg);
          robot.logger.error('Error parsing agar.io response: ' + body);
        }
      }
    });
  });
};
