import React from "react";

import { Panel } from "primereact/panel";

import { Divider } from "primereact/divider";

import { Image } from "primereact/image";

import { Card } from "primereact/card";



const MyAboutPage = () => {

    const aboutContent = {

        title: "About Our Company",

        description: "Established in 1998, XYZ Corp started as a small tech startup in a garage. Our founder, John Smith, had a vision to create cutting-edge solutions that would revolutionize the industry. With a small team of passionate engineers, XYZ Corp quickly gained recognition for its innovative products and exceptional customer service. Over the years, our company experienced significant growth and expanded its operations globally. We diversified our product portfolio, catering to a wide range of industries, including finance, healthcare, manufacturing, and retail. Today, XYZ Corp stands as a leading technology solutions provider, with a strong presence in over 50 countries. Despite our growth, we have remained true to our core values. Our commitment to excellence, integrity, collaboration, customer centricity, and sustainability has shaped our company's culture and earned us the trust of thousands of customers worldwide.",

        foundedYear: "Welcome to XYZ Corp!",

        mission:"At XYZ Corp, our mission is to empower individuals and businesses with innovative solutions that drive growth and success. We strive to provide top-notch products and services that exceed our customers' expectations and contribute to a better world.",

        founders: [

            {

                name: "John Doe",

                position: "Founder and CEO",

                profilePicture: "https://picsum.photos/200/200",

            },

            {

                name: "Jane Smith",

                position: "Founder and CTO",

                profilePicture: "https://picsum.photos/200/201",

            },

            {

                name: "Darmandran",

                position: "Programmer",

                profilePicture: "https://picsum.photos/200/202",

            },

        ],

    };



    return (

        <div>

            <Panel header={aboutContent.title}>

                <p>{aboutContent.description}</p>

                <p>{aboutContent.foundedYear}</p>

            </Panel>

            <Divider />

            <TeamSection founders={aboutContent.founders} />

            <Panel header="Our Mission">

                <p>{aboutContent.mission}</p>

            </Panel>

        </div>

    );

};



const TeamSection = ({ founders }) => {

    return (

        <div>

            <h2>Our Team</h2>

            <div className="flex justify-content-around ">
                {founders.map((founder, index) => (

                    <div key={index} className="p-col-12 p-md-4">

                        <Card title={founder.name} style={{ backgroundColor: "#f2f2f2" }} className="p-p-3">

                            <Image src={founder.profilePicture} alt={founder.name} width="200" />

                            <p>{founder.name}</p>

                            <p>{founder.position}</p>

                        </Card>

                        <Divider />

                    </div>

                ))}
            </div>

        </div>

    );

};



export default MyAboutPage;