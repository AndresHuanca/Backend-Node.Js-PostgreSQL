// https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );
// recibe en token
async function googleVerify( token = '' ) {
    const ticket = await client.verifyIdToken({
    idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    // const payload = ticket.getPayload(); 
    // console.log( payload )
    
    // jti = uuid unique od gmail google
    const { given_name, family_name, picture, email, jti } = ticket.getPayload(); 


    return {
        nombre: given_name,
        apellidos: family_name,
        img: picture,
        email,
        password: jti
    };
}

module.exports = {
    googleVerify
};