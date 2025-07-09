import axios from "axios"

export const getImg = async (img)=>{
    const apiKey = 'aabedefeddf28cd34552046a1972b115'
    
    const makeObg = new FormData()
    makeObg.append('image',img)

    const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`,makeObg)
    return data.data.display_url
}