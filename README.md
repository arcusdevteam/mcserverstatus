# mcserverstatus

A javascript function for checking changes in a minecraft server's list of players without using query or a custom plugin.

## Usage

### mcstatus(options,callback)

Options can be an object:
```js
var options = {
  name: 'name',
  ip: 'ip'
}
```
Or an array of objects:
```js
var options = [
  {
    name: 'name1',
    ip: 'ip1'
  },
  {
    name: 'name2',
    ip: 'ip2'
  }
]
```

#### Example:

```js
var mcstatus = require('mcserverstatus').mcstatus; // only include if using npm

mcstatus({
  name: 'senious survival', // can be anything
  ip: 'senious.mcph.co' // the IP of the server
}, function response(response) {
  console.log(response);
});
```

If used in an interval, it will return the current players only once and then return consecutive join and leave messages.
```js
setInterval(function(){
  mcstatus({
    name: 'name',
    ip: 'ip'
  },function(response){
    console.log(response);
  });
},1000);
```
#### Response:
When first ran it returns:

`Currently [list of players] is playing on [server name].`

Then if a player joins the server and the function is run again:

`[playername] joined [server name]. Now there are [current players]/[max players] on the server, including [list of players].`

## Install

### With npm:

`npm install mcserverstatus`

### Without npm:

`<script src="`[https://rawgit.com/arcusdevteam/mcserverstatus/master/mcstatus.min.js](https://rawgit.com/arcusdevteam/mcserverstatus/master/mcstatus.min.js)`"></script`
