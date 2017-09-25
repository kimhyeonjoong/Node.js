var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.get('/topic/new' , function(req, res){
	res.render('new');
});
app.get(['/topic', '/topic/:id'] , function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Interal Server Error');
		}
		var id = req.params.id;
		if(id){
			//id 값이 있을때
			fs.readFile('data/'+id, 'utf8', function(err, data){
				if (err){
					console.log(err);
					res.status(500).send('Interal Server Error');
				}
				res.render('view', {topics:files, title:id, des:data});
			})
		} else {
			res.render('view', {topics:files, title:'Welcome', des:'Helllo js for web'});
		}
	})
});

app.post('/topic', function(req, res){
	var	title = req.body.title;
	var des = req.body.des;
	fs.writeFile('data/'+title, des, function(err){
		if(err){
			res.status(500).send('Interal Server Error');
		}
		res.send('Success!');
	});

});

app.listen(3001, function() {
	console.log('Connected, 3001 port!');
});
