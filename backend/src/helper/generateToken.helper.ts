import jwt from 'jsonwebtoken'

const generateToken = async(email:string):Promise<string> => {
    return await jwt.sign({
        email
    },process.env.JWT_KEY as string,{
        algorithm:'HS256',
        expiresIn:'24hr'
    }) as string
}

export default generateToken