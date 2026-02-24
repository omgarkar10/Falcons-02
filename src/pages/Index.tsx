import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Pill,
  CalendarDays,
  Activity,
  TrendingUp,
  Heart,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const summaryCards = [
  { title: "Reports", value: "12", subtitle: "3 new this month", icon: FileText, color: "bg-health-teal", link: "/reports" },
  { title: "Medicines", value: "5", subtitle: "Active prescriptions", icon: Pill, color: "bg-health-purple", link: "/medicines" },
  { title: "Appointments", value: "3", subtitle: "Upcoming", icon: CalendarDays, color: "bg-health-coral", link: "/appointments" },
  { title: "Health Score", value: "87", subtitle: "Good condition", icon: Activity, color: "bg-health-green", link: "/health-tracker" },
];

const quickActions = [
  { label: "Add Report", icon: FileText, link: "/reports" },
  { label: "Add Medicine", icon: Pill, link: "/medicines" },
  { label: "Book Appointment", icon: CalendarDays, link: "/appointments" },
  { label: "Log Vitals", icon: Activity, link: "/health-tracker" },
];

const recentActivity = [
  { text: "Blood test report uploaded", time: "2 hours ago", icon: FileText },
  { text: "Took Amoxicillin 500mg", time: "4 hours ago", icon: Pill },
  { text: "Dr. Smith appointment completed", time: "Yesterday", icon: CalendarDays },
  { text: "Heart rate: 72 bpm recorded", time: "Yesterday", icon: Heart },
];

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-hero rounded-2xl p-8 text-primary-foreground"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Welcome to HealthHub 🩺
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-xl">
          Your AI-powered health management dashboard. Track reports, medicines, appointments and vitals all in one place.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, i) => (
          <motion.div key={card.title} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
            <Link to={card.link}>
              <Card className="hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{card.title}</p>
                      <p className="text-3xl font-display font-bold mt-1 animate-count-up">{card.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                    </div>
                    <div className={`${card.color} w-11 h-11 rounded-xl flex items-center justify-center text-primary-foreground`}>
                      <card.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className="font-display text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.link}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 flex flex-col gap-2 hover:shadow-glow hover:border-primary/50 transition-all"
              >
                <Plus className="w-5 h-5 text-primary" />
                <span className="text-sm">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Health Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="gradient-secondary text-secondary-foreground h-full">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <Heart className="w-10 h-10 mb-4 animate-float" />
              <h3 className="font-display text-lg font-bold mb-2">Daily Health Tip</h3>
              <p className="text-sm opacity-90">
                Drink at least 8 glasses of water daily. Staying hydrated improves energy levels and brain function. 💧
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
