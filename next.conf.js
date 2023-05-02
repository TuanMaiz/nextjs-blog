require("dotenv").config()
module.exports = {
    env: {
        DATABASE_URL : process.env.DATABASE_URL,
        NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET,
        JWT_SECRET : process.env.JWT_SECRET
    }
}