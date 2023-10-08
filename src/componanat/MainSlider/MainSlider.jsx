import React from "react";
import style from './MainSlider.module.css'
import Slider from "react-slick";
import img1 from './../../assets/images/Untitled-1_01.gif'
import img2 from './../../assets/images/Untitled-1_02.jpg'
import img3 from './../../assets/images/Untitled-1_03.gif'
import SecondSlider from "../SecondSlider/SecondSlider";

function MainSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>

            <div className="row  w-100 g-0">

                <div className=" col-sm-9">

                    <Slider {...settings}>
                        <div>
                            <img src={img1} alt="" className=" w-100" height={"500px"} />
                        </div>
                        <div>
                            <img src={img2} alt="" className=" w-100" height={"500px"} />
                        </div>
                        <div>
                            <img src={img3} alt="" className=" w-100" height={"500px"} />
                        </div>

                    </Slider>
                </div>

                <div className=" col-sm-3 h-100">
                    <div><img src={img3} alt="" className=" w-100" height={"250px"} /></div>
                    <div><img src={img2} alt="" className=" w-100" height={"250px"} /></div>
                </div>
            </div>

            <div className=" py-5">
                <SecondSlider />
            </div>




        </>
    )
}

export default MainSlider