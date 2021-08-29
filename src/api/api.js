import axios from 'axios'

export default axios.create({
    baseURL: "http://postabasum.herokuapp.com/api/"
})