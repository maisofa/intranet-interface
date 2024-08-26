import { EventsCard } from "@/components/events-card";
import { Menu } from "@/components/menu";
import { NewsCard } from "@/components/news-card";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
    return (
        <div>
            <div className="flex">
                <Sidebar />
                <div className="p-2 w-full">
                    <div className="mb-10">
                        <p className="text-base mb-2">Bem-vindo!</p>
                        <p className="text-lg font-semibold">Rodrigo Santos</p>
                    </div>
                    <h2 className="text-xl mb-4">Últimas notícias</h2>
                    <Menu />
                    <NewsCard />
                    <h2 className="text-xl mb-4 mt-4">Próximos eventos</h2>
                    <EventsCard />
                </div>
            </div>
        </div>
    )
}