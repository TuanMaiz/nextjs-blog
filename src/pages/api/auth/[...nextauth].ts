import NextAuth  from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import * as dotenv from 'dotenv'
import jwtDecode from "jwt-decode";
import jwt from 'jsonwebtoken'
dotenv.config()

export const authOptions = {
    providers: [
        CredentialsProvider({
          type: 'credentials',
          credentials: {},
          async authorize(credentials, req) { //login function
            const response = await axios.post(`${process.env.DATABASE_URL}/users/login`, credentials)
            if (!response.data.token) {
              throw new Error('Login failed, check your email or password')
            }
            const user = response.data.user
            // console.log(user);
            return {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              token: response.data.token
            }
          },

        }),
      ],
      pages: {
        signIn: "/auth/SignIn",
      },
      callbacks: {
        async jwt({token, user}: any){ //return from authorize
          return {...user, ...token}
        }
        ,
        async session({ session, token }: any) { //then we can take data from token params
          delete session.user.name
          delete session.user.image
          // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.token
          session.user.id = token.id
          session.user.firstName = token.firstName
          session.user.lastName = token.lastName
          session.user.email = token.email
          console.log(session);
          
          return session
        }
      }
}
export default NextAuth(authOptions)
