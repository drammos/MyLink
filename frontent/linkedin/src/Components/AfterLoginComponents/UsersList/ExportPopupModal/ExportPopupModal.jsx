import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import './ExportPopupModal.css';
 
const ExportPopupModal = ({ visible, onHide, exportToXML, exportToJSON }) => {

    const footer = (
        <div className="export-popup-footer">
            <Button label="Export as XML" icon="pi pi-download" className="p-button-success" onClick={exportToXML} />
            <Button label="Export as JSON" icon="pi pi-download" className="p-button-info" onClick={exportToJSON} />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary" onClick={onHide} />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            style={{ width: '350px' }}
            header="Export Options"
            modal
            footer={footer}
            onHide={onHide}
        >
            <p>Select an export format:</p>
        </Dialog>
    );
};

ExportPopupModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    exportToXML: PropTypes.func.isRequired,
    exportToJSON: PropTypes.func.isRequired
};

export default ExportPopupModal;
