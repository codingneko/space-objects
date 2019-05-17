document.getElementById('submit').addEventListener('click', (action) => {
    action.preventDefault();

    let UserInput = {
        password1: document.getElementById('password-1').value,
        password2: document.getElementById('password-2').value,
        userName: document.getElementById('userName').value,
        email: document.getElementById('email').value,
    }

    if(UserInput.password1 == UserInput.password2){
        delete UserInput.password2;
        if (UserInput.password1.length >= 8) {
            UserInput.password = sha1(UserInput.password1);
            delete UserInput.password1;
            UserInput.request = 'register';
            fetch('/auth', {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(UserInput)
            }).then(response => {
                return response.json();
            }).then(data => {
                // handle result displaying here
                if(data.status === 0){
                    app.notify.success('Welcome, ' + UserInput.userName + '. You\'ll be redirected shortly.');
                    app.setCookie('user', data.user.id);
                    window.location.href = '/';
                }else{
                    app.notify.error('Something went wrong, try contacting support.');
                }
            });
        } else {
            app.notify.warning('Your password needs to be at least 8 characters long', 'Password is too weak')
        }
    }else{
        app.notify.warning('passwords do not match');
    }

    setTimeout(app.notify.clearAlerts, 3000);
});