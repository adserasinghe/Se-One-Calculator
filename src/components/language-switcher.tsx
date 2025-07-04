"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";

const supportedLanguages = ["English", "Spanish", "French", "German", "Japanese", "Russian"];

export function LanguageSwitcher() {
  const { language, setLanguage, isLoading } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          ) : (
            <Languages className="h-4 w-4" />
          )}
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
          {supportedLanguages.map((lang) => (
            <DropdownMenuRadioItem key={lang} value={lang}>
              {lang}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
