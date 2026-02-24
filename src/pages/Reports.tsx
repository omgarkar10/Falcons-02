import { useState } from "react";
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

const mockReports: Report[] = [
  { id: 1, name: "Complete Blood Count", type: "Blood Test", doctor: "Dr. Smith", date: "2026-02-20", summary: "All values within normal range." },
  { id: 2, name: "Chest X-Ray", type: "Imaging", doctor: "Dr. Patel", date: "2026-02-15" },
  { id: 3, name: "Lipid Panel", type: "Blood Test", doctor: "Dr. Johnson", date: "2026-02-10", summary: "Slightly elevated LDL cholesterol." },
  { id: 4, name: "Thyroid Function Test", type: "Blood Test", doctor: "Dr. Lee", date: "2026-01-28" },
  { id: 5, name: "ECG Report", type: "Cardiology", doctor: "Dr. Williams", date: "2026-01-20", summary: "Normal sinus rhythm." },
];

const typeColors: Record<string, string> = {
  "Blood Test": "bg-health-teal/15 text-health-teal",
  Imaging: "bg-health-purple/15 text-health-purple",
  Cardiology: "bg-health-coral/15 text-health-coral",
};

const Reports = () => {
  const [search, setSearch] = useState("");
  const filtered = mockReports.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase())
  );

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
        <Button className="gradient-primary border-0 text-primary-foreground gap-2">
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
            <Button variant="outline" size="sm" className="shrink-0">Try it</Button>
          </CardContent>
        </Card>
      </motion.div>

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
