import { useState } from "react";
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignUpForm.css'

const SignUpForm = () => {
    const [message, setMessage] = useState('');
    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState(null); // State to store photo
    const [birthDate, setBirthDate] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('An Error Occured. Please try again.');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!terms) {
            setError('You must first agree with terms.');
            setMessage('Error');
            return;
        }

        // Handle form submission here (e.g., send data to server)

        setMessage('Account created successfully!');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleCheckBoxChange = () => {
        setTerms((prevState) => !prevState);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const renderPhotoPreview = () => {
        if (!photo) return null;
        const objectURL = URL.createObjectURL(photo);
        return <img src={objectURL} alt="Photo preview" className="photo-preview" />;
    };

    return (
        <div className="glass-container-SignUpForm">
            <p className="phrase">Empowering connections for a brighter future</p>
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <div className="firstline">
                    <div className="rowOne">
                        <input type="text" id="firstname" placeholder="First name" value={firstname} onChange={(e) => setFirstName(e.target.value)} onKeyPress={handleKeyPress} />
                        <input type="text" id="surname" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} onKeyPress={handleKeyPress} />
                        <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
                        <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>

                    <div className="rowTwo">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} />
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} onKeyPress={handleKeyPress} />
                        <label htmlFor="birthDate">Birth Date</label>
                        <input type="date" id="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} onKeyPress={handleKeyPress} />
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type={showPassword ? 'text' : 'password'} id="repeatpassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} onKeyPress={handleKeyPress} />
                    </div>
                </div>

                <div className="down-buttons">

                    <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </button>

                    <div className="photo-upload">
                        <label htmlFor="photo">Upload a photo</label>
                        <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {renderPhotoPreview()}

                    <div>
                        <label htmlFor="terms">I agree with terms and conditions</label>
                        <input type="checkbox" id="terms" checked={terms} onChange={handleCheckBoxChange} onKeyPress={handleKeyPress} />
                    </div>

                    <div className={message === 'Account created successfully!' ? 'success-message' : (message ? 'error-message' : '')}>
                        {message === 'Account created successfully!' ? <><GoCheckCircle /> {message}</> : (message === 'Error' ? <><GoXCircle /> {error}</> : '')}
                    </div>

                    <button className="create" type="submit">Create my Account</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
