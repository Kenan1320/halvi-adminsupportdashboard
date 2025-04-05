import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/admin/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  Filter, 
  Download, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const transactions = [
  {
    id: 1,
    date: '2024-07-15',
    description: 'Deposit from Bank Account',
    amount: 1000,
    type: 'deposit',
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-07-14',
    description: 'Withdrawal to Bank Account',
    amount: -500,
    type: 'withdrawal',
    status: 'completed',
  },
  {
    id: 3,
    date: '2024-07-13',
    description: 'Payment from Customer A',
    amount: 250,
    type: 'payment',
    status: 'completed',
  },
  {
    id: 4,
    date: '2024-07-12',
    description: 'Refund to Customer B',
    amount: -100,
    type: 'refund',
    status: 'completed',
  },
  {
    id: 5,
    date: '2024-07-11',
    description: 'Transaction Fee',
    amount: -10,
    type: 'fee',
    status: 'completed',
  },
];

const WalletPage = () => {
  const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <DashboardLayout title="Wallet">
      <PageHeader 
        title="Wallet" 
        description="Manage your wallet and view transactions"
        actions={
          <>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter size={14} />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download size={14} />
                Export
              </Button>
            </div>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalBalance.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              Available balance in your wallet
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentTransactions.map((transaction) => (
                <li key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                    </span>
                    {transaction.status === 'completed' && (
                      // Change from 'success' to 'outline' with custom class
                      <Badge 
                        variant='outline' 
                        className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        Approved
                      </Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transaction History
            </CardTitle>
            <MoreVertical className="h-4 w-4 cursor-pointer text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {transaction.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" variant="outline">Approved</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default WalletPage;
