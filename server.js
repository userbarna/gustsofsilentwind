var express = require('express'),
    port = process.env.PORT || 3000,
    app = express(),
    hbs = require('hbs'),
    fs = require('fs'),
    slug = require ('slug');

app.configure(function(){
    app.set('views',__dirname + '/app/views');
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
    app.use(express.bodyParser());
    app.use(express.cookieParser());
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

app.get('/', function(req, res){
    var partial = fs.readFileSync(__dirname + '/app/views/calmly.html', 'utf8');
    hbs.registerPartial('content', partial);
    //res.locals.videoId = req.params.id;
    res.render("calmly");
});

/*app.get('/dmca', function(req, res){
    var partial = fs.readFileSync(__dirname + '/app/views/dmca.html', 'utf8');
    hbs.registerPartial('content', partial);
    res.render("dmca");
});*/

app.listen(port);
