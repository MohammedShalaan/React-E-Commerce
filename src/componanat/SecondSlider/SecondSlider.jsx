import React, { useEffect, useState } from "react";
import style from './SecondSlider.module.css'
import axios from "axios";
import Slider from "react-slick";
import { ThreeDots } from "react-loader-spinner";



function SecondSlider() {
    let [categoryData, setcategorydata] = useState([])
    let [lodar, setLodar] = useState(true)


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
    };




    async function getSliderData() {

        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setcategorydata(data.data)
        setLodar(false)
    }
    // console.log(item)
    useEffect(() => {

        getSliderData()

    }, [])

    return (
        <>{lodar ? (
            <div className=" d-flex justify-content-center align-items-center ">
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
            <Slider {...settings}>
                {categoryData.map((item) => {
                    return <img src={item.image} alt="" className=" w-100" height={'200px'} />
                })}
            </Slider >)
        }

        </>
    )
}

export default SecondSlider