
// Fetch and display posts
function fetchPosts() {
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            const postsDiv = document.getElementById('posts');
            postsDiv.innerHTML = '';  // Clear previous posts
            posts.forEach(post => {
                const Element = document.createElement('div');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <small>Posted at: ${new Date(post.created_at).toLocaleString()}</small>
                `;
                postsDiv.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/add-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Fetch and display posts after adding a new one
        fetchPosts();
    })
    .catch(error => console.error('Error adding post:', error));
});

// Load posts on page load
window.onload = fetchPosts;