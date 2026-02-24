import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, MapPin, Clock, User, Stethoscope } from "lucide-react";

type Appointment = {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
};

const mockAppointments: Appointment[] = [
  { id: 1, doctor: "Dr. Sarah Smith", specialty: "General Physician", date: "2026-02-26", time: "10:00 AM", location: "City Medical Center", status: "upcoming", notes: "Annual checkup" },
  { id: 2, doctor: "Dr. Raj Patel", specialty: "Cardiologist", date: "2026-03-02", time: "2:30 PM", location: "Heart Care Clinic", status: "upcoming" },
  { id: 3, doctor: "Dr. Emily Johnson", specialty: "Endocrinologist", date: "2026-03-10", time: "11:00 AM", location: "Metro Hospital", status: "upcoming", notes: "Thyroid follow-up" },
  { id: 4, doctor: "Dr. Michael Lee", specialty: "Dermatologist", date: "2026-02-18", time: "3:00 PM", location: "Skin Health Clinic", status: "completed" },
  { id: 5, doctor: "Dr. Lisa Williams", specialty: "Orthopedist", date: "2026-02-10", time: "9:00 AM", location: "Bone & Joint Center", status: "cancelled" },
];

const statusConfig: Record<string, { bg: string; text: string }> = {
  upcoming: { bg: "bg-health-blue/15", text: "text-health-blue" },
  completed: { bg: "bg-health-green/15", text: "text-health-green" },
  cancelled: { bg: "bg-destructive/15", text: "text-destructive" },
};

const Appointments = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");
  const filtered = filter === "all" ? mockAppointments : mockAppointments.filter((a) => a.status === filter);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Doctor Appointments</h1>
        <p className="text-muted-foreground mt-1">Manage your upcoming and past appointments</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2 flex-wrap">
          {(["all", "upcoming", "completed", "cancelled"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "gradient-primary border-0 text-primary-foreground" : ""}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
        <Button className="gradient-primary border-0 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Book Appointment
        </Button>
      </div>

      {/* Upcoming highlight */}
      {filter !== "completed" && filter !== "cancelled" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          {mockAppointments.filter(a => a.status === "upcoming").slice(0, 1).map((apt) => (
            <Card key={apt.id} className="border-primary/30 border-2 gradient-primary text-primary-foreground">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">Next Appointment</p>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-xl font-display font-bold">{apt.doctor}</p>
                    <p className="text-sm opacity-80">{apt.specialty}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm opacity-90">
                      <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4" />{apt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{apt.time}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{apt.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* List */}
      <div className="space-y-3">
        {filtered.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold">{apt.doctor}</p>
                    <Badge className={`${statusConfig[apt.status].bg} ${statusConfig[apt.status].text} border-0`}>
                      {apt.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" />{apt.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{apt.location}</span>
                  </div>
                  {apt.notes && <p className="text-xs text-muted-foreground mt-1 italic">📝 {apt.notes}</p>}
                </div>
                <Button variant="ghost" size="sm">Details</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
