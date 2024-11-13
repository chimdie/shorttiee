import { Outlet } from "react-router-dom";

export default function DashboardLayout(): JSX.Element {
  return (
    <div className="bg-white">
      <div className="flex h-screen overflow-hidden">
        <div>Sidebar component here</div>

        <div className="relative  flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main>
            <div className="mx-auto md:mx-2 max-w-screen-2xl p-4 md:p-2 2xl:p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
