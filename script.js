document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');

    // Dummy data for admin check and current user
    const currentUser = { name: 'User1', email: 'user1@example.com' }; // Current user
    const isAdmin = true; // Check if the user is an admin

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const comment = document.getElementById('comment').value;

        if (username && email && comment) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p><strong>${username}</strong> (${email})</p>
                <p>${comment}</p>
                <button class="edit-comment">Edit</button>
                <button class="delete-comment">Delete</button>
                <button class="like-comment">Like</button>
                <button class="dislike-comment">Dislike</button>
                <span class="likes-count">0 Likes</span>
                <span class="dislikes-count">0 Dislikes</span>
            `;

            commentsList.appendChild(commentDiv);

            // Clear the form
            commentForm.reset();
        }
    });

    // Event delegation for editing, deleting, and liking/disliking comments
    commentsList.addEventListener('click', (e) => {
        const target = e.target;
        const commentDiv = target.closest('.comment');

        if (target && target.classList.contains('edit-comment')) {
            if (commentDiv.querySelector('p strong').textContent === currentUser.name) {
                const newComment = prompt('Edit your comment:', commentDiv.querySelector('p:nth-of-type(2)').textContent);
                if (newComment) {
                    commentDiv.querySelector('p:nth-of-type(2)').textContent = newComment;
                }
            } else {
                alert('You can only edit your own comments.');
            }
        }

        if (target && target.classList.contains('delete-comment')) {
            if (commentDiv.querySelector('p strong').textContent === currentUser.name || isAdmin) {
                commentDiv.remove();
            } else {
                alert('You can only delete your own comments.');
            }
        }

        if (target && target.classList.contains('like-comment')) {
            const likesCount = commentDiv.querySelector('.likes-count');
            likesCount.textContent = parseInt(likesCount.textContent) + 1 + ' Likes';
        }

        if (target && target.classList.contains('dislike-comment')) {
            const dislikesCount = commentDiv.querySelector('.dislikes-count');
            dislikesCount.textContent = parseInt(dislikesCount.textContent) + 1 + ' Dislikes';
        }
    });
});
