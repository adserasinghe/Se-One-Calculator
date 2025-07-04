"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/use-translation";
import { UnitConverter } from "@/components/converters/unit-converter";
import { CurrencyConverter } from "@/components/converters/currency-converter";
import { DataConverter } from "@/components/converters/data-converter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConvertersPage() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center w-full">
      <Tabs defaultValue="unit" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="unit">{t('tab_unit')}</TabsTrigger>
          <TabsTrigger value="currency">{t('tab_currency')}</TabsTrigger>
          <TabsTrigger value="data">{t('tab_data')}</TabsTrigger>
        </TabsList>
        <div className="mt-4">
            <TabsContent value="unit">
              <Card>
                <CardHeader>
                  <CardTitle>{t('tab_unit')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <UnitConverter />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="currency">
               <Card>
                <CardHeader>
                  <CardTitle>{t('tab_currency')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CurrencyConverter />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="data">
               <Card>
                <CardHeader>
                  <CardTitle>{t('tab_data')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataConverter />
                </CardContent>
              </Card>
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
