import React from 'react';
import { Chip } from 'primereact/chip';

export default function Footer() {
    return (
        <div style={{position:"relative"}} className="footer">
            <Chip label="Apple" icon="pi pi-apple" />
            <Chip label="Facebook" icon="pi pi-facebook" />
            <Chip label="Google" icon="pi pi-google" />
            <Chip label="Microsoft" icon="pi pi-microsoft" removable />
        </div>
    );
}