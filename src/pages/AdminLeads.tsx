import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminLogin, leadsQuery, Lead, mediaQuery, MediaItem, createMedia } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { format } from "date-fns";
import { Images, Loader2, LogOut, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MEDIA_SECTION_OPTIONS = [
  { value: "hero-primary", label: "Hero – Primary Banner", description: "Homepage hero background" },
  { value: "gallery", label: "Gallery", description: "Facility slideshow images" },
  { value: "life-community", label: "Life – Community", description: "Left image in Life at Vital Health" },
  { value: "life-activities", label: "Life – Activities", description: "Right image in Life at Vital Health" },
  { value: "location-hero", label: "Location – Hero", description: "Large image in Location section" },
  { value: "location-grid", label: "Location – Grid", description: "Small photo grid (first 3 positions)" },
] as const;

const AdminLeads = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [token, setToken] = useState(() => localStorage.getItem("vh_admin_token"));
  const [activeTab, setActiveTab] = useState("leads");
  const [mediaHeading, setMediaHeading] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaSection, setMediaSection] = useState(MEDIA_SECTION_OPTIONS[0]?.value ?? "hero-primary");
  const [mediaPosition, setMediaPosition] = useState("");
  const [mediaImageUrl, setMediaImageUrl] = useState<string | undefined>();
  const [mediaPublicId, setMediaPublicId] = useState<string | undefined>();

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

  const {
    data: mediaItems,
    isLoading: isMediaLoading,
    isError: isMediaError,
    error: mediaError,
    refetch: refetchMedia,
    isFetching: isMediaFetching,
  } = useQuery(mediaQuery(token ?? ""));

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

  const { mutateAsync: saveMedia, isPending: isSavingMedia } = useMutation({
    mutationFn: async (payload: {
      heading: string;
      description?: string;
      section?: string;
      position?: number;
      imageUrl: string;
      publicId?: string;
    }) => {
      if (!token) {
        throw new Error("Missing auth token");
      }
      return createMedia(token, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["media", token] });
      refetchMedia();
      setMediaHeading("");
      setMediaDescription("");
      setMediaSection("");
      setMediaPosition("");
      setMediaImageUrl(undefined);
      setMediaPublicId(undefined);
      toast({ title: "Media saved", description: "Image added to the media library." });
    },
    onError: (err) => {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Unable to save media",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("vh_admin_token");
    setToken(null);
    queryClient.removeQueries({ queryKey: ["leads"] });
    queryClient.removeQueries({ queryKey: ["media"] });
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
          <p className="text-sm font-semibold uppercase text-primary tracking-wider">Admin Control Center</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Vital Health Back Office</h1>
          <p className="text-slate-600 max-w-2xl">
            Review every lead and manage the media shown on the public site. Upload new images with clear headings,
            section names, and display positions.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleLogout} variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Images className="h-3.5 w-3.5" /> Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Section reference</p>
                  <div className="grid gap-2 text-sm text-slate-600">
                    {MEDIA_SECTION_OPTIONS.map((option) => (
                      <div key={option.value} className="flex flex-col border border-slate-100 rounded-lg p-3">
                        <span className="font-semibold text-slate-900">{option.label}</span>
                        <span className="text-xs uppercase tracking-wide text-primary">Key: {option.value}</span>
                        <span className="text-xs text-slate-500">{option.description}</span>
                      </div>
                    ))}
                    <p className="text-xs text-slate-500">
                      Need a new placement? Use a descriptive heading and let us know so we can wire it up on the public page.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase text-primary tracking-widest">New Media</p>
                  <h2 className="text-2xl font-heading font-semibold text-slate-900 mt-1">Upload image</h2>
                  <p className="text-sm text-slate-500">
                    Add clear headings (e.g., "Hero - Primary"), specify the public-facing section, and set a display position
                    number (lower numbers appear first).
                  </p>
                </div>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!mediaImageUrl) {
                      toast({ title: "Missing image", description: "Upload an image first.", variant: "destructive" });
                      return;
                    }
                    await saveMedia({
                      heading: mediaHeading,
                      description: mediaDescription || undefined,
                      section: mediaSection || undefined,
                      position: mediaPosition ? Number(mediaPosition) : undefined,
                      imageUrl: mediaImageUrl,
                      publicId: mediaPublicId,
                    });
                  }}
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Heading / Display name</label>
                    <Input value={mediaHeading} onChange={(e) => setMediaHeading(e.target.value)} required placeholder="Hero banner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Section / Placement</label>
                    <Select value={mediaSection} onValueChange={(value) => setMediaSection(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose where this appears" />
                      </SelectTrigger>
                      <SelectContent>
                        {MEDIA_SECTION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-slate-500">
                      Section keys power the live site. Pick the placement that matches where this image should render.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Position</label>
                    <Input
                      type="number"
                      min={0}
                      value={mediaPosition}
                      onChange={(e) => setMediaPosition(e.target.value)}
                      placeholder="1"
                    />
                    <p className="text-xs text-slate-500">Lower numbers appear first inside that section (e.g., gallery order).</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Description / Notes</label>
                    <Textarea
                      value={mediaDescription}
                      onChange={(e) => setMediaDescription(e.target.value)}
                      placeholder="Optional guidance on where this shows up"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Image file</label>
                    <ImageUpload
                      value={mediaImageUrl}
                      onChange={setMediaImageUrl}
                      onUploadComplete={(result) => setMediaPublicId(result.publicId)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSavingMedia}>
                    {isSavingMedia ? "Saving..." : "Publish image"}
                  </Button>
                </form>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase text-primary tracking-widest">Media Library</p>
                    <h2 className="text-2xl font-heading font-semibold text-slate-900">Current images</h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => refetchMedia()} disabled={isMediaFetching}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isMediaFetching ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>
                {isMediaLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : isMediaError ? (
                  <div className="text-sm text-red-500">
                    Failed to load media. {(mediaError as Error)?.message}
                  </div>
                ) : (mediaItems?.length ?? 0) === 0 ? (
                  <div className="text-sm text-slate-500">No media uploaded yet.</div>
                ) : (
                  <div className="space-y-4 max-h-[32rem] overflow-y-auto pr-2">
                    {mediaItems?.map((item: MediaItem) => (
                      <div key={item.id} className="flex gap-4 border border-slate-100 rounded-xl p-3">
                        <img
                          src={item.image_url}
                          alt={item.heading}
                          className="w-32 h-24 object-cover rounded-lg border"
                        />
                        <div className="space-y-1">
                          <p className="font-semibold text-slate-900">{item.heading}</p>
                          <p className="text-xs uppercase tracking-wide text-slate-500">{item.section || "Unassigned section"}</p>
                          <p className="text-sm text-slate-600 line-clamp-2">{item.description || "No description"}</p>
                          <p className="text-xs text-slate-400">Position: {item.position ?? "—"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
;

export default AdminLeads;
