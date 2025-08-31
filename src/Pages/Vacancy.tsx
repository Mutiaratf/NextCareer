import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "components/ui/card";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Badge } from "components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "components/ui/dialog";
import { Search, MapPin, Calendar, DollarSign, Clock, Banknote } from "lucide-react";

const API_URL = "https://final-project-api-alpha.vercel.app/api/jobs";
const FALLBACK_LOGO = "https://via.placeholder.com/64?text=Logo";

type WorkType = "Remote" | "Onsite" | "Hybrid";
type JobStatus = "Open" | "Closed";

interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: WorkType;
  status: JobStatus;
  fee: string;
  description: string;
  requirements: string[];
  posted: string; // API tidak punya; kita isi "—"
}

// Bentuk data dari API
interface ApiJob {
  id?: string | number;
  _id?: string;
  title: string;
  job_description: string;
  job_qualification: string; // string, dipisah koma
  job_type: string; // onSite / work from home / hybird
  job_tenure?: string;
  job_status: number; // 0 tutup, 1 buka
  company_name: string;
  company_image_url: string;
  company_city: string;
  salary_min?: number;
  salary_max?: number;
  createdAt?: string;
}

function formatPosted(input?: string): string {
  if (!input) return "—";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(d);
}

const normalizeType = (t?: string): WorkType => {
  const s = (t || "").toLowerCase().replace(/\s+/g, "");
  if (["workfromhome", "wfh", "remote"].includes(s)) return "Remote";
  if (["onsite", "onsite"].includes(s)) return "Onsite";
  if (["hybrid", "hybird"].includes(s)) return "Hybrid";
  // default fallback
  return "Onsite";
};

const statusToLabel = (n?: number): JobStatus => (n === 1 ? "Open" : "Closed");

const toJuta = (n?: number) => (typeof n === "number" ? Math.round(n / 1_000_000) : undefined);
const formatSalary = (min?: number, max?: number) => {
  if (!min && !max) return "—";
  const mi = toJuta(min) ?? toJuta(max);
  const ma = toJuta(max) ?? toJuta(min);
  if (mi && ma) return `Rp ${mi}-${ma} juta`;
  return `Rp ${mi ?? ma} juta`;
};

const splitRequirements = (q?: string) =>
  (q || "")
    .split(/,|\n|•|-/)
    .map((s) => s.trim())
    .filter(Boolean);

const mapApiJobToJob = (api: ApiJob): Job => ({
  id: String(api.id ?? api._id ?? crypto.randomUUID()),
  title: api.title ?? "—",
  company: api.company_name ?? "—",
  logo: api.company_image_url || FALLBACK_LOGO,
  location: api.company_city ?? "—",
  type: normalizeType(api.job_type),
  status: statusToLabel(api.job_status),
  fee: formatSalary(api.salary_min, api.salary_max),
  description: api.job_description ?? "",
  requirements: splitRequirements(api.job_qualification),
  posted: formatPosted(api.createdAt),
 // API tidak menyediakan; kamu bisa ganti jika API menambah field tanggal
});

const getStatusColor = (status: JobStatus) => {
  if (status === "Open") return "bg-green-100 text-green-800";
  return "bg-red-100 text-red-800";
};

const getTypeColor = (type: WorkType) => {
  switch (type) {
    case "Remote":
      return "bg-blue-100 text-blue-800";
    case "Onsite":
      return "bg-purple-100 text-purple-800";
    case "Hybrid":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Vacancy = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
  const controller = new AbortController();

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL, {
        signal: controller.signal,                 // cancel kalau unmount
        headers: { "Cache-Control": "no-store", Pragma: "no-cache" }, // mirip fetch {cache:'no-store'}
      });

      const json = res.data;
      // payload bisa array langsung atau { data: [...] } / { jobs: [...] }
      const raw: ApiJob[] = Array.isArray(json)
        ? json
        : (json?.data || json?.jobs || []);
      const mapped = raw.map(mapApiJobToJob);
      setJobs(mapped);
    } catch (e: any) {
      // abaikan kalau dibatalkan
      if (axios.isCancel?.(e)) return;
      console.error(e);
      setError("Gagal memuat data lowongan. Coba refresh atau cek koneksi.");
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
  return () => controller.abort(); // cleanup
}, []);

  const filteredJobs = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(term) || job.company.toLowerCase().includes(term);
      const matchesLocation = locationFilter === "all" || job.location === locationFilter;
      const matchesType = typeFilter === "all" || job.type === (typeFilter as WorkType);
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const locationOptions = useMemo(() => {
    const set = new Set(jobs.map((j) => j.location).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [jobs]);

  const typeOptions: Array<"all" | WorkType> = ["all", "Remote", "Onsite", "Hybrid"];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing career opportunities from top companies across Indonesia
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locationOptions.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc === "all" ? "All Locations" : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Work Type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t === "all" ? "All Types" : t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("all");
                  setTypeFilter("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-12 text-muted-foreground">Memuat lowongan…</div>
        )}
        {error && (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        )}

        {/* Job Results */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Dialog key={job.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-12 gap-4">
                          {/* Logo Column */}
                          <div className="col-span-3 flex justify-center items-start">
                            <img
                              src={job.logo || FALLBACK_LOGO}
                              alt={`${job.company} logo`}
                              className="w-16 h-16 rounded-lg object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = FALLBACK_LOGO;
                              }}
                            />
                          </div>

                          {/* Content Column */}
                          <div className="col-span-9 space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-semibold text-foreground line-clamp-2">
                                {job.title}
                              </h3>
                              <Badge className={getStatusColor(job.status)} variant="secondary">
                                {job.status}
                              </Badge>
                            </div>

                            <div className="text-muted-foreground">
                              <span className="font-medium text-foreground">{job.company}</span>
                            </div>

                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{job.location}</span>
                              <Badge className={`ml-2 ${getTypeColor(job.type)}`} variant="secondary">
                                {job.type}
                              </Badge>
                            </div>


                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(job.status)} variant="secondary">
                          {job.status}
                        </Badge>
                        <Badge className={getTypeColor(job.type)} variant="secondary">
                          {job.type}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <img
                            src={job.logo || FALLBACK_LOGO}
                            alt={`${job.company} logo`}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = FALLBACK_LOGO;
                            }}
                          />
                          <div>
                            <p className="text-sm text-muted-foreground">Company</p>
                            <p className="font-medium">{job.company}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-3 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{job.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Banknote className="w-5 h-5 mr-3 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Salary</p>
                            <p className="font-medium">{job.fee}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-3 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Posted</p>
                            <p className="font-medium">{job.posted}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                        <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 text-white">Apply Now</Button>
                        <Button variant="outline">Save Job</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Vacancy;
