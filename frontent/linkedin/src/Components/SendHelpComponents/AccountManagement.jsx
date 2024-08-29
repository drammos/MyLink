import './SendHelpComponents.css'

const AccountManagement = () => {

    return (
        <div className="SendHelpContainer">
            <h2>5. Account Management</h2>

            <h3>Problem: Unable to update account details.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Ensure all fields are filled out correctly and in the right format.</li>
                    <li>Step 2: Clear your browser cache and cookies, then try updating again.</li>
                    <li>Step 3: Log out and back into your account to refresh your session.</li>
                </ul>
            </div>

            <h3>Problem: Forgot username or email associated with the account.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Try using the &quot;Forgot Username&quot; feature on the login page.</li>
                    <li>Step 2: Contact support with any details you remember (e.g., order history, email aliases).</li>
                </ul>
            </div>
        </div>
    );
};

export default AccountManagement;