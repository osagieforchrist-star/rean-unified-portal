import React from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { useStore, Invoice } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Invoices: React.FC = () => {
  const { invoices, updateInvoiceStatus } = useStore();

  const getStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleAction = (id: string, action: string) => {
    if (action === 'mark-paid') {
      updateInvoiceStatus(id, 'paid');
      toast.success('Invoice marked as paid');
    } else {
      toast.info(`${action} for invoice ${id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices & Billing</h1>
          <p className="text-slate-500">Track membership payments and dues.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Bulk Generate</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Invoice ID</TableHead>
              <TableHead className="font-semibold text-slate-700">Member</TableHead>
              <TableHead className="font-semibold text-slate-700">Date</TableHead>
              <TableHead className="font-semibold text-slate-700">Amount</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-xs font-medium text-slate-900 uppercase">{invoice.id}</TableCell>
                <TableCell className="text-slate-900 font-medium">{invoice.memberName}</TableCell>
                <TableCell className="text-slate-600 text-sm">{invoice.date}</TableCell>
                <TableCell className="text-slate-900 font-bold">${invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleAction(invoice.id, 'Download')}>
                      <Download className="w-4 h-4 text-slate-400" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction(invoice.id, 'Send')}>
                      <Send className="w-4 h-4 text-slate-400" />
                    </Button>
                    {invoice.status === 'pending' && (
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => handleAction(invoice.id, 'mark-paid')}>
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-slate-200 bg-blue-600 text-white shadow-md">
          <CardContent className="p-6">
            <p className="text-blue-100 text-sm font-medium">Total Receivables</p>
            <h4 className="text-2xl font-bold mt-1">$12,500</h4>
            <div className="mt-4 pt-4 border-t border-blue-500 flex justify-between items-center text-xs">
              <span className="opacity-80">Due this month</span>
              <span className="font-bold">$4,200</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-slate-500 text-sm font-medium">Total Paid</p>
            <h4 className="text-2xl font-bold mt-1 text-slate-900">$45,800</h4>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">Collected in Oct</span>
              <span className="font-bold text-emerald-600">$8,400</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-slate-500 text-sm font-medium">Overdue Amount</p>
            <h4 className="text-2xl font-bold mt-1 text-red-600">$1,200</h4>
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">Average days late</span>
              <span className="font-bold text-red-500">14 Days</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoices;