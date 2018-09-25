import axios from 'axios';

const instance = axios.create({
  baseURL: "https://instagram-project-171db.firebaseio.com"
});

export default instance;
