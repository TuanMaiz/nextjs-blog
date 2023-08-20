import { useCallback, useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'
import { Token } from "@/interfaces/token";
import jwtDecode from "jwt-decode";
import {signIn } from "next-auth/react"
import Link from "next/link";
import { useSession } from "next-auth/react"

interface LoginForm {
    email: string;
    password: string;
  }
const SignIn = () => {
    const [formData, setFormData] = useState<LoginForm>({email: '', password: ""})
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()
    const {data: session} = useSession()
    useEffect(() => {
      if(session){
        router.push('/')
      }
    },[] )

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      }, [formData]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
          try {
              const res = await signIn('credentials',
               { 
                email: formData.email,
                password: formData.password ,
                redirect: false,
                callbackUrl: 'localhost:3000'
              })
              console.log(res);
              if(res!.ok){ //res.ok always has value either true or false
                //sign in successfully
                // localStorage.setItem('accessToken', JSON.stringify(res.accessToken))
                router.push('/')
              }
              else{
                //sign in not succeed
                setError('Login failed, check email or password');

              }
          } catch (error) {
              setError('Login failed, check email or password');
          }
    }
  return (
    <section id="signin" className="mt-14">
      <div className="mt-40 flex-container flex-col">
        <div className="flex-container flex-col font-bold text-2xl">
          <h3>YOUR ACCOUNT FOR EVERY GREATEST BLOGS</h3>
        </div>
        <div className="w-[80%] sm:w-80">
          <form className="w-full flex-container flex-col mt-4 sm:w-80" onSubmit={handleSubmit} method="POST">
            <p className="text-red-600">{error}</p>
            {/* ========================EMAIL================================ */}

            <div className="w-full flex items-start justify-center flex-col mt-4">
              <label className="font-semibold" htmlFor="email">
                Enter your email:
              </label>
                <input
                className="w-full sm:w-80 px-4 py-2 rounded-xl"
                type="email"
                placeholder="Your email address"
                name="email"
                value={formData.email}
                onChange={e => handleInputChange(e)}
                required
                minLength={0}
                maxLength={255}
              />
              
              {/* {error && <p className="text-red-600">{error}</p>} */}
            </div>
            {/* ========================PASSWORD================================ */}

            <div className="w-full flex items-start justify-center flex-col mt-2">
              <label className="font-semibold" htmlFor="password">
                Enter your password:
              </label>
                <input
                className="w-full sm:w-80 px-4 py-2 rounded-xl"
                type="password"
                placeholder="Your password"
                name="password"
                value={formData.password}
                onChange={e => handleInputChange(e)}
                required
                minLength={6}
                maxLength={255}
              />

              {/* {error && <p className="text-red-600">{error}</p>} */}

            </div>
            <div className="w-full mt-2 ">
              <input type="checkbox" />
              <p className="ml-2 inline-block">Remember me</p>
            </div>
            <button type="submit" className="primary-btn w-full p-4 mt-4 rounded-xl  text-white sm:w-80">
              Login
            </button>
            <br />
            <Link legacyBehavior href="/auth/SignUp" as="/sign-up">
                <a className="hover:underline">Don't have an account? Sign up</a>
              </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
