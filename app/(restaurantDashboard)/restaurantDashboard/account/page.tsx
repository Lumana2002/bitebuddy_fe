"use client";

import { useSession } from "next-auth/react";
import UserForm from "./_components/UserForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const Page = () => {
  const session = useSession();
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {session?.data?.user?.firstName}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account information and settings
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Account Details</h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your account information
          </p>
        </div>
        
        <div className="p-6">
          <UserForm
            id={session?.data?.user?.id || 0}
            token={session?.data?.user?.access_token || ""}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-100">
            <Link href="/restaurantDashboard/account/change-password">
              <Button variant="outline" className="flex items-center gap-2">
                Change Password
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
