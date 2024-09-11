import { NewsCardDialog } from "./news-card-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export function NewsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Novidade!</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex">
                    <Image
                        src="/PARASEMPRE.webp"
                        alt="News"
                        className="w-[350px] h-[200px] rounded-lg"
                        width={350}
                        height={200}
                    />
                    <div className="p-4">
                        <h3 className="text-2xl font-semibold mb-4">Anunciando nosso última lançamento</h3>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna eget nunc varius lacinia.</p>
                    </div>
                </div>
                <NewsCardDialog />
            </CardContent>
        </Card>
    )
}