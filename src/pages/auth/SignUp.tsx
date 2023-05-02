import { useCallback, useEffect, useState, useContext } from "react";
import { EMAIL_REGEX, PASSWORD_REGEX, NAME_REGEX } from "@/utils/regex";
import { userSignUp } from "../api/signUp";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router'

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorValidate {
  nameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
}
const SignUp = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<ErrorValidate>({
    nameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    },
    [formData]
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isErrorExist = Object.values(error).some((v) => v !== "");
    if (isErrorExist) {
      //if there is error, don't permit user submit
      return;
    }
    //maybe: do reveal password button
    //when everything is fine, submit the form to api
    try {
      const {confirmPassword,...signUpData} = formData
      const res = await userSignUp({...signUpData})
      console.log(res)
      if(res.status === 201)
      {
        toast('Your account was created successfully', { hideProgressBar: true, autoClose: 2000, type: 'success' })
        setTimeout( async () => {
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
        }, 2500)

      }
    } catch (err: any) {
      if(err.response.status === 401)
        toast('User already exist', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }

    return;
  };
  useEffect(() => {
    setError((prevState) => ({
      ...prevState,
      nameError:
        (formData.firstName && !NAME_REGEX.test(formData.firstName)) || (formData.lastName && !NAME_REGEX.test(formData.lastName)) 

          ? "Your name should contains only alphabets and below 30 characters"
          : "",
      emailError:
        formData.email && !EMAIL_REGEX.test(formData.email)
          ? "Invalid email"
          : "",
      passwordError:
        formData.password && !PASSWORD_REGEX.test(formData.password)
          ? "Invalid password"
          : "",
      confirmPasswordError:
        formData.password !== formData.confirmPassword
          ? "Password and Confirm password must be the same"
          : "",
    }));
  }, [formData.firstName, formData.lastName, formData.email, formData.password, formData.confirmPassword]);
  return (
    <div>
      <div className="mt-40 flex-container flex-col">
        <div className="flex-container flex-col font-bold text-2xl">
          <h3>SIGN UP YOUR ACCOUNT FOR EVERY GREATEST BLOGS</h3>
        </div>
        <div className="w-[80%] sm:w-80">
          <form
            className="w-full flex-container flex-col mt-4 sm:w-80"
            onSubmit={handleSubmit}
            autoComplete="off"
            method="POST"
          >
            {/* ========================FIRST NAME AND LAST NAME================================ */}
            <div className="w-full flex items-start justify-center flex-col mt-4">
              <label className="font-semibold" htmlFor="email">
                Enter your name:
              </label>
              <div className="w-full flex justify-between items-center">
                <input
                  className="w-[49%] border-slate-400 px-4 py-2 rounded-xl"
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  required
                  minLength={0}
                  maxLength={30}
                />
                <input
                  className="w-[49%] border-slate-400  px-4 py-2 rounded-xl"
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                  required
                  minLength={0}
                  maxLength={30}
                />
              </div>

              {error?.nameError && (
                <p className="text-red-600">{error.nameError}</p>
              )}
            </div>
            {/* ========================EMAIL================================ */}
            <div className="w-full flex items-start justify-center flex-col mt-4">
              <label className="font-semibold" htmlFor="email">
                Enter your email:
              </label>
              <input
                className="w-full border-slate-400 sm:w-80 px-4 py-2 rounded-xl"
                type="email"
                placeholder="Your email address"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                required
                minLength={8}
                maxLength={255}
              />

              {error?.emailError && (
                <p className="text-red-600">{error.emailError}</p>
              )}
            </div>
            {/* ========================PASSWORD================================ */}
            <div className="w-full flex items-start justify-center flex-col mt-2">
              <label className="font-semibold" htmlFor="password">
                Enter your password:
              </label>
              <input
                className="w-full border-slate-400 sm:w-80 px-4 py-2 rounded-xl"
                type="password"
                placeholder="Your password"
                name="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
                required
                minLength={8}
                maxLength={255}
              />
              {error?.passwordError && (
                <p className="text-red-600">{error.passwordError}</p>
              )}
            </div>
            {/* =========================CONFIRM PASSWORD======================== */}
            <div className="w-full flex items-start justify-center flex-col mt-2">
              <label className="font-semibold" htmlFor="password">
                Confirm your password:
              </label>
              <input
                className="w-full border-slate-400 sm:w-80 px-4 py-2 rounded-xl"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange(e)}
                required
                minLength={8}
                maxLength={255}
              />
              {error?.confirmPasswordError && (
                <p className="text-red-600">{error.confirmPasswordError}</p>
              )}
            </div>
            {/* ============================================================ */}
            <button
              type="submit"
              className="account__button w-full p-4 mt-4 rounded-xl primary-btn text-white sm:w-80"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
