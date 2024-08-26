'use client';

import {
  Bell,
  Bookmark,
  Home,
  Pen,
  Calendar,
  Newspaper,
  List
} from 'lucide-react';
import { SidebarDesktop } from './sidebar-desktop';
import { SidebarItems } from '@/types/types';

const sidebarItems: SidebarItems = {
  links: [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Notificações', href: '/item/notifications', icon: Bell },
    { label: 'Tarefas', href: '/item/messages', icon: List },
    {
      href: '/item/lists',
      icon: Bookmark,
      label: 'Agendamentos',
    },
    {
      href: '/item/bookmarks',
      icon: Calendar,
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
