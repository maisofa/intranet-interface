'use client';

import {
  Bell,
  Bookmark,
  Home,
  Pen,
  CalendarDays,
  Newspaper,
  List,
  PhoneCall
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types/types';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Home', href: '/home', icon: Home },
    { label: 'Notificações', href: '/item/notifications', icon: Bell },
    { label: 'Tarefas', href: '/tasks', icon: List },
    {
      href: '/item/lists',
      icon: Bookmark,
      label: 'Agendamentos',
    },
    {
      href: '/item/bookmarks',
      icon: PhoneCall,
      label: 'Chamados',
    },
    {
      href: '/item/bookmarks',
      icon: CalendarDays,
      label: 'Eventos',
    },
    {
      href: '/item/communities',
      icon: Newspaper,
      label: 'Notícias',
    },
  ],
};

export function Sidebar() {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
}
