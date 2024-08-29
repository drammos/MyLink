import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import LogInIssues from "../../Components/SendHelpComponents/LogInIssues"
import LoadingSlowly from "../../Components/SendHelpComponents/LoadingSlowly"
import FormSubmitIssues from "../../Components/SendHelpComponents/FormSubmitIssues"
import AccountManagement from "../../Components/SendHelpComponents/AccountManagement"
import TechnicalProblems from "../../Components/SendHelpComponents/TechnicalProblems"
import './SendHelp.css'

import { useEffect } from "react"

const SendHelp = () => {
    const useDocumentTitle = (title) => {
        useEffect(() => {
            document.title = title;
        }, [title]);
    };
    useDocumentTitle('Issues and Support');
    return (
        <div>
            <Navbar />
            <div className="sendHelpContent">
            <h1>Common Problems and Solutions</h1>
            <p>Welcome to our Troubleshooting Page! Below, you&#39;ll find answers to common issues and their solutions. If you don&#39;t find what you&#39;re looking for, feel free to contact our support team.</p>
            </div>
            <LogInIssues />
            <LoadingSlowly />
            <FormSubmitIssues />
            <AccountManagement />
            <TechnicalProblems />
            <div className="sendHelpContent">
            <h2>Need Further Assistance?</h2>
            <p>If your issue isn&#39;t listed here or if the provided solutions don&#39;t work, please <a href="contact.html">contact our support team</a>. We&#39;re here to help!</p>
            </div>
            <Footer />
        </div>
    )
}

export default SendHelp
