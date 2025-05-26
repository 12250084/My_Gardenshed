import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUsers, FaBoxOpen, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdDashboard, MdInventory } from 'react-icons/md';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { motion } from 'framer-motion';
import {FaRegCircleUser} from "react-icons/fa6";

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
        // Set active link based on current route
        setActiveLink(window.location.pathname.split('/').pop());
    }, [user, navigate]);

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...");
        navigate("/login");
    };

    const navItems = [
        // { path: "dashboard", label: "Dashboard", icon: <MdDashboard className="mr-3" /> },
        { path: "all-users", label: "Users", icon: <FaUsers className="mr-3" /> },
        { path: "all-products", label: "Products", icon: <FaBoxOpen className="mr-3" /> },
        { path: "orders", label: "Orders", icon: <FaBoxOpen className="mr-3" /> },
        // { path: "settings", label: "Settings", icon: <FaCog className="mr-3" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                <div className="w-6"></div> {/* Spacer for alignment */}
            </div>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isMobileMenuOpen || window.innerWidth >= 768 ? 0 : -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`bg-white shadow-lg w-64 fixed md:relative h-[calc(100vh-120px)] z-10 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}
            >
                <div className="p-6 flex flex-col items-center border-b border-gray-200">
                    <div className="relative">
                        {user?.profilePic ? (
                            <img
                                src={user?.profilePic}
                                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                                alt={user?.name}
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <FaRegCircleUser className="text-4xl text-blue-500" />
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-gray-800 capitalize">{user?.name}</h2>
                    <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-1">
                        {user?.role}
                    </span>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={() => {
                                        setActiveLink(item.path);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                                        activeLink === item.path
                                            ? 'bg-blue-50 text-blue-600 font-medium'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt className="mr-3" />
                        Logout
                    </button>
                </div>
            </motion.aside>

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto max-h-screen md:ml-64">
                <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-120px)]">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;