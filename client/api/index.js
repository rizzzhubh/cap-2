import axios from "axios"

const baseURL = "http://localhost:3000/"


export const validateuser = async (token) => {
    try {
        const res = await axios.get(`${baseURL}api/users/login`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data;
    } catch (error) {
        console.log(error)
    }

    
    
}


export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/users/getUsers `)
        return res.data
    } catch (error) {
        console.log(error)
    }
}