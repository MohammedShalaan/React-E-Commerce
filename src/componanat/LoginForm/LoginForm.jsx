
import style from './LoginForm.module.css'

import React, { useContext, useState } from "react";
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from '../../context/UserContext';
import { cardContext } from '../../context/CardContext';




function LoginForm() {

    let { setheaders } = useContext(cardContext)

    let { setUserToken } = useContext(UserContext)
    let [error, seterror] = useState(null);
    let [spaner, setSpiner] = useState(false);

    let navigte = useNavigate();



    async function submitter(value) {

        setSpiner(true)

        let { data } = await
            axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value).catch((error) => {
                setSpiner(false)
                seterror(error.response.data.message)

            })



        if (data.message === "success") {
            setSpiner(true)
            navigte('/')
            localStorage.setItem("Token", data.token)
            setheaders({ token: localStorage.getItem("Token") })
            setUserToken(localStorage.getItem("Token"))

        }

        // console.log(data)

    }


    function validate(values) {
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        const errors = {};


        if (!regexEmail.test(values.email)) {
            errors.email = "this Email not right"
        } else if (!values.email) {
            errors.email = "Enetr the Email"
        }

        if (!values.password) {
            errors.password = "Password is valed"
        } else if (values.password.length < 6) {
            errors.password = "Password is small"
        } else if (values.password.length > 20) {
            errors.password = "Password is big must less than 20 chrachter"
        }



        // console.log(errors.Phone)
        return errors
    }

    let formikyLogin = useFormik({

        initialValues: {
            email: '',
            password: '',

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
                    <form className="form" onSubmit={formikyLogin.handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="Email" name="email" id="email" className="form-control" placeholder="" aria-describedby="helpId" value={formikyLogin.values.email}
                                onChange={formikyLogin.handleChange} onBlur={formikyLogin.handleBlur} />
                            {formikyLogin.errors.email && formikyLogin.touched.email && (<div className=" alert alert-danger">{formikyLogin.errors.email}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="" aria-describedby="helpId" value={formikyLogin.values.password}
                                onChange={formikyLogin.handleChange} onBlur={formikyLogin.handleBlur} />
                            {formikyLogin.errors.password && formikyLogin.touched.password && (<div className=" alert alert-danger">{formikyLogin.errors.password}</div>)}
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
                            <button type="submit" className="btn btn-success">Login</button>
                        )}


                        <Link to="/ForgetPassword" className=" ps-3 text-decoration-none text-black">Forget Password</Link>

                    </form>
                </div>
            </div>

        </>
    )
}

export default LoginForm