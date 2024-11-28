import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(),'.env') })

export default{
    port: process.env.PORT || 3000,
    db_url: process.env.DB_URL,
    jwt_token_secret: process.env.JWT_TOKEN_SECRET,
    jwt_refresh_token_secret: process.env.jWT_REFRESH_TOKEN_SECRET,
    jwt_token_expiry: process.env.JWT_EXPIRES_TOKEN,
    jwt_refresh_token_expiry: process.env.JWT_REFRESH_TOKEN_EXPIRES,
    salts_rounds: process.env.BCRYPT_SALT_ROUNDS
}