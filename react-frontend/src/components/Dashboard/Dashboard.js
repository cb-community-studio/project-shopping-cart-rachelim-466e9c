import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import client from "../../services/restClient";
import welcomeImg from "../../assets/media/welcomeImg.jpg";
import { Button } from "primereact/button";
import { Image } from "primereact/image";


const Dashboard = (props) => {
    const history = useHistory();
    const [data, setData] = useState([]);
    useEffect(() => {
        //on mount
        client
            .service("products")
            .find({ query: { $limit: 3 } })
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
            });
    }, []);

    return (
        <div>

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Welcome to</span>
                        <div className="text-6xl text-primary font-bold mb-3">Batch 5 Book Store</div>
                        <p className="mt-0 mb-4 text-700 line-height-3">Sign Up to our bookstore today to receive updates/offers on the latest news and special offers!</p>

                        <Button label="lOGIN" type="button" className="mr-3 p-button-raised" onClick={() => history.push("/login")} />
                        <Button label="sIGNuP" type="button" className="p-button-outlined" onClick={() => history.push("/signup")} />
                    </section>
                </div>
                <div className="col-12 md:col-6 overflow-hidden">
                    <img src={welcomeImg} alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />
                </div>
            </div>
            <br></br>

            <div className="surface-0 text-center pt-4">
                <div className="mb-3 font-bold text-3xl">
                    <span className="text-900">One Store, </span>
                    <span className="text-primary">Many Source of Book</span>
                </div>
                <div className="text-700 mb-6">“Bookshops are places of endless entertainment and renewal – what’s not to love?” – Andy Griffiths</div>
                <div className="grid">
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-file-pdf text-4xl text-primary"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">PDF Version</div>
                        <span className="text-700 line-height-3">PDF Version will be included as you read when ever you want.</span>
                    </div>
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-globe text-4xl text-primary"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Worldwide Sources</div>
                        <span className="text-700 line-height-3">You want it, we will get for you where ever you wish.</span>
                    </div>
                    <div className="col-12 md:col-4 mb-4 px-5">
                        <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                            <i className="pi pi-sync text-4xl text-primary"></i>
                        </span>
                        <div className="text-900 text-xl mb-3 font-medium">Exchange Books</div>
                        <span className="text-700 line-height-3">You may enjoy reading all kinds of book and sharing with other book lovers if you wish too.</span>
                    </div>
                </div>
            </div>
            <br></br>

            <div className="surface-0 pt-4">
                <div className="text-900 font-bold text-3xl text-center">Feature Products</div>
                <div className="text-700 mb-6 text-center">Find your favourate book here.</div>
                <div className="grid justify-content-center ">
                    {data.map((inddata, index) => (


                        <div key={index} className="col-12 lg:col-4">
                            <div className="p-3 h-full">
                                <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                                    <div className="flex justify-content-center">
                                        <Image src={require("../../assets/media/welcomeImg.jpg")} alt="" width="200" />

                                    </div>

                                    <div className="text-900 font-medium text-xl mb-2">{inddata.productName}</div>
                                    <div className="text-600">{inddata.productSKU}</div>
                                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                    <div className="flex justify-content-between align-items-center">
                                        <span className="font-bold text-2xl text-900">RM {inddata.productPrice}</span>
                                        <span className="ml-2 font-medium text-600">{inddata.productInStock}</span>
                                    </div>
                                    <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                    <ul className="list-none p-0 m-0 flex-grow-1">
                                        <li className="flex align-items-center mb-3">
                                            <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                            <span>Brand Name: {inddata.productBrand}</span>
                                        </li>
                                        <li className="flex align-items-center mb-3">
                                            <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                            <span>Details: {inddata.productDetails}</span>
                                        </li>
                                    </ul>
                                    <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                                    <Button label="View More" type="button" className="p-3 w-full mt-auto" onClick={() => history.push("/productlisting")} />
                                </div>
                            </div>
                        </div>



                    ))}
                </div>

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

export default connect(mapState, mapDispatch)(Dashboard);
