document.addEventListener('DOMContentLoaded', () => {
    async function signupHandler(event) {
        event.preventDefault();
    
        const username = document.querySelector('#username-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
    
        if(username && password) {
            const response = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if(response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert('Not logged in!');
            }
        }
    }

    const signupForm = document.querySelector('#signup-form');
    if(signupForm) {
        signupForm.addEventListener('submit', signupHandler);
    }
});