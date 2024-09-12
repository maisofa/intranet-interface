'use client';

import { EventsTable } from "@/components/events-table";
import { NotificationPopover } from "@/components/notification-popover"
import { Sidebar } from "@/components/sidebar"
import { TaskPaginationCard } from "@/components/task-pagination-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDaysIcon, MapPinHouse, Plus, Search, Type } from "lucide-react"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CalendarDays, Ellipsis, FileDown, Paperclip, Trash2 } from "lucide-react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface Event {
  id: string;
  title: string;
  dataAndHour: string;
  type: string;
  local: string;
}

const eventsMock: Event[] = [
  {
    id: "123",
    title: "Desenvolvimento produto",
    dataAndHour: "12/10/2024 15:00:00",
    type: "Reunião",
    local: "Sala de reunião"
  },
];

interface commentsProps {
  id: string,
  avatar: string,
  user: string,
  hour: string,
  comment: string
}[]

export default function Tasks() {
  const [statusTask, setStatusTask] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>(eventsMock)
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [title, setTitle] = useState("Tarefa");
  const [comments, setComments] = useState<commentsProps[]>([]);
  const [newComment, setNewComment] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("");
  const [local, setLocal] = useState("");
  const [status, setStatus] = useState("pendente");
  const [openedCalendar, setOpenedCalendar] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentsLen, setAttachmentsLen] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const lastCommentRef = useRef<HTMLDivElement | null>(null);
  const [date, setDate] = useState<Date>()

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: (comments.length + 1).toString(),
      avatar: "https://github.com/shadcn.png",
      user: "Rodrigo S.",
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
    setTitle(e.target.value);

    (e.target as HTMLInputElement).blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSave(e as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div>
      <NotificationPopover />
      <div>
        <Sidebar />
        <div className="p-2 ml-72">
          <div className="mb-10">
            <p className="text-base mb-2">Meus eventos</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={() => setIsSheetOpen(true)}>
              <Plus />
              Adicionar evento
            </Button>
            <Tabs defaultValue="pendentes">
              <TabsList>
                <TabsTrigger value="completas" onClick={() => setStatusTask("futuros")}>
                  Futuros
                </TabsTrigger>
                <TabsTrigger value="pendentes" onClick={() => setStatusTask("concluídos")}>
                  Concluídos
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                  >
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Pesquisar por data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <Search />
              </span>
              <Input
                type="text"
                className="pl-10 border-2 outline-none"
                placeholder="Pesquisar evento..."
              />
            </div>
          </div>
          <EventsTable events={events} statusTask={statusTask}/>
          <TaskPaginationCard />
        </div>
      </div>

      <Dialog open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <DialogContent className="sm:max-w-[900px] min-h-[80vh] text-sm focus:outline-none p-0 flex flex-col">
        <ScrollArea className="flex-grow max-h-[80vh] overflow-y-auto p-2">
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
              <p className="mb-4 text-xl">Novo evento</p>
              <input
                className=" w-[50%] p-2 h-10 text-xl mb-2 border-none outline-none" 
                placeholder="Sem título"
                type="text"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </DialogTitle>
          </DialogHeader>
          <div className="px-2">
            <div 
              className="flex flex-col gap-4 w-[50%] px-2"
            >
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
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Type size={18}  />
                  <p className="text-slate-500">Tipo</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {
                      priority !== "" ? (
                        <Badge 
                          className="w-28 flex justify-center rounded-sm p-2"
                        >
                          {priority}
                        </Badge>
                      ) : (
                        <span className="w-28 p-2">Selecione o tipo</span>
                      )
                    }                   
                  </DropdownMenuTrigger>
                  <DropdownMenuContent defaultValue="baixa" className="w-56">
                    <DropdownMenuRadioGroup className="gap-y-2 flex flex-col">
                      <DropdownMenuRadioItem value="top" className="cursor-pointer" onClick={() => setPriority("Novos produtos")}>
                        Novos produtos
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom" className=" cursor-pointer" onClick={() => setPriority("Treinamento")}>
                        Treinamento
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right" className="cursor-pointer" onClick={() => setPriority("Outro")}>
                        Outro
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <MapPinHouse size={18}  />
                  <p className="text-slate-500">Local</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {
                      local !== "" ? (
                        <Badge 
                          className="w-28 flex justify-center rounded-sm p-2"
                        >
                          {local}
                        </Badge>
                      ) : (
                        <span className="w-28 p-2">Selecione o local</span>
                      )
                    }                   
                  </DropdownMenuTrigger>
                  <DropdownMenuContent defaultValue="baixa" className="w-56">
                    <DropdownMenuRadioGroup className="gap-y-2 flex flex-col">
                      <DropdownMenuRadioItem value="top" className="cursor-pointer" onClick={() => setLocal("Sala de reunião")}>
                        Sala de reunião
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}