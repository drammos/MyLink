import { useEffect, useState } from 'react';
import useService from './useService';

const useDeleteUsers = (refetchUsers) => {
    const [deleteError, setDeleteError] = useState(null);
    const [deleting, setDeleting] = useState(false); // loading
    const [user, setUser] = useState('none');


    const deleteUserService = useService(
        `Deleting user: ${user}`,
        'DELETE',
        `http://localhost:5175/User/DeleteUser?Username=${user}`,
        null,
        'application/json',
        true 
    );
     
    const DeleteUsers = async (selectedUsers) => {
        setDeleting(true);

        for (let i = 0; i < selectedUsers.length; i++) {
            setUser(selectedUsers[i].userName);
            setTimeout(console.log("Deleting..."), 2500);
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setUser('none');
        refetchUsers(); 
        setDeleting(false); 
    };

    useEffect(() => {
        const deleteUser = async () => {
            if (user && user !== '' && user !== 'none') {
                try {
                    await deleteUserService.refetch(); 
                    console.log(`Deleted user: ${user}`);
                } catch (error) {
                    console.error(`Error deleting user: ${user}`, error);
                }
                setUser('');
            }
        };

        deleteUser()
    }, [user, deleteUserService]); // Add dependencies to control when useEffect runs

    return {
        DeleteUsers,
        deleting,
        deleteError,
    };

};

export default useDeleteUsers;
