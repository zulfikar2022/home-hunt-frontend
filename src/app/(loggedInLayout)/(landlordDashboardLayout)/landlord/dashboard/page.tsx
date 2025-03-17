import { AppSidebar } from "@/components/app-sidebar";
import ChangePassword from "@/components/changePassword/ChangePassword";
import CreateRental from "@/components/dashboards/landlord/createRental/CreateRental";
import MyRentals from "@/components/dashboards/landlord/myRentlas/MyRentals";
import RentalRequests from "@/components/dashboards/landlord/rentalRequests/RentalRequests";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function LandlordDashboardPage({
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
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3"></div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            {(await searchParams)?.value === "my-rentals" && (
              <div>
                <MyRentals />
              </div>
            )}
            {(await searchParams)?.value === "add-rental" && (
              <div>
                <CreateRental />
              </div>
            )}
            {(await searchParams)?.value === "rental-requests" && (
              <div>
                <RentalRequests />
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
