import { create } from 'zustand';

export type UserRole = 'Super Admin' | 'Secretariat Admin' | 'Finance Officer' | 'Membership Officer' | 'Member' | 'Sponsor/Donor';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Member {
  id: string;
  userId: string;
  name: string;
  type: 'individual' | 'corporate';
  status: 'active' | 'unpaid' | 'expired';
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Regular';
  joinDate: string;
}

export interface Invoice {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  date: string;
}

export interface LedgerEntry {
  id: string;
  account: string;
  debit: number;
  credit: number;
  fund: 'General' | 'Events' | 'Projects';
  date: string;
}

interface AppState {
  user: User | null;
  members: Member[];
  invoices: Invoice[];
  ledger: LedgerEntry[];
  setUser: (user: User | null) => void;
  addMember: (member: Member) => void;
  updateMemberStatus: (id: string, status: Member['status']) => void;
  addInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;
  addLedgerEntry: (entry: LedgerEntry) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  members: [
    { id: '1', userId: 'u1', name: 'John Doe', type: 'individual', status: 'active', tier: 'Gold', joinDate: '2023-01-15' },
    { id: '2', userId: 'u2', name: 'Tech Corp', type: 'corporate', status: 'unpaid', tier: 'Platinum', joinDate: '2023-05-20' },
    { id: '3', userId: 'u3', name: 'Jane Smith', type: 'individual', status: 'expired', tier: 'Silver', joinDate: '2022-11-10' },
  ],
  invoices: [
    { id: 'inv-1', memberId: '2', memberName: 'Tech Corp', amount: 5000, status: 'pending', date: '2023-10-01' },
    { id: 'inv-2', memberId: '1', memberName: 'John Doe', amount: 1500, status: 'paid', date: '2023-09-15' },
  ],
  ledger: [
    { id: 'l-1', account: 'Membership Dues', debit: 0, credit: 1500, fund: 'General', date: '2023-09-15' },
    { id: 'l-2', account: 'Event Sponsorship', debit: 0, credit: 10000, fund: 'Events', date: '2023-09-20' },
  ],
  setUser: (user) => set({ user }),
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMemberStatus: (id, status) => set((state) => ({
    members: state.members.map(m => m.id === id ? { ...m, status } : m)
  })),
  addInvoice: (invoice) => set((state) => ({ invoices: [...state.invoices, invoice] })),
  updateInvoiceStatus: (id, status) => set((state) => ({
    invoices: state.invoices.map(i => i.id === id ? { ...i, status } : i)
  })),
  addLedgerEntry: (entry) => set((state) => ({ ledger: [...state.ledger, entry] })),
}));