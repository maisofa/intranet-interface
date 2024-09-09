'use client';

import { CreateTask } from "@/components/create-task";
import { NotificationPopover } from "@/components/notification-popover"
import { Sidebar } from "@/components/sidebar"
import { TaskPaginationCard } from "@/components/task-pagination-card"
import { TasksTable } from "@/components/tasks-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Plus, Search } from "lucide-react"
import { useState } from "react"

export default function Tasks() {
  const [status, setStatus] = useState<string | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleDialogClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <div>
      <NotificationPopover />
      <div>
        <Sidebar />
        <div className="p-2 ml-72">
          <div className="mb-10">
            <p className="text-base mb-2">Minhas Tarefas</p>
            <p className="text-lg font-semibold">5 tarefas pendentes</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={() => setIsSheetOpen(true)}>
              <Plus />
              Adicionar tarefa
            </Button>

            <CreateTask isOpened={isSheetOpen} onClose={handleDialogClose} />

            <Tabs defaultValue="pendentes">
              <TabsList>
                <TabsTrigger value="completas" onClick={() => setStatus("completa")}>
                  Completas
                </TabsTrigger>
                <TabsTrigger value="pendentes" onClick={() => setStatus("pendente")}>
                  Pendentes
                </TabsTrigger>
                <TabsTrigger value="em andamento" onClick={() => setStatus("em andamento")}>
                  Em andamento
                </TabsTrigger>
                <TabsTrigger value="cancelada" onClick={() => setStatus("em andamento")}>
                  Canceladas
                </TabsTrigger>
                <TabsTrigger value="atrasada" onClick={() => setStatus("em andamento")}>
                  Atrasadas
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Search />
              </span>
              <Input
                type="text"
                className="pl-10 border-2 outline-none"
                placeholder="Pesquisar tarefa..."
              />
            </div>
          </div>
          <TasksTable status={status}/>
          <TaskPaginationCard />
        </div>
      </div>
    </div>
  )
}