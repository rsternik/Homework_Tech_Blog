// Edit Post
async function editPostHandler(e) {
  e.preventDefault();
  // post data
  const title = document.querySelector("#post-title").innerHTML;
  const body = document.querySelector("#post-body").innerHTML;
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(title, body);
  document.location.replace("/edit/" + post_id);
}
// Delete Post
async function deletePostHandler(e) {
  e.preventDefault();
  // Delete using current post id
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // Delete backend fetch
  const response = await fetch("/api/posts/" + post_id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Error check
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
// Edit post click event listener
document.querySelector("#edit-btn").addEventListener("click", editPostHandler);
// Delete post event listener
document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);