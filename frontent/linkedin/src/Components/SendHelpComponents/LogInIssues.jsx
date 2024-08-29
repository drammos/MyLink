import './SendHelpComponents.css'

const FormSubmitIssues = () => {

    return (
        <div className="SendHelpContainer">

            <h2>1. Login Issues</h2>

            <h3>Problem: Unable to log in with correct credentials.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Ensure your caps lock is off. Passwords are case-sensitive.</li>
                    <li>Step 2: Try resetting your password using the &quot;Forgot Password?&quot; link on the login page.</li>
                    <li>Step 3: Clear your browser cache and cookies, then try again.</li>
                    <li>Step 4: Ensure your browser is up-to-date or try logging in from a different browser.</li>
                </ul>
            </div>

            <h3>Problem: Account locked after too many failed login attempts.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Wait for 15 minutes before trying again.</li>
                    <li>Step 2: If you&#39;re still locked out, contact our support team for further assistance.</li>
                </ul>
            </div>
        </div>
    );
};

export default FormSubmitIssues;