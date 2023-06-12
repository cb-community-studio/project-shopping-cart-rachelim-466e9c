
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';

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

const FormsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const formtypeOption = [
        { name: 'FAQ', value: 'faq' },
        { name: 'Enquiry', value: 'enquiry' }
    ];

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    const onSave = async () => {
        let _data = {
            formUser: _entity.formUser,
            formEmail: _entity.formEmail,
            formContent: _entity.formContent,
            formRemarks: _entity.formRemarks,
            formType: _entity.formType

        };

        setLoading(true);
        try {
            const result = await client.service("forms").patch(_entity._id, _data);
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
            <div role="forms-edit-dialog-component">
                <div>
                    <p className="m-0" >User:</p>
                    <InputText className="w-full mb-3" value={_entity?.formUser} onChange={(e) => setValByKey("formUser", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Email:</p>
                    <InputText className="w-full mb-3" value={_entity?.formEmail} onChange={(e) => setValByKey("formEmail", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Content:</p>
                    <InputText className="w-full mb-3" value={_entity?.formContent} onChange={(e) => setValByKey("formContent", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Remarks:</p>
                    <InputText className="w-full mb-3" value={_entity?.formRemarks} onChange={(e) => setValByKey("formRemarks", e.target.value)}  />
                </div>
                <div>
                    <p className="m-0" >Form Type:</p>
                    <Dropdown value={_entity?.formType} onChange={(e) => setValByKey("formType", e.target.value)} options={formtypeOption} optionLabel="name"
                                                placeholder="Select form option" className="w-full md:w-14rem" />
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

export default connect(null, mapDispatch)(FormsCreateDialogComponent);
// createDialog_code.template
