import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { useStore, Member } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Members: React.FC = () => {
  const { members, updateMemberStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.tier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Active</Badge>;
      case 'unpaid':
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none flex items-center gap-1"><Clock className="w-3 h-3" /> Unpaid</Badge>;
      case 'expired':
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-indigo-600 bg-indigo-50';
      case 'Gold': return 'text-amber-600 bg-amber-50';
      case 'Silver': return 'text-slate-600 bg-slate-100';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Member Directory</h1>
          <p className="text-slate-500">Manage membership lifecycle and tiers.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by name or tier..." 
              className="pl-10 bg-slate-50 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Export
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-700">Member Name</TableHead>
              <TableHead className="font-semibold text-slate-700">Type</TableHead>
              <TableHead className="font-semibold text-slate-700">Tier</TableHead>
              <TableHead className="font-semibold text-slate-700">Join Date</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-medium text-slate-900">{member.name}</TableCell>
                <TableCell className="capitalize text-slate-600 text-sm">{member.type}</TableCell>
                <TableCell>
                  <span className={cn("px-2 py-1 rounded-md text-xs font-bold", getTierColor(member.tier))}>
                    {member.tier}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">{member.joinDate}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => toast.info(`Emailing ${member.name}`)}>
                        <Mail className="w-4 h-4 mr-2" /> Email Member
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateMemberStatus(member.id, 'active')}>
                        <ShieldCheck className="w-4 h-4 mr-2" /> Activate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => updateMemberStatus(member.id, 'expired')}>
                        <AlertCircle className="w-4 h-4 mr-2" /> Expire
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                  No members found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {filteredMembers.length} members</span>
          <div className="flex gap-2">
             <Button variant="ghost" size="sm" disabled>Previous</Button>
             <Button variant="ghost" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;