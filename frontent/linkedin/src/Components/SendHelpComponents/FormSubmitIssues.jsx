import './SendHelpComponents.css'

const FormSubmitIssues = () => {

    return (
        <div className="SendHelpContainer">

            <h2>3. Form Submission Issues</h2>

            <h3>Problem: Unable to submit a form.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Ensure all required fields are filled out correctly.</li>
                    <li>Step 2: If you encounter an error message, double-check the input format (e.g., email, phone number).</li>
                    <li>Step 3: Clear your browser cache and cookies, then reload the page and try again.</li>
                </ul>
            </div>

            <h3>Problem: Form is submitting, but no confirmation received.</h3>
            <div className="solution">
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Step 1: Check your email&#39;s spam/junk folder for the confirmation email.</li>
                    <li>Step 2: Ensure your email address is entered correctly.</li>
                    <li>Step 3: Contact support if you still haven&#39;t received a confirmation within 24 hours.</li>
                </ul>
            </div>
        </div>
    );
};

export default FormSubmitIssues;