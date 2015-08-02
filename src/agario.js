// Description:
//   Searches an Agar.io party
//
// Commands:
//   hubot create agario party - Searches for an available Agar.io party
//


module.exports = function(robot) {
  robot.respond(/create agario party/, function(msg) {
    robot.http('http://m.agar.io/findServer')
    .post('EU-London:party\n154669603')(function(err, res, body) {
      if (err) {
        msg.reply('There was an error, please try again later');
        robot.logger.error('Error finding an Agar.io server: ' + err);
      } else {
        msg.reply('http://agar.io/#' + body.token);
      }
    });
  });
};
