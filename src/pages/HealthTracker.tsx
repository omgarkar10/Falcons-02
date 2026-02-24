import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Heart,
  Droplets,
  Moon,
  TrendingUp,
  Target,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const weightData = [
  { day: "Mon", value: 72.5 },
  { day: "Tue", value: 72.3 },
  { day: "Wed", value: 72.1 },
  { day: "Thu", value: 72.4 },
  { day: "Fri", value: 71.9 },
  { day: "Sat", value: 71.8 },
  { day: "Sun", value: 71.6 },
];

const heartRateData = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 70 },
  { day: "Fri", value: 73 },
  { day: "Sat", value: 65 },
  { day: "Sun", value: 69 },
];

const bpData = [
  { day: "Mon", systolic: 120, diastolic: 80 },
  { day: "Tue", systolic: 118, diastolic: 78 },
  { day: "Wed", systolic: 122, diastolic: 82 },
  { day: "Thu", systolic: 119, diastolic: 79 },
  { day: "Fri", systolic: 121, diastolic: 81 },
  { day: "Sat", systolic: 117, diastolic: 77 },
  { day: "Sun", systolic: 120, diastolic: 80 },
];

const sleepData = [
  { day: "Mon", hours: 7.5 },
  { day: "Tue", hours: 6.8 },
  { day: "Wed", hours: 8.2 },
  { day: "Thu", hours: 7.0 },
  { day: "Fri", hours: 7.8 },
  { day: "Sat", hours: 8.5 },
  { day: "Sun", hours: 7.3 },
];

const vitals = [
  { label: "Weight", value: "71.6 kg", icon: TrendingUp, change: "-0.9 kg this week", color: "text-health-teal", bg: "bg-health-teal/15" },
  { label: "Heart Rate", value: "69 bpm", icon: Heart, change: "Normal range", color: "text-health-coral", bg: "bg-health-coral/15" },
  { label: "Blood Pressure", value: "120/80", icon: Activity, change: "Optimal", color: "text-health-purple", bg: "bg-health-purple/15" },
  { label: "Sleep", value: "7.3 hrs", icon: Moon, change: "Above average", color: "text-health-blue", bg: "bg-health-blue/15" },
];

const HealthTracker = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold">Health Tracker</h1>
        <p className="text-muted-foreground mt-1">Track your vitals and see trends over time</p>
      </motion.div>

      <div className="flex gap-3">
        <Button className="gradient-primary border-0 text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Log Vitals
        </Button>
        <Button variant="outline" className="gap-2">
          <Target className="w-4 h-4" /> Set Goals
        </Button>
      </div>

      {/* Vital Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {vitals.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="hover:shadow-glow transition-all">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${v.bg} flex items-center justify-center`}>
                    <v.icon className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{v.label}</p>
                    <p className="text-xl font-display font-bold">{v.value}</p>
                    <p className="text-[11px] text-muted-foreground">{v.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-health-teal" /> Weight Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={weightData}>
                  <defs>
                    <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 88%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis domain={[70, 74]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="hsl(174, 72%, 40%)" fill="url(#weightGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-health-coral" /> Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={heartRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 88%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis domain={[60, 80]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(15, 85%, 60%)" strokeWidth={2} dot={{ fill: "hsl(15, 85%, 60%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-health-purple" /> Blood Pressure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={bpData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 88%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis domain={[60, 140]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="hsl(265, 70%, 55%)" strokeWidth={2} dot={{ fill: "hsl(265, 70%, 55%)" }} />
                  <Line type="monotone" dataKey="diastolic" stroke="hsl(265, 70%, 70%)" strokeWidth={2} dot={{ fill: "hsl(265, 70%, 70%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <Card>
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Moon className="w-5 h-5 text-health-blue" /> Sleep Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 15%, 88%)" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="hsl(210, 80%, 55%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthTracker;

