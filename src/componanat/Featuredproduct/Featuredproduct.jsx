import React, { useContext, useEffect, useState, useTransition } from "react";
import style from './Featuredproduct.module.css'
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cardContext } from "../../context/CardContext";
import toast from "react-hot-toast";

function Featuredproduct() {
    let { getCountCard, countcard } = useContext(cardContext)
    let [Productdata, setproductdata] = useState([])
    let [lodaer, setloader] = useState(true)

    let { GetAddToCard } = useContext(cardContext)


    async function AddToCard(id) {
        let { data } = await GetAddToCard(id)
        // console.log(data)

        if (data?.status == "success") {
            toast.success(data?.message)
            getCountCard()
        }
    }


    useTransition()
    async function getProduct() {

        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        setproductdata(data.data)
        console.log(data.data)
        setloader(false)
    }


    useEffect(() => {

        getProduct()
        getCountCard()



    }, [])


    return (
        <>

            {lodaer ? (

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
                <div className="row row-cols-lg-5 gy-4 row-cols-sm-2 row-cols-md-3">

                    {Productdata.map((items) => {
                        // console.log(key)
                        // console.log(items.sold)
                        return (
                            <div key={items._id} className="product overflow-hidden">

                                <div className={`card h-100" ${style.product}`} >
                                    <Link className=" text-decoration-none text-black" to={`/ProductDetils/${items._id}`}>
                                        <div><img src={items.imageCover} alt={items.title} className=" w-100" /></div>
                                        <div className="p-2">
                                            <h1 className="h6 fw-bold text-center ">{items.category.name}</h1>
                                            <div className=" text-center">{items.title.split(' ', 2).join(" ")}</div>
                                        </div>
                                        <div className=" d-flex justify-content-between px-2 pt-3">
                                            <h3 className="h6 fw-light">{items.price} EGP</h3>
                                            <div className="h6 fw-light"><i className="fa-solid fa-star pe-1" style={{ color: "#f9d75d" }} > </i>  {items.ratingsAverage} </div>
                                        </div>
                                    </Link>
                                    <div >
                                        <div className={`${style.btnToAddCard} d-flex btnToAddCard justify-content-center align-items-center`}>
                                            <button className=" btn btn-success w-75  pt-2 mb-2" onClick={() => { AddToCard(items._id) }}> Add To Card</button>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        )

                    })}
                </div >)

            }

        </>
    )
}

export default Featuredproduct