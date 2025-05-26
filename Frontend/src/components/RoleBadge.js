import React from 'react';
import { Chip } from '@mui/material';
import { FaUserShield, FaUser, FaUserTie } from "react-icons/fa";

const RoleBadge = ({ role }) => {
    const getRoleConfig = () => {
        switch(role) {
            case 'ADMIN':
                return {
                    color: 'error',
                    icon: <FaUserShield size={14} className="mr-1" />,
                    label: 'Admin'
                };
            case 'USER':
                return {
                    color: 'primary',
                    icon: <FaUser size={14} className="mr-1" />,
                    label: 'User'
                };
            default:
                return {
                    color: 'default',
                    icon: <FaUserTie size={14} className="mr-1" />,
                    label: role
                };
        }
    };

    const config = getRoleConfig();

    return (
        <Chip
            size="small"
            icon={config.icon}
            label={config.label}
            color={config.color}
            variant="outlined"
            sx={{
                borderRadius: '6px',
                fontWeight: 500
            }}
        />
    );
};

export default RoleBadge;