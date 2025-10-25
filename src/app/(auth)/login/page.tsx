// app/(auth)/login/page.tsx
import { Suspense } from "react";
import LoginClient from "./loginClient";

export const dynamic = "force-dynamic"; // логин зависит от куки/сессии

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Загрузка…</div>}>
      <LoginClient />
    </Suspense>
  );
}
