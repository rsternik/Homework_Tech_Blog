// Inactitity timeout - 15 minute duration
var inactivityTime = function () {
  var time;
  window.onload = resetTimer;
  // Keypress or Mouse input detection to reset idle timer
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  // logout
  function logoutMeOut() {
    logout();
  }
  // Reset Timer
  function resetTimer() {
    clearTimeout(time);
    time = setTimeout(logoutMeOut, 900000);
  }
};
// Load upon window rendering page
window.onload = function () {
  inactivityTime();
};