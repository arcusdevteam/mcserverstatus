var item = {
    "servername":"king of the rock",
    "ipaddress":"198.24.164.162:34009",
    "id":"c4b313e01f049881"
};
console.log(mcstatus(item,'usernme'));
function mcstatus(item,username) {
  window.sessionStorage.removeItem('msg');
  var Notified = window.sessionStorage.getItem('notified' + item.id);
  var first = window.sessionStorage.getItem('first' + item.id);
  var oldList = window.sessionStorage.getItem('oldList' + item.id);
  var oldResponse = window.sessionStorage.getItem('oldResponse' + item.id);
  var Too = window.sessionStorage.getItem('too' + item.id);
  var Run = window.sessionStorage.getItem('run' + item.id);
  var xml = new XMLHttpRequest();
  xml.onreadystatechange = function() {
      if (xml.readyState == 4 && xml.status == 200) {
          window.sessionStorage.setItem('response' + item.id,xml.responseText);
      }
      else {
        return;
      }
  }
  var url = 'http://mcping.net/api/' + item.ipaddress + '/online,max,sample,strippedmotd';
  xml.open('GET', url, 'true');
  xml.send();
  var response = JSON.parse(window.sessionStorage.getItem('response' + item.id));
  if (response !== '' && response !== undefined) {
    if (response.max === 0) {
        if (Run !== 'true') {
            window.sessionStorage.setItem('msg','We could not find the ip for ' + item.servername + '. This probably means that the server is not running.');
        }
        window.sessionStorage.setItem('run' + item.id, true);
    }
    else {
        if (response == undefined) {

        }
        if (response.sample === null && response.online > 0) {
            if (Too !== 'true') {
                window.sessionStorage.setItem('msg','There are too many players on ' + item.servername + ' for us to notify you. Try using a server with less players online.');
            }
            window.sessionStorage.setItem('too' + item.id, true);
        }
        else {
            var players = '';
            var playerlist = '';
            if (response.sample === null) {
                var users = '';
                var playerlist = '';
            }
            if (response.sample !== null) {
                for (i = 0; i < response.sample.length; i++) {
                    playerlist += response.sample[i].name + ' ';
                    if (response.sample.length === 1) {
                        players += response.sample[i].name;
                    }
                    if (response.sample.length === 2) {
                        if (i+1 === response.sample.length) {
                            players += 'and ' + response.sample[i].name;
                        }
                        else {
                            players += response.sample[i].name + ' ';
                        }
                    }
                    if (response.sample.length > 2) {
                        if (i+1 === response.sample.length) {
                            players += 'and ' + response.sample[i].name;
                        }
                        else {
                            players += response.sample[i].name + ', ';
                        }
                    }
                    if (response.sample[i].name === username) {
                        var send = false;
                    }
                }
                if (send == false) {
                    var send = 'true';
                    if (Notified !== 'true') {
                        window.sessionStorage.setItem('msg','You are on ' + item.servername + ', so we are not going to notify you from now on.');
                    }
                    window.sessionStorage.setItem('notified' + item.id, true);
                    window.sessionStorage.setItem('too' + item.id, false);
                }
            }
            if (players == '') {
            }
            else {
            }
            var users = players;
            var online = response.online;
            var joinlist = '';
            var leavelist = '';
            if (oldList !== null && oldResponse !== null && oldList !== undefined) {
                var difference = +online - +oldResponse;
                var players = playerlist.split(' ');
                var oldlist = oldList.split(' ');
                if (difference > 0) {
                    if (oldList || oldList == 0) {
                        var joined = diffArray(players, oldlist);
                        var jlist = joined;
                        for (i = 0; i < jlist.length; i++) {
                            if (jlist.length === 1) {
                                joinlist += jlist[i];
                            }
                            if (jlist.length === 2) {
                                if (i+1 === jlist.length) {
                                    joinlist += 'and ' + jlist[i];
                                }
                                else {
                                    joinlist += jlist[i] + ' ';
                                }
                            }
                            if (jlist.length > 2) {
                                if (i+1 === jlist.length) {
                                    joinlist += 'and ' + jlist[i];
                                }
                                else {
                                    joinlist += jlist[i] + ', ';
                                }
                            }
                        }
                        if (online === 1) {
                            window.sessionStorage.setItem('msg',joinlist + ' joined ' + item.servername + '. Now there are ' + online + '/' + response.max + ' players.');
                            var oldResponse = online;
                            var oldList = playerlist;
                            window.sessionStorage.setItem('notified' + item.id, false);
                            window.sessionStorage.setItem('first' + item.id, true);
                            window.sessionStorage.setItem('run' + item.id, false);
                            window.sessionStorage.setItem('too' + item.id, false);
                            window.sessionStorage.setItem('oldList' + item.id, oldList);
                            window.sessionStorage.setItem('oldResponse' + item.id, oldResponse);
                        }
                        else {
                            window.sessionStorage.setItem('msg',joinlist + ' joined ' + item.servername + '. Now there are ' + online + '/' + response.max + ' players, including ' + users);
                            var oldResponse = online;
                            var oldList = playerlist;
                            window.sessionStorage.setItem('notified' + item.id, false);
                            window.sessionStorage.setItem('first' + item.id, true);
                            window.sessionStorage.setItem('run' + item.id, false);
                            window.sessionStorage.setItem('too' + item.id, false);
                            window.sessionStorage.setItem('oldList' + item.id, oldList);
                            window.sessionStorage.setItem('oldResponse' + item.id, oldResponse);
                        }
                        var oldList = playerlist;
                        var oldResponse = online;
                    }
                    else {
                        var oldList = playerlist;
                    }
                }
                else if (difference < 0) {
                    if (oldList) {
                        var left = diffArray(oldlist, players);
                        var llist = left;
                        for (i = 0; i < llist.length; i++) {
                            if (llist.length === 1) {
                                leavelist += llist[i] + ' ';
                            }
                            if (llist.length === 2) {
                                if (i+1 === llist.length) {
                                    leavelist += 'and ' + llist[i];
                                }
                                else {
                                    leavelist += llist[i] + ' ';
                                }
                            }
                            if (llist.length > 2) {
                                if (i+1 === llist.length) {
                                    leavelist += 'and ' + llist[i];
                                }
                                else {
                                    leavelist += llist[i] + ', ';
                                }
                            }
                        }
                        if (online === 0) {
                            window.sessionStorage.setItem('msg',leavelist + 'left ' + item.servername + '. Now there are 0/' + response.max + ' players, and there are no players online');
                            var oldResponse = online;
                            var oldList = playerlist;
                            window.sessionStorage.setItem('notified' + item.id, false);
                            window.sessionStorage.setItem('first' + item.id, true);
                            window.sessionStorage.setItem('run' + item.id, false);
                            window.sessionStorage.setItem('too' + item.id, false);
                            window.sessionStorage.setItem('oldList' + item.id, oldList);
                            window.sessionStorage.setItem('oldResponse' + item.id, oldResponse);
                        }
                        else {
                            window.sessionStorage.setItem('msg',leavelist + ' left ' + item.servername + '. Now there are ' + online + '/' + response.max + ' players, including ' + users);
                            var oldResponse = online;
                            var oldList = playerlist;
                            window.sessionStorage.setItem('notified' + item.id, false);
                            window.sessionStorage.setItem('first' + item.id, true);
                            window.sessionStorage.setItem('run' + item.id, false);
                            window.sessionStorage.setItem('too' + item.id, false);
                            window.sessionStorage.setItem('oldList' + item.id, oldList);
                            window.sessionStorage.setItem('oldResponse' + item.id, oldResponse);
                        }
                        var oldList = playerlist;
                        var oldResponse = online;
                    }
                    else {
                        var oldList = playerlist;
                    }
                }
                else {
                    var oldResponse = online;
                    var oldList = playerlist;
                    if (first !== 'true') {
                        if (online == 0) {
                            window.sessionStorage.setItem('msg','Currently no players are playing on ' + item.servername + '.');
                        }
                        if (online == 1) {
                            window.sessionStorage.setItem('msg','Currently ' + users + ' is playing on ' + item.servername + '.');
                        }
                        else if (online > 1) {
                            window.sessionStorage.setItem('msg','Currently ' + users + ' are playing on ' + item.servername + '.');
                        }
                    }
                    window.sessionStorage.setItem('notified' + item.id, false);
                    window.sessionStorage.setItem('first' + item.id, true);
                    window.sessionStorage.setItem('run' + item.id, false);
                    window.sessionStorage.setItem('too' + item.id, false);
                    window.sessionStorage.setItem('oldList' + item.id, oldList);
                    window.sessionStorage.setItem('oldResponse' + item.id, oldResponse);
                }
            }
            else {
                var oldResponse = online;
                var oldList = playerlist;
                if (first !== 'true') {
                    if (online == 0) {
                        window.sessionStorage.setItem('msg','Currently no players are playing on ' + item.servername + '.');
                    }
                    if (online == 1) {
                        window.sessionStorage.setItem('msg','Currently ' + users + ' is playing on ' + item.servername + '.');
                    }
                    else if (online > 1) {
                        window.sessionStorage.setItem('msg','Currently ' + users + ' are playing on ' + item.servername + '.');
                    }
                }
                window.sessionStorage.setItem('notified' + item.id, false);
                window.sessionStorage.setItem('first' + item.id, true);
                window.sessionStorage.setItem('run' + item.id, false);
                window.sessionStorage.setItem('too' + item.id, false);
                window.sessionStorage.setItem('oldList' + item.id, oldList);
                window.sessionStorage.setItem('oldResponse' + item.id, oldResponse);
        }
      }
    }
  }
  else {
    window.sessionStorage.setItem('msg','McPing.net is down. Try again later');
  }
  return window.sessionStorage.getItem('msg');
}
