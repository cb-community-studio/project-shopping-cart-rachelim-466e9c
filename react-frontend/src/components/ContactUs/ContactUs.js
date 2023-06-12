
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import client from "../../services/restClient";

import { Link, useHistory } from "react-router-dom";
import { Card } from 'primereact/card';

import { Fieldset } from 'primereact/fieldset';

import { InputText } from 'primereact/inputtext';

import { InputTextarea } from 'primereact/inputtextarea';

import { Button } from 'primereact/button';

import { Divider } from "primereact/divider";




const ContactUs = (props) => {
  const [formUser, setName] = useState('');

  const [formEmail, setEmail] = useState('');

  const [formContent, setMessage] = useState('');

  const [emailError, setEmailError] = useState(null);

  const [loading, setLoading] = useState(false);




  async function handleSubmit(event) {
    let re = /\S+@\S+\.\S+/;
    if (!re.test(formEmail)) {
      setEmailError("Please Enter a valid Email address");
    } else {
      let _data = {
        formUser: formUser,
        formEmail: formEmail,
        formContent: formContent

    };
      setLoading(true);
      try {
        const result = await client.service("forms").create(_data);
        props.alert({ type: "success", title: "Create", message: "Created successfully" });
        setName("")
        setEmail("")
        setMessage("")
        setEmailError(null)
      } catch (error) {
        console.log("error", error);
        props.alert({ type: "error", title: "Create", message: "Failed to create" });
      }
      setLoading(false);
    }


    event.preventDefault();

    // Send the form data to the server or do something else with it

  }

  const history = useHistory();
  useEffect(() => { }, []);

  return (
    <Card className="p-mx-auto p-mt-6" >

      <h1 className="p-text-center">Contact Us</h1>

      <p className="p-mb-6 p-text-center">Feel free to get in touch with us if you have any questions or feedback.</p>



      <Fieldset legend="Contact Information" className="p-mb-6">

        <ul className="p-pl-2 p-ml-0 p-mt-0 p-text-bold">

          <li>123 Main St, Selangor, Malaysia</li>

          <li>(123) 456-7890</li>

          <li>info@yourbusiness.com</li>

        </ul>

      </Fieldset>
      <br></br>



      <Fieldset legend="Send us a message">
        <div className="grid p-8 col-12 xl:col-8 flex flex-column align-items-center w-full">
          <div className="w-full mb-4">
            <p className="m-0">Name</p>
            <InputText type="text" className='w-full' placeholder="Please place your name" value={formUser} onChange={(e) => setName(e.target.value)} ></InputText>

          </div>
          <div className="w-full mb-4">
            <p className="m-0">Email</p>
            <InputText type="text"  placeholder="example@gmail.com" value={formEmail} onChange={(e) => setEmail(e.target.value)} className={`${emailError ? "p-invalid" : ""} w-full`} ></InputText>
            <br></br>
            <small className="p-error">{emailError}</small>
          </div>
          <div className="w-full mb-4">
            <p className="m-0">Message</p>
            <InputTextarea type="text" className='w-full' placeholder="Please state down your enquire or questions" value={formContent} onChange={(e) => setMessage(e.target.value)} rows={5}></InputTextarea>

          </div>
          <div className="w-full mb-4 flex justify-content-end">
                                        <Button label="Submit" className="p-button-raised" onClick={handleSubmit} loading={loading}></Button>
                                    </div>
        </div>



      </Fieldset>

    </Card>

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

export default connect(mapState, mapDispatch)(ContactUs);
