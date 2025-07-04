import { TranslationProvider } from '@/contexts/translation-context';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/header';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TranslationProvider>
      <SidebarProvider>
        <Sidebar>
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col h-svh">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                {children}
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TranslationProvider>
  );
}
