
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const FormsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.formUser}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.formPhone}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.formEmail}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.formContent}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.formRemarks}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.formType}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="formUser" header="User" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="formPhone" header="Phone Number" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="formEmail" header="Email" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="formContent" header="Content" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="formRemarks" header="Remarks" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="formType" header="Form Type" body={pTemplate5} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default FormsDataTable;