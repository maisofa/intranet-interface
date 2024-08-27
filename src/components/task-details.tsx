'use client';

import { useState } from "react";
import { DeleteTaskAlert } from "./delete-task-alert";
import { Task } from "./tasks-table";
import { Badge } from "./ui/badge";
import { TableCell, TableRow } from "./ui/table";
import { Dialog } from "./ui/dialog";
import { TaskDetailsModal } from "./task-details-modal";
import { useRouter } from "next/navigation";

export function TaskDetails({ task }: { task: Task }) {
  const router = useRouter()

  return (
    <TableRow className="cursor-pointer" onClick={() => router.push(`/tasks/${task.id}`)}>
      <TableCell className="font-medium">{task.title}</TableCell>
      <TableCell className="font-medium">
        <Badge>{task.user}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge>{task.department}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="bg-green-600">{task.status}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="bg-yellow-600">{task.priority}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge>{task.type}</Badge>
      </TableCell>
      <TableCell className="font-medium">{task.finalDate}</TableCell>
      <TableCell className="font-medium">
        <DeleteTaskAlert />
      </TableCell>
    </TableRow>
  );
}