import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export function EventsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Reunião Comercial</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-8">
                    <div>
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
                    <Button variant="outline">Ver</Button>
                </div>
            </CardContent>
        </Card>
    )
}