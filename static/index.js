var info;
  function checkrs()
  {
    fetch("/info").then(response => response.json()).then(data => info = data);
    var mongoServers = document.querySelectorAll("p.server");
    var mongoStatus = document.querySelectorAll("p.status");
    var mongoHealth = document.querySelectorAll("p.health");
    var mongoVotes = document.querySelectorAll("p.votes");
    var mongoPriority = document.querySelectorAll("p.priority");
    var dotsArray = document.querySelectorAll("div.dot");
    var squareArray = document.querySelectorAll("div.square");
    for (var i = 0;i < mongoServers.length;i++)
    {
      var name = mongoServers[i].innerText.split(":")[1].split(" ")[1];
      mongoStatus[i].innerText = "status: " + info[name]['state'].toLowerCase();
      mongoHealth[i].innerText = "health: " + info[name]['health'];
      mongoVotes[i].innerText = "votes: " + info[name]['votes'];
      mongoPriority[i].innerText = "priority: " + info[name]['priority'];
      if(info[name]['state'] == "(not reachable/healthy)")
      {
        dotsArray[i].style.backgroundColor = "#f00";
        squareArray[i].style.borderColor = "#f00";
      }
      else
      {
        dotsArray[i].style.backgroundColor = "#8cee31";
        squareArray[i].style.borderColor = "#8cee31";
      } 
    }
  }
  setInterval(checkrs,3000); 
  function startTime() 
  {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i)
  {
    if (i < 10) {i = "0" + i};
    return i;
  }