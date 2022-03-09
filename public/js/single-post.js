// Submit Comment
async function submitCommentHandler(event) {
  event.preventDefault();
  // get data 
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const comment_text = document.querySelector("#comment-text").value.trim();
  if (comment_text) {
    // Post fetch request to back-end
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_text, //removed user id
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Error Check
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}; 
// Click event listener
document.querySelector("#post-comment-btn").addEventListener("click", submitCommentHandler);
  