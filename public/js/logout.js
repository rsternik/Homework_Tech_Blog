// Logout
async function logout() {
  // POST request to back-end to logout
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
  // Response
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}
// Click event listener
document.querySelector("#logout-btn").addEventListener("click", logout);
  