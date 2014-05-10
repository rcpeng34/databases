/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
exports.sequelize = new Sequelize("chat", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
exports.messages = this.sequelize.define('messages', {
  message: Sequelize.STRING,
  //userId: Sequelize.INTEGER,
  //roomId: Sequelize.INTEGER
});

exports.users = this.sequelize.define('users', {
  name: Sequelize.STRING,
});

exports.rooms = this.sequelize.define('rooms', {
  name: Sequelize.STRING,
});

this.messages.belongsTo(this.users);

this.messages.belongsTo(this.rooms);

this.messages.sync();
this.users.sync();
this.rooms.sync();


/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
// this.users.sync().success(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = this.users.build({user_name: "Jean Valjean"});
//   newUser.save().success(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     this.users.findAll({ where: {name: "Jean Valjean"} }).success(function(users) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < users.length; i++) {
//         console.log(users[i].name + " exists");
//       }
//     });
//   });
// });
