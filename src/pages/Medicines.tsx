import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pill, Plus, Clock, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

type Medicine = {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  adherence: number;
  active: boolean;
  createdAt?: string;
  prescriptions?: Prescription[];
};

type Prescription = {
  id: number;
  medicineId: number;
  originalFilename: string;
  contentType?: string;
  uploadedAt: string;
  downloadUrl: string;
};

const API_BASE_URL = "http://localhost:5000";

const pillSchedule = [
  { time: "8:00 AM", meds: ["Amoxicillin 500mg", "Metformin 850mg", "Lisinopril 10mg"], taken: [true, true, true] },
  { time: "2:00 PM", meds: ["Amoxicillin 500mg"], taken: [true] },
  { time: "8:00 PM", meds: ["Amoxicillin 500mg", "Metformin 850mg"], taken: [false, false] },
];

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    doctor: "",
    adherence: 0,
  });

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/medicines`);
      if (!res.ok) {
        throw new Error("Failed to load medicines");
      }
      const data: Medicine[] = await res.json();
      setMedicines(data);
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMedicines();
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "adherence" ? Number(value) || 0 : value,
    }));
  };

  const handleAddMedicine = async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          adherence: Math.max(0, Math.min(100, form.adherence)),
          active: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to add medicine");
      }

      setForm({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        doctor: "",
        adherence: 0,
      });
      setIsAddOpen(false);
      await fetchMedicines();
    } catch (err) {
      setError((err as Error).message || "Failed to add medicine");
    }
  };

  const handleUploadPrescription = async (
    medicineId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        `${API_BASE_URL}/api/medicines/${medicineId}/prescriptions`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to upload prescription");
      }

      event.target.value = "";
      await fetchMedicines();
    } catch (err) {
      setError((err as Error).message || "Failed to upload prescription");
    }
  };

  const activeMedicines = medicines.filter((m) => m.active);
  const pastMedicines = medicines.filter((m) => !m.active);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Medicines & Prescriptions</h1>
        <p className="text-muted-foreground mt-1">Track your medications and adherence</p>
      </motion.div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary border-0 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" /> Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Medicine</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Amoxicillin"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  value={form.dosage}
                  onChange={(e) => handleChange("dosage", e.target.value)}
                  placeholder="500mg"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={form.frequency}
                  onChange={(e) => handleChange("frequency", e.target.value)}
                  placeholder="3x daily"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="7 days"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="doctor">Prescribing Doctor</Label>
                <Input
                  id="doctor"
                  value={form.doctor}
                  onChange={(e) => handleChange("doctor", e.target.value)}
                  placeholder="Dr. Smith"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="adherence">Adherence (%)</Label>
                <Input
                  id="adherence"
                  type="number"
                  min={0}
                  max={100}
                  value={form.adherence}
                  onChange={(e) => handleChange("adherence", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMedicine} disabled={loading}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-secondary" /> AI Schedule Suggestions
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medicine List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-display text-lg font-semibold">Active Medications</h2>
          {loading && medicines.length === 0 && (
            <p className="text-sm text-muted-foreground">Loading medicines...</p>
          )}
          {!loading && activeMedicines.length === 0 && (
            <p className="text-sm text-muted-foreground">No active medicines yet.</p>
          )}
          {activeMedicines.map((med, i) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-health-purple/15 flex items-center justify-center shrink-0">
                      <Pill className="w-5 h-5 text-health-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{med.name} <span className="text-muted-foreground font-normal text-sm">{med.dosage}</span></p>
                        <Badge variant="secondary" className="bg-health-green/15 text-health-green">Active</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{med.frequency}</span>
                        <span>{med.duration}</span>
                        <span>{med.doctor}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Adherence</span>
                          <span className="font-semibold">{med.adherence}%</span>
                        </div>
                        <Progress value={med.adherence} className="h-2" />
                        <div className="mt-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs text-muted-foreground">
                              Upload prescription
                            </span>
                            <Input
                              type="file"
                              accept="image/*,application/pdf"
                              className="max-w-[200px] cursor-pointer"
                              onChange={(e) => void handleUploadPrescription(med.id, e)}
                            />
                          </div>
                          {med.prescriptions && med.prescriptions.length > 0 && (
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">
                                Prescriptions
                              </p>
                              <ul className="space-y-0.5">
                                {med.prescriptions.map((p) => (
                                  <li key={p.id}>
                                    <a
                                      href={`${API_BASE_URL}${p.downloadUrl}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-xs text-primary underline"
                                    >
                                      {p.originalFilename}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <h2 className="font-display text-lg font-semibold mt-6">Past Medications</h2>
          {!loading && pastMedicines.length === 0 && (
            <p className="text-sm text-muted-foreground">No past medicines.</p>
          )}
          {pastMedicines.map((med) => (
            <Card key={med.id} className="opacity-60">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Pill className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{med.name} {med.dosage}</p>
                  <p className="text-xs text-muted-foreground">{med.frequency} · {med.doctor}</p>
                </div>
                <Badge variant="secondary" className="ml-auto">Completed</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Schedule */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pillSchedule.map((slot, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-semibold text-primary">{slot.time}</p>
                  {slot.meds.map((med, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm pl-3">
                      {slot.taken[j] ? (
                        <CheckCircle2 className="w-4 h-4 text-health-green shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-health-coral shrink-0" />
                      )}
                      <span className={slot.taken[j] ? "line-through text-muted-foreground" : ""}>{med}</span>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Medicines;
