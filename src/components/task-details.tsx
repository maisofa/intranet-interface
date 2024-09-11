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

interface commentsProps {
  id: string,
  avatar: string,
  user: string,
  hour: string,
  comment: string
}[]

export function TaskDetails({ task }: { task: Task }) {
  const [comments, setComments] = useState<commentsProps[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentsLen, setAttachmentsLen] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: (comments.length + 1).toString(),
      avatar: "https://github.com/shadcn.png",
      user: task.user,
      hour: "Agora",
      comment: newComment
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
  };

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
        {task.title}
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
        <Badge className="rounded-sm">{task.user}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="rounded-sm">{task.department}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="bg-green-600 rounded-sm">{task.status}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="bg-yellow-600 rounded-sm">{task.priority}</Badge>
      </TableCell>
      <TableCell className="font-medium">
        <Badge className="rounded-sm">{task.type}</Badge>
      </TableCell>
      <TableCell className="font-medium">{task.finalDate}</TableCell>
    </TableRow>    

    <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <DialogContent className="sm:max-w-[900px] text-sm focus:outline-none p-0 flex flex-col">
      <ScrollArea className="flex-grow min-h-[80vh] max-h-[80vh] overflow-y-auto p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis 
              className="fixed top-3 right-12 cursor-pointer hover:bg-slate-200 rounded-md" 
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="bottom" align="end">
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem 
                value="left"
              >
                Excluir
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogHeader className="px-2 mb-2 mt-6">
          <DialogTitle>
            {
              isEditing ? (
                <Input
                  className=" w-[50%] p-2 h-10 border-none text-lg mb-2"
                  type="text"
                  value={content}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              ) : (
                <div className="p-2 h-10 flex items-center mb-2" onClick={() => setIsEditing(true)}>
                  {
                    loading ? (
                      <Skeleton className="h-6 w-[50%]" />
                    ) : (
                      content
                    )
                  }
                </div>
              )
            } 
          </DialogTitle>
        </DialogHeader>
        {
          loading ? (
            <div className="px-2">
              <div className="flex flex-col gap-4 w-[50%] px-2">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="w-44 h-6" />
                  </div>
                  <Skeleton className="w-28 h-8" />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="w-44 h-6" />
                  </div>
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="w-44 h-6" />
                  </div>
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="w-44 h-6" />
                  </div>
                  <Skeleton className="w-28 h-6" />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="w-44 h-6" />
                  </div>
                  <Skeleton className="w-28 h-6" />
                </div>
              </div>
            </div>
          ) : (
              <div className="px-2">
                <div 
                  className="flex flex-col gap-4 w-[50%] px-2"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Tag size={18}  />
                      <p className="text-slate-500">Prioridade</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Badge className={`w-28 flex justify-center rounded-sm 
                        p-2
                        ${priority === "baixa" ? "bg-green-600" : ""} 
                        ${priority === "média" ? "bg-yellow-600" : ""} 
                        ${priority === "alta" ? "bg-red-600" : ""} 
                        `}>{priority}</Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 text-white">
                        <DropdownMenuRadioGroup>
                          <DropdownMenuRadioItem value="top" className="bg-green-700" onClick={() => setPriority("baixa")}>
                            Baixa
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bottom" className="bg-yellow-700" onClick={() => setPriority("média")}>
                            Média
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="right" className="bg-red-700" onClick={() => setPriority("alta")}>
                            Alta
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <CircleCheckBig size={18}  />
                      <p className="text-slate-500">Status</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                      <Badge 
                        className={`w-28 flex justify-center p-2 rounded-sm
                        ${status === "pendente" ? "bg-yellow-600" : ""} 
                        ${status === "em andamento" ? "bg-blue-600" : ""} 
                        ${status === "completa" ? "bg-green-600" : ""} 
                        ${status === "atrasada" ? "bg-red-600" : ""}`}
                      >
                        {status}
                      </Badge>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 text-white">
                        <DropdownMenuRadioGroup>
                          <DropdownMenuRadioItem value="top" className="bg-yellow-700" onClick={() => setStatus("pendente")}>
                            Pendente
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="bottom" className="bg-blue-700" onClick={() => setStatus("em andamento")}>
                            Em andamento
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="right" className="bg-green-700" onClick={() => setStatus("completa")}>
                            Completa
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="right" className="bg-red-700" onClick={() => setStatus("atrasada")}>
                            Cancelada
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <CircleUserRound size={18}  />
                      <p className="text-slate-500">Responsável</p>
                    </div>
                    <div className="w-28 flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p>{task.user}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Building2 size={18}  />
                      <p className="text-slate-500">Departamento</p>
                    </div>
                    <Badge className="w-28 flex justify-center p-2 rounded-sm">{task.department}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <CalendarDays size={18}  />
                      <p className="text-slate-500">Data</p>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <p className="w-28 flex justify-start cursor-pointer text-center">
                          {date ? format(date, "PPP", { locale: ptBR } ) : "Vazio"}
                        </p>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          initialFocus
                          selected={date}
                          onSelect={setDate} // Fechar após selecionar a data
                        />
                      </PopoverContent>
                    </Popover>              
                  </div>
                </div>
                <hr className="mt-6 mb-6" />
                <div className="px-2">
                  { attachmentsLen > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-lg">Anexos</p>
                      <p className="w-6 h-6 flex items-center justify-center bg-slate-200 rounded-full">{attachmentsLen}</p>
                    </div>
                  ) : ""}
                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button 
                      className="my-2 flex gap-2"
                      variant="outline"
                      onClick={handleButtonClick}
                    >
                      <Paperclip size={18} />
                      Anexar
                    </Button>
                  </div>
                  <ScrollArea className="w-[850px] overflow-x-auto">
                    <div className="flex gap-2 overflow-x-auto">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="relative w-[200px] h-[150px] flex flex-col items-center mb-2 border rounded-md"
                        >
                          <div className="relative w-full h-full group">
                            {/* Imagem com efeito hover */}
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              width={200}
                              height={100}
                              className="object-cover rounded-t-md h-[100px] transition duration-300 ease-in-out"
                            />
                            
                            {/* Fundo ao passar o mouse com opacidade transparente */}
                            <div className="absolute inset-0 bg-[#  8690a2] opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-t-md"></div>

                            {/* Ícones de download e deletar ao passar o mouse */}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 />
                                  </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Excluir este arquivo?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Está ação não poderá ser desfeita!
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction 
                                      className="bg-red-600 hover:bg-red-500"
                                      onClick={() => handleDeleteAttachment(index)}
                                    >
                                      Continuar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              <a
                                href={URL.createObjectURL(file)}
                                download={file.name}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FileDown />
                              </a>
                            </div>
                          </div>
                          
                          {/* Nome do arquivo abaixo da imagem */}
                          <p className="text-[12px] w-full text-center p-1 rounded-b-md">{file.name}</p>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
                <hr className="mt-6 mb-6" />
                <div className="px-2">
                  <p className="text-lg">Atividade</p>
                  <Input 
                    type="text" 
                    placeholder="Adicionar comentário..." 
                    className="mb-4 outline-none"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddComment();
                      }
                    }}
                  />
                  {comments.map((comment, index) => (
                    <div className="mt-4 mb-8" key={index} ref={index === comments.length - 1 ? lastCommentRef : null}>
                      <div className="flex items-center gap-4"> 
                        <Avatar>
                          <AvatarImage src={comment.avatar} alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{comment.user}</p>
                        <p>{comment.hour}</p>
                      </div>
                      <p className="ml-14">{comment.comment}</p>
                      <div className="ml-14 mt-2">
                        <a href="" className="mr-2 hover:underline">Editar</a>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <a href="#  " className="hover:underline">Excluir</a>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir este comentário?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Está ação não poderá ser desfeita!
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-red-600 hover:bg-red-500"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                Continuar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          )
        }
        </ScrollArea>
      </DialogContent>
    </Dialog>
  </>
  );
}
