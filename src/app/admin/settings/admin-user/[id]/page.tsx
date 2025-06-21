import React from 'react'
import AdminUserProfileView from './AdminUserProfileView';


interface PageProps {
    params: {
        id: string;
    };
}

export default async function Page() {


    return (
        <div>
            <AdminUserProfileView />
        </div>
    );
}
