import React, { useContext, useState } from "react";
import style from './ResetCode.module.css'
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext";

UserContext


function ResetCode() {
    let { setUserToken } = useContext(UserContext)

    let [error, seterror] = useState(null);
    let [spaner, setSpiner] = useState(false);

    let navigte = useNavigate();



    async function submitter(value) {

        setSpiner(true)

        let { data } = await
            axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', value).catch((error) => {
                setSpiner(false)
                seterror(error.response.data.message)

            })



        if (data.token) {
            setSpiner(true)
            navigte('/')
            localStorage.setItem("Token", data.token)
            setUserToken(localStorage.getItem("Token"))

        }

        console.log(data)

    }


    function validate(values) {
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        const errors = {};


        if (!regexEmail.test(values.email)) {
            errors.email = "this Email not right"
        } else if (!values.email) {
            errors.email = "Enetr the Email"
        }


        if (!values.newPassword) {
            errors.newPassword = "Enter the new password"
        } else if (values.newPassword.length < 6) {
            errors.newPassword = " New Password is small"
        } else if (values.newPassword.length > 20) {
            errors.newPassword = " New Password is big must less than 20 chrachter"
        }
        // console.log(errors.Phone)
        return errors
    }

    let formikyForgetPass = useFormik({

        initialValues: {
            email: '',
            newPassword: '',

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
                        <h2>Reset password</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="Email" name="email" id="email" className="form-control" placeholder="" aria-describedby="helpId" value={formikyForgetPass.values.email}
                                onChange={formikyForgetPass.handleChange} onBlur={formikyForgetPass.handleBlur} />
                            {formikyForgetPass.errors.email && formikyForgetPass.touched.email && (<div className=" alert alert-danger">{formikyForgetPass.errors.email}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">New Password</label>
                            <input type="Password" name="newPassword" id="newPassword" className="form-control" placeholder="" aria-describedby="helpId" value={formikyForgetPass.values.newPassword}
                                onChange={formikyForgetPass.handleChange} onBlur={formikyForgetPass.handleBlur} />
                            {formikyForgetPass.errors.newPassword && formikyForgetPass.touched.newPassword && (<div className=" alert alert-danger">{formikyForgetPass.errors.newPassword}</div>)}
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

export default ResetCode