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
            <div>
                <div className="fixed top-4 right-6 cursor-pointer" >
                    <Bell size={30} />
                </div>
                <div className="fixed top-2 right-6">
                    <Badge className="w-2 flex justify-center items-center">5</Badge>
                </div>
            </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 top-0 right-0">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">

            </div>
            <div className="grid grid-cols-3 items-center gap-4">

            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
