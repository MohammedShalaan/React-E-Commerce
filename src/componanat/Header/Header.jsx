import React, { useContext } from "react";
import style from './Header.module.css'
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { cardContext } from "../../context/CardContext";


function Header() {

    let { UserToken } = useContext(UserContext)
    let { setUserToken } = useContext(UserContext)
    let { getCountCard, countcard } = useContext(cardContext)

    let navigate = useNavigate();

    console.log(UserToken)


    function logOut() {
        localStorage.removeItem("Token");
        localStorage.removeItem('CardId')
        setUserToken(null);
        // navigate('/Login');
        // < Navigate to={'/Login'} ></Navigate >
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" to="/"> <i className="fa-solid fa-cart-shopping fa-2x" style={{ color: '#00bd03' }}></i><span className="h2 px-2">fresh cart</span></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Product">Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Categores">Categores</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Brands">Brands</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/cart">Cart</Link>
                            </li>
                        </ul>


                        {
                            !UserToken ? (<div className="d-flex" role="search">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item d-flex justify-content-center align-items-center gap-4 py-2 mx-3">
                                        <i className="fa-brands fa-facebook-f"></i>
                                        <i className="fa-brands fa-x-twitter"></i>
                                        <i className="fa-brands fa-instagram"></i>
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                                    </li>
                                </ul>
                            </div>) : (
                                <div className="d-flex" role="search">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className=" d-flex justify-content-center align-items-center gap-4 py-2 mx-3">
                                            <i className="fa-brands fa-facebook-f"></i>
                                            <i className="fa-brands fa-x-twitter"></i>
                                            <i className="fa-brands fa-instagram"></i>
                                            <i className="fa-brands fa-linkedin-in"></i>

                                            {/* <button type="button" class="btn btn-primary position-relative">
  Inbox
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">unread messages</span>
  </span>
</button> */}


                                            <Link className=" text-decoration-none  " to="/cart"><i className="fa-solid fa-cart-shopping px-4 cursor-pointer fa-1x position-relative" >

                                                <span className="position-absolute top-0 end-0  translate-middle badge rounded-pill bg-danger">
                                                    {countcard}
                                                    <span className="visually-hidden">unread messages</span>
                                                </span>
                                            </i></Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link className="nav-link active" to={'/Login'} onClick={() => { logOut() }} >Log Out</Link>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }



                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header