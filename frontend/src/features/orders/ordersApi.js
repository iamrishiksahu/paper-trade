import { axiosPrivate } from "../../api/axiosConfig"
import { useDispatch } from "react-redux"
import useAxiosPrivate  from "../../hooks/useAxiosPrivate";

export const getOrders = async (params) => {

    /**
     * Other way to send query params:
     * axiosPrivate.get(`/user/orders?email=${params.email})
     */


    let data;

    try{
        data = await axiosPrivate.get('/user/orders', {
            params: {
                email: params.email
            }
        })    
        
    } catch(err) {
        console.error(err)
    }
    
    return data;
}

export const createOrder = async (params) => {

    let data;


    try{
        data = await axiosPrivate.post('/user/orders', {
            payload: params.data
            
        })
    }catch(err) {
        console.error(err);
    }

    return data

}