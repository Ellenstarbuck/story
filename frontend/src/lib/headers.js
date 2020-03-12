// import Auth from '../lib/auth'

//dealing with Create-Reacts issue with cookies
import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')


// when you send a request that does not need to be authenticated with the jwt token, 
// only send the headers.common object, otherwise send the full headers object 

export const headers = {
  common: {
    'X-CSRF-TOKEN': csrftoken
  },
  // // // <!-- later on you can include this (remember to import it): -->
  // headers: { Authorization: `Bearer ${Auth.getToken()}` }
}