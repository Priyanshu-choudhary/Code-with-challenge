import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import React, { useContext } from 'react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "/Mlogo.jpg";
import award from "/award.png";
import { UserContext } from '../Context/UserContext';
import "./css.css"
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';




// Dummy user data
const myuser = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

// Navigation items
const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Learn', href: '/learn', current: false },
    { name: 'Editor', href: '/EditorComponent', current: false },
    { name: 'Problems', href: '/data', current: false },
    { name: 'Upload', href: '/Upload', current: false },

]

// User menu items
const userNavigation = [
    { name: 'Your Profile', href: '/yourProfile' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '/logout' },

]

// Utility function to combine class names
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Dashboard() {
    const navigate = useNavigate();
    console.log("Dashboard rerender");
    const { user } = useContext(UserContext);
    let toggle = user;
    const handleClick = () => {
  
        navigate('/leaderboard');
        console.log("clicked!");
        
    };
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src={logo}
                                                alt="Your name"
                                            />
                                            <p style={{ color: "white" }}>CFC </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}

                                                    </a>

                                                ))}

                                            </div>

                                        </div>


                                    </div>


                                    <div className="hidden md:block">

                                        <div className="ml-4 flex items-center md:ml-6">

                                            <img style={{height:"30px", marginRight:"10px"}}src={award} alt="leaderboard"onClick={() => handleClick()} />

                                            <button
                                                type="button"
                                                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >

                                                <span className="sr-only">View notifications</span>

                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                            {user ? <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>

                                                        <Avatar style={{ fontSize: "18px" }} sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}>{user[0]}</Avatar>

                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <a
                                                                        href={item.href}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu> : <button className="button-85" role="button">
                                                <a href="/login">LogIn</a>
                                            </button>}


                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                       { user?<></>:<button style={{marginRight:"30px"}} className="button-85" role="button">
                                                <a href="/login">LogIn</a>
                                               
                                            </button>}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        

                                      {user?   <Avatar style={{ fontSize: "18px" }} sx={{ marginRight:"100px",bgcolor: deepPurple[500], width: 40, height: 40 }}>{user[0]}</Avatar>
:<></>}
                                        <img  style={{height:"30px", marginRight:"10px"}}src={award} alt="leaderboard"onClick={handleClick} />



                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <main className="editorsection" >




                </main>
            </div>
        </>
    )
}
export default React.memo(Dashboard)
