"use client";
import React, { useEffect, useState } from 'react';
import LoginForm from '../_components/LoginForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (session) {
      router.push('/dashboard');
    } else {
      setLoading(false);
    }
  }, [status, session, router]);

  if (loading) {
    return (
      <span className='text-blue-400'>
        <Loading />
      </span>
    );
  }

  return (
    <section className='w-full flex items-center justify-center mt-20'>
      <LoginForm />
    </section>
  );
};

export default Page;
