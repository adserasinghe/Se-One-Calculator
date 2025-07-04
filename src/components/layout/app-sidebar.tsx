"use client";

import { usePathname } from 'next/navigation';
import { Calculator, FlaskConical, Repeat, Sigma } from 'lucide-react';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { href: '/standard', label: t('nav_standard'), icon: Calculator },
    { href: '/scientific', label: t('nav_scientific'), icon: FlaskConical },
    { href: '/converters', label: t('nav_converters'), icon: Repeat },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <Sigma className="w-8 h-8 text-primary" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold font-headline group-data-[collapsible=icon]:hidden">{t('appName')}</h1>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
