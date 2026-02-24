import {
  LayoutDashboard,
  FileText,
  Pill,
  CalendarDays,
  Activity,
  Heart,
  Menu,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Medicines", url: "/medicines", icon: Pill },
  { title: "Appointments", url: "/appointments", icon: CalendarDays },
  { title: "Health Tracker", url: "/health-tracker", icon: Activity },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 min-h-screen sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow shrink-0">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display text-lg font-bold tracking-tight text-sidebar-foreground">
            HealthHub
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/20 hover:text-sidebar-foreground transition-all group"
            activeClassName="bg-sidebar-primary/15 text-sidebar-primary font-semibold shadow-sm"
          >
            <item.icon className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" />
            {!collapsed && <span className="text-sm">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 mx-3 mb-4 rounded-xl gradient-hero text-primary-foreground">
          <p className="text-xs font-semibold mb-1">AI-Powered</p>
          <p className="text-[11px] opacity-80">Ask our health assistant anything</p>
        </div>
      )}
    </aside>
  );
}
