import axios from 'axios';


const API_KEY ='AIzaSyCUwmPL84PrlOUu5gSPzfSMN38FrwfBYQU';


async function authenticate(mode, email, password) {
    console.log(email);
    console.log(password);
    const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
        ,
        {
            email: email,
            password: password,
            returnSecureToken: true,
        }
    );
    console.log(response.data);
    const token = response.data.idToken;
    return token;
}

export async function loginUser(email, password) {
    return authenticate('signInWithPassword',email,password);
}
