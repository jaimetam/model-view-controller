document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('#new-post-form');
    newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.querySelector('#post-title').value.trim();
        const content = document.querySelector('#post-content').value.trim();

        if (title && content) {
            const response = await fetch('/dashboard/new-post', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                const data = await response.json();
                console.log('Failed to create post', data);
            }
        }
    });
});