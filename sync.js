var http = require('http');
var express = require("express");
var app = express();

app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/'));
});


/* simulate network delays using normal distribution */
function rnd_snd() {
	return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
}
function rnd(mean, stdev) {
	return Math.round(rnd_snd()*stdev+mean);
}
function fakeNetworkDelay() {
	return Math.max(200, rnd(1000, 400));
}

app.post('/sync', function(req, res) {
	var m = req.body;
	m.serverLocalTime = +new Date();
	res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(m));
});

app.listen(8080);
console.log('Server running');