import { NewsCard } from "@/components/news-card";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
    return (
        <div>
            <div className="flex">
                <Sidebar />
                <div className="p-2 w-full">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold">Bem-vindo!</h1>
                        <p className="text-lg">Rodrigo Santos</p>
                    </div>
                    <h1 className="text-xl mb-4">Últimas notícias</h1>
                    <NewsCard />
                </div>
            </div>
        </div>
    )
}