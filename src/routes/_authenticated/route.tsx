import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const ADMIN_EMAIL = "grvnth.design@gmail.com";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || data.user?.email?.toLowerCase() !== ADMIN_EMAIL) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: () => <Outlet />,
});