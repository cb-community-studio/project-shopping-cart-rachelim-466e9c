
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Card } from 'primereact/card';

import { Fieldset } from 'primereact/fieldset';

import { InputText } from 'primereact/inputtext';

import { InputTextarea } from 'primereact/inputtextarea';

import { Button } from 'primereact/button';

import { Divider } from "primereact/divider";




const ContactUs = (props) => {
    const [name, setName] = useState('');

    const [email, setEmail] = useState('');
  
    const [subject, setSubject] = useState('');
  
    const [message, setMessage] = useState('');
  
  
  
    function handleSubmit(event) {
  
      event.preventDefault();
  
      // Send the form data to the server or do something else with it
  
    }

    const history = useHistory();
    useEffect(() => { }, []);

    return (
        <Card className="p-mx-auto p-mt-6" style={{ width: '60%' }}>

      <h1 className="p-text-center">Contact Us</h1>

      <p className="p-mb-6 p-text-center">Feel free to get in touch with us if you have any questions or feedback.</p>



      <Fieldset legend="Contact Information" className="p-mb-6">

        <ul className="p-pl-2 p-ml-0 p-mt-0 p-text-bold">

          <li>123 Main St, Anytown, USA</li>

          <li>(123) 456-7890</li>

          <li>info@yourbusiness.com</li>

        </ul>

      </Fieldset>
      <br></br>



      <Fieldset legend="Send us a message">

        <form onSubmit={handleSubmit}>

          <div className="p-field">

            <label htmlFor="name">Name: </label>

            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />

          </div>

          <Divider />

          <div className="p-field">

            <label htmlFor="email">Email: </label>

            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          </div>

          <Divider />

          <div className="p-field">

            <label htmlFor="message">Message: </label>

            <InputTextarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} />

          </div>



          <Button type="submit" label="Submit" className="p-mt-3" />

        </form>

      </Fieldset>

    </Card>

    );
};
const mapState = (state) => {
    //
    return {};
};
const mapDispatch = (dispatch) => ({
    //
});

export default connect(mapState, mapDispatch)(ContactUs);
