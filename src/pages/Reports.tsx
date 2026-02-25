import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Search, Calendar, User, Sparkles } from "lucide-react";

type Report = {
  id: number;
  name: string;
  type: string;
  doctor: string;
  date: string;
  summary?: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const typeColors: Record<string, string> = {
  "Blood Test": "bg-health-teal/15 text-health-teal",
  Imaging: "bg-health-purple/15 text-health-purple",
  Cardiology: "bg-health-coral/15 text-health-coral",
};

const Reports = () => {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyMessage, setBusyMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/api/reports`);
        if (!res.ok) {
          throw new Error("Failed to load reports");
        }
        const data: Report[] = await res.json();
        setReports(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const filtered = reports.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.doctor.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    );
  });

  const handleUploadReport = async () => {
    const name = window.prompt("Report name");
    if (!name) return;

    const type = window.prompt("Report type (e.g. Blood Test, Imaging)") || "Other";
    const doctor = window.prompt("Doctor name") || "Unknown";
    const date =
      window.prompt("Report date (YYYY-MM-DD)", new Date().toISOString().slice(0, 10)) ||
      new Date().toISOString().slice(0, 10);

    const summary = window.prompt("Optional summary (you can also use AI later)") || undefined;

    try {
      setBusyMessage("Uploading report...");
      const res = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, type, doctor, date, summary }),
      });

      if (!res.ok) {
        throw new Error("Failed to create report");
      }

      const created: Report = await res.json();
      setReports((prev) => [...prev, created].sort((a, b) => b.date.localeCompare(a.date)));
    } catch (err) {
      console.error(err);
      window.alert("Failed to upload report. Please try again.");
    } finally {
      setBusyMessage(null);
    }
  };

  const handleSummarize = async () => {
    if (!reports.length) {
      window.alert("No reports available. Please create a report first.");
      return;
    }

    const defaultId = String(reports[0].id);
    const idInput = window.prompt(
      `Enter the ID of the report to summarize (e.g. ${defaultId})`,
      defaultId
    );
    if (!idInput) return;

    const id = Number(idInput);
    if (!Number.isFinite(id)) {
      window.alert("Invalid report ID.");
      return;
    }

    const text = window.prompt("Paste the raw report text that you want summarized:");
    if (!text || !text.trim()) return;

    try {
      setBusyMessage("Generating AI summary...");
      const res = await fetch(`${API_BASE_URL}/api/reports/${id}/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, save: true }),
      });

      if (!res.ok) {
        throw new Error("Failed to summarize report");
      }

      const data: { summary: string } = await res.json();
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, summary: data.summary } : r))
      );
    } catch (err) {
      console.error(err);
      window.alert("Failed to generate summary. Please try again.");
    } finally {
      setBusyMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Medical Reports</h1>
        <p className="text-muted-foreground mt-1">Upload, view and AI-summarize your reports</p>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          className="gradient-primary border-0 text-primary-foreground gap-2"
          onClick={handleUploadReport}
          disabled={!!busyMessage}
        >
          <Upload className="w-4 h-4" /> Upload Report
        </Button>
      </div>

      {/* AI Summary CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">AI Report Summarizer</p>
              <p className="text-sm text-muted-foreground">Upload any medical report and get an instant plain-language summary</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={handleSummarize}
              disabled={!!busyMessage}
            >
              Try it
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {busyMessage && (
        <p className="text-xs text-muted-foreground">{busyMessage}</p>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      {/* Reports List */}
      <div className="space-y-3">
        {filtered.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">{report.name}</p>
                    <Badge variant="secondary" className={typeColors[report.type] || ""}>
                      {report.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{report.doctor}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{report.date}</span>
                  </div>
                  {report.summary && (
                    <p className="text-xs mt-2 text-muted-foreground bg-muted/50 p-2 rounded-md">
                      <Sparkles className="w-3 h-3 inline mr-1 text-primary" />
                      {report.summary}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
