"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Employees',
        path: '/employees',
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
    }
]

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-black text-white h-screen  w-full px-4 py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Commutatus</h2>
            </div>
            <nav>
                <ul>
                    {
                        routes.map((route, index) => (
                            <li
                                key={index}
                                className={`mb-4 hover:bg-gray-700 rounded-md ${pathname === route.path ? 'bg-gray-300' : ''
                                    }`}
                            >
                                <Link href={route.path} className="block px-4 py-2">
                                    {route.name}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;