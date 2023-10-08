
import React, { useContext, useEffect } from "react";
import style from './Brands.module.css'
import MainSlider from "../../componanat/MainSlider/MainSlider";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

function Brands() {

    let [dataBrandes, setdataBrandes] = useState([])
    let [loader, setloader] = useState(true)


    let headers = { token: localStorage.getItem('Token') }



    async function GetDataBrandes() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands', {
            headers: headers,
        }).then((response) => response).catch((error) => error)

        setdataBrandes(data.data)
        setloader(false)

    }

    useEffect(() => {

        GetDataBrandes()

    }, [])



    return (


        <>

            {loader ? (
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
                <div className="row row-cols-5 g-3">
                    {

                        dataBrandes.map((item) => {
                            { console.log(item) }
                            return (
                                <div>
                                    <div className="card shadow-sm h-100">
                                        <img src={item.image} alt="" className=" w-100" />
                                        <p className=" text-center p-2">{item.name}</p>
                                    </div>
                                </div>
                            )

                        })

                    }


                </div>
            )}


        </>
    )
}

export default Brands