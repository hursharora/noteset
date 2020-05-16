import Axios from "axios";

const instance = Axios.create({
    baseURL: "https://noteset-8f7ba.firebaseio.com/"
});


export default instance;