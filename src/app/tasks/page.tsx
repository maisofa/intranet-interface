import { NotificationPopover } from "@/components/notification-popover"
import { Sidebar } from "@/components/sidebar"
import { TaskPaginationCard } from "@/components/task-pagination-card"
import { TasksTable } from "@/components/tasks-table"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"

export default function Tasks() {
    return (
        <div className="">
            <NotificationPopover />
            <div>
                <Sidebar />
                <div className="p-2 ml-72">
                    <div className="mb-10">
                        <p className="text-base mb-2">Minhas Tarefas</p>
                        <p className="text-lg font-semibold">5 tarefas pendentes</p>
                    </div>
                    <TasksTable />
                    <TaskPaginationCard />
                </div>
            </div>
        </div>
    )
}