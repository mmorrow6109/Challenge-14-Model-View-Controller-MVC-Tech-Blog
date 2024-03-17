async function commentFormHandler(event) {
    event.preventDefault();
  
    // Get the comment body from the form
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
  
    // Get the post id from the form
    const post_id = document.querySelector('input[name="post-id"]').value;
  
    // If the comment body is not empty, send a POST request to the add comment endpoint
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
  
        // If the response is ok, reload the page
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);