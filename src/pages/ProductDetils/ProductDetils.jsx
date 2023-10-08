import React, { useContext, useEffect, useState } from "react";
import style from './ProductDetils.module.css'
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { cardContext } from "../../context/CardContext";
import toast from "react-hot-toast";


function ProductDetils() {
    let { id } = useParams()
    let { GetAddToCard } = useContext(cardContext)
    let { getCountCard, countcard } = useContext(cardContext)



    let [singleproductdata, setSingleproductdata] = useState({})



    async function addTocard(id) {
        let { data } = await GetAddToCard(id)

        if (data.status = 'success') {
            toast.success(data.message)
            getCountCard()
        }
    }

    async function GetSingleProductdata() {

        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setSingleproductdata(data.data)
    }



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };




    useEffect(() => {

        GetSingleProductdata()
        getCountCard()
        // setSingleproductImg()

    }, [])

    // console.log(x)
    return (
        <>

            <div className="row">

                <div className=" col-4">

                    <Slider {...settings}>

                        {
                            singleproductdata.images?.map((img) => {
                                return <img src={img} alt="" className=" w-100" />

                            })
                        }
                    </Slider>



                </div>


                <div className="col-8  d-flex flex-column justify-content-center  ">
                    <h1 className="h3 fw-bold">{singleproductdata.title}</h1>
                    <h3 className="h5">{singleproductdata.category?.name}</h3>
                    <p>{singleproductdata.description}</p>
                    <div className=" d-flex justify-content-between  pt-1">
                        <h3 className="h6 fw-light">{singleproductdata.price} EGP</h3>
                        <div className="h6 fw-light"><i className="fa-solid fa-star pe-1" style={{ color: "#f9d75d" }} > </i>  {singleproductdata.ratingsAverage} </div>
                    </div>
                    <button className=" d-block btn btn-success  w-100  mt-4" onClick={() => { addTocard(id) }}> Add To Card</button>

                </div>

            </div>



        </>
    )
}

export default ProductDetils