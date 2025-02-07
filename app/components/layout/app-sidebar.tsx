import type { ComponentProps } from 'react';

import {
  LuChefHat,
  LuChevronsUpDown,
  LuLogOut,
  LuMapPin,
  LuPlus,
  LuSquareTerminal,
} from 'react-icons/lu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '~/components/ui/sidebar';
import { Avatar } from '@radix-ui/react-avatar';
import { useForm } from '@tanstack/react-form';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useCurrentAuthQuery } from '~/services/auth.query';
import { authClient } from '~/utils/auth-client';

const _createHouseSchema = z.object({
  name: z.string().min(1, 'House name is required').max(50, 'Name too long'),
});

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export function NavMain() {
  const routes = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LuSquareTerminal,
    },
  ];

  return (
    <SidebarMenu>
      {routes.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link to={item.url}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function NavUser() {
  const { data: auth } = useCurrentAuthQuery();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={auth.user.image ?? ''}
                  alt={auth.user.name ?? ''}
                />
                <AvatarFallback>
                  {auth.user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="font-semibold">{auth.user.name}</span>
                <span className="text-muted-foreground text-xs">
                  {auth.user.email}
                </span>
              </div>
              <LuChevronsUpDown className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() =>
                authClient.signOut().then(() => {
                  window.location.reload();
                  window.location.href = '/';
                })
              }
            >
              <LuLogOut />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
