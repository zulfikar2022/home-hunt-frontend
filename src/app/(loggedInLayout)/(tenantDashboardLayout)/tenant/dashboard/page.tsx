import { AppSidebar } from "@/components/app-sidebar";
import ChangePassword from "@/components/changePassword/ChangePassword";
import AllRentalRequests from "@/components/dashboards/tenant/allRentalRequests/AllRentalRequests";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function TenantDashboardPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {(await searchParams)?.value === "rental-requests" && (
              <div>
                <AllRentalRequests />
              </div>
            )}
            {(await searchParams)?.value === "change-password" && (
              <div>
                <ChangePassword />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
