"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useTranslation } from '@/hooks/use-translation';
import { usePathname } from 'next/navigation';

export function AppHeader() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname.startsWith('/standard')) return t('header_standard_calculator');
    if (pathname.startsWith('/scientific')) return t('header_scientific_calculator');
    if (pathname.startsWith('/converters')) return t('header_converters');
    return t('appName');
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10 h-16 shrink-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden"/>
        <h1 className="text-xl font-semibold font-headline">{getTitle()}</h1>
      </div>
      <LanguageSwitcher />
    </header>
  );
}
