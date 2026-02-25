import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  doctor: string;
  adherence: number;
  active: boolean;
  timeOfDay?: "morning" | "afternoon" | "evening" | "unscheduled";
  timeOfDaySlots?: ("morning" | "afternoon" | "evening")[];
  createdAt?: string;
  prescriptions?: Prescription[];
};

type Prescription = {
  id: string;
  medicineId: string;
  originalFilename: string;
  contentType?: string;
  uploadedAt: string;
  downloadUrl: string;
};

const API_BASE_URL = "http://localhost:5000";

const Medicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    duration: "",
    doctor: "",
    timeOfDaySlots: [] as ("morning" | "afternoon" | "evening")[],
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
      const message = (err as Error).message;
      if (message && message.includes("Failed to fetch")) {
        setError("Could not connect to the backend. Please make sure the backend server is running.");
      } else {
        setError(message || "Something went wrong");
      }
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
      [field]: value,
    }));
  };

  const toggleTimeSlot = (slot: "morning" | "afternoon" | "evening") => {
    setForm((prev) => {
      const exists = prev.timeOfDaySlots.includes(slot);
      return {
        ...prev,
        timeOfDaySlots: exists
          ? prev.timeOfDaySlots.filter((s) => s !== slot)
          : [...prev.timeOfDaySlots, slot],
      };
    });
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
          name: form.name,
          dosage: form.dosage,
          duration: form.duration,
          doctor: form.doctor,
          timeOfDaySlots: form.timeOfDaySlots,
          active: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to add medicine");
      }

      const created: Medicine = await res.json();

      if (prescriptionFile) {
        const formData = new FormData();
        formData.append("file", prescriptionFile);
        await fetch(
          `${API_BASE_URL}/api/medicines/${created.id}/prescriptions`,
          {
            method: "POST",
            body: formData,
          },
        ).catch(() => {
          // Ignore upload errors here; they can retry from the card upload control.
        });
      }

      setForm({
        name: "",
        dosage: "",
        duration: "",
        doctor: "",
        timeOfDaySlots: [],
      });
      setPrescriptionFile(null);
      setIsAddOpen(false);
      await fetchMedicines();
    } catch (err) {
      setError((err as Error).message || "Failed to add medicine");
    }
  };

  const handleUploadPrescription = async (
    medicineId: string,
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

  const getSlotsForMed = (med: Medicine) => {
    if (med.timeOfDaySlots && med.timeOfDaySlots.length > 0) {
      return med.timeOfDaySlots;
    }
    if (med.timeOfDay && med.timeOfDay !== "unscheduled") {
      return [med.timeOfDay];
    }
    return [];
  };

  const morningMeds = activeMedicines.filter((m) =>
    getSlotsForMed(m).includes("morning"),
  );
  const afternoonMeds = activeMedicines.filter((m) =>
    getSlotsForMed(m).includes("afternoon"),
  );
  const eveningMeds = activeMedicines.filter((m) =>
    getSlotsForMed(m).includes("evening"),
  );

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
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={form.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  placeholder="7 days"
                />
              </div>
              <div className="space-y-1">
                <Label>Time of day</Label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.timeOfDaySlots.includes("morning")}
                      onCheckedChange={() => toggleTimeSlot("morning")}
                    />
                    <span>Morning</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.timeOfDaySlots.includes("afternoon")}
                      onCheckedChange={() => toggleTimeSlot("afternoon")}
                    />
                    <span>Afternoon</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.timeOfDaySlots.includes("evening")}
                      onCheckedChange={() => toggleTimeSlot("evening")}
                    />
                    <span>Evening</span>
                  </label>
                </div>
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
                <Label htmlFor="prescription">Prescription (optional)</Label>
                <Input
                  id="prescription"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) =>
                    setPrescriptionFile(e.target.files?.[0] ?? null)
                  }
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
                        <span>{med.duration}</span>
                        <span>{med.doctor}</span>
                      </div>
                      <div className="mt-3">
                        <div className="mt-1 flex flex-col gap-2">
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
                  <p className="text-xs text-muted-foreground">{med.duration} · {med.doctor}</p>
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
              {activeMedicines.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No medicines scheduled for today yet.
                </p>
              ) : (
                <div className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-semibold text-primary">Morning</p>
                    {morningMeds.length === 0 ? (
                      <p className="text-xs text-muted-foreground pl-4">
                        No morning medicines.
                      </p>
                    ) : (
                      morningMeds.map((med) => (
                        <div
                          key={med.id}
                          className="flex items-center gap-2 pl-4"
                        >
                          <CheckCircle2 className="w-4 h-4 text-health-green shrink-0" />
                          <span>
                            {med.name}{" "}
                            <span className="text-muted-foreground text-xs">
                              {med.dosage}
                            </span>
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-primary">Afternoon</p>
                    {afternoonMeds.length === 0 ? (
                      <p className="text-xs text-muted-foreground pl-4">
                        No afternoon medicines.
                      </p>
                    ) : (
                      afternoonMeds.map((med) => (
                        <div
                          key={med.id}
                          className="flex items-center gap-2 pl-4"
                        >
                          <CheckCircle2 className="w-4 h-4 text-health-green shrink-0" />
                          <span>
                            {med.name}{" "}
                            <span className="text-muted-foreground text-xs">
                              {med.dosage}
                            </span>
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-primary">Evening</p>
                    {eveningMeds.length === 0 ? (
                      <p className="text-xs text-muted-foreground pl-4">
                        No evening medicines.
                      </p>
                    ) : (
                      eveningMeds.map((med) => (
                        <div
                          key={med.id}
                          className="flex items-center gap-2 pl-4"
                        >
                          <CheckCircle2 className="w-4 h-4 text-health-green shrink-0" />
                          <span>
                            {med.name}{" "}
                            <span className="text-muted-foreground text-xs">
                              {med.dosage}
                            </span>
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Medicines;
