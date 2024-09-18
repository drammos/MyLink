
export const useExportHelpers = () => {

    const exportToXML = ({ users }) => {
        const xmlData = convertUsersToXML(users); // Convert the users data to XML
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'users.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
    };

    const exportToJSON = ({ users }) => {
        const jsonData = JSON.stringify(users, null, 2); // Pretty-printed JSON
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
            xml += `    <role>${user.role}</role>\n`;
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