"use client";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

const RequireAuth = ({ children }) => {
  const { auth } = useAuthContext();
  const router = useRouter();
  // const searchParams = useSearchParams();

  return auth?.user ? children : router.push("/login");
};

export default RequireAuth;
