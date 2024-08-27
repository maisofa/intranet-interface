import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Bell } from "lucide-react"
import { Badge } from "./ui/badge"

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
            <div className="cursor-pointer">
                <div className="fixed top-6 right-6" >
                    <Bell size={30} />
                </div>
                <div className="fixed top-4 right-6">
                    <Badge className="w-2 flex justify-center items-center">5</Badge>
                </div>
            </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 ml-[1200px] mt-14">
        <div className="grid gap-4">
          <div className="space-y-2 cursor-pointer">
            <h4 className="font-medium leading-none">Aceite de tarefa</h4>
            <p className="text-sm text-muted-foreground">
              Rodrigo aceitou sua solicitação de tarefa
            </p>
            <a href="">Clique para ver</a>
          </div>
          <hr />
          <div className="space-y-2  cursor-pointer">
            <h4 className="font-medium leading-none">Nova solicitação de tarefa</h4>
            <p className="text-sm text-muted-foreground">
              Antonio solicitou uma nova tarefa
            </p>
            <a href="">Clique para ver</a>
          </div>
          <hr />
          <div className="space-y-2  cursor-pointer">
            <h4 className="font-medium leading-none">Nova solicitação de tarefa</h4>
            <p className="text-sm text-muted-foreground">
              Antonio solicitou uma nova tarefa
            </p>
            <a href="">Clique para ver</a>
          </div>
          <hr />
          <div className="space-y-2  cursor-pointer">
            <h4 className="font-medium leading-none">Nova solicitação de tarefa</h4>
            <p className="text-sm text-muted-foreground">
              Antonio solicitou uma nova tarefa
            </p>
            <a 
              href=""
              className="decoration-underline border-b border-black"
            >Clique para ver</a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
