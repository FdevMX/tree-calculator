import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TreeDiagram from '@/components/logic/treeDiagram';

interface TreeDialogProps {
  currentExpression: string;
}

const TreeDialog: React.FC<TreeDialogProps> = ({ currentExpression }) => {
  const [isTreeOpen, setIsTreeOpen] = useState(false);

  return (
    <div className="mt-6">
      <Dialog open={isTreeOpen} onOpenChange={setIsTreeOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-full">
            Tree
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 text-green-400 flex flex-col max-w-[90vw] w-[600px] h-[60vh] md:h-[70vh] lg:h-[90vh]" style={{ borderRadius: '20px' }}>
          <DialogHeader>
            <DialogTitle>Árbol de Operaciones</DialogTitle>
            <p className="text-white mt-2">
              Operación: {currentExpression.split('').join(' ')}
            </p>
            <p className='text-gray-500'>Lea el árbol de abajo hacia arriba y de izquierda a derecha</p>
          </DialogHeader>
          <div className="p-4 overflow-auto flex-grow">
            <TreeDiagram expression={currentExpression} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TreeDialog;
