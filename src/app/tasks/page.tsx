import { NotificationPopover } from "@/components/notification-popover"
import { Sidebar } from "@/components/sidebar"
import { TasksTable } from "@/components/tasks-table"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

export default function Tasks() {
    return (
        <div>
            <NotificationPopover />
            <div className="flex">
                <Sidebar />
                <div className="p-2 w-full">
                    <div className="mb-10">
                        <p className="text-base mb-2">Minhas Tarefas</p>
                        <p className="text-lg font-semibold">5 tarefas pendentes</p>
                    </div>
                    <TasksTable />
                </div>
            </div>
        </div>
    )
}