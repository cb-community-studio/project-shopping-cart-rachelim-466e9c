
import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import client from "../../services/restClient";

import { Link, useHistory } from "react-router-dom";
import { Card } from 'primereact/card';

import { Accordion, AccordionTab } from 'primereact/accordion';




const FAQ = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [activeIndex, setActiveIndex] = useState(null);

    const onClick = (itemIndex) => {
        let _activeIndex = activeIndex ? [...activeIndex] : [];

        if (_activeIndex.length === 0) {
            _activeIndex.push(itemIndex);
        }
        else {
            const index = _activeIndex.indexOf(itemIndex);
            if (index === -1) {
                _activeIndex.push(itemIndex);
            }
            else {
                _activeIndex.splice(index, 1);
            }
        }

        setActiveIndex(_activeIndex);
    }

    const history = useHistory();
    useEffect(() => {
        //on mount
        client
            .service("forms")
            .find({ query: { $limit: 10, formType: "faq" } })
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "FAQ", type: "error", message: error.message || "Failed get FAQ list" });
            });
    }, []);

    if (!data) {

        return <p>Loading...</p>;
    
      }


    return (
        <Card className="p-mx-auto p-mt-6" >
            <h1 className="p-text-center">Frequently Asked Questions (FAQ)</h1>

            <p className="p-mb-6 p-text-center">A frequently asked questions list is often used in articles, websites, email lists, and online forums where common questions tend to recur, for example through posts or queries by new users related to common knowledge gaps.</p>
            <Accordion multiple activeIndex={[0]}>
                {data.map((inddata, index) => (
                    <AccordionTab key={index} header={inddata.formContent} className='mb-2'>
                        <p>{inddata.formRemarks}</p>
                    </AccordionTab>
               
                ))}


            </Accordion>

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

export default connect(mapState, mapDispatch)(FAQ);
