//#region import section

import { useState, useEffect } from "react";
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import useService from "../Services/useService";
import { useNavigate } from "react-router-dom";
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import UploadPhoto from '../Services/UploadPhoto';

import "react-datepicker/dist/react-datepicker.css";
import './SignUpForm.css';
import useSignUpUser from "../Services/useSignUpUser";
//#endregion

const SignUpForm = () => {

    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [photoURL, setPhotoURL] = useState(null);
    const [printPhotoURL, setPrintPhotoURL] = useState(0);

    const [terms, setTerms] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);

    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));

    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>At least one symbol</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    const { message, errorCode, error, loading, refetch } = useSignUpUser();

    // Error validation functions
    const validateFirstName = () => {
        if (!firstname.trim()) {
            setFirstNameError(true);
            return false;
        } else {
            setFirstNameError(false);
            return true;
        }
    };

    const validateSurname = () => {
        if (!surname.trim()) {
            setSurnameError(true);
            return false;
        } else {
            setSurnameError(false);
            return true;
        }
    };

    const validateUsername = () => {
        if (!username.trim()) {
            setUsernameError(true);
            return false;
        } else {
            setUsernameError(false);
            return true;
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
            return true;
        }
    };

    const validatePhone = () => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{3}-\d{4}$/;
        if (!phone.trim() || !phoneRegex.test(phone)) {
            setPhoneError(true);
            return false;
        } else {
            setPhoneError(false);
            return true;
        }
    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
            return true;
        }
    };

    const validateRepeatPassword = () => {
        if (repeatPassword !== password || repeatPassword.length < 8) {
            setRepeatPasswordError(true);
            return false;
        } else {
            setRepeatPasswordError(false);
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        const isFirstNameValid = validateFirstName();
        const isSurnameValid = validateSurname();
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isRepeatPasswordValid = validateRepeatPassword();

        if (isFirstNameValid && isSurnameValid && isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid && isRepeatPasswordValid) {
            refetch(firstname, surname, phone, email, 'Professional', username, password, repeatPassword, birthDate, photoURL, terms);
        } else {
            console.log("Validation failed");
        }
    };

    const handleCheckBoxChange = () => {
        setTerms((prev) => !prev);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                console.log("uploading photo...");
                const { originalUrl, transformedUrl } = await UploadPhoto(file);
                console.log("transformedUrl is: ", transformedUrl);
                console.log("originalUrl is: ", originalUrl);
                setPhotoURL(transformedUrl); // Set the optimized URL after upload
                setPrintPhotoURL(1);
            } catch (error) {
                console.error("Error uploading image to Cloudinary", error);
            }
        }
    };

    return (
        <div className="glass-container-SignUpForm">
            <p className="phrase">Empowering connections for a brighter future</p>
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <div className="firstline">
                    <div className="rowOne">
                        <InputText
                            placeholder={firstNameError ? "First name is mandatory" : "First name"}
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={firstNameError ? 'p-invalid' : ''} // Add p-invalid for error
                        />
                        <InputText
                            placeholder={surnameError ? "Surname is mandatory" : "Surname"}
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            className={surnameError ? 'p-invalid' : ''} // Add p-invalid for error
                        />
                        <InputText
                            placeholder={usernameError ? "Username is mandatory" : "Username"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={usernameError ? 'p-invalid' : ''} // Add p-invalid for error
                        />
                        <Password
                            placeholder={passwordError ? "Password is too short" : "Password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            header={header}
                            footer={footer}
                            toggleMask
                            className={passwordError ? 'p-invalid' : ''} // Add p-invalid for error
                        />
                        <Password
                            value={repeatPassword}
                            placeholder={repeatPasswordError ? "Passwords do not match" : "Repeat Password"}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            feedback={false}
                            toggleMask
                            className={repeatPasswordError ? 'p-invalid' : ''} // Add p-invalid for error
                        />
                    </div>

                    <div className="rowTwo">
                        <label htmlFor="email" className="font-bold block mb-2">Email</label>
                        <InputText
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? 'p-invalid' : ''}
                        />
                        <label htmlFor="phone" className="font-bold block mb-2">Phone</label>
                        <InputMask
                            id="phone"
                            mask="(999) 999-999-9999"
                            placeholder="(999) 999-999-9999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={phoneError ? 'p-invalid' : ''}
                        />
                        <label htmlFor="birthdate" className="font-bold block mb-2">Birth Date</label>
                        <Calendar
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            maxDate={eighteenYearsAgo}
                        />
                    </div>
                </div>

                <div className="down-buttons">

                    <div className="photo-upload">
                        <label htmlFor="photo">Upload a photo</label>
                        <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
                    </div>

                    {printPhotoURL === 1 && (
                        <img src={photoURL} alt="Photo preview" className="photo-preview" />
                    )}

                    <div>
                        <label htmlFor="terms">I agree with terms and conditions</label>
                        <input type="checkbox" id="terms" checked={terms} onChange={handleCheckBoxChange} />
                    </div>

                    <div className={errorCode === 1 ? 'error-message' : (errorCode === 0 ? 'success-message' : '')}>
                        {errorCode === 1 ? <><GoXCircle /> {error}</> : (errorCode === 0 ? <><GoCheckCircle /> {message}</> : '')}
                    </div>

                    <button className="create" type="submit">Create my Account</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
