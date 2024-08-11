import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function TitleManager() {
    const location = useLocation();
    document.title = 'Test Title';
    useEffect(() => {
        const path = location.pathname;
        switch (path) {
            case '/':
                document.title = 'MyLink Home Page';
                break;
            case '/signup':
                document.title = 'Sign Up';
                break;
            case '/signin':
                document.title = 'Sign In';
                break;
            case '/forgot-password':
                document.title = 'Forgot Password';
                break;
            case '/sendHelp':
                document.title = 'Info and More';
                break;
            default:
                document.title = 'Default Title';
        }
    }, [location]);

    return null; // This component does not render anything
}

export default TitleManager