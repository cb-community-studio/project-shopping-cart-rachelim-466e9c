
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { InputText } from 'primereact/inputtext';


 
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

const OrdersCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    const onSave = async () => {
        let _data = {
            orderUser: _entity.orderUser,
            orderPayment: _entity.orderPayment,
            orderPaymentOption: _entity.orderPaymentOption,
            orderShippingAddr: _entity.orderShippingAddr,
            orderStatus: _entity.orderStatus,
            orderShipment: _entity.orderShipment

        };

        setLoading(true);
        try {
            const result = await client.service("orders").patch(_entity._id, _data);
            props.onHide();
            props.alert({ type: "success", title: "Edit info", message: "Info updated successfully" });
            props.onEditResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
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
        <Dialog header="Edit Info" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div role="orders-edit-dialog-component">
                <div>
                    <p className="m-0" >User:</p>
                    <InputText className="w-full mb-3" value={_entity?.orderUser} onChange={(e) => setValByKey("orderUser", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Total Payment:</p>
                    <InputText type="number" className="w-full mb-3" value={_entity?.orderPayment} onChange={(e) => setValByKey("orderPayment", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Payment Option:</p>
                    <InputText className="w-full mb-3" value={_entity?.orderPaymentOption} onChange={(e) => setValByKey("orderPaymentOption", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Shipping Address:</p>
                    <InputText className="w-full mb-3" value={_entity?.orderShippingAddr} onChange={(e) => setValByKey("orderShippingAddr", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Status:</p>
                    <InputText className="w-full mb-3" value={_entity?.orderStatus} onChange={(e) => setValByKey("orderStatus", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Shipment:</p>
                    <InputText className="w-full mb-3" value={_entity?.orderShipment} onChange={(e) => setValByKey("orderShipment", e.target.value)}  />
                </div>


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

export default connect(null, mapDispatch)(OrdersCreateDialogComponent);
// createDialog_code.template
