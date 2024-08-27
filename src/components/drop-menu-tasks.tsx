import {
    Delete,
    Edit,
    MoreHorizontal,
  } from "lucide-react"
   
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { DeleteTaskAlert } from "./delete-task-alert"

export function DropMenuTasks() {
    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal 
                size={20} 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Delete className="mr-2 h-4 w-4" />
                <DeleteTaskAlert />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
}