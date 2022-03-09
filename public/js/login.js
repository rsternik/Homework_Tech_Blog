// Login handler 
async function loginFormHandler(event) {
  event.preventDefault();
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // Email & Password verification
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // On success replace front-end homepage
    if (response.ok) {
      console.log(response, "You are now logged in.");
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}
// New signup handler
async function signupFormHandler(event) {
  event.preventDefault();
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  // Field validation
  if (username && email && password) {
    // POST fetch-request data to back-end
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // Logged response
    if (response.ok) {
      console.log(response);
    } else {
      alert(response.statusText);
    }
    // Second Response
    const responseTwo = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // Conditional response
    if (responseTwo.ok) {
      console.log(response, " Logged in successfully!");
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}
// Click event listener
document.querySelector("#login-btn").addEventListener("click", loginFormHandler);
document.querySelector("#signup-btn").addEventListener("click", signupFormHandler);