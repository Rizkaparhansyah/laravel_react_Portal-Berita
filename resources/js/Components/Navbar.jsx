import { Link } from '@inertiajs/inertia-react'
import React from 'react'

const Navbar = ({ user }) => {
    return (
        <>

        <div className="navbar max-w-12xl mx-auto sm:px-6 lg:px-8 bg-slate-50">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Rzx</a>
            </div>
            <div className="flex-none gap-2 ">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered bg-slate-50" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        {!user ?
                            <>
                                <li><Link href={route('login')} as="button">Login</Link></li>
                                <li><Link href={route('register')} as="button">Register</Link></li>
                            </>
                            :
                            <>
                                <li>
                                    <Link href={route('dashboard')} as="button" className="justify-between">
                                        Dashnoard
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link>Settings</Link></li>
                                <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}


export default Navbar
