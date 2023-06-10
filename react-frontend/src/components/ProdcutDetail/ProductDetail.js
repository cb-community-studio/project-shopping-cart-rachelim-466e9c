
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Chip } from 'primereact/chip';
import { InputNumber } from 'primereact/inputnumber';
import { Rating } from 'primereact/rating';

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





const ProductDetail = (props) => {
    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [productID, setSKU] = useState(0);
    const [value18, setValue18] = useState(0);
    const { productSKU } = props.match.params;
    const [loading, setLoading] = useState(false);



    async function handleSubmit(event) {
        
          let _data = {
            cartProduct: productID,
            cartUnit: value18
    
        };
        console.log(_data)
          setLoading(true);
          try {
            const result = await client.service("carts").create(_data);
            props.alert({ type: "success", title: "Create", message: "Add to cart successfully" });
            history.push('/productlisting');
  
          } catch (error) {
            console.log("error", error);
            props.alert({ type: "error", title: "Create", message: "Failed to add to cart, please login before add to cart." });
          }
          setLoading(false);
        
    
    
        event.preventDefault();
    
        // Send the form data to the server or do something else with it
    
      }

    useEffect(() => {
        console.log("props, ", props);
        //on mount
        client
            .service("products")
            .find({ query: { productSKU: productSKU } })
            .then((res) => {
                setProducts(res.data);
                setSKU(res.data[0].productSKU)
                console.log("ii", products, res.data[0]);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
            });
    }, []);

    if (!products) {

        return <p>Loading...</p>;

    }


    return (
        <div className='p-4'>
            <Button label="Go Back" className='mb-4' onClick={() => props.history.push("/productlisting")} />
            {products.map((inddata, index) => (
                <div key={index} >
                    <div className='grid grid-nogutter flex justify-content-around align-content-center'>
                        <div className='text-center text-xl text-900'>
                            <img src={require(`../../assets/products/${inddata.productImage}.jpg`)} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={inddata.productSKU} width="250" />
                            <br></br>
                            {inddata.productSKU}
                        </div>

                        <div className="surface-0 col-8 p-4">
                            <div className="font-medium text-3xl text-900 mb-3">Product Information</div>
                            <ul className="list-none p-0 m-0">
                                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                    <div className="text-500 w-6 md:w-2 font-medium">Title</div>
                                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{inddata.productName}</div>
                                </li>
                                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                    <div className="text-500 w-6 md:w-2 font-medium">In Stock</div>
                                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                        <Chip label={inddata.productInStock} className="mr-2" />
                                    </div>
                                </li>
                                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                    <div className="text-500 w-6 md:w-2 font-medium">bRAND</div>
                                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{inddata.productBrand}</div>
                                </li>
                                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                                    <div className="text-500 w-6 md:w-2 font-medium">Price</div>
                                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">RM {inddata.productPrice}</div>
                                </li>
                                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
                                    <div className="text-500 w-6 md:w-2 font-medium">Details</div>
                                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
                                        {inddata.productDetails}</div>
                                </li>
                                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
                                    <div className="text-500 w-6 md:w-2 font-medium">Rating</div>
                                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                                        <Rating value={inddata.productRating} readOnly cancel={false}></Rating>
                                    </div>
                                </li>
                            </ul>
                            <br></br>
                            <div className="flex col-12 justify-content-around align-content-center">
                                <InputNumber inputId="horizontal" value={value18} onValueChange={(e) => setValue18(e.value)} showButtons buttonLayout="horizontal" step={1}
                                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" min={1} max={inddata.productInStock} />

                                <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={handleSubmit} loading={loading} ></Button>

                            </div>
                        </div>
                    </div>


                </div>


            ))}




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

export default connect(mapState, mapDispatch)(ProductDetail);
