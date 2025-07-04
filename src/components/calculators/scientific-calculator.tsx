"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const buttonClasses = "text-xl h-14 w-14 md:h-16 md:w-16 rounded-full";
const operatorButtonClasses = "bg-accent hover:bg-accent/90 text-accent-foreground";
const specialButtonClasses = "bg-secondary hover:bg-secondary/80";
const sciButtonClasses = "bg-primary/10 hover:bg-primary/20 text-primary";

export function ScientificCalculator() {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);
  const [expression, setExpression] = useState('');

  const calculate = () => {
    if (!previousValue || !operator || !currentValue) return currentValue;
    
    if (operator === '^') {
      return Math.pow(parseFloat(previousValue!), parseFloat(currentValue)).toString();
    }
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    let result: number;
    switch (operator) {
      case '+': result = prev + current; break;
      case '−': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷': result = prev / current; break;
      default: return currentValue;
    }
    return result.toString();
  };
  
  const handleNumberClick = (num: string) => {
    if (overwrite) {
      setCurrentValue(num);
      setOverwrite(false);
    } else {
      if (currentValue === '0' && num !== '.') setCurrentValue(num);
      else if (num === '.' && currentValue.includes('.')) return;
      else setCurrentValue(currentValue + num);
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
    setExpression(`${currentValue} ${op}`);
  };

  const handleEqualsClick = () => {
    if (!operator || !previousValue) return;
    const result = calculate();
    setExpression(`${previousValue} ${operator} ${currentValue} =`);
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
  };
  
  const handleScientificFunction = (func: string) => {
    const val = parseFloat(currentValue);
    let result;
    switch (func) {
        case 'sin': result = Math.sin(val); break;
        case 'cos': result = Math.cos(val); break;
        case 'tan': result = Math.tan(val); break;
        case 'log': result = Math.log10(val); break;
        case 'ln': result = Math.log(val); break;
        case '√': result = Math.sqrt(val); break;
        case 'π': result = Math.PI; setOverwrite(true); break;
        case 'e': result = Math.E; setOverwrite(true); break;
        default: return;
    }
    setExpression(`${func}(${currentValue})`);
    setCurrentValue(result.toString());
    setOverwrite(true);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setOverwrite(true);
    setExpression('');
  };
  
  const displayValue = currentValue.length > 10 ? parseFloat(currentValue).toExponential(4) : currentValue;

  return (
    <div className="flex justify-center items-center h-full">
        <Card className="w-full max-w-lg p-2 shadow-2xl">
            <CardContent className="p-2">
                <div className="bg-muted rounded-lg p-4 text-right break-words mb-4 min-h-[104px] flex flex-col justify-end">
                    <div className="text-muted-foreground text-lg h-7">{expression}</div>
                    <div className="text-foreground text-4xl font-bold h-12 flex justify-end items-center">{displayValue}</div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('sin')}>sin</Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('cos')}>cos</Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('tan')}>tan</Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('log')}>log</Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('ln')}>ln</Button>
                    
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleOperatorClick('^')}>x<sup>y</sup></Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('√')}>√</Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('π')}>π</Button>
                    <Button className={`${buttonClasses} ${specialButtonClasses}`} onClick={handleClear}>C</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('÷')}>÷</Button>
                    
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('7')}>7</Button>
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('8')}>8</Button>
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('9')}>9</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('×')}>×</Button>
                    <Button className={`${buttonClasses} ${sciButtonClasses}`} onClick={() => handleScientificFunction('e')}>e</Button>

                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('4')}>4</Button>
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('5')}>5</Button>
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('6')}>6</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('−')}>−</Button>
                    <div/>
                    
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('1')}>1</Button>
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('2')}>2</Button>
                    <Button className={`${buttonClasses}`} onClick={() => handleNumberClick('3')}>3</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={() => handleOperatorClick('+')}>+</Button>
                    <div/>

                    <Button className={`${buttonClasses} col-span-2 w-auto`} onClick={() => handleNumberClick('0')}>0</Button>
                    <Button className={buttonClasses} onClick={() => handleNumberClick('.')}>.</Button>
                    <Button className={`${buttonClasses} ${operatorButtonClasses}`} onClick={handleEqualsClick}>=</Button>
                    <div/>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
