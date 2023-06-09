
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Badge } from 'primereact/badge';


const ProductsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.productSKU}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.productName}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.productBrand}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.productPrice}</p>
    const ratingTemplate4 = (rowData, { rowIndex }) => <Rating stars={5} style={{width:"20rem"}} value={rowData.productRating} cancel={false}  />
    const badgeTemplate5 = (rowData, { rowIndex }) => <Badge value={rowData.productInStock}  ></Badge>
    const pTemplate6 = (rowData, { rowIndex }) => <p >{rowData.productDetails}</p>
    const pTemplate7 = (rowData, { rowIndex }) => <p >{rowData.productImage}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="productSKU" header="Product SKU" body={pTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="productName" header="Product Name" body={pTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="productBrand" header="Brand" body={pTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="productPrice" header="Price" body={pTemplate3} sortable style={{ minWidth: "8rem" }} />
            <Column field="productRating" header="Rating" body={ratingTemplate4} sortable style={{ minWidth: "8rem" }} />
            <Column field="productInStock" header="In Stock" body={badgeTemplate5} sortable style={{ minWidth: "8rem" }} />
            <Column field="productDetails" header="Description" body={pTemplate6} sortable style={{ minWidth: "8rem" }} />
            <Column field="productImage" header="Image" body={pTemplate7} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default ProductsDataTable;