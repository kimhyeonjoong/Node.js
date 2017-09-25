var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views')
//정적파일을 서비스하는 법
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.get('/template', function(req, res){
	res.render('temp', {time:Date()});
});

app.get('/form', function(req, res){
	res.render('form');
})

app.get('/form_receiver', function(req, res){
	var title = req.query.title;
	var description = req.query.description;
	res.send(title+','+description);
})

app.post('/form_receiver', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	res.send(title+','+description);
})

app.get('/topic/:id', function(req, res){
	var topics = [
		'javascript is...',
		'nodejs is...',
		'express is...'
	];
	var output = `
		<a href="/topic/0">Javascript</a><br>
		<a href="/topic/1">nodejs</a><br>
		<a href="/topic/2">express</a><br>
		${topics[req.params.id]}
	`

	res.send(output);
});

app.get('/param/:module_id/:topic_id', function(req, req){
	res.json(req.params);
});

app.get('/', function(req, res){
	res.send('Hello home page');
});

app.get('/dynamic', function(req, res){
	var output = 
	`
	<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	Hello static????
</body>
</html>`;
	res.send(output);
});

app.get('/route', function(req, res){
	res.send('Hello Router, <img src="/444.png">');
});
app.get('/login', function(req, res){
	res.send('Login Please');
});
app.listen(3000, function(){
	console.log('Connected 3000 port!');
});
