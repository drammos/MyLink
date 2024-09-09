//#region import section

import { useState, useEffect } from "react";
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import useService from "../Services/useService";
import { Routes } from "../../routes";
import { useNavigate } from "react-router-dom";
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Calendar } from 'primereact/calendar';
import UploadPhoto from '../Services/UploadPhoto';
import "react-datepicker/dist/react-datepicker.css";
import './SignUpForm.css';
//#endregion

const SignUpForm = () => {

    //#region Variables section (Group variables here)

    const [message, setMessage] = useState('');

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

    const [error, setError] = useState('');
    const [errorCode, setErrorCode] = useState(2);

    const [firstNameError, setFirstNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    //const [emailError, setemailError] = useState(false);
    //const [phoneError, setphoneError] = useState(false);
    //const [birthDateError, setbirthDateError] = useState(false);
    //const [passwordError, setpasswordError] = useState(false);
    //const [repeatPasswordError, setrepeatPasswordError] = useState(false);

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
    //#endregion

    const navigate = useNavigate();

    const inputFormData = new FormData();
    inputFormData.append('FirstName', firstname);
    inputFormData.append('LastName', surname);
    inputFormData.append('PhoneNumber', phone);
    inputFormData.append('Email', email);
    inputFormData.append('Role', 'Professional');
    inputFormData.append('Username', username);
    inputFormData.append('Password', password);
    inputFormData.append('BirthDate', birthDate);
    inputFormData.append('PictureURL', photoURL);

    const { response, loading, refetch } = useService(
        'Creating new user...',
        'POST',
        'http://localhost:5175/User/RegisterUser',
        inputFormData,
        'multipart/form-data'
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (photoURL === null) {
            setPhotoURL('https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png');
        }

        if (!terms) {
            setError('You must first agree with terms.');
            setMessage('Error');
            setErrorCode(1);
            return;
        }
        if (password !== repeatPassword) {
            setError('Passwords do not match');
            setMessage('Error');
            setErrorCode(1);
            return;
        }
        refetch();
    };

    useEffect(() => {
        if (response) {
            if (response.status === 200) {
                setErrorCode(0);
                setMessage('Account created successfully!');
                setTimeout(() => navigate(Routes.Home), 2000);
            } else {
                console.log(response.data.title);
                setError(response.data.title);
                setErrorCode(1);
            }
        }
    }, [response, navigate, message]);

    const handleCheckBoxChange = () => {
        setTerms((prev) => !prev);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                console.log("uploading photo...");
                const { originalUrl, transformedUrl, response } = await UploadPhoto(file);
                console.log("response is: ", response);
                console.log("transformedUrl is: ", transformedUrl);
                console.log("originalUrl is: ", originalUrl );
                setPhotoURL(transformedUrl); // Set the optimized URL after upload
                setPrintPhotoURL(1);
            } catch (error) {
                setErrorCode(1);
                console.error("Error uploading image to Cloudinary", error);
                setError('Error uploading image. Please try again.');
            }
        }
    };

    return (
        <div className="glass-container-SignUpForm">
            <p className="phrase">Empowering connections for a brighter future</p>
            <form className="SignUpForm" onSubmit={handleSubmit}>
                <div className="firstline">
                    <div className="rowOne">
                        <InputText placeholder={firstNameError ? "First name is mandatory" : "First name"} value={firstname}
                            onChange={(e) => setFirstName(e.target.value)} className={firstNameError ? 'input-error' : ''} />
                        <InputText placeholder={surnameError ? "Surname is mandatory" : "Surname"}
                            value={surname} onChange={(e) => setSurname(e.target.value)} className={surnameError ? 'input-error' : ''} />
                        <InputText placeholder={usernameError ? "Username is mandatory" : "Username"}
                            value={username} onChange={(e) => setUsername(e.target.value)} className={usernameError ? 'input-error' : ''} />
                        <Password placeholder={usernameError ? "{Password} is mandatory" : "Password"} value={password}
                            onChange={(e) => setPassword(e.target.value)} header={header} footer={footer} toggleMask />
                        <Password value={repeatPassword} placeholder={firstNameError ? "" : "Repeat Password"}
                            onChange={(e) => setRepeatPassword(e.target.value)} feedback={false} tabIndex={1} toggleMask/>

                    </div>

                    <div className="rowTwo"> 
                        <label htmlFor="email" className="font-bold block mb-2">Email</label>
                        <InputText value={email} onChange={(e) => setEmail(e.target.value)} keyfilter="email" />
                        <label htmlFor="phone" className="font-bold block mb-2">Phone</label>
                        <InputMask id="phone" mask="(999) 999-999-9999" placeholder="(999) 999-999-9999" onChange={(e) => setPhone(e.target.value)}></InputMask>
                        <label htmlFor="birthdate" className="font-bold block mb-2">Birth Date</label>
                        <Calendar value={birthDate} onChange={(e) => setBirthDate(e.target.value)} maxDate={eighteenYearsAgo} />
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
