
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import client from "../../services/restClient";

import { Link, useHistory } from "react-router-dom";
import { Card } from 'primereact/card';

import { Fieldset } from 'primereact/fieldset';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

import { InputTextarea } from 'primereact/inputtextarea';

import { Divider } from "primereact/divider";

import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import '../ProductListing/myproduct.css';




const ProductListing = (props) => {
    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        {label: 'Price High to Low', value: '!productPrice'},
        {label: 'Price Low to High', value: 'productPrice'},
    ];

    async function handleFilter(event) {
        client
            .service("products")
            .find({ query: { $limit: 1, productSKU: { $regex: 'RefSci123' }, } , })
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
            });
    }


    useEffect(() => {
        //on mount
        client
            .service("products")
            .find({ query: { $limit: 100 } })
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
            });
    }, []);

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
        console.log("sortField",sortField,"sortOrder",sortOrder,"sortKey",sortKey,"event",event)

    }
    const renderListItem = (data) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    {/* <img src={`images/product/${data.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} /> */}
                    <img src={require(`../../assets/products/${data.productImage}.jpg`)} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.productName}</div>
                        <div className="product-description">{data.productDetails}</div>
                        <Rating value={data.productRating} readOnly cancel={false}></Rating>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.productBrand}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.productPrice}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.productInStock === 0}></Button>
                        <span className={`product-badge status-instock`}>{data.productInStock}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.productBrand}</span>
                        </div>
                        <span className={`product-badge status-instock`}>{data.productInStock}</span>
                    </div>
                    <div className="product-grid-item-content">
                    <img src={require(`../../assets/products/${data.productImage}.jpg`)}  onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-name">{data.productName}</div>
                        <div className="product-description">{data.productDetails}</div>
                        <Rating value={data.productRating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${data.productPrice}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 0} onClick={() => history.push(`/productdetail/${data.productSKU}`)}></Button>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter ">
                <div className="col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
                </div>
                <div className="col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();
    const end = (
        <React.Fragment>
            <InputText placeholder="Search" type="text" /> 
            <Button icon="pi pi-search" className="ml-2" onClick={handleFilter} />
        </React.Fragment>
    ); 

    return (
        <div className="dataview-demo">
            {/* <Menubar end={end} className='p-2' /> */}
            <br></br>
            <div className="card ">
                <DataView value={products} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9}
                        sortOrder={sortOrder} sortField={sortField} />
            </div>
        </div>
    );
};
const mapState = (state) => {
  //
  return {};
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
  //
});

export default connect(mapState, mapDispatch)(ProductListing);
