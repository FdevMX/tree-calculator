import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

interface Token {
  lexeme: string;
  token: string;
}

interface CustomTableProps {
  tokens: Token[];
}

const CustomTable: React.FC<CustomTableProps> = ({ tokens }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-[40px] shadow-2xl border-8 border-gray-700 overflow-auto custom-scrollbar" style={{ maxHeight: '750px', width: '380px' }}>
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

        {/* Scrollbar custom styles */}
        <style>{`
            .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
            }
            .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.5);
            }
        `}</style>
    </div>
  );
};

export default CustomTable;