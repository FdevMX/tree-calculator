"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { X, Divide, Equal, Delete, RefreshCcw } from 'lucide-react'

export default function Calculadora() {
  const [display, setDisplay] = useState('')
  const [tokens, setTokens] = useState<{lexeme: string, token: string}[]>([])

  const handleClick = (value: string) => {
    setDisplay(prev => prev + value)
  }

  const handleClear = () => {
    setDisplay('')
    setTokens([])
  }

  const handleDelete = () => {
    setDisplay(prev => prev.slice(0, -1))
  }

  const handleCalculate = async () => {
    const codeContent = display.trim();
    if (codeContent === '') {
      console.error('Error: Ingrese un valor.');
      return;
    }
    try {
      const response = await fetch('/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeContent }),
      });
      const result = eval(display)
      setDisplay(result.toString())
      const data = await response.json();
      setTokens(data.tokens);
    } catch (error) {
      setDisplay('Error');
      console.error('Error:', error);
    }
  }

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
              onClick={() => handleClick(btn)}
            >
              {btn === '*' ? <X size={24} /> : btn === '/' ? <Divide size={24} /> : btn}
            </Button>
          ))}
          <Button
            onClick={handleDelete}
            variant="destructive"
          >
            <Delete size={24} />
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
          >
            <RefreshCcw size={24} />
          </Button>
          <Button
            onClick={handleCalculate}
            variant="secondary"
            className="col-span-4"
          >
            <Equal size={24} />
          </Button>
        </div>
        <div className="mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full">
                Tree
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-green-400">
              <DialogHeader>
                <DialogTitle>Árbol de Operaciones</DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <p>Aquí se mostraría el árbol de operaciones.</p>
                <p>Esta función requiere una implementación más compleja.</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="bg-gray-800 p-8 rounded-[40px] shadow-2xl border-8 border-gray-700 overflow-auto" style={{ maxHeight: '750px', width: '380px' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-green-400 text-lg">Token</TableHead>
              <TableHead className="text-green-400 text-lg">Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell className="text-white text-lg">{token.lexeme}</TableCell>
                <TableCell className="text-white text-lg">{token.token}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}