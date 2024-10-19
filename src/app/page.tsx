"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { handleClick } from '@/components/functions/handleClick';
import { handleClear } from '@/components/functions/handleClear';
import { handleDelete } from '@/components/functions/handleDelete';
import { handleCalculate } from '@/components/functions/handleCalculate';
import { X, Divide, Equal, Delete, RefreshCcw } from 'lucide-react'
import CustomTable from '@/components/content/customTable'
import TreeDialog from '@/components/content/treeDialog'

export default function Calculadora() {
  const [display, setDisplay] = useState('')
  const [tokens, setTokens] = useState<{lexeme: string, token: string}[]>([])
  const [currentExpression, setCurrentExpression] = useState('')

  return (
    <div className="flex justify-center items-start space-x-8 p-8 bg-gray-900 min-h-screen text-green-400">
      <div className="bg-gray-800 p-8 rounded-[50px] shadow-2xl border-8 border-gray-700" style={{ width: '450px', height: '750px' }}>
        <div className="mb-6 bg-gray-900 p-6 rounded-3xl shadow-inner">
          <Input 
            value={display} 
            readOnly
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {['(', ')', '%', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.'].map((btn) => (
            <Button
              key={btn}
              onClick={() => handleClick(btn, setDisplay, setCurrentExpression)}
            >
              {btn === '*' ? <X size={24} /> : btn === '/' ? <Divide size={24} /> : btn}
            </Button>
          ))}
          <Button
            onClick={() => handleDelete(setDisplay, setCurrentExpression)}
            variant="destructive"
          >
            <Delete size={24} />
          </Button>
          <Button
            onClick={() => handleClear(setDisplay, setTokens, setCurrentExpression)}
            variant="outline"
          >
            <RefreshCcw size={24} />
          </Button>
          <Button
            onClick={() => handleCalculate(display, setDisplay, setTokens)}
            variant="secondary"
            className="col-span-4"
          >
            <Equal size={24} />
          </Button>
        </div>
        <TreeDialog currentExpression={currentExpression} />
      </div>
      <CustomTable tokens={tokens} />
    </div>
  )
}