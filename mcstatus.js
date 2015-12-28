if (typeof exports !== 'undefined') {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

var mcstatus = function mcstatus(options,callback) {

  // tests that the callback exists, it is a function, and that options is an object or array:
  try {
    if (!callback) throw new Error('Callback is required.');
    if (typeof callback !== 'function') throw new Error('Callback must be a function');
    if (typeof options !== 'object') throw new Error('Paramater options must be an object or an array.');
  }
  catch(err) {
    callback(err);
  }

    // turns options into an array with one object in preperation for the loop:
    if (Array.isArray(options) !== true) {
      options = [options];
    }

  var xml = [];

  // for loop to run through the array:
  for (var i in options) {

    // function to fix XMLHttpRequest variable scope
    (function(i) {

      // creates a variable 'data' if not already defined:
      if (typeof data === 'undefined') {
        data = {};
      }

      // verifies that ip is defined:
      try {
        if (options[i].ip === undefined) throw new Error('Ip is required for the server ' + options[i].name + '.');
      }
      catch(err) {
            callback(err);
      }

      // otherwise sets the variables:
      var ip = options[i].ip;
      var name = options[i].name || ip; //name defaults to the ip

      // defines other variables:
      var playerlistarray = [], playerliststring = '';


      // sends an XML request to mcping.net and sets global variable response to the xml.reponseText:
      xml[i] = new XMLHttpRequest();
      xml[i].onreadystatechange = function() {

        // tests for a good response:
        if (xml[i].readyState == 4 && xml[i].status == 200) {
          response = JSON.parse(xml[i].responseText);

          // tests if the server is hiding their playerlist, or if the server is not running:
          if (response.sample === null && response.online > 0 || response.max === 0) {
            try {
              if (response.sample === null && response.online > 0) throw 'Unfortunately, ' + name + ' is hiding their playerlist.';
              if (response.max === 0) throw 'Could not find the ip for "' + name + '" or the server is not running.';
            }
            catch(err) {

              // if there is no error data:
              if (data[ip + 'error'] === undefined && data[ip + 'error'] !== null) {
                callback(err);
                data[ip + 'error'] = err;
              }

              // if there is error data:
              else {

                // if the error has already been reported:
                if (data[ip + 'error'] !== err) {
                  callback(err);
                }
                data[ip + 'error'] = err;
              }
            }
          }

          // if there are no errors:
          else {

            // since there are no errors, setting error data to false:
            if (data !== undefined && data[ip + 'error'] !== undefined && data[ip + 'error'] !== false) {
              data[ip + 'error'] = false;
            }

            // if there are players online:
            if (response.sample !== null && response.online < 13) {

              // converts only the names of the players on the server into an array (playerlistarray):
              for (i = 0; i < response.sample.length; i++) {
                playerlistarray.push(response.sample[i].name);
              }

              // converts the playerlistarray variable into a string with correct grammar:
              for (i = 0; i < playerlistarray.length; i++) {
                if (playerlistarray.length == 1) {
                  playerliststring += playerlistarray[0];
                }
                else if (playerlistarray.length == 2) {
                  if (i+1 === playerlistarray.length) {
                    playerliststring += ' and ' + playerlistarray[1];
                  }
                  else {
                    playerliststring += playerlistarray[0];
                  }
                }
                else {
                  if (i+1 === playerlistarray.length) {
                    playerliststring += 'and ' + playerlistarray[i];
                  }
                  else {
                    playerliststring += playerlistarray[i] + ', ';
                  }
                }
              }
            }

            // if there are not players online:
            else {
              if (response.online > 12) {
                callback('The server "' + name + '" has too many players online to get an accurate list of players.');
                return;
              }
            }

            // checks for old data:
            if (data === undefined || data !== undefined && data[ip] === undefined && data[ip] !== null) {

              // callback if there are no players online and there is no data:
              if (playerlistarray.length === 0) {
                callback('Currently no players are playing on ' + name + '.');
              }

              // callback if there is one player online and there is no data:
              else if (response.online === 1) {
                callback('Currently ' + playerliststring + ' is playing on ' + name + '.');
              }
              else {
                callback('Currently ' + playerliststring + ' are playing on ' + name + '.');
              }

              data[ip] = playerlistarray;
            }

            // if there is data:
            else {

              // if someone joined:
              if (response.online - data[ip].length > 0) {

                // if someone joined and one person is online:
                if (response.online == 1) {
                  callback(capitalize(getChangeList(data[ip],playerlistarray,'join')) + ' joined ' + name + '. Now there are 1/' + response.max + '.');
                }

                // if someone joined and there is more than one person online:
                else {
                  callback(capitalize(getChangeList(data[ip],playerlistarray,'join')) + ' joined ' + name + '. Now there are ' + response.online + '/' + response.max + ' players on the server, including ' + playerliststring + '.');
                }
              }

              // if someone left:
              if (response.online - data[ip].length < 0) {

                if (playerlistarray === null) {
                  playerlistarray = [];
                }

                // if someone left and now there are no players online:
                if (response.online === 0) {
                  callback(capitalize(getChangeList(data[ip],playerlistarray,'leave')) + ' left ' + name + '. Now there are 0/' + response.max + ' players on the server, so there are no players on the server.');
                }

                // if someone left and now there is only one player online:
                else if (response.online == 1) {
                  callback(capitalize(getChangeList(data[ip],playerlistarray,'leave')) + ' left ' + name + '. Now there is 1/' + response.max + ' players on the server, and only ' + playerliststring + ' online.');
                }

                // if someone left and there is more than one person on the server:
                else {
                  callback(capitalize(getChangeList(data[ip],playerlistarray,'leave')) + ' left ' + name + '. Now there are ' +  response.online + '/' + response.max + ' players on the server, including ' + playerliststring + '.');
                }
              }

              // stores data:
              data[ip] = playerlistarray;
            }
          }
        }
      };
      var url = 'https://mcping.net/api/' + ip + '/online,max,sample,strippedmotd';
      xml[i].open('GET', url, 'true');
      xml[i].send();
    })(i);
  }

  // functions:
  function getChangeList(oldList,newList,method) {

    // function to get the differences between two arrays:
    function diffArray(a,b) {
      var seen = [], diff = [];
      for (var i = 0; i < b.length; i++)
          seen[b[i]] = true;
      for (i = 0; i < a.length; i++)
          if (!seen[a[i]])
              diff.push(a[i]);
      return diff;
    }

    // if the function was used for a leave request:
    if (method== 'leave') {
      changelistarray = diffArray(oldList,newList);
    }
    // if the funciton was used for a join request:
      if (method== 'join') {
      changelistarray = diffArray(newList,oldList);
    }
    changeliststring = '';

    // for loop to generate a string of the players that have left or joined:
    for (i = 0; i < changelistarray.length; i++) {
      if (changelistarray.length == 1) {
        changeliststring += changelistarray[0];
      }
      else if (changelistarray.length == 2) {
        if (i+1 === changelistarray.length) {
          changeliststring += ' and ' + changelistarray[1];
        }
        else {
          changeliststring += changelistarray[0];
        }
      }
      else {
        if (i+1 === changelistarray.length) {
          changeliststring += 'and ' + changelistarray[i];
        }
        else {
          changeliststring += changelistarray[i] + ', ';
        }
      }
    }

    // returns the string of changes:
    return changeliststring;
  }

  // function to make the first letter capitalized:
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
if (typeof exports !== 'undefined') {
  exports.mcstatus = mcstatus;
}
