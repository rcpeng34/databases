/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var url = require("url");
var fs = require("fs");
var qs = require("querystring");
var mysql = require("mysql");
// var messages = require("./messages.js");
var sequelize = require("../ORM_Refactor/orm-example.js")

var dbConnection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'chat'
});


exports.handler = function(request, response) {
  /*  the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  // define the path that is accepted
  var path = url.parse(request.url).pathname;
  if (path === '/classes/messages'){
    if (request.method === 'GET'){
      console.log("GET request received");
      response.writeHead(200, headers);

      sequelize.messages.findAll().complete(function(err, data) {
        console.log(data);
        var result = [];
        for (var i = 0; i < data.length; i++) {
          var preProcess = data[i]["dataValues"];
          var postProcess = {};
          postProcess.username = preProcess.userId;
          postProcess.text = preProcess.message;
          postProcess.roomname = preProcess.roomId;
          postProcess.createdAt = preProcess.createdAt;
          result.push(postProcess);
        }
        handleFile(err, result);
      });

      // dbConnection.query('SELECT m.message as text, m.createdAt as createdAt, u.name as username, r.name as roomname from messages m\
      //  join users u on m.userID = u.id\
      //  join rooms r on m.roomId = r.id',
      //     function(err, results) {
      //       console.dir(results);
      //       handleFile(err, results);
      //     });



      // READ FILE used when saving messages in an rtf
      // fs.readFile('./server/messages.rtf', 'utf8', handleFile);


      function handleFile (err, data) {
        if (err) {
          throw err;
        }
        //respond with all messages, but stringified
        // var responsePackage = {results: data};
        var responsePackage = data;
        responsePackage = JSON.stringify({results: responsePackage});
        response.end(responsePackage);
      }
    }
    else if (request.method === 'POST'){
      // for posts, wait until entire message is received,
      // add to the string as packets come in
      var newMessage = '';
      request.on('data', function (data){
        newMessage += data;
      });
      // once complete, begin actual parsing and pushing to messages
      request.on('end', function(){
        newMessage = JSON.parse(newMessage);
        newMessage.createdAt = Date();

      // APPEND FILE
     //fs.appendFile('./server/messages.rtf', ", " + JSON.stringify(newMessage));

        sequelize.users.findOrCreate({name: newMessage.username})
          .success(function(user) {
            sequelize.rooms.findOrCreate({name: newMessage.roomname})
              .success(function(room) {
                sequelize.messages.create({
                  message: newMessage.text,
                  userId: user.values.id,
                  roomId: room.values.id
                }).success(function(message) {
                  console.log(message.values);
                });
              });
          });



        // dbConnection.query('INSERT INTO rooms (name) value (?)',
        //   [newMessage.roomname],
        //   function(err, roomResults) {
        //     if (err) {
        //       return err;
        //     }
        //     var roomId = roomResults.insertId;
        //     dbConnection.query('INSERT INTO users (name) value (?)',
        //       [newMessage.username],
        //       function(err, userResults) {
        //         if (err) {
        //           return err;
        //         }
        //         var userId = userResults.insertId;
        //         dbConnection.query('INSERT INTO messages (createdAt, message, userId, roomId)\
        //           values (?, ?, ?, ?)',
        //           ['2010-01-01 01:01:01', newMessage.text, userId, roomId],
        //           function(err) {
        //             console.log('gets here');
        //             if (err) {
        //               console.log(err);
        //             }
        //           });
        //       });
        //   });

      });
      response.writeHead(201, headers);
      response.end();
    }
    else if (request.method === 'OPTIONS') {
      response.writeHead(200, headers);
      response.end();     //server must send end response back to client when sending an initial OPTIONS request
    }
    else { // if not post or get,
      response.writeHead(400, headers);
      response.end();
    }
  }
  else if (path === '/'){   //home path loads up the client html page
    fs.readFile('./client/index.html', function (err, html) {
      if (err) {
        throw err;
      }
      response.writeHeader(200, {"Content-Type": "text/html"});
      response.write(html);
      response.end();
    });
  }
  else if (path === '/bower_components/jquery/dist/jquery.js'){  //responds to jquery file request from the html
    fs.readFile('./client/bower_components/jquery/dist/jquery.js', function (err, js) {
      if (err) {
        throw err;
      }
      console.log('in jquery');
      response.writeHeader(200, {"Content-Type": "text/javascript"});
      response.write(js);
      response.end();
    });
  }
  else if (path === '/bower_components/underscore/underscore.js'){  //responds to underscore file request from the html
    fs.readFile('./client/bower_components/underscore/underscore.js', function (err, js) {
      if (err) {
        throw err;
      }
      response.writeHeader(200, {"Content-Type": "text/javascript"});
      response.write(js);
      response.end();
    });
  }
  else if (path === '/scripts/app.js'){ //responds to app.js file request from the html
    fs.readFile('./client/scripts/app.js', function (err, html) {
      if (err) {
        throw err;
      }
      response.writeHeader(200, {"Content-Type": "text/javascript"});
      response.write(html);
      response.end();
    });
  }
  else if (path === '/scripts/config.js'){  //responds to config.js file request from the html
    fs.readFile('./client/scripts/config.js', function (err, html) {
      if (err) {
        throw err;
      }
      response.writeHeader(200, {"Content-Type": "text/javascript"});
      response.write(html);
      response.end();
    });
  }
  else if (path === '/styles/styles.css'){  //responds to styles.css file request from the html
    fs.readFile('./client/styles/styles.css', function (err, html) {
      if (err) {
        throw err;
      }
      response.writeHeader(200, {"Content-Type": "text/css"});
      response.write(html);
      response.end();
    });
  }
  else { // path was illegal - 404 them
    response.writeHead(404, headers);
    response.end();
  }
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
