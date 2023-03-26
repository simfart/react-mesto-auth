import React from 'react';
import { Navigate } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
function ProtectedRoute({ isloggedIn, element }) {
    return (
        isloggedIn ? element : <Navigate to="/singin" replace />
    );
}

export default ProtectedRoute; 