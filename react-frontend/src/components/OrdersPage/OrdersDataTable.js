
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';


const OrdersDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.orderUser}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.orderPayment}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.orderPaymentOption}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.orderShippingAddr}</p>
    const calendarTemplate5 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.orderDate)} showTime ></Calendar>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.orderStatus}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.orderShipment}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="orderUser" header="User" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="orderSummary" header="orderSummary"  style={{ minWidth: "8rem" }} />
            <Column field="orderPayment" header="Total Payment" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="orderPaymentOption" header="Payment Option" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="orderShippingAddr" header="Shipping Address" body={pTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="orderDate" header="Order Date" body={calendarTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="orderStatus" header="Status" body={pTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="orderShipment" header="Shipment" body={pTemplate7} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default OrdersDataTable;