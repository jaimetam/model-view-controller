document.addEventListener('DOMContentLoaded', () => {
    async function loginHandler(event) {
        event.preventDefault();
    
        const username = document.querySelector('#username-login').value.trim();
        const password = document.querySelector('#password-login').value.trim();
    
        if(username && password) {
            const response = await fetch('/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if(response.ok) {
                document.location.replace('/dashboard');
            } else {
                const data = await response.json();
                alert(data.message);
            }
        }
    }

    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginHandler);
    }
});