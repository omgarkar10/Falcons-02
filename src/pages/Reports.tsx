import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSummarizeOpen, setIsSummarizeOpen] = useState(false);
  const [newReport, setNewReport] = useState<{
    name: string;
    type: string;
    doctor: string;
    date: string;
    summary: string;
  }>({
    name: "",
    type: "Blood Test",
    doctor: "",
    date: new Date().toISOString().slice(0, 10),
    summary: "",
  });
  const [summarizeReportId, setSummarizeReportId] = useState<number | null>(null);
  const [summarizeText, setSummarizeText] = useState("");

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
    if (!newReport.name.trim()) {
      window.alert("Please enter a report name.");
      return;
    }

    if (!newReport.doctor.trim()) {
      window.alert("Please enter a doctor name.");
      return;
    }

    try {
      setBusyMessage("Uploading report...");
      const res = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newReport.name,
          type: newReport.type || "Other",
          doctor: newReport.doctor,
          date: newReport.date,
          summary: newReport.summary || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create report");
      }

      const created: Report = await res.json();
      setReports((prev) => [...prev, created].sort((a, b) => b.date.localeCompare(a.date)));
      setIsCreateOpen(false);
      setNewReport({
        name: "",
        type: "Blood Test",
        doctor: "",
        date: new Date().toISOString().slice(0, 10),
        summary: "",
      });
    } catch (err) {
      console.error(err);
      window.alert("Failed to upload report. Please try again.");
    } finally {
      setBusyMessage(null);
    }
  };

  const handleSummarize = async () => {
    if (!reports.length || summarizeReportId == null) {
      window.alert("No reports available. Please create a report first.");
      return;
    }

    if (!summarizeText.trim()) {
      window.alert("Please paste the report text to summarize.");
      return;
    }

    try {
      setBusyMessage("Generating AI summary...");
      const res = await fetch(`${API_BASE_URL}/api/reports/${summarizeReportId}/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: summarizeText, save: true }),
      });

      if (!res.ok) {
        throw new Error("Failed to summarize report");
      }

      const data: { summary: string } = await res.json();
      setReports((prev) =>
        prev.map((r) => (r.id === summarizeReportId ? { ...r, summary: data.summary } : r))
      );
      setIsSummarizeOpen(false);
      setSummarizeText("");
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
          onClick={() => setIsCreateOpen(true)}
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
              onClick={() => {
                if (reports.length && summarizeReportId == null) {
                  setSummarizeReportId(reports[0].id);
                }
                setIsSummarizeOpen(true);
              }}
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

      {/* Create Report Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload report</DialogTitle>
            <DialogDescription>
              Add a new medical report. You can generate an AI summary later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Report name</label>
              <Input
                value={newReport.name}
                onChange={(e) => setNewReport((r) => ({ ...r, name: e.target.value }))}
                placeholder="e.g. Complete Blood Count"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Type</label>
              <Input
                value={newReport.type}
                onChange={(e) => setNewReport((r) => ({ ...r, type: e.target.value }))}
                placeholder="e.g. Blood Test, Imaging"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Doctor</label>
              <Input
                value={newReport.doctor}
                onChange={(e) => setNewReport((r) => ({ ...r, doctor: e.target.value }))}
                placeholder="e.g. Dr. Smith"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={newReport.date}
                onChange={(e) => setNewReport((r) => ({ ...r, date: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Optional notes / summary</label>
              <Textarea
                value={newReport.summary}
                onChange={(e) => setNewReport((r) => ({ ...r, summary: e.target.value }))}
                placeholder="Short description of this report"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadReport} disabled={!!busyMessage}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Summarize Dialog */}
      <Dialog open={isSummarizeOpen} onOpenChange={setIsSummarizeOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>AI Report Summarizer</DialogTitle>
            <DialogDescription>
              Choose a report and paste the raw text you want summarized into plain language.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Report</label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={summarizeReportId ?? ""}
                onChange={(e) =>
                  setSummarizeReportId(e.target.value ? Number(e.target.value) : null)
                }
              >
                <option value="">Select a report</option>
                {reports.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.date}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Report text</label>
              <Textarea
                value={summarizeText}
                onChange={(e) => setSummarizeText(e.target.value)}
                placeholder="Paste the original report text here..."
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSummarizeOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSummarize} disabled={!!busyMessage}>
              Generate summary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
