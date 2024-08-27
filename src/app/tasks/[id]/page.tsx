import { NotificationPopover } from "@/components/notification-popover";
import { Sidebar } from "@/components/sidebar";
import { TaskPropCard } from "@/components/task-prop-card";

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
            <TaskPropCard />
        </div>
      </div>
  </div>
  )
}