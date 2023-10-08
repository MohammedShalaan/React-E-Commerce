



import style from './CheckOut.module.css'
import React, { useContext, useState } from "react";
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from '../../context/UserContext';
import { cardContext } from '../../context/CardContext';




function CheckOut() {


    let { setUserToken } = useContext(UserContext)
    let { onlinePayment } = useContext(cardContext)
    let cardId = localStorage.getItem("CardId")


    let [error, seterror] = useState(null);
    let [spaner, setSpiner] = useState(false);

    let navigte = useNavigate();



    async function submitter(value) {

        // setSpiner(true)

        let { data } = await onlinePayment(cardId, value)



        if (data.status === "success") {
            setSpiner(true)
            // navigte('/')
            // localStorage.setItem("Token", data.token)
            // setUserToken(localStorage.getItem("Token"))
            window.location.href = data.session.url

        }


    }


    function validate(values) {
        let regexPhone = /^(?:\+20|0)?1[0-9]{9}$/;

        const errors = {};


        // if (!regexEmail.test(values.email)) {
        //     errors.email = "this Email not right"
        // } else if (!values.email) {
        //     errors.email = "Enetr the Email"
        // }

        if (!regexPhone.test(values.phone)) {
            errors.phone = "Enter Egypthion true number"
        } else if (!values.phone) {
            errors.phone = "enetr the phone number"
        }




        // console.log(errors.Phone)
        return errors
    }

    let formikCheckOut = useFormik({

        initialValues: {
            details: '',
            phone: '',
            city: '',

        },

        validate,
        onSubmit: submitter,

    })
    return (

        <>
            <div className=" d-flex  flex-column justify-content-start align-items-start">
                {/* <h1 className=" p mt-5">register</h1> */}

                {error && <div className=" alert alert-danger w-100 mt-4">*{error}</div>}
                <div className="text-start w-100 mt-4">
                    <form className="form" onSubmit={formikCheckOut.handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="details" className="form-label">details</label>
                            <input type="txt" name="details" id="details" className="form-control" placeholder="" aria-describedby="helpId" value={formikCheckOut.values.details}
                                onChange={formikCheckOut.handleChange} onBlur={formikCheckOut.handleBlur} />
                            {formikCheckOut.errors.details && formikCheckOut.touched.details && (<div className=" alert alert-danger">{formikCheckOut.errors.details}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">phone</label>
                            <input type="tel" name="phone" id="phone" className="form-control" placeholder="" aria-describedby="helpId" value={formikCheckOut.values.phone}
                                onChange={formikCheckOut.handleChange} onBlur={formikCheckOut.handleBlur} />
                            {formikCheckOut.errors.phone && formikCheckOut.touched.phone && (<div className=" alert alert-danger">{formikCheckOut.errors.phone}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">city</label>
                            <input type="tel" name="city" id="phone" className="form-control" placeholder="" aria-describedby="helpId" value={formikCheckOut.values.city}
                                onChange={formikCheckOut.handleChange} onBlur={formikCheckOut.handleBlur} />
                            {formikCheckOut.errors.city && formikCheckOut.touched.city && (<div className=" alert alert-danger">{formikCheckOut.errors.city}</div>)}
                        </div>

                        {spaner ? (<span>
                            <ThreeDots
                                height="30"
                                width="30"
                                radius="9"
                                color="#4fa94d"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            />
                        </span>) : (
                            <button type="submit" className="btn btn-success">Check Out</button>
                        )}


                        {/* <Link to="/Forgetphone" className=" ps-3 text-decoration-none text-black">Forget phone</Link> */}

                    </form>
                </div>
            </div>

        </>
    )
}

export default CheckOut