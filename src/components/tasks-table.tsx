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
import { useEffect, useState } from "react";

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
    user: "Pedro L.",
    department: "Engenharia",
    status: "pendente",
    priority: "baixa",
    type: "produto",
    finalDate: "10 jul"
  }
];

export function TasksTable({ status }: { status: string | null }) {  
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const handleTaskStatus = () => {
    if (status) {
      return tasks.filter((task) => task.status === status);
    }
    return tasks;
  };

  useEffect(() => {
    setFilteredTasks(handleTaskStatus());
  }, [status]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
        <TableHead>Tarefa</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Setor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Prioridade</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Prazo tarefa</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskDetails key={index} task={task} />
            ))
          ) : 
          (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <p>Nenhuma tarefa <span className="underline">{status}</span> encontrada</p>
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}
