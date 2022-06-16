var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.locals.pretty = true; // make pretty code
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'pug'); // template engine setting with jade
app.set('views', './views');
app.use(express.static('public'))
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+', '+description);
});
app.use('/form_receiver', function(req, res){
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body.description, null, 2))
  //res.send('Hello Post');
  //
   //var title = req.body.title;
   //var description = req.body.description;
  // res.send(title+', '+description);
});
app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is...',
    'NodeJs is...',
    'Express is...'
  ];
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">NodeJs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
  `
  //${topics[req.query.id]}
  res.send(output);
})
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+', '+req.params.mode);
})
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'}); //rendering
})
app.get('/', function(req, res){
  //router & routing
  res.send('Hello home page');
});
app.get('/dynamic',function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
  <body>

  <h1>My First Heading</h1>
  <p>My Dynamic.</p>
    <ul>
      ${lis}
    </ul>
      ${time}
  </body>
  </html>`;
  res.send(output);
})
app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/plane.png">')
})
app.get('/login', function(req, res){
  res.send('Login please');
});
app.listen(3000, function(){
  //call back
  console.log('Connected 3000 port!');
});
