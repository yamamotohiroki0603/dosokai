"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { getRegistration } from "@/lib/session";

type Guard = "email" | "verified";

export function FlowGuard({
  require,
  children,
}: {
  require: Guard;
  children: ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const registration = getRegistration();
    if (!registration.email) {
      router.replace("/register");
      return;
    }
    if (require === "verified" && !registration.verified) {
      router.replace("/verify");
      return;
    }
    setReady(true);
  }, [require, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-ink/50">
        読み込み中…
      </div>
    );
  }

  return children;
}
