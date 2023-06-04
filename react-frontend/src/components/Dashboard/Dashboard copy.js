import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import welcomeImg from "../../assets/media/welcomeImg.jpg";
import { Button } from "primereact/button";


const Dashboard = (props) => {
    const history = useHistory();
    useEffect(() => { }, []);

    return (
        <div>

            <div className="grid grid-nogutter surface-0 text-800">
                <div className="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
                    <section>
                        <span className="block text-6xl font-bold mb-1">Welcome to</span>
                        <div className="text-6xl text-primary font-bold mb-3">Batch 5 Book Store</div>
                        <p className="mt-0 mb-4 text-700 line-height-3">Sign Up to our bookstore today to receive updates/offers on the latest news and special offers!</p>

                        <Button label="lOGIN" type="button" className="mr-3 p-button-raised" onClick={() => history.push("/login")}/>
                        <Button label="sIGNuP" type="button" className="p-button-outlined" onClick={() => history.push("/signup")}/>
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
        <span className="text-blue-600">Many Source of Book</span>
    </div>
    <div className="text-700 mb-6">“Bookshops are places of endless entertainment and renewal – what’s not to love?” – Andy Griffiths</div>
    <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-file-pdf text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">PDF Version</div>
            <span className="text-700 line-height-3">PDF Version will be included as you read when ever you want.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Worldwide Sources</div>
            <span className="text-700 line-height-3">You want it, we will get for you where ever you wish.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-sync text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">Exchange Books</div>
            <span className="text-700 line-height-3">You may enjoy reading all kinds of book and sharing with other book lovers if you wish too.</span>
        </div>
    </div>
</div>
    
            <div className="col-12 flex flex-column align-items-center">
                <div className="flex w-10">
                    <div className=" w-8">
                        <h4 className="ml-4">Microservices Ready</h4>
                        <div className="w-full flex justify-content-center flex-wrap ">
                            <></>
                            <div className='col-12 lg:col-6 xl:col-4'><Link to='/users'><div className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}><div className='text-900 font-medium text-lg'>Users</div></div></Link></div>
                            <div className='col-12 lg:col-6 xl:col-4'><Link to='/products'><div className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}><div className='text-900 font-medium text-lg'>Products</div></div></Link></div>
                            <div className='col-12 lg:col-6 xl:col-4'><Link to='/carts'><div className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}><div className='text-900 font-medium text-lg'>Carts</div></div></Link></div>
                            <div className='col-12 lg:col-6 xl:col-4'><Link to='/orders'><div className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}><div className='text-900 font-medium text-lg'>Orders</div></div></Link></div>
                            <div className='col-12 lg:col-6 xl:col-4'><Link to='/forms'><div className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}><div className='text-900 font-medium text-lg'>Forms</div></div></Link></div>
                            <div className='col-12 lg:col-6 xl:col-4'><Link to='/promotions'><div className='card mb-0 flex flex-column align-items-center justify-content-center hover zoom' style={{ height: '10rem' }}><div className='text-900 font-medium text-lg'>Promotions</div></div></Link></div>
                            {/* ~cb-add-services-card~ */}
                        </div>
                    </div>
                    <div className="w-4 flex flex-column align-items-center">
                        <p className="text-7xl m-0" role="welcome-text">
                            Welcome!
                        </p>
                        <p>You are ready to go!</p>
                    </div>
                </div>
                <div className="card w-10 my-6">
                    <h4>REST API Ready</h4>
                    <p className="underline m-0">e.g. Authentication</p>
                    <p>POST http://localhost:3030/authentication {`{ "email": "example@email.com",    "password": "123456" }`}</p>
                    <p className="underline m-0">e.g. CRUD</p>
                    <p className="m-0">
                        GET {`=>`} GET http://localhost:3030/users/{`<userId>`}
                    </p>
                    <p className="m-0">
                        CREATE {`=>`} POST http://localhost:3030/users` {`{ "email": "example2@email.com",    "password": "456789" }`}
                    </p>
                    <p className="m-0">
                        PATCH {`=>`} PATCH http://localhost:3030/users/{`<userId>`}` {`{ "name": "Thomas Smith" }`}
                    </p>
                    <p className="m-0">
                        DELETE {`=>`} DELETE http://localhost:3030/users/{`<userId>`}
                    </p>
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
    //
});

export default connect(mapState, mapDispatch)(Dashboard);
