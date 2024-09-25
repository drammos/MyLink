//#region import 

import { useState, useEffect } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { GoXCircle, GoCheckCircle } from "react-icons/go";
import { Dropdown } from 'primereact/dropdown';

import useSignUpUser from '../../../Services/useSignUpUser'
import PropTypes from 'prop-types';
import './NewUserPopupModal.css';
//#endregion

const NewUserDialog = ({ visible, onHide, }) => {

    // For creating new user
    const [newUserUsername, setNewUserUsername] = useState("");
    const [newUserFirstName, setNewUserFirstName] = useState("");
    const [newUserLastName, setNewUserLastName] = useState("");
    const [newUserRole, setNewUserRole] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserBirthDate, setNewUserBirthDate] = useState("");
    const [newUserPhone, setNewUserPhone] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [creatingNewUser, setCreatingNewUser] = useState(1);

    const roles = [
        'Admin',
        'Professional'
    ]; 

    const emptyAllFields = () => {
        setNewUserUsername('');
        setNewUserFirstName('');
        setNewUserLastName('');
        setNewUserRole('');
        setNewUserPassword('');
        setNewUserBirthDate('');
        setNewUserPhone('');
        setNewUserEmail('');
    };

    const defaultPhotoURL = 'https://res.cloudinary.com/dvhi4yyrm/image/upload/v1725693786/bui1pzeaj5msljlp1qvi.png';
    const { signUpUser, message, errorCode, loading, refetch } = useSignUpUser();

    const today = new Date();
    const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));

    useEffect(() => {
        if (!creatingNewUser) {
            if (errorCode === 0) {
                setTimeout(() => { onHide(); emptyAllFields(); setCreatingNewUser(1); }, 2000);
            }
        }
    }, [errorCode, onHide]);

    return (
        <Dialog
            visible={visible}
            style={{ width: '450px' }}
            header="Create a New User"
            modal
            className="custom-dialog"  
            footer={
                <div className="dialog-footer">
                    <Button label="Cancel" icon="pi pi-times" className="p-button-text cancel-btn" onClick={onHide} />
                    <Button label="Save" icon="pi pi-check" className="p-button-text save-btn"
                        onClick={() => {
                            setCreatingNewUser(0);
                            signUpUser(newUserFirstName, newUserLastName, newUserPhone, newUserEmail, newUserRole, newUserUsername, newUserPassword, newUserBirthDate, defaultPhotoURL);
                        }}
                    />
                </div>

            }
            onHide={onHide}
        >
            <div className="modal-body">
                <div className="input-group">
                    <FloatLabel>
                        <InputText id="username" value={newUserUsername} onChange={(e) => setNewUserUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <InputText id="firstName" value={newUserFirstName} onChange={(e) => setNewUserFirstName(e.target.value)} />
                        <label htmlFor="firstName">First Name</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <InputText id="lastName" value={newUserLastName} onChange={(e) => setNewUserLastName(e.target.value)} />
                        <label htmlFor="lastName">Last Name</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <Dropdown value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} options={roles} className="w-full" />
                        <label htmlFor="role">Role</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <InputText id="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <Calendar value={newUserBirthDate} onChange={(e) => setNewUserBirthDate(e.target.value)} maxDate={eighteenYearsAgo} dateFormat="dd/mm/yy" />
                        <label htmlFor="birthdate">Birthdate</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <InputMask id="phone" mask="(999) 999-999-9999" placeholder="(999) 999-999-9999" value={newUserPhone} onChange={(e) => setNewUserPhone(e.target.value)} />
                        <label htmlFor="phone">Phone</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <FloatLabel>
                        <InputText value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} keyfilter="email" />
                        <label htmlFor="email" className="font-bold block mb-2">Email</label>
                    </FloatLabel>
                </div>

                <div className="input-group">
                    <div className={errorCode === 1 ? 'error-message' : (errorCode === 0 ? 'success-message' : '')}>
                        {creatingNewUser === 0 && (
                            errorCode === 1 ? (
                                <>
                                    <GoXCircle /> {message}
                                </>
                            ) : (
                                errorCode === 0 ? (
                                    <>
                                        <GoCheckCircle /> {message}
                                    </>
                                ) : ''
                            )
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

NewUserDialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    newUserUsername: PropTypes.string.isRequired,
    setNewUserUsername: PropTypes.func.isRequired,
    newUserFirstName: PropTypes.string.isRequired,
    setNewUserFirstName: PropTypes.func.isRequired,
    newUserLastName: PropTypes.string.isRequired,
    setNewUserLastName: PropTypes.func.isRequired,
    newUserRole: PropTypes.string.isRequired,
    setNewUserRole: PropTypes.func.isRequired,
    newUserPassword: PropTypes.string.isRequired,
    setNewUserPassword: PropTypes.func.isRequired,
    newUserBirthDate: PropTypes.string.isRequired,
    setNewUserBirthDate: PropTypes.func.isRequired,
    newUserPhone: PropTypes.string.isRequired,
    setNewUserPhone: PropTypes.func.isRequired,
    newUserEmail: PropTypes.string.isRequired,
    setNewUserEmail: PropTypes.func.isRequired,
};

export default NewUserDialog;
