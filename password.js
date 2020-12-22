//password for admin on homepage
var userResponse = "N/A";
function askPass() {
  "use strict";
  userResponse = prompt("What's the password?", "00000");
  if (userResponse === "12345") {
    window.open("admin-index.html");
  }
}

var login = document.querySelector("#login");
login.addEventListener("click", askPass);
