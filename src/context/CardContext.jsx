import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export let cardContext = createContext();


function CardContextProvider(propes) {

    let [headers, setheaders] = useState({ token: localStorage.getItem('Token') })

    // let headers = { token: localStorage.getItem('Token') }
    console.log(headers)
    let [countcard, setCountCard] = useState(0)








    function onlinePayment(Cardid, shippingAddress) {

        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${Cardid}?url=http://localhost:5173`, {
            shippingAddress: shippingAddress
        }, {
            headers: headers,
        }).then((respons) => respons).catch((error) => error)

    }



    function GetAddToCard(id) {

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: id
        }, {
            headers: headers,
        }
        ).then((respons) => respons).catch((error) => error)

    }


    function ShowCard() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: headers,
        }
        ).then((respons) => respons).catch((error) => error)
    }


    async function getCountCard() {
        let { data } = await ShowCard()
        setCountCard(data.numOfCartItems)
        // console.log(data.numOfCartItems)
    }

    useEffect(() => {
        getCountCard()
    }, [])


    function DeleteItem(Id) {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, {
            headers: headers,
        }).then((respons) => respons).catch((error) => error)
    }

    function UpdateCardQuantity(count, Id) {

        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, {
            count: count
        },
            {
                headers: headers,
            }).then((respons) => respons).catch((error) => error)
    }


    function ClearAllProduct() {

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers: headers,
        }).then((respons) => respons).catch((error) => error)
    }


    return (
        <cardContext.Provider value={{ GetAddToCard, ShowCard, DeleteItem, UpdateCardQuantity, ClearAllProduct, onlinePayment, getCountCard, countcard, setheaders }}>
            {propes.children}
        </cardContext.Provider>
    )

}

export default CardContextProvider