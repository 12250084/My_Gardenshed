import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit, MdSearch, MdRefresh } from "react-icons/md";
import { FaUserShield, FaUser, FaUserTie } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';
import { Pagination, TextField, Chip, Skeleton } from '@mui/material';
import RoleBadge from '../components/RoleBadge';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    const fetchAllUsers = async() => {
        setLoading(true);
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if(dataResponse.success) {
                setAllUsers(dataResponse.data);
                setFilteredUsers(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error("Failed to fetch users");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        const filtered = allUser.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
        setCurrentPage(1); // Reset to first page when search changes
    }, [searchQuery, allUser]);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const getRoleIcon = (role) => {
        switch(role) {
            case 'ADMIN': return <FaUserShield className="mr-1" />;
            case 'USER': return <FaUser className="mr-1" />;
            default: return <FaUserTie className="mr-1" />;
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                <h2 className='text-2xl font-bold text-gray-800'>User Management</h2>

                <div className='flex items-center gap-4 w-full md:w-auto'>
                    <div className='relative flex-grow md:w-64'>
                        <MdSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    pl: 4,
                                    borderRadius: '8px',
                                }
                            }}
                        />
                    </div>

                    <button
                        onClick={fetchAllUsers}
                        className='bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded-lg flex items-center gap-1 transition-colors'
                    >
                        <MdRefresh />
                        <span className='hidden md:inline'>Refresh</span>
                    </button>
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full min-w-max'>
                    <thead>
                    <tr className='bg-gray-100 text-gray-700'>
                        <th className='py-3 px-4 text-left rounded-l-lg'>Sr.</th>
                        <th className='py-3 px-4 text-left'>Name</th>
                        <th className='py-3 px-4 text-left'>Email</th>
                        <th className='py-3 px-4 text-left'>Role</th>
                        <th className='py-3 px-4 text-left'>Joined</th>
                        <th className='py-3 px-4 text-right rounded-r-lg'>Actions</th>
                    </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                <td className='py-4 px-4'><Skeleton variant="text" /></td>
                                <td className='py-4 px-4'><Skeleton variant="text" /></td>
                                <td className='py-4 px-4'><Skeleton variant="text" /></td>
                                <td className='py-4 px-4'><Skeleton variant="text" /></td>
                                <td className='py-4 px-4'><Skeleton variant="text" /></td>
                                <td className='py-4 px-4 text-right'><Skeleton variant="circular" width={32} height={32} /></td>
                            </tr>
                        ))
                    ) : currentUsers.length > 0 ? (
                        currentUsers.map((el, index) => (
                            <tr key={el._id} className='hover:bg-gray-50'>
                                <td className='py-4 px-4'>{indexOfFirstUser + index + 1}</td>
                                <td className='py-4 px-4 font-medium'>{el?.name}</td>
                                <td className='py-4 px-4 text-gray-600'>{el?.email}</td>
                                <td className='py-4 px-4'>
                                    <RoleBadge role={el?.role} />
                                </td>
                                <td className='py-4 px-4 text-gray-500'>
                                    {moment(el?.createdAt).format('MMM D, YYYY')}
                                </td>
                                <td className='py-4 px-4 text-right'>
                                    <button
                                        className='bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition-colors'
                                        onClick={() => {
                                            setUpdateUserDetails(el);
                                            setOpenUpdateRole(true);
                                        }}
                                        aria-label={`Edit ${el.name}'s role`}
                                    >
                                        <MdModeEdit size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className='py-8 text-center text-gray-500'>
                                No users found {searchQuery && `matching "${searchQuery}"`}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length > usersPerPage && (
                <div className='flex justify-center mt-6'>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </div>
            )}

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;