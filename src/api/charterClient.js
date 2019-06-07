import axios from 'axios';

export default axios.create({
    baseURL: 'https://onlinecharterapi.azurewebsites.net'
});