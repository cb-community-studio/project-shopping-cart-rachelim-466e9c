
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const UsersDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.username}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.fullname}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.phone}</p>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.billingAddr}</p>

    const actionBodyTemplateFAQ = (rowData, {rowIndex}) => {
        return (
            <div className="flex">
                <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />
                <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />
            </div>
        )

    }

    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="username" header="Username" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="email" header="Email" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="fullname" header="Full name" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="phone" header="Phone Number" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="billingAddr" header="Billing Address" body={pTemplate6} sortable style={{ minWidth: "8rem" }} />

            <Column header="Action" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplateFAQ} />

        </DataTable>
    );
};

export default UsersDataTable;