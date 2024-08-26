import { Bell, Calendar, List, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

export function Menu() {
    return (
        <Card className="mb-4 p-2">
            <CardContent>
                <div className="flex gap-96">
                    <div  className="flex flex-col items-center">
                        <Calendar size={30}/>
                        <p>Eventos</p>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <a href="" className="text-orange-500">Ir</a>
                            <ArrowRight size={15}  className="text-orange-500"/>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <List size={30}/>
                        <p>Tarefas</p>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <a href="" className="text-orange-500">Ir</a>
                            <ArrowRight size={15}  className="text-orange-500"/>
                        </div>
                    </div>
                    <div  className="flex flex-col items-center">
                        <Bell size={30}/>
                        <p>Notificações</p>
                        <div className="flex gap-2 items-center cursor-pointer">
                            <a href="" className="text-orange-500">Ir</a>
                            <ArrowRight size={15}  className="text-orange-500"/>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}