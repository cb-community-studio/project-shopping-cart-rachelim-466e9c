
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';



 
const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ProductsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        set_entity({})
    },[props.show])
    const onSave = async () => {
        let _data = {
            productSKU: _entity.productSKU,
            productName: _entity.productName,
            productBrand: _entity.productBrand,
            productPrice: _entity.productPrice,
            productRating: _entity.productRating>5? 5: _entity.productRating ,
            productInStock: _entity.productInStock,
            productDetails: _entity.productDetails,

        };

        setLoading(true);
        try {
            const result = await client.service("products").create(_data);
            props.onHide();
            props.alert({ type: "success", title: "Create", message: "Created successfully" });
            props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    return (
        <Dialog header="Create" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="products-create-dialog-component">
                <div>
                    <p className="m-0" >Product SKU:</p>
                    <InputText className="w-full mb-3" value={_entity?.productSKU} onChange={(e) => setValByKey("productSKU", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Product Name:</p>
                    <InputText className="w-full mb-3" value={_entity?.productName} onChange={(e) => setValByKey("productName", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Brand:</p>
                    <InputText className="w-full mb-3" value={_entity?.productBrand} onChange={(e) => setValByKey("productBrand", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Price:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.productPrice} onChange={(e) => setValByKey("productPrice", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Rating: (Max 5)</p>
                    <InputText type="number" className="w-full mb-3" max={5} value={_entity?.productRating} onChange={(e) => setValByKey("productRating", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >In Stock:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.productInStock} onChange={(e) => setValByKey("productInStock", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Description:</p>
                    <InputText className="w-full mb-3" value={_entity?.productDetails} onChange={(e) => setValByKey("productDetails", e.target.value)}  />
                </div>
                <div>Please take note: currently the Image cannot be uploaded at here, please contact IT for assistance</div>


                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    //
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(null, mapDispatch)(ProductsCreateDialogComponent);
// createDialog_code.template
