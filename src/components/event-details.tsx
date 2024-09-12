'use client';

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { DeleteTaskAlert } from "./delete-task-alert";
import { Task } from "./tasks-table";
import { Badge } from "./ui/badge";
import { TableCell, TableRow } from "./ui/table";
import { Button } from "@/components/ui/button";
import { Building2, CalendarDays, CalendarIcon, Check, CircleCheckBig, CircleUserRound, Ellipsis, FileDown, MapPinCheckInside, PanelLeftOpen, Paperclip, Plus, Tag, Trash, Trash2, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Input } from "@/components/ui/input"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"
import { Skeleton } from "./ui/skeleton";
import { Event } from "@/app/events/page";

interface commentsProps {
  id: string,
  avatar: string,
  user: string,
  hour: string,
  comment: string
}[]

export function EventDetails({ event }: { event: Event }) {
  const [comments, setComments] = useState<commentsProps[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(event.title);
  const [priority, setPriority] = useState(event.dataAndHour);
  const [status, setStatus] = useState(event.type);
  const [local, setLocal] = useState(event.local);
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentsLen, setAttachmentsLen] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteComment = (id: string) => {
    const updatedComments = comments.filter(comment => comment.id !== id);
    setComments(updatedComments);
  }

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [comments]);


  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files);
      setAttachments((prevAttachments) => {
        const updatedAttachments = [...prevAttachments, ...newAttachments];
        setAttachmentsLen(updatedAttachments.length);
        return updatedAttachments;
      });
    }
  };

  const handleDeleteAttachment = (index: number) => {
    setAttachments((prevAttachments) => {
      const updatedAttachments = prevAttachments.filter((_, i) => i !== index);
      setAttachmentsLen(updatedAttachments.length);
      return updatedAttachments;
    });
  };

  const handleSave = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setIsEditing(false);

    (e.target as HTMLInputElement).blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSave(e as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
  <>
    <TableRow
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableCell className="font-medium relative" align="left">
        {event.title}
        {isHovered && (
          <div 
            className="flex border p-2 rounded-md absolute top-1 mt-1 right-0 items-center gap-2 hover:bg-gray-100"
            onClick={() => setIsSheetOpen(true)}
          >
            <PanelLeftOpen className="" />
            <p className="text-[12px]">ABRIR</p>
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">
        <p className="rounded-sm">{event.dataAndHour}</p>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="rounded-sm">{event.type}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="bg-green-600 rounded-sm">{event.local}</Badge>
      </TableCell>
    </TableRow>    
  </>
  );
}
