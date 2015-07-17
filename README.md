# mcstatus.js documentation

*A javascript function for changes in a server's playerlist. *<br>

#####JS:<br><br>

```js
var item = {
    "servername":"king of the rock",
    "ipaddress":"198.24.164.162:34009",
    "id":"c4b313e01f049881"
};

setInterval(function(){
    console.log(mcstatus(item,'minecraftusername');
},3000);
```

#####OUTPUT:<br><br>



1. `You are on king of the rock, so we are not going to notify you from now on.`

2. `We could not find the ip for king of the rock. This probably means that the  server is not running. `

3. `[minecraftusername] joined/left king of the rock. Now there is 1/25 players.`



###Requirements:
 Currently requires sessionStorage in order to save data about the 
 amount of players when the function was last used.

###The Function:
<br>
###**mcstatus(options,minecraftusername);**
<br>
#####Options:<br><br>

```

{
    "servername":"king of the rock",
    "ipaddress":"198.24.164.162:34009",
    "id":"c4b313e01f049881"
};

```
**"servername":**
<br>
The servername is the name for the server which the function will use in it's response. This is useful if you have 2 different servers and you need to be notified by both without getting confused by which is which.
<br>
**"ipaddress":**
<br>
The ipaddress is the address of the server you wish to get notified about
<br>
**"id":**
<br>
The id is whatever you would like to call the item in order to make it unique from any other item you might pass through the function.
<br>
#####Username:
<br>
The username is whatever your minecraft username is. I thought that it would be pretty annoying to get notified if you were already on the server and could see who joined and who left.
<br>
