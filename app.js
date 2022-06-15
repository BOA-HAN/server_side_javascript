var express = require('express');
var app = express();
app.locals.pretty = true; // make pretty code
app.set('view engine', 'jade'); // template engine setting with jade
app.set('views', './views');
app.use(express.static('public'))
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
