import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminLogin, leadsQuery, Lead } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2, LogOut, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLeads = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [token, setToken] = useState(() => localStorage.getItem("vh_admin_token"));

  const {
    data: leads,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    ...leadsQuery(token ?? ""),
    enabled: Boolean(token),
    refetchInterval: token ? 60000 : false,
  });

  const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
    mutationFn: adminLogin,
    onSuccess: (accessToken) => {
      localStorage.setItem("vh_admin_token", accessToken);
      setToken(accessToken);
      toast({ title: "Logged in", description: "Admin session active." });
    },
    onError: (err) => {
      toast({
        title: "Login failed",
        description: err instanceof Error ? err.message : "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("vh_admin_token");
    setToken(null);
    queryClient.removeQueries({ queryKey: ["leads"] });
  };

  const uniqueRoles = useMemo(
    () => Array.from(new Set((leads || []).map((lead) => lead.role).filter((role): role is string => Boolean(role)))),
    [leads],
  );

  const filteredLeads = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return (leads || []).filter((lead) => {
      const matchesSearch =
        !query ||
        lead.full_name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.phone ?? "").toLowerCase().includes(query);

      const matchesRole = roleFilter === "all" || (lead.role ?? "").toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [leads, searchQuery, roleFilter]);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold uppercase text-primary tracking-widest">Admin Access</p>
            <h1 className="text-3xl font-heading font-bold text-slate-900">Lead Dashboard Login</h1>
            <p className="text-slate-500 text-sm">Use your assigned email and password to continue.</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await login({
                email: formData.get("email") as string,
                password: formData.get("password") as string,
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
              <Input name="email" type="email" placeholder="you@example.com" required defaultValue="vitalhealthva@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
              <Input name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-xs text-center text-slate-400">Access is restricted to Vital Health administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase text-primary tracking-wider">Leads Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Placement Inquiries</h1>
          <p className="text-slate-600 max-w-2xl">
            Review every lead coming from the public contact form. Search, filter, and refresh in real time to keep your
            placement pipeline moving.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleLogout} variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm">Total Leads</p>
            <p className="text-3xl font-bold mt-1">{leads?.length ?? 0}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm">Filtered</p>
            <p className="text-3xl font-bold mt-1">{filteredLeads.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-3">
            <Button onClick={() => refetch()} variant="outline" className="gap-2" disabled={isFetching}>
              <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <span className="text-xs text-slate-500">Auto-refresh every 60s</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or phone"
              className="w-full md:max-w-sm"
            />
            <div className="flex items-center gap-3">
              <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <div className="p-6 text-center text-red-500">
              Failed to load leads. {(error as Error)?.message}
              <div className="mt-4">
                <Button onClick={() => refetch()}>Retry</Button>
              </div>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-6 text-center text-slate-500">No leads match your filters yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead className="text-right">Received</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-semibold text-slate-900">{lead.full_name}</TableCell>
                      <TableCell>
                        <a className="text-primary hover:underline" href={`mailto:${lead.email}`}>
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {lead.phone ? (
                          <a className="text-primary hover:underline" href={`tel:${lead.phone}`}>
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">{lead.role || "—"}</TableCell>
                      <TableCell className="max-w-xs text-sm text-slate-600">{lead.message || "—"}</TableCell>
                      <TableCell className="text-right text-sm text-slate-500">
                        {format(new Date(lead.created_at), "MMM d, yyyy h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
