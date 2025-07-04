"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/use-translation';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';

const dataUnits = {
  bytes: 1, kilobytes: 1024, megabytes: 1024 ** 2, gigabytes: 1024 ** 3, terabytes: 1024 ** 4,
};

const dataUnitLabels: Record<string, string> = {
  bytes: "bytes", kilobytes: "kilobytes", megabytes: "megabytes", gigabytes: "gigabytes", terabytes: "terabytes"
};

export function DataConverter() {
  const { t } = useTranslation();
  const [fromUnit, setFromUnit] = useState('megabytes');
  const [toUnit, setToUnit] = useState('gigabytes');
  const [fromValue, setFromValue] = useState('1024');
  const [toValue, setToValue] = useState('');

  const convert = (value: number, from: string, to: string) => {
    if (isNaN(value)) return 0;
    const valueInBytes = value * dataUnits[from as keyof typeof dataUnits];
    return valueInBytes / dataUnits[to as keyof typeof dataUnits];
  };
  
  const calculateConversion = (val: string, fromU: string, toU: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const result = convert(num, fromU, toU);
      return result.toLocaleString('en-US', {maximumFractionDigits: 5});
    }
    return '';
  };

  useEffect(() => {
    setToValue(calculateConversion(fromValue, fromUnit, toUnit));
  }, [fromValue, fromUnit, toUnit]);


  const handleFromValueChange = (val: string) => {
    setFromValue(val);
  };

  const handleToValueChange = (val: string) => {
    setToValue(val);
    setFromValue(calculateConversion(val, toUnit, fromUnit));
  };
  
  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end">
        <div className="space-y-2 md:col-span-5">
          <Label htmlFor="from-value">{t('from')}</Label>
          <div className='flex gap-2'>
            <Input id="from-value" type="number" value={fromValue} onChange={(e) => handleFromValueChange(e.target.value)} />
            <Select onValueChange={setFromUnit} value={fromUnit}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('select_unit')} />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(dataUnits).map(unit => <SelectItem key={unit} value={unit}>{t(dataUnitLabels[unit])}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-center md:col-span-1">
          <Button variant="ghost" size="icon" onClick={swapUnits}>
            <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>

        <div className="space-y-2 md:col-span-5">
          <Label htmlFor="to-value">{t('to')}</Label>
          <div className='flex gap-2'>
             <Input id="to-value" type="number" value={toValue} onChange={(e) => handleToValueChange(e.target.value)} />
             <Select onValueChange={setToUnit} value={toUnit}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('select_unit')} />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(dataUnits).map(unit => <SelectItem key={unit} value={unit}>{t(dataUnitLabels[unit])}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
