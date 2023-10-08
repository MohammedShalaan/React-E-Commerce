import React, { useContext } from "react";
import style from './Home.module.css'
import { CounterContext } from "../../context/ContextCounter";
import MainSlider from "../../componanat/MainSlider/MainSlider"
import Featuredproduct from "../../componanat/Featuredproduct/Featuredproduct"


function Home() {

    let result = useContext(CounterContext)

    // console.log(result)

    return (
        <>
            <MainSlider />
            <Featuredproduct />
        </>

    )
}

export default Home