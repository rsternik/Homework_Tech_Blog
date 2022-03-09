// Post creation handler
async function createPostHandler(e) {
  e.preventDefault();
  // Query Selector
  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();
  // Comment text to page
  if (body) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Error check
    if (response.ok) {
      document.location.replace("/dashboard"); //replace with post id
    } else {
      alert(response.statusText);
    }
  }
}
// Click Event Listener
document.querySelector("#create-post-btn").addEventListener("click", createPostHandler);