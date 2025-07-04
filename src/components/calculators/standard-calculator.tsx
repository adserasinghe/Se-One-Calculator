"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const buttonClasses = "text-2xl h-16 w-16 md:h-20 md:w-20 rounded-full";
const operatorButtonClasses = "bg-accent hover:bg-accent/90 text-accent-foreground";
const specialButtonClasses = "bg-secondary hover:bg-secondary/80";

export function StandardCalculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  const calculate = () => {
    if (!previousValue || !operator || !currentValue) return currentValue;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '−':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        result = prev / current;
        break;
      default:
        return currentValue;
    }
    return result.toString();
  };

  const handleNumberClick = (num: string) => {
    if (overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
    } else {
      if (currentValue === '0' && num !== '.') {
        setCurrentValue(num);
      } else if (num === '.' && currentValue.includes('.')) {
        return;
      }
      else {
        setCurrentValue(currentValue + num);
      }
    }
  };

  const handleOperatorClick = (op: string) => {
    if (previousValue && operator && !overwrite) {
      const result = calculate();
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(op);
    setOverwrite(true);
  };

  const handleEqualsClick = () => {
    if (!operator || !previousValue) return;
    const result = calculate();
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };
  
  const handleToggleSign = () => {
    setCurrentValue((parseFloat(currentValue) * -1).toString());
  };
  
  const handlePercent = () => {
    setCurrentValue((parseFloat(currentValue) / 100).toString());
  };

  const displayValue = currentValue.length > 12 ? parseFloat(currentValue).toExponential(5) : currentValue;
  const subDisplay = previousValue ? `${previousValue} ${operator || ''}` : '';

  return (
    <div className="flex justify-center items-center h-full">
        <Card className="w-full max-w-sm p-4 shadow-2xl">
            <CardContent className="p-2">
                <div className="bg-muted rounded-lg p-4 text-right break-words mb-4 min-h-[104px] flex flex-col justify-end">
                    <div className="text-muted-foreground text-xl h-8">{subDisplay}</div>
                    <div className="text-foreground text-4xl font-bold h-12 flex justify-end items-center">{displayValue}</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <Button className={`${buttonClasses} ${specialButtonClasses}`} onClick={handleClear}>C</Button>
                    <Button className={`${buttonClasses} ${specialButtonClasses}`} onClick={handleToggleSign}>+/-</Button>
                    <Button className={`${buttonClasses} ${specialButtonClasses}`} onClick={handlePercent}>%</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('÷')}>÷</Button>
                    
                    {['7', '8', '9'].map(n => <Button key={n} className={buttonClasses} onClick={() => handleNumberClick(n)}>{n}</Button>)}
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('×')}>×</Button>

                    {['4', '5', '6'].map(n => <Button key={n} className={buttonClasses} onClick={() => handleNumberClick(n)}>{n}</Button>)}
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('−')}>−</Button>

                    {['1', '2', '3'].map(n => <Button key={n} className={buttonClasses} onClick={() => handleNumberClick(n)}>{n}</Button>)}
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('+')}>+</Button>
                    
                    <Button className={`${buttonClasses} col-span-2 w-auto`} onClick={() => handleNumberClick('0')}>0</Button>
                    <Button className={buttonClasses} onClick={() => handleNumberClick('.')}>.</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={handleEqualsClick}>=</Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
