'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { DeleteTaskAlert } from "./delete-task-alert";
import { useRouter } from "next/navigation";
import { TaskDetails } from "./task-details";

export interface Task {
  id: string;
  title: string;
  user: string;
  department: string;
  status: "pendente" | "atrasada" | "completa" | "em andamento" | "cancelada";
  priority: "baixa" | "média" | "alta"; 
  type: string;
  finalDate: string;
}

const tasks: Task[] = [
  {
    id: "123",
    title: "Desenvolvimento produto",
    user: "Rodrigo S.",
    department: "TI",
    status: "pendente",
    priority: "baixa",
    type: "produto",
    finalDate: "10 jul"
  },
  {
    id: "234",
    title: "Criação agendamentos",
    user: "Rodrigo S.",
    department: "TI",
    status: "pendente",
    priority: "baixa",
    type: "produto",
    finalDate: "10 jul"
  }
];

export function TasksTable() {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Tarefa</TableHead>
          <TableHead className="text-center">Responsável</TableHead>
          <TableHead className="text-center">Setor</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Prioridade</TableHead>
          <TableHead className="text-center">Tipo</TableHead>
          <TableHead className="text-center">Prazo tarefa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TaskDetails key={index} task={task} />
        ))}
      </TableBody>
    </Table>
  );
}
