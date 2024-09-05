import { PanelLeftOpen } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function HoverCardTask() {
  return (
  <HoverCard>
    <HoverCardTrigger>
      <div className="flex border p-2 rounded-md absolute top-1 mt-1 right-0 items-center gap-2 hover:bg-gray-100">
        <PanelLeftOpen className="" />
        <p className="text-[12px]">ABRIR</p>
      </div>
    </HoverCardTrigger>
    <HoverCardContent className="bg-gray-900 text-white w-30 ml-72 mt-4">
      Abrir ao lado
    </HoverCardContent>
  </HoverCard>
  )
}