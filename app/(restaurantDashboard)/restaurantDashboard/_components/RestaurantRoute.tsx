"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Loading from '@/components/Loading';

const RestaurantRoute = ({ children }: any) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session || session.user.role !== 'RESTAURANT') {
            router.push('/');
        }
    }, [status]);

    if (status === 'loading') {
        return <span className='text-blue-400'><Loading /></span>;
    }
    if (!session || session.user.role !== 'RESTAURANT') {
        return null;
    }

    return <>{children}</>;
};

export default RestaurantRoute;
