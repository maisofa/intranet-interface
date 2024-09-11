import { EventsCard } from "@/components/events-card";
import { Menu } from "@/components/menu";
import { NewsCard } from "@/components/news-card";
import { NotificationPopover } from "@/components/notification-popover";
import { Sidebar } from "@/components/sidebar";
import { TasksTable } from "@/components/tasks-table";

export default function Home() {
    return (
        <div>
            <NotificationPopover />
            <div>
                <Sidebar />
                <div className="ml-72">
                    <div className="mb-10">
                        <p className="text-base mb-2">Bem-vindo!</p>
                        <p className="text-lg font-semibold">Rodrigo Santos</p>
                    </div>
                    <Menu />
                    <h2 className="text-xl mb-6">Últimas notícias</h2>
                    <NewsCard />
                    <h2 className="text-xl mb-4 mt-6">Próximos eventos</h2>
                    <EventsCard />
                    <h2 className="text-xl mb-4 mt-6">Tarefas pendentes</h2>
                    <TasksTable status={"pendente"} />
                    <br />
                    <br /><br />
                </div>
            </div>
        </div>
    )
}