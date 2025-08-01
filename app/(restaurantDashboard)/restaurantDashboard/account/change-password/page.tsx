"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ChangePasswordForm from "../_components/ChangePasswordForm";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link 
          href="/restaurantDashboard/account" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to account
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">
          Change Password
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your account password
        </p>
      </div>

      <ChangePasswordForm token={session?.data?.user?.access_token} />
    </div>
  );
};

export default Page;
