import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export function EventsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Reunião Comercial</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-8">
                    <div className="p-4">
                        <p>Data</p>
                        <p>05/09/2024 13:00 horas</p>
                    </div>
                    <div>
                        <p>Local</p>
                        <p>Sala de reuniões</p>
                    </div>
                    <div>
                        <p>Tipo</p>
                        <Badge>Novos produtos</Badge>
                    </div>
                    <button className="bg-orange-400 text-white px-2 py-1 mt-2 rounded-md text-base hover:bg-orange-300">Ver</button>
                </div>
            </CardContent>
        </Card>
    )
}