'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    expressRest = require('express-rest')
var app = express();
var rest = expressRest(app);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const users = [
    {
        id: 1,
        name: 'Adam',
        address: 'Caliornia usa'
    },
    {
        id: 2,
        name: 'Marcin',
        address: 'Utah usa'
    },
    {
        id: 3,
        name: 'Renata',
        address: 'Massachusetts usa'
    },
]

// MV
app.get('/', function (req, res) {
    res.render('users', { users });
});

app.get('/:id', function (req, res) {
    const user = users.find(user => user.id === Number(req.params.id))
    res.render('user', { user });
});

// REST
rest.get('/api/users', function(req, rest) {
    return rest.ok(users);
});

rest.get('/api/users/:id', function(req, rest) {
    const user = users.find(user => user.id === Number(req.params.id))
    if (user) rest.ok(user);
    else rest.notFound();
});

rest.post('/api/users', function(req, rest) {
    users.push({
        ...req.body,
        id: users.length + 1
    });
    rest.created('/api/users/' + (users.length - 1));
});


// START APP
app.listen(3000, function () {
    console.log('app is on 3000');
});
