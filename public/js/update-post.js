// Create Post
async function createPostHandler(event) {
  event.preventDefault();
  // Get data
  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  if (body) {
    // Verify comment text is entered
    const response = await fetch("/api/posts/" + post_id, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Error Check
    if (response.ok) {
      // Replace post id
      document.location.replace("/dashboard"); 
    } else {
      alert(response.statusText);
    }
  }
}
// Click event listener
document.querySelector("#create-post-btn").addEventListener("click", createPostHandler);