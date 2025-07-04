"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from '@/hooks/use-translation';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';

const conversions = {
  length: {
    meters: 1, kilometers: 1000, centimeters: 0.01, millimeters: 0.001, miles: 1609.34, yards: 0.9144, feet: 0.3048, inches: 0.0254,
  },
  mass: {
    kilograms: 1, grams: 0.001, milligrams: 0.000001, pounds: 0.453592, ounces: 0.0283495,
  },
  temperature: {
    celsius: 1, fahrenheit: 1, kelvin: 1,
  },
};

const unitLabels: Record<string, string> = {
  meters: "meters", kilometers: "kilometers", centimeters: "centimeters", millimeters: "millimeters", miles: "miles", yards: "yards", feet: "feet", inches: "inches",
  kilograms: "kilograms", grams: "grams", milligrams: "milligrams", pounds: "pounds", ounces: "ounces",
  celsius: "celsius", fahrenheit: "fahrenheit", kelvin: "kelvin",
};


type Category = keyof typeof conversions;
type Unit<C extends Category> = keyof typeof conversions[C];

export function UnitConverter() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState<Unit<Category>>('meters');
  const [toUnit, setToUnit] = useState<Unit<Category>>('feet');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const unitOptions = useMemo(() => Object.keys(conversions[category]), [category]);

  const convert = (value: number, from: Unit<Category>, to: Unit<Category>, cat: Category) => {
    if (isNaN(value)) return 0;
    if (cat === 'temperature') {
      if (from === to) return value;
      let celsiusValue: number;
      if (from === 'fahrenheit') celsiusValue = (value - 32) * 5/9;
      else if (from === 'kelvin') celsiusValue = value - 273.15;
      else celsiusValue = value;
      
      if (to === 'fahrenheit') return celsiusValue * 9/5 + 32;
      if (to === 'kelvin') return celsiusValue + 273.15;
      return celsiusValue;
    } else {
      const baseValue = value * (conversions[cat][from] as number);
      return baseValue / (conversions[cat][to] as number);
    }
  };

  const calculateConversion = (val: string, fromU: Unit<Category>, toU: Unit<Category>, cat: Category) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      const result = convert(num, fromU, toU, cat);
      return result.toLocaleString('en-US', { maximumFractionDigits: 5 });
    }
    return '';
  };
  
  useEffect(() => {
    setToValue(calculateConversion(fromValue, fromUnit, toUnit, category));
  }, [fromValue, fromUnit, toUnit, category]);

  const handleFromValueChange = (val: string) => {
    setFromValue(val);
  };

  const handleToValueChange = (val: string) => {
    setToValue(val);
    setFromValue(calculateConversion(val, toUnit, fromUnit, category));
  };
  
  const handleCategoryChange = (val: Category) => {
      setCategory(val);
      const newUnits = Object.keys(conversions[val]) as Unit<Category>[];
      setFromUnit(newUnits[0]);
      setToUnit(newUnits[1] || newUnits[0]);
  }

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <div className="space-y-6">
      <Select onValueChange={(val: Category) => handleCategoryChange(val)} defaultValue={category}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="length">Length & Distance</SelectItem>
          <SelectItem value="mass">Mass</SelectItem>
          <SelectItem value="temperature">Temperature</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end">
        <div className="space-y-2 md:col-span-5">
          <Label htmlFor="from-value">{t('from')}</Label>
          <div className='flex gap-2'>
            <Input id="from-value" type="number" value={fromValue} onChange={(e) => handleFromValueChange(e.target.value)} />
            <Select onValueChange={(val) => setFromUnit(val as Unit<Category>)} value={fromUnit}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('select_unit')} />
                </SelectTrigger>
                <SelectContent>
                    {unitOptions.map(unit => <SelectItem key={unit} value={unit}>{t(unitLabels[unit])}</SelectItem>)}
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
             <Select onValueChange={(val) => setToUnit(val as Unit<Category>)} value={toUnit}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t('select_unit')} />
                </SelectTrigger>
                <SelectContent>
                    {unitOptions.map(unit => <SelectItem key={unit} value={unit}>{t(unitLabels[unit])}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
