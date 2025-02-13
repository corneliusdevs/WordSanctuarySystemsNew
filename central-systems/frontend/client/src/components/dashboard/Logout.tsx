"use client";

import { navigate } from "@/app/actions";
import { useProfileStore } from "@/providers/ProfileStoreProvider";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export const Logout = () => {
  const { setLogInStatus, clearProfileData } = useProfileStore(
    (state) => state
  );

  const logout = async () => {
    try {
      const central_systems_base_api =
        process.env.NEXT_PUBLIC_CENTRAL_SYSTEMS_BASE_API;

      const logoutResponse = await fetch(
        `${central_systems_base_api}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include", // This ensures the cookie is sent along with the request
        }
      );

      const data = await logoutResponse.json();

      if (data.success) {
        setLogInStatus(false);
        clearProfileData();
        navigate("/auth/login"); // Replace with your desired redirect
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    logout();
  });

  return (
    <div className="flex justify-center flex-col items-center w-full h-[100vh] bg-primarycol/60 text-white">
      <Loader2 className="w-[5] h-[5] animate-spin duration-500 text-white mt-6" />
      Logging out...
    </div>
  );
};
