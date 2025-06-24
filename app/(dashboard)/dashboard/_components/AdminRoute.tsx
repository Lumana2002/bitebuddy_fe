"use client"; // Mark this component as a client component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

const AdminRoute = ({ children }: any) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user.role !== 'ADMIN') {

            router.push('/');
        }
    }, [status]);

    if (status === 'loading') {
        return <span className='text-blue-400'><Loading /></span>;
    }
    if (!session || session.user.role !== 'ADMIN') {
        return null; 
    }

    return <>{children}</>;
};

export default AdminRoute;
