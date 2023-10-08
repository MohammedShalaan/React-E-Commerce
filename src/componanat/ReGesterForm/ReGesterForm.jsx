import React, { useState } from "react";
import style from './ReGesterForm.module.css';
import { Formik, useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import Register from "../../pages/Register/Register";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function ReGesterForm() {

    let [error, seterror] = useState(null);
    let [spaner, setSpiner] = useState(false);

    let navigte = useNavigate();

    async function submitter(value) {

        setSpiner(true)

        let { data } = await
            axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value).catch((error) => {

                setSpiner(false)
                seterror(error.response.data.message)

            })



        if (data.message === "success") {
            setSpiner(true)
            navigte('/login')

        }

        console.log(data.message)

    }


    function validate(values) {
        let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        let regexPhone = /^(?:\+20|0)?1[0-9]{9}$/;

        const errors = {};

        if (!values.name) {
            errors.name = "name is valed"
        } else if (values.name.length < 6) {
            errors.name = "name is small"
        }

        if (!regexEmail.test(values.email)) {
            errors.email = "flas the mail not right"
        } else if (!values.email) {
            errors.email = "enetr the mail"
        }

        if (!values.password) {
            errors.password = "Password is valed"
        } else if (values.password.length < 6) {
            errors.password = "Password is small"
        } else if (values.password.length > 20) {
            errors.password = "Password is big must less than 20 chrachter"
        }

        if (!values.rePassword) {
            errors.rePassword = "Password is valed"
        } else if (!(values.rePassword === values.password)) {
            errors.rePassword = "not equal  main password"
        } else if (values.rePassword.length < 6) {
            errors.rePassword = "Password is small"
        } else if (values.rePassword.length > 20) {
            errors.rePassword = "Password is big must less than 20 chrachter"
        }

        if (!regexPhone.test(values.phone)) {
            errors.phone = "Enter Egypthion true number"
        } else if (!values.phone) {
            errors.phone = "enetr the phone number"
        }

        // console.log(errors.Phone)
        return errors
    }

    let formiky = useFormik({

        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
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
                    <form className="form" onSubmit={formiky.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" className="form-control" placeholder="" aria-describedby="helpId" value={formiky.values.name}
                                onChange={formiky.handleChange} onBlur={formiky.handleBlur} />
                            {formiky.errors.name && formiky.touched.name && (<div className=" alert alert-danger">{formiky.errors.name}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="Email" name="email" id="email" className="form-control" placeholder="" aria-describedby="helpId" value={formiky.values.email}
                                onChange={formiky.handleChange} onBlur={formiky.handleBlur} />
                            {formiky.errors.email && formiky.touched.email && (<div className=" alert alert-danger">{formiky.errors.email}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="" aria-describedby="helpId" value={formiky.values.password}
                                onChange={formiky.handleChange} onBlur={formiky.handleBlur} />
                            {formiky.errors.password && formiky.touched.password && (<div className=" alert alert-danger">{formiky.errors.password}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rePassword" className="form-label">Re-password</label>
                            <input type="password" name="rePassword" id="rePassword" className="form-control" placeholder="" aria-describedby="helpId" value={formiky.values.rePassword}
                                onChange={formiky.handleChange} onBlur={formiky.handleBlur} />
                            {formiky.errors.rePassword && formiky.touched.rePassword && (<div className=" alert alert-danger">{formiky.errors.rePassword}</div>)}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="number" name="phone" id="phone" className="form-control" placeholder="" aria-describedby="helpId" value={formiky.values.phone}
                                onChange={formiky.handleChange} onBlur={formiky.handleBlur} />
                            {formiky.errors.phone && formiky.touched.phone && (<div className=" alert alert-danger">{formiky.errors.phone}</div>)}                    </div>

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
                            <button type="submit" className="btn btn-success">register</button>
                        )}


                        <Link to="/Register" className=" ps-3 text-decoration-none text-black">Sign Up Now</Link>

                    </form>
                </div>
            </div>

        </>
    )
}

export default ReGesterForm