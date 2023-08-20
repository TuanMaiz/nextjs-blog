import Link from 'next/link';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import { User } from '@/interfaces/user';
const SubmenuHeader = ({id, firstName, lastName, email}: User) => {
    const hanldeLogout = () => {
        signOut()
    }
    return (
        <ul className='submenu bg-white right-0 mt-2 w-40 hidden absolute z-10 text-center'>
          <li>
            <Link href={`/userInfo/${id}`}>
              <p className='py-2 text-sm font-semibold text-slate-600 hover:text-black'>Edit your infomation</p>
            </Link>
          </li>
          <li>
            <Link href="/submenu-page-2">
              <p className='py-2 text-sm font-semibold text-slate-600 hover:text-black'>Posts</p>
            </Link>
          </li>
          <li>
            <p onClick={hanldeLogout} className=' py-2 text-sm font-semibold text-slate-600 hover:text-black cursor-pointer'>Log out</p>
          </li>
        </ul>
      );
}

export default SubmenuHeader;