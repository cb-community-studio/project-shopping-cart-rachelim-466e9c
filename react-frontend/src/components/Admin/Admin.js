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


import '../Admin/myacc.css';
import { compact } from "lodash";

const Admin = (props) => {
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [objectID, setObjectID] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [billingAddr, setBillingAddr] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState("");

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [adminStatus, setAdminStatus] = useState(false);
    const [visible, setVisible] = useState(false);
    const [displayData, setDisplayEditData] = useState({});
    const [selectedSingleID, setSelectedSingleID] = useState({});

    const [value18, setValue18] = useState(0);

    const [orderPaymentOption, setorderPaymentOption] = useState(null);
    const [orderShippingAddr, setorderShippingAddr] = useState("");
    const [orderShipment, setorderShipment] = useState("Tracking No..");
    const paymentOption = [
        { name: 'Online Banking', code: 'Online Banking' },
        { name: 'Credit/Debit Card', code: 'Credit/Debit Card' },
        { name: 'E-wallet', code: 'E-wallet' },
    ];



    const imageBodyTemplate = (rowData) => {
        return <img src={require(`../../assets/products/${rowData.cartDetail.productImage}.jpg`)} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} width="75" className="product-image" />

    }
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex">
                <Button type="button" icon="pi pi-pencil" className="m-1" onClick={() => editModal(rowData)}></Button>
                <Button type="button" icon="pi pi-times-circle" className="m-1" onClick={() => deleteModal(rowData)}></Button>
            </div>
        )

    }

    function editModal(rowData) {
        setDisplayEditData(rowData.cartDetail)
        setSelectedSingleID(rowData._id)
        setValue18(rowData.cartUnit)
        console.log("Edit data", rowData, displayData, "selectedCustomers", selectedCustomers)
        setVisible(true)



    }

    async function deleteModal(rowData) {

        if (window.confirm("Confirm Delete ? ")) {
            try {
                const result = await client.service("carts").remove(rowData._id);
                props.alert({ type: "success", title: "Delete", message: "Deleted successfully" });
                let _newData = products.filter((_, i) => _._id !== rowData._id);
                setProducts(_newData);

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
            let _newData = products.filter((_, i) => _._id !== selectedSingleID);
            console.log([..._newData, { ...result, cartDetail: displayData }])

            setProducts([..._newData, { ...result, cartDetail: displayData }]);
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
                console.log("admin",res.data);
                if (!res.data.length){
                    history.push('/home');
                    props.alert({ title: "Admin Site", type: "error", message: "You are not allowed to access this site" });


                }
                // client
                //     .service("carts")
                //     .find({ query: { $limit: 100, cartUser: res.data[0]._id } })
                //     .then((resCart) => {
                //         setProducts(resCart.data)
                //         console.log("carts", resCart.data);
                //     })
                //     .catch((error) => {
                //         console.log({ error });
                //         props.alert({ title: "Carts", type: "error", message: error.message || "Failed get carts" });
                //     });

                // client
                //     .service("orders")
                //     .find({ query: { $limit: 100, cartUser: res.data[0]._id } })
                //     .then((resOrder) => {
                //         setOrders(resOrder.data)
                //         console.log("orders", resOrder.data);
                //     })
                //     .catch((error) => {
                //         console.log({ error });
                //         props.alert({ title: "Orders", type: "error", message: error.message || "Failed get orders" });
                //     });
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Users", type: "error", message: error.message || "Failed get user" });
            });
    }, []);

    return (
        <div className="col-12 flex justify-content-center">{displayData ? (
            <Dialog header={displayData.productSKU} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >


                <div >
                    <div className='grid grid-nogutter flex justify-content-around align-content-center'>

                        <div className="flex col-12 justify-content-around align-content-center">
                            <InputNumber inputId="horizontal" value={value18} onValueChange={(e) => setValue18(e.value)} showButtons buttonLayout="horizontal" step={1}
                                decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" min={1} max={displayData.productInStock} />

                            <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={addtocart} loading={loading} ></Button>

                        </div>
                    </div>



                </div>



            </Dialog>) : null}

            <div className="col-12">
                <div className="card">
                    <TabView className="tabview-demo tabview-header-icon">
                        <TabPanel header=" -User List " leftIcon="pi pi-user ">
                            
                        </TabPanel>
                        <TabPanel header=" -Product List " leftIcon="pi pi-tags ">
                            
                        </TabPanel>
                        <TabPanel header=" -Shopping Cart List" leftIcon="pi pi-shopping-cart">
                            <div className="card">
                                <DataTable value={products} responsiveLayout="scroll" dataKey="_id" rowHover selection={selectedCustomers} onSelectionChange={e => setSelectedCustomers(e.value)} emptyMessage="No carts found.">
                                    <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
                                    <Column field="cartDetail" header="Image" body={imageBodyTemplate}></Column>
                                    <Column field="cartDetail.productSKU" header="Code"></Column>
                                    <Column field="cartDetail.productName" header="Name"></Column>
                                    <Column field="cartDetail.productBrand" header="Category"></Column>
                                    <Column field="cartUnit" className="text-center" header="Quantity"></Column>
                                    <Column header="Action" headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                                </DataTable>
                                <br></br>

                                {selectedCustomers ? (<Fieldset legend="Checkout Form" className="p-mb-6 col-12 w-full">

                                    <div className="grid p-8 col-12 xl:col-8 flex flex-column align-items-center w-full">
                                        <div className="w-full mb-4">
                                            <p className="m-0">You have selected {selectedCustomers.length} items</p>


                                        </div>
                                        <div className="w-full mb-4">
                                            <p className="m-0">Payment Option</p>
                                            <Dropdown value={orderPaymentOption} onChange={(e) => setorderPaymentOption(e.value)} options={paymentOption} optionLabel="name"
                                                placeholder="Select payment option" className="w-full md:w-14rem" />
                                        </div>
                                        <div className="w-full mb-4">
                                            <p className="m-0">Shipping Address</p>
                                            <InputText type="text" className="w-full" placeholder="Please place your address" value={orderShippingAddr} onChange={(e) => setorderShippingAddr(e.target.value)} ></InputText>

                                        </div>
                                        <div className="w-full mb-4 flex justify-content-end">
                                            <Button type="button" label="Checkout" className="m-1" onClick={checkout}></Button>

                                        </div>
                                    </div>

                                </Fieldset>) : null}

                            </div>
                        </TabPanel>
                        <TabPanel header=" -Order History List" leftIcon="pi pi-history" >
                            <DataTable value={orders} responsiveLayout="scroll" dataKey="_id" rowHover  emptyMessage="No order found.">
                             
                                <Column field="orderSummary" header="Products" body={rowExpansionTemplate }></Column>
                                <Column field="orderPaymentOption" header="Payment Option"></Column>
                                <Column field="orderStatus" header="Status"></Column>
                                <Column field="orderPayment" className="text-center" header="Total Amount"></Column>
                                <Column field="orderShipment" className="text-center" header="Detail"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header=" -FAQ List" leftIcon="pi pi-question-circle" >
                            <DataTable value={orders} responsiveLayout="scroll" dataKey="_id" rowHover  emptyMessage="No order found.">
                             
                                <Column field="orderSummary" header="Products" body={rowExpansionTemplate }></Column>
                                <Column field="orderPaymentOption" header="Payment Option"></Column>
                                <Column field="orderStatus" header="Status"></Column>
                                <Column field="orderPayment" className="text-center" header="Total Amount"></Column>
                                <Column field="orderShipment" className="text-center" header="Detail"></Column>
                            </DataTable>
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
