"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/use-translation';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';

// Static exchange rates relative to USD
const exchangeRates: Record<string, number> = {
  usd: 1, eur: 0.92, jpy: 157.2, gbp: 0.78, cad: 1.37, aud: 1.5,
};

const currencyLabels: Record<string, string> = {
  usd: "usd", eur: "eur", jpy: "jpy", gbp: "gbp", cad: "cad", aud: "aud",
};

export function CurrencyConverter() {
  const { t } = useTranslation();
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('eur');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const convert = (value: number, from: string, to: string) => {
    if (isNaN(value)) return 0;
    const valueInUsd = value / exchangeRates[from];
    return valueInUsd * exchangeRates[to];
  };

  const calculateConversion = (val: string, fromC: string, toC: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const result = convert(num, fromC, toC);
      return result.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    return '';
  };
  
  useEffect(() => {
    setToValue(calculateConversion(fromValue, fromCurrency, toCurrency));
  }, [fromValue, fromCurrency, toCurrency]);

  const handleFromValueChange = (val: string) => {
    setFromValue(val);
  };
  
  const handleToValueChange = (val: string) => {
    setToValue(val);
    setFromValue(calculateConversion(val, toCurrency, fromCurrency));
  };
  
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Exchange rates are for demonstration purposes only.</p>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end">
        <div className="space-y-2 md:col-span-5">
          <Label htmlFor="from-value">{t('from')}</Label>
          <div className='flex gap-2'>
            <Input id="from-value" type="number" value={fromValue} onChange={(e) => handleFromValueChange(e.target.value)} />
            <Select onValueChange={setFromCurrency} value={fromCurrency}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t('select_currency')} />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(exchangeRates).map(curr => <SelectItem key={curr} value={curr}>{t(currencyLabels[curr])}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-center md:col-span-1">
          <Button variant="ghost" size="icon" onClick={swapCurrencies}>
            <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="space-y-2 md:col-span-5">
          <Label htmlFor="to-value">{t('to')}</Label>
          <div className='flex gap-2'>
             <Input id="to-value" type="number" value={toValue} onChange={(e) => handleToValueChange(e.target.value)} />
             <Select onValueChange={setToCurrency} value={toCurrency}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t('select_currency')} />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(exchangeRates).map(curr => <SelectItem key={curr} value={curr}>{t(currencyLabels[curr])}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
