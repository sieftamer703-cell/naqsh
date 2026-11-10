"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-5">
      <div className="pattern-gold absolute inset-0 opacity-[0.07]" />
      <form
        action={action}
        className="relative w-full max-w-sm rounded-3xl border border-gold/30 bg-cream p-8 shadow-2xl"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-xl font-bold">لوحة التحكم</h1>
        <label className="mt-6 block text-sm font-semibold">كلمة المرور</label>
        <input
          name="password"
          type="password"
          required
          autoFocus
          className="field mt-2"
          dir="ltr"
        />
        {state?.error && <p className="mt-3 text-sm font-semibold text-red-600">{state.error}</p>}
        <button type="submit" disabled={pending} className="btn btn-dark mt-6 w-full">
          {pending ? "جارٍ الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </div>
  );
}
