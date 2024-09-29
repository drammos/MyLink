export const useExportHelpers = () => {

    const exportToXML = ({ users, selectedUsers }) => {
        const dataToExport = selectedUsers && selectedUsers.length > 0 ? selectedUsers : users;
        const xmlData = convertUsersToXML(dataToExport); // Convert the appropriate data to XML
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'users.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    };

    const exportToJSON = ({ users, selectedUsers }) => {
        const dataToExport = selectedUsers && selectedUsers.length > 0 ? selectedUsers : users;
        const jsonData = JSON.stringify(dataToExport, null, 2); // Pretty-printed JSON
        const blob = new Blob([jsonData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'users.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const convertUsersToXML = (users) => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';

        users.forEach(user => {
            xml += `  <user>\n`;
            xml += `    <userName>${user.userName}</userName>\n`;
            xml += `    <firstName>${user.firstName}</firstName>\n`;
            xml += `    <lastName>${user.lastName}</lastName>\n`;
            xml += `    <phoneNumber>${user.phoneNumber}</phoneNumber>\n`;
            xml += `    <email>${user.email}</email>\n`;
            xml += `    <role>${user.role}</role>\n`;
            xml += `    <coverLetterURL>${user.coverLetterURL}</coverLetterURL>\n`;
            xml += `  </user>\n`;
        });

        xml += '</users>';
        return xml;
    };

    return {
        exportToXML,
        exportToJSON
    };
};
