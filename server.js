var express = require('express'),
    port = process.env.PORT || 5000,
    app = express(),
    hbs = require('hbs'),
    fs = require('fs'),
    email = require('emailjs'),
    server = email.server.connect({
      user: "goswtestemail@gmail.com",
      password: "goswtestemail111111",
      host: "smtp.gmail.com",
      ssl:  true
    });

app.configure(function(){
    app.set('views',__dirname + '/app/views');
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.favicon(__dirname + '/app/assets/image/favicon.ico')); 
    app.use(express.static(__dirname + '/app/assets'));
});


// This is executed for all urls
app.get('*', function (req, res, next) {
    res.locals.title = "Gusts of Silent Wind";
    next();
});

/*app.get('/', function(req, res) {
    var partial = fs.readFileSync(__dirname + '/app/views/cover.html', 'utf8');
    hbs.registerPartial('content', partial);
    //res.locals.videoId = req.params.id;
    res.render("cover");
});*/
var contador = 0; 

app.get('/', function(req, res){
    var partial = fs.readFileSync(__dirname + '/app/views/calmly.html', 'utf8');
    hbs.registerPartial('content', partial);
    //res.locals.videoId = req.params.id;
    res.render("calmly");    

    //Send message. Callback tells us whether there's been an error or not
    server.send({
      text: "Visitante",
      from: "gustsofsilentwind@gmail.com",
      to: "gustsofsilentwind@gmail.com",
      cc: "",
      subject: contador++ + " " + getClientIp(req)
    }, function(err,message){ console.log(err || message);}); 
});

function getClientIp(req) {
  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};


/*app.get('/dmca', function(req, res){
    var partial = fs.readFileSync(__dirname + '/app/views/dmca.html', 'utf8');
    hbs.registerPartial('content', partial);
    res.render("dmca");
});*/ 
app.listen(port);
