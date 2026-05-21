import { loginAdmin } from "@/actions/auth";

export const metadata = {
  title: "Admin Login",
};

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Mission 2 Markets
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold">Admin sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in with your Supabase admin account.
        </p>
        {params.error === "invalid" && (
          <p className="mt-4 text-sm text-red-400" role="alert">
            Invalid email or password. Try again.
          </p>
        )}
        <form action={loginAdmin} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2.5 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:opacity-90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
