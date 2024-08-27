import { NotificationPopover } from "@/components/notification-popover";
import { Sidebar } from "@/components/sidebar";

export default function TaskDetails() {
  return (
    <div>
      <NotificationPopover />
      <div className="flex">
        <Sidebar />
        <div className="mt-4 ml-72">
            <div className="mb-10">
                <p className="text-base mb-2">Desenvolvimento de produto</p>
            </div>
            <h2 className="text-xl mb-4">Últimas notícias</h2>
        </div>
      </div>
  </div>
  )
}