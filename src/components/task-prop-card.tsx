import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Flag, Target, User } from "lucide-react"
import { Badge } from "./ui/badge"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TaskPropCard() {
  return (
    <Card className="w-[350px]">
      <CardContent>
        <div className="grid grid-cols-2 gap-x-20 text-gray-500">
          <div className="flex gap-2 items-center">
            <Target size={15} />
            <div className="flex items-center gap-4">
              <p>Status</p>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder={"Aceita"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Em andamento</SelectItem>
                    <SelectItem value="banana">Pendente</SelectItem>
                    <SelectItem value="blueberry">Aceita</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar size={15} /> 
            <p>Data</p>
          </div>
          <div className="flex gap-2 items-center">
            <User />
            <p>Responsável</p>
          </div>
          <div className="flex gap-2 items-center">
            <Flag size={15}  />
            <p>Prioridade</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}