'use client';
import { useEffect, useState } from "react";
import { TaskDetails } from "./task-details";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Event } from "@/app/events/page";
import { EventDetails } from "./event-details";

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

export function EventsTable({ statusTask, events}: { statusTask: string | null, events: Event[] }) {  
  const [filteredTasks, setFilteredTasks] = useState<Event[]>([]);

  useEffect(() => {
    setFilteredTasks(events)
  }, [events]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
        <TableHead>Título</TableHead>
          <TableHead>Data e hora</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Local</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          filteredTasks.length > 0 ? (
            filteredTasks.map((event, index) => (
              <EventDetails key={index} event={event} />
            ))
          ) : 
          (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <p>Nenhuma tarefa <span className="underline">{statusTask}</span> encontrada</p>
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  );
}
