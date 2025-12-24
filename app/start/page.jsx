"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function StartPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Button
        className="text-2xl px-12 py-8 rounded-2xl"
        onClick={() => router.push("/login")}
      >
        Start Here
      </Button>
    </div>
  );
}
