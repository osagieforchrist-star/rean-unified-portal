import React from 'react';
import { 
  Calculator, 
  ArrowUpRight, 
  ArrowDownLeft, 
  PiggyBank, 
  TrendingUp,
  History
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Accounting: React.FC = () => {
  const { ledger } = useStore();

  const totalCredit = ledger.reduce((acc, curr) => acc + curr.credit, 0);
  const totalDebit = ledger.reduce((acc, curr) => acc + curr.debit, 0);
  const netBalance = totalCredit - totalDebit;

  const fundBalances = ledger.reduce((acc, curr) => {
    acc[curr.fund] = (acc[curr.fund] || 0) + (curr.credit - curr.debit);
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financial Accounting</h1>
          <p className="text-slate-500">General ledger and fund management.</p>
        </div>
        <div className="flex gap-2">
          <Card className="p-2 border-slate-200 bg-slate-50 flex items-center gap-4">
            <div className="p-2 bg-white rounded-md shadow-sm">
              <Calculator className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Net Balance</p>
              <p className="text-sm font-bold text-slate-900">${netBalance.toLocaleString()}</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(fundBalances).map(([fund, balance]) => (
          <Card key={fund} className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <PiggyBank className="w-4 h-4" />
                {fund} Fund
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <h4 className="text-2xl font-bold text-slate-900">${balance.toLocaleString()}</h4>
                <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +4.2%
                </div>
              </div>
              <div className="mt-4 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '70%' }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <History className="w-5 h-5 text-slate-400" />
                Transaction Ledger
              </CardTitle>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Account / Description</TableHead>
                  <TableHead>Fund</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ledger.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-slate-500 text-xs">{entry.date}</TableCell>
                    <TableCell className="font-medium text-slate-900">{entry.account}</TableCell>
                    <TableCell>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {entry.fund}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      {entry.debit > 0 ? `-$${entry.debit.toLocaleString()}` : '-'}
                    </TableCell>
                    <TableCell className="text-right text-emerald-600">
                      {entry.credit > 0 ? `+$${entry.credit.toLocaleString()}` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Total Credits</span>
                </div>
                <span className="font-bold text-emerald-600">${totalCredit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <ArrowDownLeft className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">Total Debits</span>
                </div>
                <span className="font-bold text-red-600">${totalDebit.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Net Profit</span>
                <span className="text-base font-bold text-blue-600">${netBalance.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16" />
             <h4 className="text-lg font-bold">Generate Report</h4>
             <p className="text-slate-400 text-sm mt-2">Download a comprehensive PDF report for the current fiscal period.</p>
             <Button className="w-full mt-4 bg-white text-slate-900 hover:bg-slate-100">
               Download PDF
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;