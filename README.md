# mcserverstatus

A javascript function for checking changes in a minecraft server's list of players without using query or a custom plugin.

##Usage
```js
var mcstatus = require('mcstatus').mcstatus;

var ip = 'senious.mcph.co'; // the server ip

var name = 'senious survival' // name can be anything

mcstatus(ip, name, function response(response) {
  console.log(response);
}
```
The response is in the form of a string and might look something like:


`fakeUsername joined fakeServerName. Now there are 5/50 players.`
It will also respond if it finds that the server
is offline, but it knows not to be annoying.

If you run it once, it will remember that the server is offline, and not bug you again.

##Install

###With npm:

`npm install mcserverstatus`

###Without npm:

Use this URL for production (uglified): [https://cdn.rawgit.com/arcusdevteam/mcserverstatus/master/mcstatus.min.js](https://cdn.rawgit.com/arcusdevteam/mcserverstatus/master/mcstatus.min.js)

Use this URL for dev/testing (prettified):
[https://rawgit.com/arcusdevteam/mcserverstatus/master/mcstatus.js](https://rawgit.com/arcusdevteam/mcserverstatus/master/mcstatus.js)

##Demo

Coming Soon...
