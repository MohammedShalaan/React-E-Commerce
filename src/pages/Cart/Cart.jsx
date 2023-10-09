import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './Cart.module.css'


import { ThreeDots } from "react-loader-spinner";
import { cardContext } from "../../context/CardContext";


function Cart() {
    let { ShowCard } = useContext(cardContext)
    let { DeleteItem } = useContext(cardContext)
    let { UpdateCardQuantity } = useContext(cardContext)
    let { ClearAllProduct } = useContext(cardContext)
    let { getCountCard, countcard } = useContext(cardContext)

    let nav = useNavigate()


    let [data, setdata] = useState([])
    let [product, setproduct] = useState([])
    let [loder, setLoder] = useState(true)
    let [end, setend] = useState([])


    async function DeleteOneItem(id) {
        let { data } = await DeleteItem(id)
        // console.log(data)
        setproduct(data?.data?.products)
        setdata(data?.data)
        getCountCard()


    }
    async function DeleteAllItem() {
        let { data } = await ClearAllProduct()
        // console.log(data)
        setproduct([])
        setdata([])
        getCountCard()
        nav('/')



    }
    async function UpdateCountOneItem(count, id) {
        let { data } = await UpdateCardQuantity(count, id)
        // console.log(data)
        setproduct(data.data.products)
        setdata(data?.data)
        getCountCard()

    }



    async function ShowCardData() {
        let { data } = await ShowCard()
        setdata(data?.data)
        setproduct(data?.data?.products)
        setLoder(false)
        setend(data)
        getCountCard()
        // console.log(data.numOfCartItems)
        // console.log(numOfCartItems)
        // localStorage.setItem('numCard', data.numOfCartItems)
        localStorage.setItem('CardId', data.data._id)

    }

    useEffect(() => {
        ShowCardData()
        getCountCard()

    }, [])




    return (
        <>
            {end?.numOfCartItems > 0 ? <>
                {loder ? (

                    <div className=" d-flex justify-content-center align-items-center min-vh-100">
                        <ThreeDots
                            height="60"
                            width="60"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true} />

                    </div>

                ) : (
                    <div className=" bg-light p-3 px-5 rounded-3">
                        <div className="row  align-items-center">
                            <div className=" col-10"><h1 className="h3 fw-bold pt-3 pb-2">Shopping Cart </h1>
                                <h4 className=" h6 text-success">Total Cart Price: {data?.totalCartPrice}</h4></div>
                            <Link to="/Checkout" className="col-2"><button className=" btn btn-success">Check Out</button></Link>
                        </div>

                        <div className="row gap-3">
                            {
                                product.map((items) => {
                                    // { console.log(items) }
                                    return <div className="row p-3  shadow-sm " key={items.product?._id}>
                                        <div className=" col-lg-4  col-sm-12 d-flex justify-content-center"><img src={items?.product?.imageCover} alt={items?.product?.brand.name} height={'300px'} width={"250px"} /></div>
                                        <div className=" col-lg-8  col-sm-12 py-3 d-flex  justify-content-between align-content-center align-items-center ">
                                            <div>
                                                <h2 className="h4 ">{items?.product?.title} </h2>
                                                <span className=" text-success">price :{items?.price}EGP</span>
                                                <div className=" text-success pt-3 cursor-pointer">
                                                    <Link className=" text-decoration-none text-danger" onClick={() => { DeleteOneItem(items?.product?._id) }}> <i className="fa-solid fa-trash-can pe-1" ></i>remove item</Link>
                                                </div>
                                            </div>
                                            <div className=" d-flex justify-content-center align-items-center gap-2">
                                                <button className="btn btn-outline-success btn-sm" onClick={() => { UpdateCountOneItem(items.count + 1, items.product?._id) }}>+</button>
                                                <span>{items.count}</span>
                                                <button className="btn btn-outline-success btn-sm" onClick={() => { UpdateCountOneItem(items.count - 1, items.product?._id) }}>-</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                        <button className="btn btn-success mt-3" onClick={() => { DeleteAllItem() }} >clear All product</button>


                    </div >

                )

                }
            </> : <>

                <div className=" bg-light p-3 px-5 rounded-3">
                    <h1 className="h3 fw-bold pt-3 pb-2">shopping card detales </h1>
                    <h4 className=" h6 text-success">Total card price: {data?.totalCartPrice}</h4>

                    <div> no product in card</div>

                    <button className="btn btn-success mt-3" >continue shopping</button>


                </div >


            </>}







        </>
    )
}

export default Cart