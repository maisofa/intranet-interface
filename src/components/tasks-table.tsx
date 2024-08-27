'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from "./ui/badge"
import { DeleteTaskAlert } from "./delete-task-alert"
import { useRouter } from "next/navigation"
  

export function TasksTable() {
    const router = useRouter();

    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Tarefa</TableHead>
                    <TableHead className="">Responsável</TableHead>
                    <TableHead className="">Setor</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Prioridade</TableHead>
                    <TableHead className="">Tipo</TableHead>
                    <TableHead className="">Prazo tarefa</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="cursor-pointer" onClick={() => router.push("/tasks/1")}>
                    <TableCell className="font-medium">Desenvolvimento produto</TableCell>
                    <TableCell className="font-medium"> 
                        <Badge>Rodrigo Santos</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Badge>Engenharia</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-yellow-600">Pendente</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-red-600">Alta</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge>Qualidade</Badge>
                    </TableCell>
                    <TableCell className="font-medium">10 jul</TableCell>
                    <TableCell className="font-medium">
                        <DeleteTaskAlert />
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">Desenvolvimento produto</TableCell>
                    <TableCell className="font-medium">
                        <Badge>Rodrigo Santos</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Badge>Engenharia</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-green-600">Completa</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-yellow-600">Média</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge>Qualidade</Badge>
                    </TableCell>
                    <TableCell className="font-medium">10 jul</TableCell>
                    <TableCell className="font-medium">
                        <DeleteTaskAlert />
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">Desenvolvimento produto</TableCell>
                    <TableCell className="font-medium">
                        <Badge>Rodrigo Santos</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Badge>Engenharia</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-blue-600">Em andamento</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge  className="bg-red-600">Alta</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge>Qualidade</Badge>
                    </TableCell>
                    <TableCell className="font-medium">10 jul</TableCell>
                    <TableCell className="font-medium">
                        <DeleteTaskAlert />
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">Desenvolvimento produto</TableCell>
                    <TableCell className="font-medium">
                        <Badge>Rodrigo Santos</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Badge>Engenharia</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-red-600">Atrasada</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-green-600">Baixa</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge>Qualidade</Badge>
                    </TableCell>
                    <TableCell className="font-medium">10 jul</TableCell>
                    <TableCell className="font-medium">
                        <DeleteTaskAlert />
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">Desenvolvimento produto</TableCell>
                    <TableCell className="font-medium">
                        <Badge>Rodrigo Santos</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Badge>Engenharia</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-red-600">Atrasada</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-green-600">Baixa</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge>Qualidade</Badge>
                    </TableCell>
                    <TableCell className="font-medium">10 jul</TableCell>
                    <TableCell className="font-medium">
                        <DeleteTaskAlert />
                    </TableCell>
                </TableRow>
                <TableRow className="cursor-pointer">
                    <TableCell className="font-medium">Desenvolvimento produto</TableCell>
                    <TableCell className="font-medium">
                        <Badge>Rodrigo Santos</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                    <Badge>Engenharia</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-red-600">Atrasada</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge className="bg-green-600">Baixa</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        <Badge>Qualidade</Badge>
                    </TableCell>
                    <TableCell className="font-medium">10 jul</TableCell>
                    <TableCell className="font-medium">
                        <DeleteTaskAlert />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}