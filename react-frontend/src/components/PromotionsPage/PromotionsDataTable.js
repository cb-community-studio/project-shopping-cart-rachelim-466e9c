
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';


const PromotionsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.salesTitle}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.salesProduct}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.salesDiscount}</p>
    const calendarTemplate3 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.salesStartingDate)} showTime ></Calendar>
    const calendarTemplate4 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.salesEndingDate)} showTime ></Calendar>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="salesTitle" header="Sales" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="salesProduct" header="Product" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="salesDiscount" header="Discount" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="salesStartingDate" header="Starting Date" body={calendarTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="salesEndingDate" header="Ending Date" body={calendarTemplate4} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default PromotionsDataTable;