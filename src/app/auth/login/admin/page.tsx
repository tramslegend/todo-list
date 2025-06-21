"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useCsDispatch } from "@/cs-redux"
import { AdminAuthThunk } from "@/cs-redux/thunks/admin/admin-auth.thunk"
import { PROJECT_NAME } from "@/root.config"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginForm() {
  const dispatch = useCsDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await dispatch(AdminAuthThunk.LoginAdmin({ email, password }));
    console.log(res.payload)
    if (res.payload?.message) {
      toast.success(res.payload?.message);
      router.push('/admin/dashboard');
    } else if (res.payload?.error) {
      toast.error(res.payload?.error);
    }
  }
  return (
    <div className="h-svh grid place-items-center bg-secondary">
      <div className="flex overflow-hidden rounded">
        <div className="max-w-sm w-sm bg-background">
          <div className="w-full p-6 md:p-8">
            <form onSubmit={onLogin} className="">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground"> Login to your {PROJECT_NAME} account </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" placeholder="m@safarwale.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <PasswordInput value={password} onChange={e => setPassword(e.target.value)} id="password" placeholder="* * * * * * * * *" required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </div>
            </form>

            <div className="my-7 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground"> Or continue with </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="w-full" onClick={() => { }}></Button>
              <Button variant="outline" className="w-full" onClick={() => { }}></Button>
              <Button variant="outline" className="w-full" onClick={() => { }}></Button>
            </div>
          </div >
        </div >
      </div >
    </div >
  )
}
