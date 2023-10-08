
import React, { useContext, useState } from "react";
import style from './VerifyResetCode.module.css'
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";



function VerifyResetCode() {
    // let { setUserToken } = useContext(UserContext)

    let [error, seterror] = useState(null);
    let [spaner, setSpiner] = useState(false);

    let navigte = useNavigate();



    async function submitter(value) {

        setSpiner(true)

        let { data } = await
            axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value).catch((error) => {
                setSpiner(false)
                seterror(error.response.data.message)

            })



        if (data.status) {
            setSpiner(true)
            navigte('/ResetCode')

        }

        console.log(data.status)

    }


    function validate(values) {


        const errors = {};





        if (!values.resetCode) {
            errors.resetCode = "Enter the rest Code send to Email inbox"
        }
        // console.log(errors.Phone)
        return errors
    }

    let formikyForgetPass = useFormik({

        initialValues: {
            resetCode: '',

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
                    <form className="form" onSubmit={formikyForgetPass.handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="resetCode" className="form-label">Enter Code</label>
                            <input type="text" name="resetCode" id="resetCode" className="form-control" placeholder="" aria-describedby="helpId" value={formikyForgetPass.values.resetCode}
                                onChange={formikyForgetPass.handleChange} onBlur={formikyForgetPass.handleBlur} />
                            {formikyForgetPass.errors.resetCode && formikyForgetPass.touched.resetCode && (<div className=" alert alert-danger">{formikyForgetPass.errors.resetCode}</div>)}
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
                            <button type="submit" className="btn btn-success">Reset password</button>
                        )}


                        {/* <Link className=" ps-3 text-decoration-none text-black">Send code</Link> */}

                    </form>
                </div>
            </div>

        </>
    )
}

export default VerifyResetCode