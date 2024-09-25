import './SendHelpComponents.css'

const TechnicalProblems = () => {

    return (
        <div className="SendHelpContainer">
            <h2>6. Technical Errors</h2>

            <h3>Problem: Encountering a &quot;404 Page Not Found&quot; error.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Check if the URL is entered correctly.</li>
                    <li>Step 2: Go back to the homepage and navigate to the desired page.</li>
                    <li>Step 3: If the problem persists, report the broken link to our support team.</li>
                </ul>
            </div>

            <h3>Problem: Website displays incorrectly on my device.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Clear your browser cache and cookies.</li>
                    <li>Step 2: Ensure your device&#39;s software and browser are up-to-date.</li>
                    <li>Step 3: Try accessing the website from a different device or browser.</li>
                </ul>
            </div>
        </div>
    );
};

export default TechnicalProblems;