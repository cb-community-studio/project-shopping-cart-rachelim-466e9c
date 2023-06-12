import React, { useState, useEffect } from "react";
import client from "../../services/restClient";
import { connect } from "react-redux";
import { Avatar } from "primereact/avatar";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Chip } from 'primereact/chip';
import { InputNumber } from 'primereact/inputnumber';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Link, useHistory } from "react-router-dom";

import UsersPage from "../UsersPage/UsersPage";
import ProductsPage from "../ProductsPage/ProductsPage";
import FormsPage from "../FormsPage/FormsPage";

import '../Admin/myacc.css';
import { compact } from "lodash";

const Admin = (props) => {
    const history = useHistory();

    const [users, setUsers] = useState(null);
    const [objectID, setObjectID] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [billingAddr, setBillingAddr] = useState("");
    const [emailError, setEmailError] = useState("");

    const [loading, setLoading] = useState("");

    const [products, setProducts] = useState([]);
    const [carts, setCarts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [faq, setFAQ] = useState([]);


    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [adminStatus, setAdminStatus] = useState(false);
    const [visible, setVisible] = useState(false);
    const [displayData, setDisplayEditData] = useState({});
    const [selectedSingleID, setSelectedSingleID] = useState({});

    const [value18, setValue18] = useState(0);

    const [orderPaymentOption, setorderPaymentOption] = useState(null);
    const [orderShippingAddr, setorderShippingAddr] = useState("");
    const [orderShipment, setorderShipment] = useState("");
    const [orderStatus, setorderStatus] = useState("");

    const statusOption = [
        { name: 'Pending', value: 'Pending' },
        { name: 'Delivered', value: 'Delivered' },
        { name: 'Packing', value: 'Packing' },
    ];



    const imageBodyTemplate = (rowData) => {
        return <img src={require(`../../assets/products/${rowData.cartDetail.productImage}.jpg`)} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} width="75" className="product-image" />

    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex">
                <Button type="button" icon="pi pi-times-circle" className="m-1" onClick={() => deleteModal(rowData)}></Button>
            </div>
        )

    }
    const actionBodyTemplateOrder = (rowData) => {
        return (
            <div className="flex">
                <Button type="button" icon="pi pi-pencil" className="m-1" onClick={() => editModal(rowData)}></Button>
            </div>
        )

    }

    function editModal(rowData) {
        console.log("order row data", rowData)
        setorderStatus(rowData.orderStatus)
        setorderShipment(rowData.orderShipment)
        setDisplayEditData(rowData)
        setSelectedSingleID(rowData._id)
        setVisible(true)



    }

    async function deleteModal(rowData) {

        if (window.confirm("Confirm Delete ? ")) {
            try {
                const result = await client.service("carts").remove(rowData._id);
                props.alert({ type: "success", title: "Delete", message: "Deleted successfully" });
                let _newData = carts.filter((_, i) => _._id !== rowData._id);
                setCarts(_newData);

            } catch (error) {
                console.log("error", error);
                props.alert({ type: "error", title: "Delete", message: "Failed to delete" });
            }


        }

    }

    async function addtocart(event) {

        let _data = {
            cartProduct: displayData.productSKU,
            cartUnit: value18

        };
        console.log(_data)
        setLoading(true);
        try {
            const result = await client.service("carts").patch(selectedSingleID, _data);
            props.alert({ type: "success", title: "Update", message: "Updated the cart successfully" });
            let _newData = carts.filter((_, i) => _._id !== selectedSingleID);
            console.log([..._newData, { ...result, cartDetail: displayData }])

            setCarts([..._newData, { ...result, cartDetail: displayData }]);
            setVisible(false)
            //   history.push('/productlisting');

        } catch (error) {
            console.log("error", error);
            props.alert({ type: "error", title: "Create", message: "Failed to update the cart, please login before add to cart." });
            setVisible(false)
        }
        setLoading(false);



        event.preventDefault();

        // Send the form data to the server or do something else with it

    }

    async function checkout() {

        if (!selectedCustomers) {
            window.alert("Please select your items before proceed checkout")
        } else {
            console.log("selected", selectedCustomers)
            let sum = 0
            selectedCustomers.forEach(element => {
                sum += element.cartUnit * element.cartDetail.productPrice;
            });
            let _data = {
                orderSummary: selectedCustomers,
                orderPayment: sum,
                orderPaymentOption: orderPaymentOption.code,
                orderShippingAddr: orderShippingAddr,
                orderShipment: orderShipment,
            };

            console.log(_data)


            setLoading(true);
            try {
                const result = await client.service("carts").patch(null, { cartStatus: true }, selectedCustomers);
                const result2 = await client.service("orders").create(_data);


                // Cannot able to delete the carts in orders
                // const databaseCartData = await client.service("carts").remove(null, {cartStatus: true});
                // console.log("---databaseCartData", databaseCartData)
                props.alert({ type: "success", title: "Checkout", message: "Checkout the cart successfully" });


            } catch (error) {
                console.log("error", error);
                props.alert({ type: "error", title: "Create", message: "Failed to update the cart, please login before add to cart." });
            }
            setLoading(false);
        }

    }



    async function handleSubmit(event) {
        let re = /^(01)[0-46-9]*[0-9]{7,8}$/;
        if (!re.test(phone)) {
            setEmailError("Please Enter a valid Phone Number");
        } else {
            let _data = {
                username: username,
                fullname: fullname,
                phone: phone,
                billingAddr: billingAddr,

            };
            setLoading(true);
            try {
                const result = await client.service("users").patch(objectID, _data);
                props.alert({ type: "success", title: "Update", message: "Updated successfully" });
                setEmailError(null);


            } catch (error) {
                console.log("error", error);
                props.alert({ type: "error", title: "Update", message: "Failed to update" });
            }
            setLoading(false);
        }


        event.preventDefault();

        // Send the form data to the server or do something else with it

    }

    const rowExpansionTemplate = (data) => {
        console.log(data)
        return (
            <div className="p-3">
                <DataTable value={data.orderSummary}>
                    <Column field="cartDetail" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="cartDetail.productSKU" header="Code"></Column>
                    <Column field="cartDetail.productName" header="Name"></Column>
                    <Column field="cartDetail.productBrand" header="Category"></Column>
                    <Column field="cartUnit" className="text-center" header="Quantity"></Column>
                    <Column field="cartDetail.productPrice" className="text-center" header="Price(Unit)"></Column>

                </DataTable>
            </div>
        );
    };

    useEffect(() => {
        //on mount
        client
            .service("users")
            .find({ query: { isAdmin: true } })
            .then((res) => {
                // setUser(res.data);
                // setUsername(res.data[0].username);
                // setEmail(res.data[0].email);
                // setFullname(res.data[0].fullname);
                // setPhone(res.data[0].phone);
                // setBillingAddr(res.data[0].billingAddr);
                // setObjectID(res.data[0]._id)
                // setAdminStatus(res.data[0].isAdmin)
                console.log("admin", res.data);
                if (!res.data.length) {
                    history.push('/home');
                    props.alert({ title: "Admin Site", type: "error", message: "You are not allowed to access this site" });


                } else {
                    // client
                    // .service("users")
                    // .find({ query: { $limit: 100} })
                    // .then((resUser) => {
                    //     setUsers(resUser.data)
                    //     console.log("users", resUser.data);
                    // })
                    // .catch((error) => {
                    //     console.log({ error });
                    //     props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                    // });

                    // client
                    // .service("products")
                    // .find({ query: { $limit: 100} })
                    // .then((resProd) => {
                    //     setUsers(resProd.data)
                    //     console.log("products", resProd.data);
                    // })
                    // .catch((error) => {
                    //     console.log({ error });
                    //     props.alert({ title: "Products", type: "error", message: error.message || "Failed get products" });
                    // });

                    client
                        .service("carts")
                        .find({ query: { $limit: 100 } })
                        .then((resCart) => {
                            setCarts(resCart.data)
                            console.log("carts", resCart.data);
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Carts", type: "error", message: error.message || "Failed get carts" });
                        });

                    client
                        .service("orders")
                        .find({ query: { $limit: 100 } })
                        .then((resOrder) => {
                            setOrders(resOrder.data)
                            console.log("orders", resOrder.data);
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Orders", type: "error", message: error.message || "Failed get orders" });
                        });

                }

            })
            .catch((error) => {
                history.push('/home');

                console.log({ error });
                props.alert({ title: "Users", type: "error", message: error.message || "Failed get single user" });
            });
    }, []);

    const onSave = async () => {
        let _data = {
            orderShipment: orderShipment,
            orderStatus: orderStatus

        };

        setLoading(true);
        try {
            const result = await client.service("orders").patch(selectedSingleID, _data);
            setVisible(false)
            props.alert({ type: "success", title: "Edit cart", message: "Info updated successfully" });
        } catch (error) {
            console.log("error", error);
            props.alert({ type: "error", title: "Edit cart", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={() => setVisible(false)} />
        </div>
    );


    return (
        <div className="col-12 flex justify-content-center">{displayData ? (
            <Dialog header={displayData._id} visible={visible} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => setVisible(false)} >


                <div >
                    <div className='grid grid-nogutter flex justify-content-around align-content-center'>

                        <div role="forms-edit-dialog-component">
                            <div>
                                <p className="m-0" >Shipment Details:</p>
                                <InputText className="w-full mb-3" value={orderShipment} onChange={(e) => setorderShipment(e.target.value)} />
                            </div>
                            <div>
                                <p className="m-0" >Status:</p>
                                <Dropdown value={orderStatus} onChange={(e) => setorderStatus(e.target.value)} options={statusOption} optionLabel="name"
                                    placeholder="Select  order status" className="w-full md:w-14rem" />
                            </div>
                        </div>
                    </div>



                </div>



            </Dialog>) : null}


            <div className="col-12">
                <div className="card">
                    <TabView className="tabview-demo tabview-header-icon">
                        <TabPanel header=" -User List " leftIcon="pi pi-user ">
                            <UsersPage></UsersPage>
                        </TabPanel>
                        <TabPanel header=" -Product List " leftIcon="pi pi-tags ">
                            <ProductsPage></ProductsPage>
                        </TabPanel>
                        <TabPanel header=" -Shopping Cart List" leftIcon="pi pi-shopping-cart">
                            <div className="card">
                                <DataTable value={carts} responsiveLayout="scroll" dataKey="_id" rowHover selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)} emptyMessage="No carts found.">
                                    <Column field="cartEmail" sortable header="User Email"></Column>
                                    <Column field="cartDetail.productSKU" sortable header="Code"></Column>
                                    <Column field="cartDetail.productName" sortable header="Name"></Column>
                                    <Column field="cartDetail.productBrand" sortable header="Category"></Column>
                                    <Column field="cartUnit" sortable className="text-center" header="Quantity"></Column>
                                    <Column field="cartDetail" header="Image" body={imageBodyTemplate}></Column>
                                    <Column header="Action" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                                </DataTable>
                                <br></br>

                            </div>
                        </TabPanel>
                        <TabPanel header=" -Order History List" leftIcon="pi pi-history" >
                            <DataTable value={orders} responsiveLayout="scroll" dataKey="_id" rowHover emptyMessage="No order found.">
                                <Column field="_id" header="ID"></Column>

                                <Column field="orderSummary" header="Products" body={rowExpansionTemplate}></Column>
                                <Column field="orderPaymentOption" header="Payment Option"></Column>
                                <Column field="orderStatus" header="Status"></Column>
                                <Column field="orderPayment" className="text-center" header="Total Amount"></Column>
                                <Column field="orderShipment" className="text-center" header="Detail"></Column>
                                <Column header="Action" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplateOrder} />

                            </DataTable>
                        </TabPanel>
                        <TabPanel header=" -FAQ List" leftIcon="pi pi-question-circle" >
                            <FormsPage></FormsPage>
                        </TabPanel>

                    </TabView>
                </div>

            </div>
        </div>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(Admin);
