import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
};

const mockMedicines: Medicine[] = [
  { id: 1, name: "Amoxicillin", dosage: "500mg", frequency: "3x daily", duration: "7 days", doctor: "Dr. Smith", adherence: 85, active: true },
  { id: 2, name: "Metformin", dosage: "850mg", frequency: "2x daily", duration: "Ongoing", doctor: "Dr. Patel", adherence: 92, active: true },
  { id: 3, name: "Lisinopril", dosage: "10mg", frequency: "1x daily", duration: "Ongoing", doctor: "Dr. Johnson", adherence: 100, active: true },
  { id: 4, name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "5 days", doctor: "Dr. Lee", adherence: 60, active: false },
];

const pillSchedule = [
  { time: "8:00 AM", meds: ["Amoxicillin 500mg", "Metformin 850mg", "Lisinopril 10mg"], taken: [true, true, true] },
  { time: "2:00 PM", meds: ["Amoxicillin 500mg"], taken: [true] },
  { time: "8:00 PM", meds: ["Amoxicillin 500mg", "Metformin 850mg"], taken: [false, false] },
];

const Medicines = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Medicines & Prescriptions</h1>
        <p className="text-muted-foreground mt-1">Track your medications and adherence</p>
      </motion.div>

      <div className="flex gap-3">
        <Button className="gradient-primary border-0 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Add Medicine
        </Button>
        <Button variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-secondary" /> AI Schedule Suggestions
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medicine List */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-display text-lg font-semibold">Active Medications</h2>
          {mockMedicines.filter(m => m.active).map((med, i) => (
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <h2 className="font-display text-lg font-semibold mt-6">Past Medications</h2>
          {mockMedicines.filter(m => !m.active).map((med) => (
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
