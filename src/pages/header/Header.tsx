import { useState, useEffect, memo, useContext } from "react";
import Link from "next/link";
import { User } from "@/interfaces/user";
import SubmenuHeader from "./SubmenuHeader";
import { useSession, signIn, signOut } from "next-auth/react"


const Header = memo(() => {
  const {data: session} = useSession()
  console.log('session111',session)
  const [userInfo, setUserInfo] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    if(session){
      setUserInfo(session.user as User)
    }
  }, )
  return (
    <header
      id="header"
      className={`z-10 fixed flex flex-row max-w-full h-16 border-slate-200 justify-around items-center inset-x-0 top-0`}
    >
      <div>
        <Link className="font-mono font-extrabold text-2xl" href="/">
          BLOG
        </Link>
      </div>
      <nav>
        <ul className="flex flex-row justify-center items-center">
          {session ? ( //write blog
            <li>
              <Link legacyBehavior href="/writeBlog/WriteBlog" as="/write-blog">
                <a className="mx-4 py-2 secondary-btn">Write a blog</a>
              </Link>
            </li>
          ) : null}
          {session ? null : ( //check if signed in or not
            <li>
              <Link legacyBehavior href="/auth/SignIn" as="/sign-in">
                <a className="font-semibold mx-8 py-2 secondary-btn">Sign In</a>
              </Link>
            </li>
          )}
          {session ? ( //user and relevant stuff
            <li>
              <div className="submenu-title relative inline-block hover:block float-right">
                <a className="px-4 py-2">{`${userInfo.firstName} ${userInfo.lastName}`} &#8595;</a>
                <div>
                  <SubmenuHeader />
                </div>
              </div>
            </li>
          ) : (
            <li>
              <Link legacyBehavior href="/auth/SignUp" as="/sign-up">
                <a className="primary-btn px-4 py-2">Get Started</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
});
export default Header;
