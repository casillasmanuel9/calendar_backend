import jsonwebtoken from 'jsonwebtoken';
import { SECRED_JWT_SEED } from '../config'

export const generarJWT = ( id:string, name:string ) =>  {
    return new Promise((resolve, reject) => {
        const payload = { id, name };

        jsonwebtoken.sign(payload, SECRED_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        })
    }); 
}