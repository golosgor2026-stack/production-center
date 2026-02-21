"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  Search,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  LogOut,
  FileText,
  Plus,
  Eye,
  Download,
  Settings,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { LoginForm } from "@/components/LoginForm";

interface Request {
  id: string;
  name: string;
  position?: string;
  organization?: string;
  phone?: string;
  email: string;
  description?: string;
  meetingType?: string;
  source?: string;
  status: string;
  notes?: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  new: { label: "Новая", color: "bg-blue-100 text-blue-700", icon: <Clock className="w-3 h-3" /> },
  in_progress: { label: "В работе", color: "bg-yellow-100 text-yellow-700", icon: <TrendingUp className="w-3 h-3" /> },
  completed: { label: "Обработана", color: "bg-green-100 text-green-700", icon: <CheckCircle className="w-3 h-3" /> },
  rejected: { label: "Отказ", color: "bg-red-100 text-red-700", icon: <XCircle className="w-3 h-3" /> },
};

const sourceLabels: Record<string, string> = {
  main: "Главная",
  federal: "Федеральные",
  b2b: "B2B",
  festivals: "Фестивали",
  concerts: "Концерты",
  expert: "Экспертное",
  contacts: "Контакты",
  team: "Команда",
};

function AdminDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { logout } = useAuth();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/requests");
      const data = await response.json();
      setRequests(data.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesSearch =
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (req.organization?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportCSV = () => {
    const headers = ["ID", "Дата", "Имя", "Email", "Телефон", "Организация", "Статус", "Источник"];
    const rows = filteredRequests.map((req) => [
      req.id,
      formatDate(req.createdAt),
      req.name,
      req.email,
      req.phone || "",
      req.organization || "",
      req.status,
      req.source || "",
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `requests_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const stats = {
    total: requests.length,
    new: requests.filter((r) => r.status === "new").length,
    inProgress: requests.filter((r) => r.status === "in_progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mr-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На сайт
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Админ-панель</h1>
            </div>
            <Button variant="outline" onClick={logout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Всего заявок</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Новые</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">В работе</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Обработано</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="requests" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Блог
            </TabsTrigger>
            <TabsTrigger value="cms" className="flex items-center" asChild>
              <Link href="/admin/cms">
                <Settings className="w-4 h-4 mr-2" />
                CMS
              </Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Заявки</CardTitle>
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Поиск..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full md:w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все статусы</SelectItem>
                        <SelectItem value="new">Новые</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="completed">Обработаны</SelectItem>
                        <SelectItem value="rejected">Отказ</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={exportCSV} className="flex items-center">
                      <Download className="w-4 h-4 mr-2" />
                      Экспорт
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    Заявки не найдены
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Дата</TableHead>
                          <TableHead>Имя</TableHead>
                          <TableHead>Организация</TableHead>
                          <TableHead>Контакты</TableHead>
                          <TableHead>Источник</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell className="text-sm text-gray-500">
                              {formatDate(request.createdAt)}
                            </TableCell>
                            <TableCell className="font-medium">{request.name}</TableCell>
                            <TableCell className="text-gray-500">{request.organization || "—"}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{request.email}</div>
                                {request.phone && <div className="text-gray-500">{request.phone}</div>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {sourceLabels[request.source || "main"] || request.source}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={statusConfig[request.status]?.color}>
                                <span className="flex items-center gap-1">
                                  {statusConfig[request.status]?.icon}
                                  {statusConfig[request.status]?.label}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Select value={request.status} onValueChange={(value) => updateStatus(request.id, value)}>
                                  <SelectTrigger className="w-auto h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">Новая</SelectItem>
                                    <SelectItem value="in_progress">В работе</SelectItem>
                                    <SelectItem value="completed">Обработана</SelectItem>
                                    <SelectItem value="rejected">Отказ</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Управление блогом</CardTitle>
                  <Button className="bg-gray-900 hover:bg-gray-800 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Создать пост
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Раздел управления блогом</p>
                  <p className="text-sm mt-2">Здесь вы сможете создавать и редактировать статьи</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Request Details Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Детали заявки</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={statusConfig[selectedRequest.status]?.color}>
                  <span className="flex items-center gap-1">
                    {statusConfig[selectedRequest.status]?.icon}
                    {statusConfig[selectedRequest.status]?.label}
                  </span>
                </Badge>
                <span className="text-sm text-gray-500">{formatDate(selectedRequest.createdAt)}</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500">Имя</label>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                {selectedRequest.organization && (
                  <div>
                    <label className="text-xs text-gray-500">Организация</label>
                    <p>{selectedRequest.organization}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs text-gray-500">Email</label>
                  <a href={`mailto:${selectedRequest.email}`} className="text-blue-600 hover:underline">
                    {selectedRequest.email}
                  </a>
                </div>
                {selectedRequest.phone && (
                  <div>
                    <label className="text-xs text-gray-500">Телефон</label>
                    <a href={`tel:${selectedRequest.phone}`} className="text-blue-600 hover:underline">
                      {selectedRequest.phone}
                    </a>
                  </div>
                )}
                {selectedRequest.description && (
                  <div>
                    <label className="text-xs text-gray-500">Описание проекта</label>
                    <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedRequest.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <AdminDashboard />;
}
