
const logInUser = (username, password) => {

    const input = JSON.stringify({ "username": username, "password": password });
    const { response, loading, refetch } = useService(
        'Logging in...',
        'POST',
        'http://localhost:5175/User/LoginUser',
        input
    );

        if (response.status === 200) {
            setErrorCode(0);
            setMessage('Login successful!');
            console.log('Login successful');
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('role', response.data.role);
            if (response.data.role === "Admin")
                setTimeout(() => {
                    navigate(Routes.ControlPanel);
                }, 2000);
            else
                setTimeout(() => {
                    navigate(Routes.MainPage);
                }, 2000);
        }
        else if (response.status === 600) {
            setErrorCode(1);
            setMessage('An Error Occured. Please try again later.');
            console.error('Login failed');
        }
        else if (response.status === 401) {
            setErrorCode(1);
            setMessage('Invalid username or password');
            console.error('Login failed');

};

export default logInUser;

