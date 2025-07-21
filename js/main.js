document.addEventListener('DOMContentLoaded', function() {
    const postsList = document.getElementById('posts-list');

    // Fetch the list of posts from posts.json
    fetch('posts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(posts => {
            if (posts.length === 0) {
                postsList.innerHTML = '<p>No posts found. Add your first post!</p>';
                return;
            }

            let html = '';
            posts.forEach(post => {
                html += `
                    <article class="post-card">
                        <h2 class="post-title"><a href="${post.url}">${post.title}</a></h2>
                        <p class="post-meta">${post.date}</p>
                        <p class="post-excerpt">${post.description}</p>
                        <a href="${post.url}" class="read-more">Read More &rarr;</a>
                    </article>
                `;
            });
            postsList.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            postsList.innerHTML = '<p>Sorry, there was an error loading the posts. Please check the console for details and ensure your `posts.json` file is correctly formatted.</p>';
        });
});