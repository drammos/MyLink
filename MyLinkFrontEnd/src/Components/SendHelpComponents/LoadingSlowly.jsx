import './SendHelpComponents.css'

const LogInIssues = () => {

    return (
        <div className="SendHelpContainer">
            <h2>2. Website Loading Slowly</h2>

            <h3>Problem: Pages are taking too long to load.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Clear your browser cache and cookies.</li>
                    <li>Step 2: Check your internet connection. A slow connection can cause longer loading times.</li>
                    <li>Step 3: Try using a different browser or device.</li>
                    <li>Step 4: Disable any browser extensions or plugins that might be interfering.</li>
                </ul>
            </div>

            <h3>Problem: Images or videos aren&#39;t loading properly.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Refresh the page or try accessing it from a different device.</li>
                    <li>Step 2: Ensure your internet connection is stable.</li>
                    <li>Step 3: Check if you have any ad-blockers or plugins that could be blocking content.</li>
                </ul>
            </div>
        </div>
    );
};

export default LogInIssues;