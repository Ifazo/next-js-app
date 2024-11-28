import { getToken } from "next-auth/jwt"


export default async function handler(req, res) {
    
    const token = await getToken({ req })
    
    res.json({ token: token })
}