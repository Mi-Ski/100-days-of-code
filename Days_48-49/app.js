const express = require('express');
const app = express();

const markup = `<form action="/store-user" method="POST" >
	<label for="ursname">Enter your name</label>
	<input id="usrname" type="text" name="username">
</form>`

app.get('/', (req, res) => {
	res.send(markup);
});
app.post('/store-user', (req, res) => {
	console.log(req.body.username);
	res.send(req.body.username);
});

app.listen(3000);