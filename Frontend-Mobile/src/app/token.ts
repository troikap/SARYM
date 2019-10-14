// import  from 'jsonwebtoken';

export default class Token {

    // tslint:disable-next-line:no-inferrable-types
    private static seed: string = 'tueviejaentanga';
    private static caducidad: string;
    caducidad = '30d';

    constructor() {}

    // static getJwtToken( payload: any ): string {
    //     // return jwt.sign({
    //     //     usuario: payload
    //     // }, this.seed, { expiresIn: this.caducidad});
    // }

    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject) => {
            // jwt.verify( userToken, this.seed, (err, decoded) => {
            //     if (err){
            //         // no confiar
            //         reject();
            //     } else {
            //         // token valido
            //         resolve(decoded);
            //     }
            // })

        });
    }
}