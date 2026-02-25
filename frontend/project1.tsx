

# 🏥 HealthHub — AI-Powered Health Management Platform

A bold, colorful, and interactive health management dashboard with AI-powered insights using Gemini. Built for both patients and doctors.

---

## 🎨 Design & Theme
- Bold, vibrant health-themed color palette (teals, purples, warm accents)
- Gradient backgrounds, smooth animations, and micro-interactions
- Card-based dashboard layout with charts and progress indicators
- Responsive design — works on desktop and mobile

---

## 📄 Pages & Features

### 1. **Landing / Dashboard**
- Welcome overview with health summary cards (upcoming appointments, active prescriptions, recent reports)
- Quick-action buttons for adding records
- Health score widget powered by AI
- Animated stats and visual indicators

### 2. **Medical Reports**
- Upload and store medical reports (PDFs, images)
- List view with filters by date, type, doctor
- **AI Report Summarizer** — Upload a report and get a plain-language AI summary via Gemini

### 3. **Medicines & Prescriptions**
- Track current medications (name, dosage, frequency, duration)
- Doctor prescription history with details
- **AI Medicine Reminder Suggestions** — Gemini suggests optimal schedules based on your prescriptions
- Visual pill tracker / adherence chart

### 4. **Doctor Appointments**
- Calendar view of upcoming and past appointments
- Add/edit appointments with doctor name, specialty, location, notes
- Status badges (upcoming, completed, cancelled)
- Reminder notifications

### 5. **Health Tracker**
- Track vitals: weight, blood pressure, heart rate, blood sugar, sleep
- Interactive charts (line/bar) showing trends over time using Recharts
- Goal setting and progress indicators

### 6. **AI Health Assistant (Chatbot)**
- Floating chat widget available on all pages
- Ask questions about symptoms, medications, health tips
- Streaming responses from Gemini for real-time interaction
- Conversation history within the session

---

## 🤖 AI Integration (Gemini 2.5 Flash)
- **Report Summarizer** — Summarize uploaded medical documents
- **Health Chatbot** — Conversational health assistant
- **Medicine Schedule Suggestions** — Smart reminders based on prescriptions
- All AI calls go through a Supabase Edge Function for security

---

## 🔧 Backend (Supabase + Lovable Cloud)
- **Database tables** for reports, medicines, prescriptions, appointments, health vitals
- **Edge Functions** for AI calls to Gemini API
- **Storage** for uploaded medical report files
- No authentication for easy hackathon demo — open access

---

## 🧭 Navigation
- Colorful sidebar with icons for each section
- Collapsible for mobile
- Active route highlighting

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /


import { AppSidebar } from "./AppSidebar";
import { AIChatbot } from "@/components/AIChatbot";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
      <AIChatbot />
    </div>
  );
}
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
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:after:bg-sidebar-border sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar="input"
        className={cn(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-sidebar-border", className)}
        {...props}
      />
    );
  },
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

export function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI health assistant. Ask me anything about symptoms, medications, or health tips! 🩺" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Placeholder — will be replaced with actual Gemini call via edge function
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm being set up! Once the backend is connected, I'll provide real AI-powered health insights. 🚀" },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero text-primary-foreground shadow-glow flex items-center justify-center animate-pulse-glow"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-hero px-4 py-3 flex items-center justify-between text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm">Health Assistant</p>
                  <p className="text-[10px] opacity-80">Powered by Gemini AI</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="hover:bg-primary-foreground/10 rounded-lg p-1 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] px-3 py-2 rounded-xl text-sm",
                      msg.role === "user"
                        ? "gradient-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted px-4 py-2 rounded-xl rounded-bl-sm text-sm text-muted-foreground">
                    <span className="animate-pulse">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about health..."
                className="flex-1 text-sm"
              />
              <Button size="icon" onClick={send} disabled={loading || !input.trim()} className="gradient-primary border-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
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
import { describe, it, expect } from "vitest";

describe("example", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import Medicines from "./pages/Medicines";
import Appointments from "./pages/Appointments";
import HealthTracker from "./pages/HealthTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/health-tracker" element={<HealthTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 180 10% 97%;
    --foreground: 220 25% 10%;

    --card: 0 0% 100%;
    --card-foreground: 220 25% 10%;

    --popover: 0 0% 100%;
    --popover-foreground: 220 25% 10%;

    --primary: 174 72% 40%;
    --primary-foreground: 0 0% 100%;

    --secondary: 265 70% 55%;
    --secondary-foreground: 0 0% 100%;

    --muted: 210 20% 94%;
    --muted-foreground: 220 10% 45%;

    --accent: 15 85% 60%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 75% 55%;
    --destructive-foreground: 0 0% 100%;

    --border: 210 15% 88%;
    --input: 210 15% 88%;
    --ring: 174 72% 40%;

    --radius: 0.75rem;

    --sidebar-background: 220 25% 10%;
    --sidebar-foreground: 210 20% 90%;
    --sidebar-primary: 174 72% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 265 60% 55%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 220 20% 18%;
    --sidebar-ring: 174 72% 50%;

    /* Health-specific tokens */
    --health-teal: 174 72% 40%;
    --health-purple: 265 70% 55%;
    --health-coral: 15 85% 60%;
    --health-green: 145 65% 42%;
    --health-blue: 210 80% 55%;
    --health-yellow: 45 90% 55%;
    --health-pink: 340 75% 55%;

    --gradient-primary: linear-gradient(135deg, hsl(174 72% 40%), hsl(174 72% 55%));
    --gradient-secondary: linear-gradient(135deg, hsl(265 70% 55%), hsl(265 70% 70%));
    --gradient-accent: linear-gradient(135deg, hsl(15 85% 60%), hsl(15 85% 70%));
    --gradient-hero: linear-gradient(135deg, hsl(174 72% 40%), hsl(265 70% 55%));
    --shadow-glow: 0 8px 32px -8px hsl(174 72% 40% / 0.3);
  }

  .dark {
    --background: 220 25% 8%;
    --foreground: 210 20% 95%;

    --card: 220 25% 12%;
    --card-foreground: 210 20% 95%;

    --popover: 220 25% 12%;
    --popover-foreground: 210 20% 95%;

    --primary: 174 72% 50%;
    --primary-foreground: 220 25% 8%;

    --secondary: 265 70% 60%;
    --secondary-foreground: 0 0% 100%;

    --muted: 220 20% 18%;
    --muted-foreground: 210 15% 60%;

    --accent: 15 85% 60%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 75% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 220 20% 20%;
    --input: 220 20% 20%;
    --ring: 174 72% 50%;

    --sidebar-background: 220 30% 6%;
    --sidebar-foreground: 210 20% 90%;
    --sidebar-primary: 174 72% 50%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 265 60% 55%;
    --sidebar-accent-foreground: 0 0% 100%;
    --sidebar-border: 220 20% 12%;
    --sidebar-ring: 174 72% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Space Grotesk', sans-serif;
  }
}

@layer utilities {
  .gradient-primary {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(174 72% 55%));
  }
  .gradient-secondary {
    background: linear-gradient(135deg, hsl(var(--secondary)), hsl(265 70% 70%));
  }
  .gradient-accent {
    background: linear-gradient(135deg, hsl(var(--accent)), hsl(15 85% 70%));
  }
  .gradient-hero {
    background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
  }
  .glass {
    backdrop-filter: blur(12px);
    background: hsl(var(--card) / 0.8);
    border: 1px solid hsl(var(--border) / 0.5);
  }
  .shadow-glow {
    box-shadow: 0 8px 32px -8px hsl(var(--primary) / 0.3);
  }
}
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
/// <reference types="vite/client" />


User-agent: *
Allow: /
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
{
  "lockfileVersion": 1,
  "configVersion": 1,
  "workspaces": {
    "": {
      "name": "vite_react_shadcn_ts",
      "dependencies": {
        "@hookform/resolvers": "^3.10.0",
        "@radix-ui/react-accordion": "^1.2.11",
        "@radix-ui/react-alert-dialog": "^1.1.14",
        "@radix-ui/react-aspect-ratio": "^1.1.7",
        "@radix-ui/react-avatar": "^1.1.10",
        "@radix-ui/react-checkbox": "^1.3.2",
        "@radix-ui/react-collapsible": "^1.1.11",
        "@radix-ui/react-context-menu": "^2.2.15",
        "@radix-ui/react-dialog": "^1.1.14",
        "@radix-ui/react-dropdown-menu": "^2.1.15",
        "@radix-ui/react-hover-card": "^1.1.14",
        "@radix-ui/react-label": "^2.1.7",
        "@radix-ui/react-menubar": "^1.1.15",
        "@radix-ui/react-navigation-menu": "^1.2.13",
        "@radix-ui/react-popover": "^1.1.14",
        "@radix-ui/react-progress": "^1.1.7",
        "@radix-ui/react-radio-group": "^1.3.7",
        "@radix-ui/react-scroll-area": "^1.2.9",
        "@radix-ui/react-select": "^2.2.5",
        "@radix-ui/react-separator": "^1.1.7",
        "@radix-ui/react-slider": "^1.3.5",
        "@radix-ui/react-slot": "^1.2.3",
        "@radix-ui/react-switch": "^1.2.5",
        "@radix-ui/react-tabs": "^1.1.12",
        "@radix-ui/react-toast": "^1.2.14",
        "@radix-ui/react-toggle": "^1.1.9",
        "@radix-ui/react-toggle-group": "^1.1.10",
        "@radix-ui/react-tooltip": "^1.2.7",
        "@tanstack/react-query": "^5.83.0",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "cmdk": "^1.1.1",
        "date-fns": "^3.6.0",
        "embla-carousel-react": "^8.6.0",
        "framer-motion": "^12.34.3",
        "input-otp": "^1.4.2",
        "lucide-react": "^0.462.0",
        "next-themes": "^0.3.0",
        "react": "^18.3.1",
        "react-day-picker": "^8.10.1",
        "react-dom": "^18.3.1",
        "react-hook-form": "^7.61.1",
        "react-markdown": "^10.1.0",
        "react-resizable-panels": "^2.1.9",
        "react-router-dom": "^6.30.1",
        "recharts": "^2.15.4",
        "sonner": "^1.7.4",
        "tailwind-merge": "^2.6.0",
        "tailwindcss-animate": "^1.0.7",
        "vaul": "^0.9.9",
        "zod": "^3.25.76",
      },
      "devDependencies": {
        "@eslint/js": "^9.32.0",
        "@tailwindcss/typography": "^0.5.16",
        "@testing-library/jest-dom": "^6.6.0",
        "@testing-library/react": "^16.0.0",
        "@types/node": "^22.16.5",
        "@types/react": "^18.3.23",
        "@types/react-dom": "^18.3.7",
        "@vitejs/plugin-react-swc": "^3.11.0",
        "autoprefixer": "^10.4.21",
        "eslint": "^9.32.0",
        "eslint-plugin-react-hooks": "^5.2.0",
        "eslint-plugin-react-refresh": "^0.4.20",
        "globals": "^15.15.0",
        "jsdom": "^20.0.3",
        "lovable-tagger": "^1.1.13",
        "postcss": "^8.5.6",
        "tailwindcss": "^3.4.17",
        "typescript": "^5.8.3",
        "typescript-eslint": "^8.38.0",
        "vite": "^5.4.19",
        "vitest": "^3.2.4",
      },
    },
  },
  "packages": {
    "@adobe/css-tools": ["@adobe/css-tools@4.4.4", "", {}, "sha512-Elp+iwUx5rN5+Y8xLt5/GRoG20WGoDCQ/1Fb+1LiGtvwbDavuSk0jhD/eZdckHAuzcDzccnkv+rEjyWfRx18gg=="],

    "@alloc/quick-lru": ["@alloc/quick-lru@5.2.0", "", {}, "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw=="],

    "@babel/runtime": ["@babel/runtime@7.28.2", "", {}, "sha512-KHp2IflsnGywDjBWDkR9iEqiWSpc8GIi0lgTT3mOElT0PP1tG26P4tmFI2YvAdzgq9RGyoHZQEIEdZy6Ec5xCA=="],

    "@esbuild/aix-ppc64": ["@esbuild/aix-ppc64@0.25.0", "", { "os": "aix", "cpu": "ppc64" }, "sha512-O7vun9Sf8DFjH2UtqK8Ku3LkquL9SZL8OLY1T5NZkA34+wG3OQF7cl4Ql8vdNzM6fzBbYfLaiRLIOZ+2FOCgBQ=="],

    "@esbuild/android-arm": ["@esbuild/android-arm@0.25.0", "", { "os": "android", "cpu": "arm" }, "sha512-PTyWCYYiU0+1eJKmw21lWtC+d08JDZPQ5g+kFyxP0V+es6VPPSUhM6zk8iImp2jbV6GwjX4pap0JFbUQN65X1g=="],

    "@esbuild/android-arm64": ["@esbuild/android-arm64@0.25.0", "", { "os": "android", "cpu": "arm64" }, "sha512-grvv8WncGjDSyUBjN9yHXNt+cq0snxXbDxy5pJtzMKGmmpPxeAmAhWxXI+01lU5rwZomDgD3kJwulEnhTRUd6g=="],

    "@esbuild/android-x64": ["@esbuild/android-x64@0.25.0", "", { "os": "android", "cpu": "x64" }, "sha512-m/ix7SfKG5buCnxasr52+LI78SQ+wgdENi9CqyCXwjVR2X4Jkz+BpC3le3AoBPYTC9NHklwngVXvbJ9/Akhrfg=="],

    "@esbuild/darwin-arm64": ["@esbuild/darwin-arm64@0.25.0", "", { "os": "darwin", "cpu": "arm64" }, "sha512-mVwdUb5SRkPayVadIOI78K7aAnPamoeFR2bT5nszFUZ9P8UpK4ratOdYbZZXYSqPKMHfS1wdHCJk1P1EZpRdvw=="],

    "@esbuild/darwin-x64": ["@esbuild/darwin-x64@0.25.0", "", { "os": "darwin", "cpu": "x64" }, "sha512-DgDaYsPWFTS4S3nWpFcMn/33ZZwAAeAFKNHNa1QN0rI4pUjgqf0f7ONmXf6d22tqTY+H9FNdgeaAa+YIFUn2Rg=="],

    "@esbuild/freebsd-arm64": ["@esbuild/freebsd-arm64@0.25.0", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-VN4ocxy6dxefN1MepBx/iD1dH5K8qNtNe227I0mnTRjry8tj5MRk4zprLEdG8WPyAPb93/e4pSgi1SoHdgOa4w=="],

    "@esbuild/freebsd-x64": ["@esbuild/freebsd-x64@0.25.0", "", { "os": "freebsd", "cpu": "x64" }, "sha512-mrSgt7lCh07FY+hDD1TxiTyIHyttn6vnjesnPoVDNmDfOmggTLXRv8Id5fNZey1gl/V2dyVK1VXXqVsQIiAk+A=="],

    "@esbuild/linux-arm": ["@esbuild/linux-arm@0.25.0", "", { "os": "linux", "cpu": "arm" }, "sha512-vkB3IYj2IDo3g9xX7HqhPYxVkNQe8qTK55fraQyTzTX/fxaDtXiEnavv9geOsonh2Fd2RMB+i5cbhu2zMNWJwg=="],

    "@esbuild/linux-arm64": ["@esbuild/linux-arm64@0.25.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-9QAQjTWNDM/Vk2bgBl17yWuZxZNQIF0OUUuPZRKoDtqF2k4EtYbpyiG5/Dk7nqeK6kIJWPYldkOcBqjXjrUlmg=="],

    "@esbuild/linux-ia32": ["@esbuild/linux-ia32@0.25.0", "", { "os": "linux", "cpu": "ia32" }, "sha512-43ET5bHbphBegyeqLb7I1eYn2P/JYGNmzzdidq/w0T8E2SsYL1U6un2NFROFRg1JZLTzdCoRomg8Rvf9M6W6Gg=="],

    "@esbuild/linux-loong64": ["@esbuild/linux-loong64@0.25.0", "", { "os": "linux", "cpu": "none" }, "sha512-fC95c/xyNFueMhClxJmeRIj2yrSMdDfmqJnyOY4ZqsALkDrrKJfIg5NTMSzVBr5YW1jf+l7/cndBfP3MSDpoHw=="],

    "@esbuild/linux-mips64el": ["@esbuild/linux-mips64el@0.25.0", "", { "os": "linux", "cpu": "none" }, "sha512-nkAMFju7KDW73T1DdH7glcyIptm95a7Le8irTQNO/qtkoyypZAnjchQgooFUDQhNAy4iu08N79W4T4pMBwhPwQ=="],

    "@esbuild/linux-ppc64": ["@esbuild/linux-ppc64@0.25.0", "", { "os": "linux", "cpu": "ppc64" }, "sha512-NhyOejdhRGS8Iwv+KKR2zTq2PpysF9XqY+Zk77vQHqNbo/PwZCzB5/h7VGuREZm1fixhs4Q/qWRSi5zmAiO4Fw=="],

    "@esbuild/linux-riscv64": ["@esbuild/linux-riscv64@0.25.0", "", { "os": "linux", "cpu": "none" }, "sha512-5S/rbP5OY+GHLC5qXp1y/Mx//e92L1YDqkiBbO9TQOvuFXM+iDqUNG5XopAnXoRH3FjIUDkeGcY1cgNvnXp/kA=="],

    "@esbuild/linux-s390x": ["@esbuild/linux-s390x@0.25.0", "", { "os": "linux", "cpu": "s390x" }, "sha512-XM2BFsEBz0Fw37V0zU4CXfcfuACMrppsMFKdYY2WuTS3yi8O1nFOhil/xhKTmE1nPmVyvQJjJivgDT+xh8pXJA=="],

    "@esbuild/linux-x64": ["@esbuild/linux-x64@0.25.0", "", { "os": "linux", "cpu": "x64" }, "sha512-9yl91rHw/cpwMCNytUDxwj2XjFpxML0y9HAOH9pNVQDpQrBxHy01Dx+vaMu0N1CKa/RzBD2hB4u//nfc+Sd3Cw=="],

    "@esbuild/netbsd-arm64": ["@esbuild/netbsd-arm64@0.25.0", "", { "os": "none", "cpu": "arm64" }, "sha512-RuG4PSMPFfrkH6UwCAqBzauBWTygTvb1nxWasEJooGSJ/NwRw7b2HOwyRTQIU97Hq37l3npXoZGYMy3b3xYvPw=="],

    "@esbuild/netbsd-x64": ["@esbuild/netbsd-x64@0.25.0", "", { "os": "none", "cpu": "x64" }, "sha512-jl+qisSB5jk01N5f7sPCsBENCOlPiS/xptD5yxOx2oqQfyourJwIKLRA2yqWdifj3owQZCL2sn6o08dBzZGQzA=="],

    "@esbuild/openbsd-arm64": ["@esbuild/openbsd-arm64@0.25.0", "", { "os": "openbsd", "cpu": "arm64" }, "sha512-21sUNbq2r84YE+SJDfaQRvdgznTD8Xc0oc3p3iW/a1EVWeNj/SdUCbm5U0itZPQYRuRTW20fPMWMpcrciH2EJw=="],

    "@esbuild/openbsd-x64": ["@esbuild/openbsd-x64@0.25.0", "", { "os": "openbsd", "cpu": "x64" }, "sha512-2gwwriSMPcCFRlPlKx3zLQhfN/2WjJ2NSlg5TKLQOJdV0mSxIcYNTMhk3H3ulL/cak+Xj0lY1Ym9ysDV1igceg=="],

    "@esbuild/sunos-x64": ["@esbuild/sunos-x64@0.25.0", "", { "os": "sunos", "cpu": "x64" }, "sha512-bxI7ThgLzPrPz484/S9jLlvUAHYMzy6I0XiU1ZMeAEOBcS0VePBFxh1JjTQt3Xiat5b6Oh4x7UC7IwKQKIJRIg=="],

    "@esbuild/win32-arm64": ["@esbuild/win32-arm64@0.25.0", "", { "os": "win32", "cpu": "arm64" }, "sha512-ZUAc2YK6JW89xTbXvftxdnYy3m4iHIkDtK3CLce8wg8M2L+YZhIvO1DKpxrd0Yr59AeNNkTiic9YLf6FTtXWMw=="],

    "@esbuild/win32-ia32": ["@esbuild/win32-ia32@0.25.0", "", { "os": "win32", "cpu": "ia32" }, "sha512-eSNxISBu8XweVEWG31/JzjkIGbGIJN/TrRoiSVZwZ6pkC6VX4Im/WV2cz559/TXLcYbcrDN8JtKgd9DJVIo8GA=="],

    "@esbuild/win32-x64": ["@esbuild/win32-x64@0.25.0", "", { "os": "win32", "cpu": "x64" }, "sha512-ZENoHJBxA20C2zFzh6AI4fT6RraMzjYw4xKWemRTRmRVtN9c5DcH9r/f2ihEkMjOW5eGgrwCslG/+Y/3bL+DHQ=="],

    "@eslint-community/eslint-utils": ["@eslint-community/eslint-utils@4.7.0", "", { "dependencies": { "eslint-visitor-keys": "^3.4.3" }, "peerDependencies": { "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0" } }, "sha512-dyybb3AcajC7uha6CvhdVRJqaKyn7w2YKqKyAN37NKYgZT36w+iRb0Dymmc5qEJ549c/S31cMMSFd75bteCpCw=="],

    "@eslint-community/regexpp": ["@eslint-community/regexpp@4.12.1", "", {}, "sha512-CCZCDJuduB9OUkFkY2IgppNZMi2lBQgD2qzwXkEia16cge2pijY/aXi96CJMquDMn3nJdlPV1A5KrJEXwfLNzQ=="],

    "@eslint/config-array": ["@eslint/config-array@0.21.0", "", { "dependencies": { "@eslint/object-schema": "^2.1.6", "debug": "^4.3.1", "minimatch": "^3.1.2" } }, "sha512-ENIdc4iLu0d93HeYirvKmrzshzofPw6VkZRKQGe9Nv46ZnWUzcF1xV01dcvEg/1wXUR61OmmlSfyeyO7EvjLxQ=="],

    "@eslint/config-helpers": ["@eslint/config-helpers@0.3.0", "", {}, "sha512-ViuymvFmcJi04qdZeDc2whTHryouGcDlaxPqarTD0ZE10ISpxGUVZGZDx4w01upyIynL3iu6IXH2bS1NhclQMw=="],

    "@eslint/core": ["@eslint/core@0.15.1", "", { "dependencies": { "@types/json-schema": "^7.0.15" } }, "sha512-bkOp+iumZCCbt1K1CmWf0R9pM5yKpDv+ZXtvSyQpudrI9kuFLp+bM2WOPXImuD/ceQuaa8f5pj93Y7zyECIGNA=="],

    "@eslint/eslintrc": ["@eslint/eslintrc@3.3.1", "", { "dependencies": { "ajv": "^6.12.4", "debug": "^4.3.2", "espree": "^10.0.1", "globals": "^14.0.0", "ignore": "^5.2.0", "import-fresh": "^3.2.1", "js-yaml": "^4.1.0", "minimatch": "^3.1.2", "strip-json-comments": "^3.1.1" } }, "sha512-gtF186CXhIl1p4pJNGZw8Yc6RlshoePRvE0X91oPGb3vZ8pM3qOS9W9NGPat9LziaBV7XrJWGylNQXkGcnM3IQ=="],

    "@eslint/js": ["@eslint/js@9.32.0", "", {}, "sha512-BBpRFZK3eX6uMLKz8WxFOBIFFcGFJ/g8XuwjTHCqHROSIsopI+ddn/d5Cfh36+7+e5edVS8dbSHnBNhrLEX0zg=="],

    "@eslint/object-schema": ["@eslint/object-schema@2.1.6", "", {}, "sha512-RBMg5FRL0I0gs51M/guSAj5/e14VQ4tpZnQNWwuDT66P14I43ItmPfIZRhO9fUVIPOAQXU47atlywZ/czoqFPA=="],

    "@eslint/plugin-kit": ["@eslint/plugin-kit@0.3.4", "", { "dependencies": { "@eslint/core": "^0.15.1", "levn": "^0.4.1" } }, "sha512-Ul5l+lHEcw3L5+k8POx6r74mxEYKG5kOb6Xpy2gCRW6zweT6TEhAf8vhxGgjhqrd/VO/Dirhsb+1hNpD1ue9hw=="],

    "@floating-ui/core": ["@floating-ui/core@1.7.2", "", { "dependencies": { "@floating-ui/utils": "^0.2.10" } }, "sha512-wNB5ooIKHQc+Kui96jE/n69rHFWAVoxn5CAzL1Xdd8FG03cgY3MLO+GF9U3W737fYDSgPWA6MReKhBQBop6Pcw=="],

    "@floating-ui/dom": ["@floating-ui/dom@1.7.2", "", { "dependencies": { "@floating-ui/core": "^1.7.2", "@floating-ui/utils": "^0.2.10" } }, "sha512-7cfaOQuCS27HD7DX+6ib2OrnW+b4ZBwDNnCcT0uTyidcmyWb03FnQqJybDBoCnpdxwBSfA94UAYlRCt7mV+TbA=="],

    "@floating-ui/react-dom": ["@floating-ui/react-dom@2.1.4", "", { "dependencies": { "@floating-ui/dom": "^1.7.2" }, "peerDependencies": { "react": ">=16.8.0", "react-dom": ">=16.8.0" } }, "sha512-JbbpPhp38UmXDDAu60RJmbeme37Jbgsm7NrHGgzYYFKmblzRUh6Pa641dII6LsjwF4XlScDrde2UAzDo/b9KPw=="],

    "@floating-ui/utils": ["@floating-ui/utils@0.2.10", "", {}, "sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ=="],

    "@hookform/resolvers": ["@hookform/resolvers@3.10.0", "", { "peerDependencies": { "react-hook-form": "^7.0.0" } }, "sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag=="],

    "@humanfs/core": ["@humanfs/core@0.19.1", "", {}, "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA=="],

    "@humanfs/node": ["@humanfs/node@0.16.6", "", { "dependencies": { "@humanfs/core": "^0.19.1", "@humanwhocodes/retry": "^0.3.0" } }, "sha512-YuI2ZHQL78Q5HbhDiBA1X4LmYdXCKCMQIfw0pw7piHJwyREFebJUvrQN4cMssyES6x+vfUbx1CIpaQUKYdQZOw=="],

    "@humanwhocodes/module-importer": ["@humanwhocodes/module-importer@1.0.1", "", {}, "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA=="],

    "@humanwhocodes/retry": ["@humanwhocodes/retry@0.4.3", "", {}, "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ=="],

    "@isaacs/cliui": ["@isaacs/cliui@8.0.2", "", { "dependencies": { "string-width": "^5.1.2", "string-width-cjs": "npm:string-width@^4.2.0", "strip-ansi": "^7.0.1", "strip-ansi-cjs": "npm:strip-ansi@^6.0.1", "wrap-ansi": "^8.1.0", "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0" } }, "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA=="],

    "@jridgewell/gen-mapping": ["@jridgewell/gen-mapping@0.3.5", "", { "dependencies": { "@jridgewell/set-array": "^1.2.1", "@jridgewell/sourcemap-codec": "^1.4.10", "@jridgewell/trace-mapping": "^0.3.24" } }, "sha512-IzL8ZoEDIBRWEzlCcRhOaCupYyN5gdIK+Q6fbFdPDg6HqX6jpkItn7DFIpW9LQzXG6Df9sA7+OKnq0qlz/GaQg=="],

    "@jridgewell/resolve-uri": ["@jridgewell/resolve-uri@3.1.2", "", {}, "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw=="],

    "@jridgewell/set-array": ["@jridgewell/set-array@1.2.1", "", {}, "sha512-R8gLRTZeyp03ymzP/6Lil/28tGeGEzhx1q2k703KGWRAI1VdvPIXdG70VJc2pAMw3NA6JKL5hhFu1sJX0Mnn/A=="],

    "@jridgewell/sourcemap-codec": ["@jridgewell/sourcemap-codec@1.5.5", "", {}, "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og=="],

    "@jridgewell/trace-mapping": ["@jridgewell/trace-mapping@0.3.25", "", { "dependencies": { "@jridgewell/resolve-uri": "^3.1.0", "@jridgewell/sourcemap-codec": "^1.4.14" } }, "sha512-vNk6aEwybGtawWmy/PzwnGDOjCkLWSD2wqvjGGAgOAwCGWySYXfYoxt00IJkTF+8Lb57DwOb3Aa0o9CApepiYQ=="],

    "@nodelib/fs.scandir": ["@nodelib/fs.scandir@2.1.5", "", { "dependencies": { "@nodelib/fs.stat": "2.0.5", "run-parallel": "^1.1.9" } }, "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g=="],

    "@nodelib/fs.stat": ["@nodelib/fs.stat@2.0.5", "", {}, "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A=="],

    "@nodelib/fs.walk": ["@nodelib/fs.walk@1.2.8", "", { "dependencies": { "@nodelib/fs.scandir": "2.1.5", "fastq": "^1.6.0" } }, "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg=="],

    "@pkgjs/parseargs": ["@pkgjs/parseargs@0.11.0", "", {}, "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg=="],

    "@radix-ui/number": ["@radix-ui/number@1.1.1", "", {}, "sha512-MkKCwxlXTgz6CFoJx3pCwn07GKp36+aZyu/u2Ln2VrA5DcdyCZkASEDBTd8x5whTQQL5CiYf4prXKLcgQdv29g=="],

    "@radix-ui/primitive": ["@radix-ui/primitive@1.1.2", "", {}, "sha512-XnbHrrprsNqZKQhStrSwgRUQzoCI1glLzdw79xiZPoofhGICeZRSQ3dIxAKH1gb3OHfNf4d6f+vAv3kil2eggA=="],

    "@radix-ui/react-accordion": ["@radix-ui/react-accordion@1.2.11", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collapsible": "1.1.11", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-l3W5D54emV2ues7jjeG1xcyN7S3jnK3zE2zHqgn0CmMsy9lNJwmgcrmaxS+7ipw15FAivzKNzH3d5EcGoFKw0A=="],

    "@radix-ui/react-alert-dialog": ["@radix-ui/react-alert-dialog@1.1.14", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dialog": "1.1.14", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-IOZfZ3nPvN6lXpJTBCunFQPRSvK8MDgSc1FB85xnIpUKOw9en0dJj8JmCAxV7BiZdtYlUpmrQjoTFkVYtdoWzQ=="],

    "@radix-ui/react-arrow": ["@radix-ui/react-arrow@1.1.7", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-F+M1tLhO+mlQaOWspE8Wstg+z6PwxwRd8oQ8IXceWz92kfAmalTRf0EjrouQeo7QssEPfCn05B4Ihs1K9WQ/7w=="],

    "@radix-ui/react-aspect-ratio": ["@radix-ui/react-aspect-ratio@1.1.7", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Yq6lvO9HQyPwev1onK1daHCHqXVLzPhSVjmsNjCa2Zcxy2f7uJD2itDtxknv6FzAKCwD1qQkeVDmX/cev13n/g=="],

    "@radix-ui/react-avatar": ["@radix-ui/react-avatar@1.1.10", "", { "dependencies": { "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-is-hydrated": "0.1.0", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-V8piFfWapM5OmNCXTzVQY+E1rDa53zY+MQ4Y7356v4fFz6vqCyUtIz2rUD44ZEdwg78/jKmMJHj07+C/Z/rcog=="],

    "@radix-ui/react-checkbox": ["@radix-ui/react-checkbox@1.3.2", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-yd+dI56KZqawxKZrJ31eENUwqc1QSqg4OZ15rybGjF2ZNwMO+wCyHzAVLRp9qoYJf7kYy0YpZ2b0JCzJ42HZpA=="],

    "@radix-ui/react-collapsible": ["@radix-ui/react-collapsible@1.1.11", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-2qrRsVGSCYasSz1RFOorXwl0H7g7J1frQtgpQgYrt+MOidtPAINHn9CPovQXb83r8ahapdx3Tu0fa/pdFFSdPg=="],

    "@radix-ui/react-collection": ["@radix-ui/react-collection@1.1.7", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Fh9rGN0MoI4ZFUNyfFVNU4y9LUz93u9/0K+yLgA2bwRojxM8JU1DyvvMBabnZPBgMWREAJvU2jjVzq+LrFUglw=="],

    "@radix-ui/react-compose-refs": ["@radix-ui/react-compose-refs@1.1.2", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg=="],

    "@radix-ui/react-context": ["@radix-ui/react-context@1.1.2", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-jCi/QKUM2r1Ju5a3J64TH2A5SpKAgh0LpknyqdQ4m6DCV0xJ2HG1xARRwNGPQfi1SLdLWZ1OJz6F4OMBBNiGJA=="],

    "@radix-ui/react-context-menu": ["@radix-ui/react-context-menu@2.2.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-menu": "2.1.15", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-UsQUMjcYTsBjTSXw0P3GO0werEQvUY2plgRQuKoCTtkNr45q1DiL51j4m7gxhABzZ0BadoXNsIbg7F3KwiUBbw=="],

    "@radix-ui/react-dialog": ["@radix-ui/react-dialog@1.1.14", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-focus-guards": "1.1.2", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-controllable-state": "1.2.2", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-+CpweKjqpzTmwRwcYECQcNYbI8V9VSQt0SNFKeEBLgfucbsLssU6Ppq7wUdNXEGb573bMjFhVjKVll8rmV6zMw=="],

    "@radix-ui/react-direction": ["@radix-ui/react-direction@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-1UEWRX6jnOA2y4H5WczZ44gOOjTEmlqv1uNW4GAJEO5+bauCBhv8snY65Iw5/VOS/ghKN9gr2KjnLKxrsvoMVw=="],

    "@radix-ui/react-dismissable-layer": ["@radix-ui/react-dismissable-layer@1.1.10", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-escape-keydown": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-IM1zzRV4W3HtVgftdQiiOmA0AdJlCtMLe00FXaHwgt3rAnNsIyDqshvkIW3hj/iu5hu8ERP7KIYki6NkqDxAwQ=="],

    "@radix-ui/react-dropdown-menu": ["@radix-ui/react-dropdown-menu@2.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-menu": "2.1.15", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-mIBnOjgwo9AH3FyKaSWoSu/dYj6VdhJ7frEPiGTeXCdUFHjl9h3mFh2wwhEtINOmYXWhdpf1rY2minFsmaNgVQ=="],

    "@radix-ui/react-focus-guards": ["@radix-ui/react-focus-guards@1.1.2", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-fyjAACV62oPV925xFCrH8DR5xWhg9KYtJT4s3u54jxp+L/hbpTY2kIeEFFbFe+a/HCE94zGQMZLIpVTPVZDhaA=="],

    "@radix-ui/react-focus-scope": ["@radix-ui/react-focus-scope@1.1.7", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-t2ODlkXBQyn7jkl6TNaw/MtVEVvIGelJDCG41Okq/KwUsJBwQ4XVZsHAVUkK4mBv3ewiAS3PGuUWuY2BoK4ZUw=="],

    "@radix-ui/react-hover-card": ["@radix-ui/react-hover-card@1.1.14", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-popper": "1.2.7", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-CPYZ24Mhirm+g6D8jArmLzjYu4Eyg3TTUHswR26QgzXBHBe64BO/RHOJKzmF/Dxb4y4f9PKyJdwm/O/AhNkb+Q=="],

    "@radix-ui/react-id": ["@radix-ui/react-id@1.1.1", "", { "dependencies": { "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg=="],

    "@radix-ui/react-label": ["@radix-ui/react-label@2.1.7", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-YT1GqPSL8kJn20djelMX7/cTRp/Y9w5IZHvfxQTVHrOqa2yMl7i/UfMqKRU5V7mEyKTrUVgJXhNQPVCG8PBLoQ=="],

    "@radix-ui/react-menu": ["@radix-ui/react-menu@2.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-focus-guards": "1.1.2", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.7", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.10", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-callback-ref": "1.1.1", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-tVlmA3Vb9n8SZSd+YSbuFR66l87Wiy4du+YE+0hzKQEANA+7cWKH1WgqcEX4pXqxUFQKrWQGHdvEfw00TjFiew=="],

    "@radix-ui/react-menubar": ["@radix-ui/react-menubar@1.1.15", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-menu": "2.1.15", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.10", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Z71C7LGD+YDYo3TV81paUs8f3Zbmkvg6VLRQpKYfzioOE6n7fOhA3ApK/V/2Odolxjoc4ENk8AYCjohCNayd5A=="],

    "@radix-ui/react-navigation-menu": ["@radix-ui/react-navigation-menu@1.2.13", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-visually-hidden": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-WG8wWfDiJlSF5hELjwfjSGOXcBR/ZMhBFCGYe8vERpC39CQYZeq1PQ2kaYHdye3V95d06H89KGMsVCIE4LWo3g=="],

    "@radix-ui/react-popover": ["@radix-ui/react-popover@1.1.14", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-focus-guards": "1.1.2", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.7", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-controllable-state": "1.2.2", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ODz16+1iIbGUfFEfKx2HTPKizg2MN39uIOV8MXeHnmdd3i/N9Wt7vU46wbHsqA0xoaQyXVcs0KIlBdOA2Y95bw=="],

    "@radix-ui/react-popper": ["@radix-ui/react-popper@1.2.7", "", { "dependencies": { "@floating-ui/react-dom": "^2.0.0", "@radix-ui/react-arrow": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-rect": "1.1.1", "@radix-ui/react-use-size": "1.1.1", "@radix-ui/rect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-IUFAccz1JyKcf/RjB552PlWwxjeCJB8/4KxT7EhBHOJM+mN7LdW+B3kacJXILm32xawcMMjb2i0cIZpo+f9kiQ=="],

    "@radix-ui/react-portal": ["@radix-ui/react-portal@1.1.9", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-bpIxvq03if6UNwXZ+HTK71JLh4APvnXntDc6XOX8UVq4XQOVl7lwok0AvIl+b8zgCw3fSaVTZMpAPPagXbKmHQ=="],

    "@radix-ui/react-presence": ["@radix-ui/react-presence@1.1.4", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ueDqRbdc4/bkaQT3GIpLQssRlFgWaL/U2z/S31qRwwLWoxHLgry3SIfCwhxeQNbirEUXFa+lq3RL3oBYXtcmIA=="],

    "@radix-ui/react-primitive": ["@radix-ui/react-primitive@2.1.3", "", { "dependencies": { "@radix-ui/react-slot": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ=="],

    "@radix-ui/react-progress": ["@radix-ui/react-progress@1.1.7", "", { "dependencies": { "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-vPdg/tF6YC/ynuBIJlk1mm7Le0VgW6ub6J2UWnTQ7/D23KXcPI1qy+0vBkgKgd38RCMJavBXpB83HPNFMTb0Fg=="],

    "@radix-ui/react-radio-group": ["@radix-ui/react-radio-group@1.3.7", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.10", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-9w5XhD0KPOrm92OTTE0SysH3sYzHsSTHNvZgUBo/VZ80VdYyB5RneDbc0dKpURS24IxkoFRu/hI0i4XyfFwY6g=="],

    "@radix-ui/react-roving-focus": ["@radix-ui/react-roving-focus@1.1.10", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-dT9aOXUen9JSsxnMPv/0VqySQf5eDQ6LCk5Sw28kamz8wSOW2bJdlX2Bg5VUIIcV+6XlHpWTIuTPCf/UNIyq8Q=="],

    "@radix-ui/react-scroll-area": ["@radix-ui/react-scroll-area@1.2.9", "", { "dependencies": { "@radix-ui/number": "1.1.1", "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-YSjEfBXnhUELsO2VzjdtYYD4CfQjvao+lhhrX5XsHD7/cyUNzljF1FHEbgTPN7LH2MClfwRMIsYlqTYpKTTe2A=="],

    "@radix-ui/react-select": ["@radix-ui/react-select@2.2.5", "", { "dependencies": { "@radix-ui/number": "1.1.1", "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-focus-guards": "1.1.2", "@radix-ui/react-focus-scope": "1.1.7", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.7", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-visually-hidden": "1.2.3", "aria-hidden": "^1.2.4", "react-remove-scroll": "^2.6.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-HnMTdXEVuuyzx63ME0ut4+sEMYW6oouHWNGUZc7ddvUWIcfCva/AMoqEW/3wnEllriMWBa0RHspCYnfCWJQYmA=="],

    "@radix-ui/react-separator": ["@radix-ui/react-separator@1.1.7", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-0HEb8R9E8A+jZjvmFCy/J4xhbXy3TV+9XSnGJ3KvTtjlIUy/YQ/p6UYZvi7YbeoeXdyU9+Y3scizK6hkY37baA=="],

    "@radix-ui/react-slider": ["@radix-ui/react-slider@1.3.5", "", { "dependencies": { "@radix-ui/number": "1.1.1", "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-rkfe2pU2NBAYfGaxa3Mqosi7VZEWX5CxKaanRv0vZd4Zhl9fvQrg0VM93dv3xGLGfrHuoTRF3JXH8nb9g+B3fw=="],

    "@radix-ui/react-slot": ["@radix-ui/react-slot@1.2.3", "", { "dependencies": { "@radix-ui/react-compose-refs": "1.1.2" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A=="],

    "@radix-ui/react-switch": ["@radix-ui/react-switch@1.2.5", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-previous": "1.1.1", "@radix-ui/react-use-size": "1.1.1" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-5ijLkak6ZMylXsaImpZ8u4Rlf5grRmoc0p0QeX9VJtlrM4f5m3nCTX8tWga/zOA8PZYIR/t0p2Mnvd7InrJ6yQ=="],

    "@radix-ui/react-tabs": ["@radix-ui/react-tabs@1.1.12", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.10", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-GTVAlRVrQrSw3cEARM0nAx73ixrWDPNZAruETn3oHCNP6SbZ/hNxdxp+u7VkIEv3/sFoLq1PfcHrl7Pnp0CDpw=="],

    "@radix-ui/react-toast": ["@radix-ui/react-toast@1.2.14", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-collection": "1.1.7", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-callback-ref": "1.1.1", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-use-layout-effect": "1.1.1", "@radix-ui/react-visually-hidden": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-nAP5FBxBJGQ/YfUB+r+O6USFVkWq3gAInkxyEnmvEV5jtSbfDhfa4hwX8CraCnbjMLsE7XSf/K75l9xXY7joWg=="],

    "@radix-ui/react-toggle": ["@radix-ui/react-toggle@1.1.9", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ZoFkBBz9zv9GWer7wIjvdRxmh2wyc2oKWw6C6CseWd6/yq1DK/l5lJ+wnsmFwJZbBYqr02mrf8A2q/CVCuM3ZA=="],

    "@radix-ui/react-toggle-group": ["@radix-ui/react-toggle-group@1.1.10", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-direction": "1.1.1", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-roving-focus": "1.1.10", "@radix-ui/react-toggle": "1.1.9", "@radix-ui/react-use-controllable-state": "1.2.2" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-kiU694Km3WFLTC75DdqgM/3Jauf3rD9wxeS9XtyWFKsBUeZA337lC+6uUazT7I1DhanZ5gyD5Stf8uf2dbQxOQ=="],

    "@radix-ui/react-tooltip": ["@radix-ui/react-tooltip@1.2.7", "", { "dependencies": { "@radix-ui/primitive": "1.1.2", "@radix-ui/react-compose-refs": "1.1.2", "@radix-ui/react-context": "1.1.2", "@radix-ui/react-dismissable-layer": "1.1.10", "@radix-ui/react-id": "1.1.1", "@radix-ui/react-popper": "1.2.7", "@radix-ui/react-portal": "1.1.9", "@radix-ui/react-presence": "1.1.4", "@radix-ui/react-primitive": "2.1.3", "@radix-ui/react-slot": "1.2.3", "@radix-ui/react-use-controllable-state": "1.2.2", "@radix-ui/react-visually-hidden": "1.2.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Ap+fNYwKTYJ9pzqW+Xe2HtMRbQ/EeWkj2qykZ6SuEV4iS/o1bZI5ssJbk4D2r8XuDuOBVz/tIx2JObtuqU+5Zw=="],

    "@radix-ui/react-use-callback-ref": ["@radix-ui/react-use-callback-ref@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-FkBMwD+qbGQeMu1cOHnuGB6x4yzPjho8ap5WtbEJ26umhgqVXbhekKUQO+hZEL1vU92a3wHwdp0HAcqAUF5iDg=="],

    "@radix-ui/react-use-controllable-state": ["@radix-ui/react-use-controllable-state@1.2.2", "", { "dependencies": { "@radix-ui/react-use-effect-event": "0.0.2", "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-BjasUjixPFdS+NKkypcyyN5Pmg83Olst0+c6vGov0diwTEo6mgdqVR6hxcEgFuh4QrAs7Rc+9KuGJ9TVCj0Zzg=="],

    "@radix-ui/react-use-effect-event": ["@radix-ui/react-use-effect-event@0.0.2", "", { "dependencies": { "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Qp8WbZOBe+blgpuUT+lw2xheLP8q0oatc9UpmiemEICxGvFLYmHm9QowVZGHtJlGbS6A6yJ3iViad/2cVjnOiA=="],

    "@radix-ui/react-use-escape-keydown": ["@radix-ui/react-use-escape-keydown@1.1.1", "", { "dependencies": { "@radix-ui/react-use-callback-ref": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-Il0+boE7w/XebUHyBjroE+DbByORGR9KKmITzbR7MyQ4akpORYP/ZmbhAr0DG7RmmBqoOnZdy2QlvajJ2QA59g=="],

    "@radix-ui/react-use-is-hydrated": ["@radix-ui/react-use-is-hydrated@0.1.0", "", { "dependencies": { "use-sync-external-store": "^1.5.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-U+UORVEq+cTnRIaostJv9AGdV3G6Y+zbVd+12e18jQ5A3c0xL03IhnHuiU4UV69wolOQp5GfR58NW/EgdQhwOA=="],

    "@radix-ui/react-use-layout-effect": ["@radix-ui/react-use-layout-effect@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ=="],

    "@radix-ui/react-use-previous": ["@radix-ui/react-use-previous@1.1.1", "", { "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-2dHfToCj/pzca2Ck724OZ5L0EVrr3eHRNsG/b3xQJLA2hZpVCS99bLAX+hm1IHXDEnzU6by5z/5MIY794/a8NQ=="],

    "@radix-ui/react-use-rect": ["@radix-ui/react-use-rect@1.1.1", "", { "dependencies": { "@radix-ui/rect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-QTYuDesS0VtuHNNvMh+CjlKJ4LJickCMUAqjlE3+j8w+RlRpwyX3apEQKGFzbZGdo7XNG1tXa+bQqIE7HIXT2w=="],

    "@radix-ui/react-use-size": ["@radix-ui/react-use-size@1.1.1", "", { "dependencies": { "@radix-ui/react-use-layout-effect": "1.1.1" }, "peerDependencies": { "@types/react": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-ewrXRDTAqAXlkl6t/fkXWNAhFX9I+CkKlw6zjEwk86RSPKwZr3xpBRso655aqYafwtnbpHLj6toFzmd6xdVptQ=="],

    "@radix-ui/react-visually-hidden": ["@radix-ui/react-visually-hidden@1.2.3", "", { "dependencies": { "@radix-ui/react-primitive": "2.1.3" }, "peerDependencies": { "@types/react": "*", "@types/react-dom": "*", "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc" } }, "sha512-pzJq12tEaaIhqjbzpCuv/OypJY/BPavOofm+dbab+MHLajy277+1lLm6JFcGgF5eskJ6mquGirhXY2GD/8u8Ug=="],

    "@radix-ui/rect": ["@radix-ui/rect@1.1.1", "", {}, "sha512-HPwpGIzkl28mWyZqG52jiqDJ12waP11Pa1lGoiyUkIEuMLBP0oeK/C89esbXrxsky5we7dfd8U58nm0SgAWpVw=="],

    "@remix-run/router": ["@remix-run/router@1.23.0", "", {}, "sha512-O3rHJzAQKamUz1fvE0Qaw0xSFqsA/yafi2iqeE0pvdFtCO1viYx8QL6f3Ln/aCCTLxs68SLf0KPM9eSeM8yBnA=="],

    "@rolldown/pluginutils": ["@rolldown/pluginutils@1.0.0-beta.27", "", {}, "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA=="],

    "@rollup/rollup-android-arm-eabi": ["@rollup/rollup-android-arm-eabi@4.24.0", "", { "os": "android", "cpu": "arm" }, "sha512-Q6HJd7Y6xdB48x8ZNVDOqsbh2uByBhgK8PiQgPhwkIw/HC/YX5Ghq2mQY5sRMZWHb3VsFkWooUVOZHKr7DmDIA=="],

    "@rollup/rollup-android-arm64": ["@rollup/rollup-android-arm64@4.24.0", "", { "os": "android", "cpu": "arm64" }, "sha512-ijLnS1qFId8xhKjT81uBHuuJp2lU4x2yxa4ctFPtG+MqEE6+C5f/+X/bStmxapgmwLwiL3ih122xv8kVARNAZA=="],

    "@rollup/rollup-darwin-arm64": ["@rollup/rollup-darwin-arm64@4.24.0", "", { "os": "darwin", "cpu": "arm64" }, "sha512-bIv+X9xeSs1XCk6DVvkO+S/z8/2AMt/2lMqdQbMrmVpgFvXlmde9mLcbQpztXm1tajC3raFDqegsH18HQPMYtA=="],

    "@rollup/rollup-darwin-x64": ["@rollup/rollup-darwin-x64@4.24.0", "", { "os": "darwin", "cpu": "x64" }, "sha512-X6/nOwoFN7RT2svEQWUsW/5C/fYMBe4fnLK9DQk4SX4mgVBiTA9h64kjUYPvGQ0F/9xwJ5U5UfTbl6BEjaQdBQ=="],

    "@rollup/rollup-linux-arm-gnueabihf": ["@rollup/rollup-linux-arm-gnueabihf@4.24.0", "", { "os": "linux", "cpu": "arm" }, "sha512-0KXvIJQMOImLCVCz9uvvdPgfyWo93aHHp8ui3FrtOP57svqrF/roSSR5pjqL2hcMp0ljeGlU4q9o/rQaAQ3AYA=="],

    "@rollup/rollup-linux-arm-musleabihf": ["@rollup/rollup-linux-arm-musleabihf@4.24.0", "", { "os": "linux", "cpu": "arm" }, "sha512-it2BW6kKFVh8xk/BnHfakEeoLPv8STIISekpoF+nBgWM4d55CZKc7T4Dx1pEbTnYm/xEKMgy1MNtYuoA8RFIWw=="],

    "@rollup/rollup-linux-arm64-gnu": ["@rollup/rollup-linux-arm64-gnu@4.24.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-i0xTLXjqap2eRfulFVlSnM5dEbTVque/3Pi4g2y7cxrs7+a9De42z4XxKLYJ7+OhE3IgxvfQM7vQc43bwTgPwA=="],

    "@rollup/rollup-linux-arm64-musl": ["@rollup/rollup-linux-arm64-musl@4.24.0", "", { "os": "linux", "cpu": "arm64" }, "sha512-9E6MKUJhDuDh604Qco5yP/3qn3y7SLXYuiC0Rpr89aMScS2UAmK1wHP2b7KAa1nSjWJc/f/Lc0Wl1L47qjiyQw=="],

    "@rollup/rollup-linux-powerpc64le-gnu": ["@rollup/rollup-linux-powerpc64le-gnu@4.24.0", "", { "os": "linux", "cpu": "ppc64" }, "sha512-2XFFPJ2XMEiF5Zi2EBf4h73oR1V/lycirxZxHZNc93SqDN/IWhYYSYj8I9381ikUFXZrz2v7r2tOVk2NBwxrWw=="],

    "@rollup/rollup-linux-riscv64-gnu": ["@rollup/rollup-linux-riscv64-gnu@4.24.0", "", { "os": "linux", "cpu": "none" }, "sha512-M3Dg4hlwuntUCdzU7KjYqbbd+BLq3JMAOhCKdBE3TcMGMZbKkDdJ5ivNdehOssMCIokNHFOsv7DO4rlEOfyKpg=="],

    "@rollup/rollup-linux-s390x-gnu": ["@rollup/rollup-linux-s390x-gnu@4.24.0", "", { "os": "linux", "cpu": "s390x" }, "sha512-mjBaoo4ocxJppTorZVKWFpy1bfFj9FeCMJqzlMQGjpNPY9JwQi7OuS1axzNIk0nMX6jSgy6ZURDZ2w0QW6D56g=="],

    "@rollup/rollup-linux-x64-gnu": ["@rollup/rollup-linux-x64-gnu@4.24.0", "", { "os": "linux", "cpu": "x64" }, "sha512-ZXFk7M72R0YYFN5q13niV0B7G8/5dcQ9JDp8keJSfr3GoZeXEoMHP/HlvqROA3OMbMdfr19IjCeNAnPUG93b6A=="],

    "@rollup/rollup-linux-x64-musl": ["@rollup/rollup-linux-x64-musl@4.24.0", "", { "os": "linux", "cpu": "x64" }, "sha512-w1i+L7kAXZNdYl+vFvzSZy8Y1arS7vMgIy8wusXJzRrPyof5LAb02KGr1PD2EkRcl73kHulIID0M501lN+vobQ=="],

    "@rollup/rollup-win32-arm64-msvc": ["@rollup/rollup-win32-arm64-msvc@4.24.0", "", { "os": "win32", "cpu": "arm64" }, "sha512-VXBrnPWgBpVDCVY6XF3LEW0pOU51KbaHhccHw6AS6vBWIC60eqsH19DAeeObl+g8nKAz04QFdl/Cefta0xQtUQ=="],

    "@rollup/rollup-win32-ia32-msvc": ["@rollup/rollup-win32-ia32-msvc@4.24.0", "", { "os": "win32", "cpu": "ia32" }, "sha512-xrNcGDU0OxVcPTH/8n/ShH4UevZxKIO6HJFK0e15XItZP2UcaiLFd5kiX7hJnqCbSztUF8Qot+JWBC/QXRPYWQ=="],

    "@rollup/rollup-win32-x64-msvc": ["@rollup/rollup-win32-x64-msvc@4.24.0", "", { "os": "win32", "cpu": "x64" }, "sha512-fbMkAF7fufku0N2dE5TBXcNlg0pt0cJue4xBRE2Qc5Vqikxr4VCgKj/ht6SMdFcOacVA9rqF70APJ8RN/4vMJw=="],

    "@swc/core": ["@swc/core@1.13.2", "", { "dependencies": { "@swc/counter": "^0.1.3", "@swc/types": "^0.1.23" }, "optionalDependencies": { "@swc/core-darwin-arm64": "1.13.2", "@swc/core-darwin-x64": "1.13.2", "@swc/core-linux-arm-gnueabihf": "1.13.2", "@swc/core-linux-arm64-gnu": "1.13.2", "@swc/core-linux-arm64-musl": "1.13.2", "@swc/core-linux-x64-gnu": "1.13.2", "@swc/core-linux-x64-musl": "1.13.2", "@swc/core-win32-arm64-msvc": "1.13.2", "@swc/core-win32-ia32-msvc": "1.13.2", "@swc/core-win32-x64-msvc": "1.13.2" }, "peerDependencies": { "@swc/helpers": ">=0.5.17" }, "optionalPeers": ["@swc/helpers"] }, "sha512-YWqn+0IKXDhqVLKoac4v2tV6hJqB/wOh8/Br8zjqeqBkKa77Qb0Kw2i7LOFzjFNZbZaPH6AlMGlBwNrxaauaAg=="],

    "@swc/core-darwin-arm64": ["@swc/core-darwin-arm64@1.13.2", "", { "os": "darwin", "cpu": "arm64" }, "sha512-44p7ivuLSGFJ15Vly4ivLJjg3ARo4879LtEBAabcHhSZygpmkP8eyjyWxrH3OxkY1eRZSIJe8yRZPFw4kPXFPw=="],

    "@swc/core-darwin-x64": ["@swc/core-darwin-x64@1.13.2", "", { "os": "darwin", "cpu": "x64" }, "sha512-Lb9EZi7X2XDAVmuUlBm2UvVAgSCbD3qKqDCxSI4jEOddzVOpNCnyZ/xEampdngUIyDDhhJLYU9duC+Mcsv5Y+A=="],

    "@swc/core-linux-arm-gnueabihf": ["@swc/core-linux-arm-gnueabihf@1.13.2", "", { "os": "linux", "cpu": "arm" }, "sha512-9TDe/92ee1x57x+0OqL1huG4BeljVx0nWW4QOOxp8CCK67Rpc/HHl2wciJ0Kl9Dxf2NvpNtkPvqj9+BUmM9WVA=="],

    "@swc/core-linux-arm64-gnu": ["@swc/core-linux-arm64-gnu@1.13.2", "", { "os": "linux", "cpu": "arm64" }, "sha512-KJUSl56DBk7AWMAIEcU83zl5mg3vlQYhLELhjwRFkGFMvghQvdqQ3zFOYa4TexKA7noBZa3C8fb24rI5sw9Exg=="],

    "@swc/core-linux-arm64-musl": ["@swc/core-linux-arm64-musl@1.13.2", "", { "os": "linux", "cpu": "arm64" }, "sha512-teU27iG1oyWpNh9CzcGQ48ClDRt/RCem7mYO7ehd2FY102UeTws2+OzLESS1TS1tEZipq/5xwx3FzbVgiolCiQ=="],

    "@swc/core-linux-x64-gnu": ["@swc/core-linux-x64-gnu@1.13.2", "", { "os": "linux", "cpu": "x64" }, "sha512-dRPsyPyqpLD0HMRCRpYALIh4kdOir8pPg4AhNQZLehKowigRd30RcLXGNVZcc31Ua8CiPI4QSgjOIxK+EQe4LQ=="],

    "@swc/core-linux-x64-musl": ["@swc/core-linux-x64-musl@1.13.2", "", { "os": "linux", "cpu": "x64" }, "sha512-CCxETW+KkYEQDqz1SYC15YIWYheqFC+PJVOW76Maa/8yu8Biw+HTAcblKf2isrlUtK8RvrQN94v3UXkC2NzCEw=="],

    "@swc/core-win32-arm64-msvc": ["@swc/core-win32-arm64-msvc@1.13.2", "", { "os": "win32", "cpu": "arm64" }, "sha512-Wv/QTA6PjyRLlmKcN6AmSI4jwSMRl0VTLGs57PHTqYRwwfwd7y4s2fIPJVBNbAlXd795dOEP6d/bGSQSyhOX3A=="],

    "@swc/core-win32-ia32-msvc": ["@swc/core-win32-ia32-msvc@1.13.2", "", { "os": "win32", "cpu": "ia32" }, "sha512-PuCdtNynEkUNbUXX/wsyUC+t4mamIU5y00lT5vJcAvco3/r16Iaxl5UCzhXYaWZSNVZMzPp9qN8NlSL8M5pPxw=="],

    "@swc/core-win32-x64-msvc": ["@swc/core-win32-x64-msvc@1.13.2", "", { "os": "win32", "cpu": "x64" }, "sha512-qlmMkFZJus8cYuBURx1a3YAG2G7IW44i+FEYV5/32ylKkzGNAr9tDJSA53XNnNXkAB5EXSPsOz7bn5C3JlEtdQ=="],

    "@swc/counter": ["@swc/counter@0.1.3", "", {}, "sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ=="],

    "@swc/types": ["@swc/types@0.1.23", "", { "dependencies": { "@swc/counter": "^0.1.3" } }, "sha512-u1iIVZV9Q0jxY+yM2vw/hZGDNudsN85bBpTqzAQ9rzkxW9D+e3aEM4Han+ow518gSewkXgjmEK0BD79ZcNVgPw=="],

    "@tailwindcss/typography": ["@tailwindcss/typography@0.5.16", "", { "dependencies": { "lodash.castarray": "^4.4.0", "lodash.isplainobject": "^4.0.6", "lodash.merge": "^4.6.2", "postcss-selector-parser": "6.0.10" }, "peerDependencies": { "tailwindcss": ">=3.0.0 || insiders || >=4.0.0-alpha.20 || >=4.0.0-beta.1" } }, "sha512-0wDLwCVF5V3x3b1SGXPCDcdsbDHMBe+lkFzBRaHeLvNi+nrrnZ1lA18u+OTWO8iSWU2GxUOCvlXtDuqftc1oiA=="],

    "@tanstack/query-core": ["@tanstack/query-core@5.83.0", "", {}, "sha512-0M8dA+amXUkyz5cVUm/B+zSk3xkQAcuXuz5/Q/LveT4ots2rBpPTZOzd7yJa2Utsf8D2Upl5KyjhHRY+9lB/XA=="],

    "@tanstack/react-query": ["@tanstack/react-query@5.83.0", "", { "dependencies": { "@tanstack/query-core": "5.83.0" }, "peerDependencies": { "react": "^18 || ^19" } }, "sha512-/XGYhZ3foc5H0VM2jLSD/NyBRIOK4q9kfeml4+0x2DlL6xVuAcVEW+hTlTapAmejObg0i3eNqhkr2dT+eciwoQ=="],

    "@testing-library/jest-dom": ["@testing-library/jest-dom@6.9.1", "", { "dependencies": { "@adobe/css-tools": "^4.4.0", "aria-query": "^5.0.0", "css.escape": "^1.5.1", "dom-accessibility-api": "^0.6.3", "picocolors": "^1.1.1", "redent": "^3.0.0" } }, "sha512-zIcONa+hVtVSSep9UT3jZ5rizo2BsxgyDYU7WFD5eICBE7no3881HGeb/QkGfsJs6JTkY1aQhT7rIPC7e+0nnA=="],

    "@testing-library/react": ["@testing-library/react@16.3.2", "", { "dependencies": { "@babel/runtime": "^7.12.5" }, "peerDependencies": { "@types/react": "^18.0.0 || ^19.0.0", "@types/react-dom": "^18.0.0 || ^19.0.0", "react": "^18.0.0 || ^19.0.0", "react-dom": "^18.0.0 || ^19.0.0" } }, "sha512-XU5/SytQM+ykqMnAnvB2umaJNIOsLF3PVv//1Ew4CTcpz0/BRyy/af40qqrt7SjKpDdT1saBMc42CUok5gaw+g=="],

    "@tootallnate/once": ["@tootallnate/once@2.0.0", "", {}, "sha512-XCuKFP5PS55gnMVu3dty8KPatLqUoy/ZYzDzAGCQ8JNFCkLXzmI7vNHCR+XpbZaMWQK/vQubr7PkYq8g470J/A=="],

    "@types/chai": ["@types/chai@5.2.3", "", { "dependencies": { "@types/deep-eql": "*", "assertion-error": "^2.0.1" } }, "sha512-Mw558oeA9fFbv65/y4mHtXDs9bPnFMZAL/jxdPFUpOHHIXX91mcgEHbS5Lahr+pwZFR8A7GQleRWeI6cGFC2UA=="],

    "@types/d3-array": ["@types/d3-array@3.2.1", "", {}, "sha512-Y2Jn2idRrLzUfAKV2LyRImR+y4oa2AntrgID95SHJxuMUrkNXmanDSed71sRNZysveJVt1hLLemQZIady0FpEg=="],

    "@types/d3-color": ["@types/d3-color@3.1.3", "", {}, "sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A=="],

    "@types/d3-ease": ["@types/d3-ease@3.0.2", "", {}, "sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA=="],

    "@types/d3-interpolate": ["@types/d3-interpolate@3.0.4", "", { "dependencies": { "@types/d3-color": "*" } }, "sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA=="],

    "@types/d3-path": ["@types/d3-path@3.1.0", "", {}, "sha512-P2dlU/q51fkOc/Gfl3Ul9kicV7l+ra934qBFXCFhrZMOL6du1TM0pm1ThYvENukyOn5h9v+yMJ9Fn5JK4QozrQ=="],

    "@types/d3-scale": ["@types/d3-scale@4.0.8", "", { "dependencies": { "@types/d3-time": "*" } }, "sha512-gkK1VVTr5iNiYJ7vWDI+yUFFlszhNMtVeneJ6lUTKPjprsvLLI9/tgEGiXJOnlINJA8FyA88gfnQsHbybVZrYQ=="],

    "@types/d3-shape": ["@types/d3-shape@3.1.6", "", { "dependencies": { "@types/d3-path": "*" } }, "sha512-5KKk5aKGu2I+O6SONMYSNflgiP0WfZIQvVUMan50wHsLG1G94JlxEVnCpQARfTtzytuY0p/9PXXZb3I7giofIA=="],

    "@types/d3-time": ["@types/d3-time@3.0.3", "", {}, "sha512-2p6olUZ4w3s+07q3Tm2dbiMZy5pCDfYwtLXXHUnVzXgQlZ/OyPtUz6OL382BkOuGlLXqfT+wqv8Fw2v8/0geBw=="],

    "@types/d3-timer": ["@types/d3-timer@3.0.2", "", {}, "sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw=="],

    "@types/debug": ["@types/debug@4.1.12", "", { "dependencies": { "@types/ms": "*" } }, "sha512-vIChWdVG3LG1SMxEvI/AK+FWJthlrqlTu7fbrlywTkkaONwk/UAGaULXRlf8vkzFBLVm0zkMdCquhL5aOjhXPQ=="],

    "@types/deep-eql": ["@types/deep-eql@4.0.2", "", {}, "sha512-c9h9dVVMigMPc4bwTvC5dxqtqJZwQPePsWjPlpSOnojbor6pGqdk541lfA7AqFQr5pB1BRdq0juY9db81BwyFw=="],

    "@types/estree": ["@types/estree@1.0.6", "", {}, "sha512-AYnb1nQyY49te+VRAVgmzfcgjYS91mY5P0TKUDCLEM+gNnA+3T6rWITXRLYCpahpqSQbN5cE+gHpnPyXjHWxcw=="],

    "@types/estree-jsx": ["@types/estree-jsx@1.0.5", "", { "dependencies": { "@types/estree": "*" } }, "sha512-52CcUVNFyfb1A2ALocQw/Dd1BQFNmSdkuC3BkZ6iqhdMfQz7JWOFRuJFloOzjk+6WijU56m9oKXFAXc7o3Towg=="],

    "@types/hast": ["@types/hast@3.0.4", "", { "dependencies": { "@types/unist": "*" } }, "sha512-WPs+bbQw5aCj+x6laNGWLH3wviHtoCv/P3+otBhbOhJgG8qtpdAMlTCxLtsTWA7LH1Oh/bFCHsBn0TPS5m30EQ=="],

    "@types/json-schema": ["@types/json-schema@7.0.15", "", {}, "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA=="],

    "@types/mdast": ["@types/mdast@4.0.4", "", { "dependencies": { "@types/unist": "*" } }, "sha512-kGaNbPh1k7AFzgpud/gMdvIm5xuECykRR+JnWKQno9TAXVa6WIVCGTPvYGekIDL4uwCZQSYbUxNBSb1aUo79oA=="],

    "@types/ms": ["@types/ms@2.1.0", "", {}, "sha512-GsCCIZDE/p3i96vtEqx+7dBUGXrc7zeSK3wwPHIaRThS+9OhWIXRqzs4d6k1SVU8g91DrNRWxWUGhp5KXQb2VA=="],

    "@types/node": ["@types/node@22.16.5", "", { "dependencies": { "undici-types": "~6.21.0" } }, "sha512-bJFoMATwIGaxxx8VJPeM8TonI8t579oRvgAuT8zFugJsJZgzqv0Fu8Mhp68iecjzG7cnN3mO2dJQ5uUM2EFrgQ=="],

    "@types/prop-types": ["@types/prop-types@15.7.13", "", {}, "sha512-hCZTSvwbzWGvhqxp/RqVqwU999pBf2vp7hzIjiYOsl8wqOmUxkQ6ddw1cV3l8811+kdUFus/q4d1Y3E3SyEifA=="],

    "@types/react": ["@types/react@18.3.23", "", { "dependencies": { "@types/prop-types": "*", "csstype": "^3.0.2" } }, "sha512-/LDXMQh55EzZQ0uVAZmKKhfENivEvWz6E+EYzh+/MCjMhNsotd+ZHhBGIjFDTi6+fz0OhQQQLbTgdQIxxCsC0w=="],

    "@types/react-dom": ["@types/react-dom@18.3.7", "", { "peerDependencies": { "@types/react": "^18.0.0" } }, "sha512-MEe3UeoENYVFXzoXEWsvcpg6ZvlrFNlOQ7EOsvhI3CfAXwzPfO8Qwuxd40nepsYKqyyVQnTdEfv68q91yLcKrQ=="],

    "@types/unist": ["@types/unist@3.0.3", "", {}, "sha512-ko/gIFJRv177XgZsZcBwnqJN5x/Gien8qNOn0D5bQU/zAzVf9Zt3BlcUiLqhV9y4ARk0GbT3tnUiPNgnTXzc/Q=="],

    "@typescript-eslint/eslint-plugin": ["@typescript-eslint/eslint-plugin@8.38.0", "", { "dependencies": { "@eslint-community/regexpp": "^4.10.0", "@typescript-eslint/scope-manager": "8.38.0", "@typescript-eslint/type-utils": "8.38.0", "@typescript-eslint/utils": "8.38.0", "@typescript-eslint/visitor-keys": "8.38.0", "graphemer": "^1.4.0", "ignore": "^7.0.0", "natural-compare": "^1.4.0", "ts-api-utils": "^2.1.0" }, "peerDependencies": { "@typescript-eslint/parser": "^8.38.0", "eslint": "^8.57.0 || ^9.0.0", "typescript": ">=4.8.4 <5.9.0" } }, "sha512-CPoznzpuAnIOl4nhj4tRr4gIPj5AfKgkiJmGQDaq+fQnRJTYlcBjbX3wbciGmpoPf8DREufuPRe1tNMZnGdanA=="],

    "@typescript-eslint/parser": ["@typescript-eslint/parser@8.38.0", "", { "dependencies": { "@typescript-eslint/scope-manager": "8.38.0", "@typescript-eslint/types": "8.38.0", "@typescript-eslint/typescript-estree": "8.38.0", "@typescript-eslint/visitor-keys": "8.38.0", "debug": "^4.3.4" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0", "typescript": ">=4.8.4 <5.9.0" } }, "sha512-Zhy8HCvBUEfBECzIl1PKqF4p11+d0aUJS1GeUiuqK9WmOug8YCmC4h4bjyBvMyAMI9sbRczmrYL5lKg/YMbrcQ=="],

    "@typescript-eslint/project-service": ["@typescript-eslint/project-service@8.38.0", "", { "dependencies": { "@typescript-eslint/tsconfig-utils": "^8.38.0", "@typescript-eslint/types": "^8.38.0", "debug": "^4.3.4" }, "peerDependencies": { "typescript": ">=4.8.4 <5.9.0" } }, "sha512-dbK7Jvqcb8c9QfH01YB6pORpqX1mn5gDZc9n63Ak/+jD67oWXn3Gs0M6vddAN+eDXBCS5EmNWzbSxsn9SzFWWg=="],

    "@typescript-eslint/scope-manager": ["@typescript-eslint/scope-manager@8.38.0", "", { "dependencies": { "@typescript-eslint/types": "8.38.0", "@typescript-eslint/visitor-keys": "8.38.0" } }, "sha512-WJw3AVlFFcdT9Ri1xs/lg8LwDqgekWXWhH3iAF+1ZM+QPd7oxQ6jvtW/JPwzAScxitILUIFs0/AnQ/UWHzbATQ=="],

    "@typescript-eslint/tsconfig-utils": ["@typescript-eslint/tsconfig-utils@8.38.0", "", { "peerDependencies": { "typescript": ">=4.8.4 <5.9.0" } }, "sha512-Lum9RtSE3EroKk/bYns+sPOodqb2Fv50XOl/gMviMKNvanETUuUcC9ObRbzrJ4VSd2JalPqgSAavwrPiPvnAiQ=="],

    "@typescript-eslint/type-utils": ["@typescript-eslint/type-utils@8.38.0", "", { "dependencies": { "@typescript-eslint/types": "8.38.0", "@typescript-eslint/typescript-estree": "8.38.0", "@typescript-eslint/utils": "8.38.0", "debug": "^4.3.4", "ts-api-utils": "^2.1.0" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0", "typescript": ">=4.8.4 <5.9.0" } }, "sha512-c7jAvGEZVf0ao2z+nnz8BUaHZD09Agbh+DY7qvBQqLiz8uJzRgVPj5YvOh8I8uEiH8oIUGIfHzMwUcGVco/SJg=="],

    "@typescript-eslint/types": ["@typescript-eslint/types@8.38.0", "", {}, "sha512-wzkUfX3plUqij4YwWaJyqhiPE5UCRVlFpKn1oCRn2O1bJ592XxWJj8ROQ3JD5MYXLORW84063z3tZTb/cs4Tyw=="],

    "@typescript-eslint/typescript-estree": ["@typescript-eslint/typescript-estree@8.38.0", "", { "dependencies": { "@typescript-eslint/project-service": "8.38.0", "@typescript-eslint/tsconfig-utils": "8.38.0", "@typescript-eslint/types": "8.38.0", "@typescript-eslint/visitor-keys": "8.38.0", "debug": "^4.3.4", "fast-glob": "^3.3.2", "is-glob": "^4.0.3", "minimatch": "^9.0.4", "semver": "^7.6.0", "ts-api-utils": "^2.1.0" }, "peerDependencies": { "typescript": ">=4.8.4 <5.9.0" } }, "sha512-fooELKcAKzxux6fA6pxOflpNS0jc+nOQEEOipXFNjSlBS6fqrJOVY/whSn70SScHrcJ2LDsxWrneFoWYSVfqhQ=="],

    "@typescript-eslint/utils": ["@typescript-eslint/utils@8.38.0", "", { "dependencies": { "@eslint-community/eslint-utils": "^4.7.0", "@typescript-eslint/scope-manager": "8.38.0", "@typescript-eslint/types": "8.38.0", "@typescript-eslint/typescript-estree": "8.38.0" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0", "typescript": ">=4.8.4 <5.9.0" } }, "sha512-hHcMA86Hgt+ijJlrD8fX0j1j8w4C92zue/8LOPAFioIno+W0+L7KqE8QZKCcPGc/92Vs9x36w/4MPTJhqXdyvg=="],

    "@typescript-eslint/visitor-keys": ["@typescript-eslint/visitor-keys@8.38.0", "", { "dependencies": { "@typescript-eslint/types": "8.38.0", "eslint-visitor-keys": "^4.2.1" } }, "sha512-pWrTcoFNWuwHlA9CvlfSsGWs14JxfN1TH25zM5L7o0pRLhsoZkDnTsXfQRJBEWJoV5DL0jf+Z+sxiud+K0mq1g=="],

    "@ungap/structured-clone": ["@ungap/structured-clone@1.3.0", "", {}, "sha512-WmoN8qaIAo7WTYWbAZuG8PYEhn5fkz7dZrqTBZ7dtt//lL2Gwms1IcnQ5yHqjDfX8Ft5j4YzDM23f87zBfDe9g=="],

    "@vitejs/plugin-react-swc": ["@vitejs/plugin-react-swc@3.11.0", "", { "dependencies": { "@rolldown/pluginutils": "1.0.0-beta.27", "@swc/core": "^1.12.11" }, "peerDependencies": { "vite": "^4 || ^5 || ^6 || ^7" } }, "sha512-YTJCGFdNMHCMfjODYtxRNVAYmTWQ1Lb8PulP/2/f/oEEtglw8oKxKIZmmRkyXrVrHfsKOaVkAc3NT9/dMutO5w=="],

    "@vitest/expect": ["@vitest/expect@3.2.4", "", { "dependencies": { "@types/chai": "^5.2.2", "@vitest/spy": "3.2.4", "@vitest/utils": "3.2.4", "chai": "^5.2.0", "tinyrainbow": "^2.0.0" } }, "sha512-Io0yyORnB6sikFlt8QW5K7slY4OjqNX9jmJQ02QDda8lyM6B5oNgVWoSoKPac8/kgnCUzuHQKrSLtu/uOqqrig=="],

    "@vitest/mocker": ["@vitest/mocker@3.2.4", "", { "dependencies": { "@vitest/spy": "3.2.4", "estree-walker": "^3.0.3", "magic-string": "^0.30.17" }, "peerDependencies": { "msw": "^2.4.9", "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0" }, "optionalPeers": ["msw"] }, "sha512-46ryTE9RZO/rfDd7pEqFl7etuyzekzEhUbTW3BvmeO/BcCMEgq59BKhek3dXDWgAj4oMK6OZi+vRr1wPW6qjEQ=="],

    "@vitest/pretty-format": ["@vitest/pretty-format@3.2.4", "", { "dependencies": { "tinyrainbow": "^2.0.0" } }, "sha512-IVNZik8IVRJRTr9fxlitMKeJeXFFFN0JaB9PHPGQ8NKQbGpfjlTx9zO4RefN8gp7eqjNy8nyK3NZmBzOPeIxtA=="],

    "@vitest/runner": ["@vitest/runner@3.2.4", "", { "dependencies": { "@vitest/utils": "3.2.4", "pathe": "^2.0.3", "strip-literal": "^3.0.0" } }, "sha512-oukfKT9Mk41LreEW09vt45f8wx7DordoWUZMYdY/cyAk7w5TWkTRCNZYF7sX7n2wB7jyGAl74OxgwhPgKaqDMQ=="],

    "@vitest/snapshot": ["@vitest/snapshot@3.2.4", "", { "dependencies": { "@vitest/pretty-format": "3.2.4", "magic-string": "^0.30.17", "pathe": "^2.0.3" } }, "sha512-dEYtS7qQP2CjU27QBC5oUOxLE/v5eLkGqPE0ZKEIDGMs4vKWe7IjgLOeauHsR0D5YuuycGRO5oSRXnwnmA78fQ=="],

    "@vitest/spy": ["@vitest/spy@3.2.4", "", { "dependencies": { "tinyspy": "^4.0.3" } }, "sha512-vAfasCOe6AIK70iP5UD11Ac4siNUNJ9i/9PZ3NKx07sG6sUxeag1LWdNrMWeKKYBLlzuK+Gn65Yd5nyL6ds+nw=="],

    "@vitest/utils": ["@vitest/utils@3.2.4", "", { "dependencies": { "@vitest/pretty-format": "3.2.4", "loupe": "^3.1.4", "tinyrainbow": "^2.0.0" } }, "sha512-fB2V0JFrQSMsCo9HiSq3Ezpdv4iYaXRG1Sx8edX3MwxfyNn83mKiGzOcH+Fkxt4MHxr3y42fQi1oeAInqgX2QA=="],

    "abab": ["abab@2.0.6", "", {}, "sha512-j2afSsaIENvHZN2B8GOpF566vZ5WVk5opAiMTvWgaQT8DkbOqsTfvNAvHoRGU2zzP8cPoqys+xHTRDWW8L+/BA=="],

    "acorn": ["acorn@8.15.0", "", { "bin": "bin/acorn" }, "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg=="],

    "acorn-globals": ["acorn-globals@7.0.1", "", { "dependencies": { "acorn": "^8.1.0", "acorn-walk": "^8.0.2" } }, "sha512-umOSDSDrfHbTNPuNpC2NSnnA3LUrqpevPb4T9jRx4MagXNS0rs+gwiTcAvqCRmsD6utzsrzNt+ebm00SNWiC3Q=="],

    "acorn-jsx": ["acorn-jsx@5.3.2", "", { "peerDependencies": { "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0" } }, "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ=="],

    "acorn-walk": ["acorn-walk@8.3.5", "", { "dependencies": { "acorn": "^8.11.0" } }, "sha512-HEHNfbars9v4pgpW6SO1KSPkfoS0xVOM/9UzkJltjlsHZmJasxg8aXkuZa7SMf8vKGIBhpUsPluQSqhJFCqebw=="],

    "agent-base": ["agent-base@6.0.2", "", { "dependencies": { "debug": "4" } }, "sha512-RZNwNclF7+MS/8bDg70amg32dyeZGZxiDuQmZxKLAlQjr3jGyLx+4Kkk58UO7D2QdgFIQCovuSuZESne6RG6XQ=="],

    "ajv": ["ajv@6.12.6", "", { "dependencies": { "fast-deep-equal": "^3.1.1", "fast-json-stable-stringify": "^2.0.0", "json-schema-traverse": "^0.4.1", "uri-js": "^4.2.2" } }, "sha512-j3fVLgvTo527anyYyJOGTYJbG+vnnQYvE0m5mmkc1TK+nxAppkCLMIL0aZ4dblVCNoGShhm+kzE4ZUykBoMg4g=="],

    "ansi-regex": ["ansi-regex@6.1.0", "", {}, "sha512-7HSX4QQb4CspciLpVFwyRe79O3xsIZDDLER21kERQ71oaPodF8jL725AgJMFAYbooIqolJoRLuM81SpeUkpkvA=="],

    "ansi-styles": ["ansi-styles@4.3.0", "", { "dependencies": { "color-convert": "^2.0.1" } }, "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg=="],

    "any-promise": ["any-promise@1.3.0", "", {}, "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A=="],

    "anymatch": ["anymatch@3.1.3", "", { "dependencies": { "normalize-path": "^3.0.0", "picomatch": "^2.0.4" } }, "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw=="],

    "arg": ["arg@5.0.2", "", {}, "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg=="],

    "argparse": ["argparse@2.0.1", "", {}, "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q=="],

    "aria-hidden": ["aria-hidden@1.2.4", "", { "dependencies": { "tslib": "^2.0.0" } }, "sha512-y+CcFFwelSXpLZk/7fMB2mUbGtX9lKycf1MWJ7CaTIERyitVlyQx6C+sxcROU2BAJ24OiZyK+8wj2i8AlBoS3A=="],

    "aria-query": ["aria-query@5.3.2", "", {}, "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw=="],

    "assertion-error": ["assertion-error@2.0.1", "", {}, "sha512-Izi8RQcffqCeNVgFigKli1ssklIbpHnCYc6AknXGYoB6grJqyeby7jv12JUQgmTAnIDnbck1uxksT4dzN3PWBA=="],

    "asynckit": ["asynckit@0.4.0", "", {}, "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q=="],

    "autoprefixer": ["autoprefixer@10.4.21", "", { "dependencies": { "browserslist": "^4.24.4", "caniuse-lite": "^1.0.30001702", "fraction.js": "^4.3.7", "normalize-range": "^0.1.2", "picocolors": "^1.1.1", "postcss-value-parser": "^4.2.0" }, "peerDependencies": { "postcss": "^8.1.0" }, "bin": "bin/autoprefixer" }, "sha512-O+A6LWV5LDHSJD3LjHYoNi4VLsj/Whi7k6zG12xTYaU4cQ8oxQGckXNX8cRHK5yOZ/ppVHe0ZBXGzSV9jXdVbQ=="],

    "bail": ["bail@2.0.2", "", {}, "sha512-0xO6mYd7JB2YesxDKplafRpsiOzPt9V02ddPCLbY1xYGPOX24NTyN50qnUxgCPcSoYMhKpAuBTjQoRZCAkUDRw=="],

    "balanced-match": ["balanced-match@1.0.2", "", {}, "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw=="],

    "binary-extensions": ["binary-extensions@2.3.0", "", {}, "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw=="],

    "brace-expansion": ["brace-expansion@1.1.12", "", { "dependencies": { "balanced-match": "^1.0.0", "concat-map": "0.0.1" } }, "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg=="],

    "braces": ["braces@3.0.3", "", { "dependencies": { "fill-range": "^7.1.1" } }, "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA=="],

    "browserslist": ["browserslist@4.25.1", "", { "dependencies": { "caniuse-lite": "^1.0.30001726", "electron-to-chromium": "^1.5.173", "node-releases": "^2.0.19", "update-browserslist-db": "^1.1.3" }, "bin": "cli.js" }, "sha512-KGj0KoOMXLpSNkkEI6Z6mShmQy0bc1I+T7K9N81k4WWMrfz+6fQ6es80B/YLAeRoKvjYE1YSHHOW1qe9xIVzHw=="],

    "cac": ["cac@6.7.14", "", {}, "sha512-b6Ilus+c3RrdDk+JhLKUAQfzzgLEPy6wcXqS7f/xe1EETvsDP6GORG7SFuOs6cID5YkqchW/LXZbX5bc8j7ZcQ=="],

    "call-bind-apply-helpers": ["call-bind-apply-helpers@1.0.2", "", { "dependencies": { "es-errors": "^1.3.0", "function-bind": "^1.1.2" } }, "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ=="],

    "callsites": ["callsites@3.1.0", "", {}, "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ=="],

    "camelcase-css": ["camelcase-css@2.0.1", "", {}, "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA=="],

    "caniuse-lite": ["caniuse-lite@1.0.30001727", "", {}, "sha512-pB68nIHmbN6L/4C6MH1DokyR3bYqFwjaSs/sWDHGj4CTcFtQUQMuJftVwWkXq7mNWOybD3KhUv3oWHoGxgP14Q=="],

    "ccount": ["ccount@2.0.1", "", {}, "sha512-eyrF0jiFpY+3drT6383f1qhkbGsLSifNAjA61IUjZjmLCWjItY6LB9ft9YhoDgwfmclB2zhu51Lc7+95b8NRAg=="],

    "chai": ["chai@5.3.3", "", { "dependencies": { "assertion-error": "^2.0.1", "check-error": "^2.1.1", "deep-eql": "^5.0.1", "loupe": "^3.1.0", "pathval": "^2.0.0" } }, "sha512-4zNhdJD/iOjSH0A05ea+Ke6MU5mmpQcbQsSOkgdaUMJ9zTlDTD/GYlwohmIE2u0gaxHYiVHEn1Fw9mZ/ktJWgw=="],

    "chalk": ["chalk@4.1.2", "", { "dependencies": { "ansi-styles": "^4.1.0", "supports-color": "^7.1.0" } }, "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA=="],

    "character-entities": ["character-entities@2.0.2", "", {}, "sha512-shx7oQ0Awen/BRIdkjkvz54PnEEI/EjwXDSIZp86/KKdbafHh1Df/RYGBhn4hbe2+uKC9FnT5UCEdyPz3ai9hQ=="],

    "character-entities-html4": ["character-entities-html4@2.1.0", "", {}, "sha512-1v7fgQRj6hnSwFpq1Eu0ynr/CDEw0rXo2B61qXrLNdHZmPKgb7fqS1a2JwF0rISo9q77jDI8VMEHoApn8qDoZA=="],

    "character-entities-legacy": ["character-entities-legacy@3.0.0", "", {}, "sha512-RpPp0asT/6ufRm//AJVwpViZbGM/MkjQFxJccQRHmISF/22NBtsHqAWmL+/pmkPWoIUJdWyeVleTl1wydHATVQ=="],

    "character-reference-invalid": ["character-reference-invalid@2.0.1", "", {}, "sha512-iBZ4F4wRbyORVsu0jPV7gXkOsGYjGHPmAyv+HiHG8gi5PtC9KI2j1+v8/tlibRvjoWX027ypmG/n0HtO5t7unw=="],

    "check-error": ["check-error@2.1.3", "", {}, "sha512-PAJdDJusoxnwm1VwW07VWwUN1sl7smmC3OKggvndJFadxxDRyFJBX/ggnu/KE4kQAB7a3Dp8f/YXC1FlUprWmA=="],

    "chokidar": ["chokidar@3.6.0", "", { "dependencies": { "anymatch": "~3.1.2", "braces": "~3.0.2", "glob-parent": "~5.1.2", "is-binary-path": "~2.1.0", "is-glob": "~4.0.1", "normalize-path": "~3.0.0", "readdirp": "~3.6.0" }, "optionalDependencies": { "fsevents": "~2.3.2" } }, "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw=="],

    "class-variance-authority": ["class-variance-authority@0.7.1", "", { "dependencies": { "clsx": "^2.1.1" } }, "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg=="],

    "clsx": ["clsx@2.1.1", "", {}, "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA=="],

    "cmdk": ["cmdk@1.1.1", "", { "dependencies": { "@radix-ui/react-compose-refs": "^1.1.1", "@radix-ui/react-dialog": "^1.1.6", "@radix-ui/react-id": "^1.1.0", "@radix-ui/react-primitive": "^2.0.2" }, "peerDependencies": { "react": "^18 || ^19 || ^19.0.0-rc", "react-dom": "^18 || ^19 || ^19.0.0-rc" } }, "sha512-Vsv7kFaXm+ptHDMZ7izaRsP70GgrW9NBNGswt9OZaVBLlE0SNpDq8eu/VGXyF9r7M0azK3Wy7OlYXsuyYLFzHg=="],

    "color-convert": ["color-convert@2.0.1", "", { "dependencies": { "color-name": "~1.1.4" } }, "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ=="],

    "color-name": ["color-name@1.1.4", "", {}, "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="],

    "combined-stream": ["combined-stream@1.0.8", "", { "dependencies": { "delayed-stream": "~1.0.0" } }, "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg=="],

    "comma-separated-tokens": ["comma-separated-tokens@2.0.3", "", {}, "sha512-Fu4hJdvzeylCfQPp9SGWidpzrMs7tTrlu6Vb8XGaRGck8QSNZJJp538Wrb60Lax4fPwR64ViY468OIUTbRlGZg=="],

    "commander": ["commander@4.1.1", "", {}, "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA=="],

    "concat-map": ["concat-map@0.0.1", "", {}, "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg=="],

    "cross-spawn": ["cross-spawn@7.0.6", "", { "dependencies": { "path-key": "^3.1.0", "shebang-command": "^2.0.0", "which": "^2.0.1" } }, "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA=="],

    "css.escape": ["css.escape@1.5.1", "", {}, "sha512-YUifsXXuknHlUsmlgyY0PKzgPOr7/FjCePfHNt0jxm83wHZi44VDMQ7/fGNkjY3/jV1MC+1CmZbaHzugyeRtpg=="],

    "cssesc": ["cssesc@3.0.0", "", { "bin": "bin/cssesc" }, "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg=="],

    "cssom": ["cssom@0.5.0", "", {}, "sha512-iKuQcq+NdHqlAcwUY0o/HL69XQrUaQdMjmStJ8JFmUaiiQErlhrmuigkg/CU4E2J0IyUKUrMAgl36TvN67MqTw=="],

    "cssstyle": ["cssstyle@2.3.0", "", { "dependencies": { "cssom": "~0.3.6" } }, "sha512-AZL67abkUzIuvcHqk7c09cezpGNcxUxU4Ioi/05xHk4DQeTkWmGYftIE6ctU6AEt+Gn4n1lDStOtj7FKycP71A=="],

    "csstype": ["csstype@3.1.3", "", {}, "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw=="],

    "d3-array": ["d3-array@3.2.4", "", { "dependencies": { "internmap": "1 - 2" } }, "sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg=="],

    "d3-color": ["d3-color@3.1.0", "", {}, "sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA=="],

    "d3-ease": ["d3-ease@3.0.1", "", {}, "sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w=="],

    "d3-format": ["d3-format@3.1.0", "", {}, "sha512-YyUI6AEuY/Wpt8KWLgZHsIU86atmikuoOmCfommt0LYHiQSPjvX2AcFc38PX0CBpr2RCyZhjex+NS/LPOv6YqA=="],

    "d3-interpolate": ["d3-interpolate@3.0.1", "", { "dependencies": { "d3-color": "1 - 3" } }, "sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g=="],

    "d3-path": ["d3-path@3.1.0", "", {}, "sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ=="],

    "d3-scale": ["d3-scale@4.0.2", "", { "dependencies": { "d3-array": "2.10.0 - 3", "d3-format": "1 - 3", "d3-interpolate": "1.2.0 - 3", "d3-time": "2.1.1 - 3", "d3-time-format": "2 - 4" } }, "sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ=="],

    "d3-shape": ["d3-shape@3.2.0", "", { "dependencies": { "d3-path": "^3.1.0" } }, "sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA=="],

    "d3-time": ["d3-time@3.1.0", "", { "dependencies": { "d3-array": "2 - 3" } }, "sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q=="],

    "d3-time-format": ["d3-time-format@4.1.0", "", { "dependencies": { "d3-time": "1 - 3" } }, "sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg=="],

    "d3-timer": ["d3-timer@3.0.1", "", {}, "sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA=="],

    "data-urls": ["data-urls@3.0.2", "", { "dependencies": { "abab": "^2.0.6", "whatwg-mimetype": "^3.0.0", "whatwg-url": "^11.0.0" } }, "sha512-Jy/tj3ldjZJo63sVAvg6LHt2mHvl4V6AgRAmNDtLdm7faqtsx+aJG42rsyCo9JCoRVKwPFzKlIPx3DIibwSIaQ=="],

    "date-fns": ["date-fns@3.6.0", "", {}, "sha512-fRHTG8g/Gif+kSh50gaGEdToemgfj74aRX3swtiouboip5JDLAyDE9F11nHMIcvOaXeOC6D7SpNhi7uFyB7Uww=="],

    "debug": ["debug@4.4.3", "", { "dependencies": { "ms": "^2.1.3" } }, "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA=="],

    "decimal.js": ["decimal.js@10.6.0", "", {}, "sha512-YpgQiITW3JXGntzdUmyUR1V812Hn8T1YVXhCu+wO3OpS4eU9l4YdD3qjyiKdV6mvV29zapkMeD390UVEf2lkUg=="],

    "decimal.js-light": ["decimal.js-light@2.5.1", "", {}, "sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg=="],

    "decode-named-character-reference": ["decode-named-character-reference@1.3.0", "", { "dependencies": { "character-entities": "^2.0.0" } }, "sha512-GtpQYB283KrPp6nRw50q3U9/VfOutZOe103qlN7BPP6Ad27xYnOIWv4lPzo8HCAL+mMZofJ9KEy30fq6MfaK6Q=="],

    "deep-eql": ["deep-eql@5.0.2", "", {}, "sha512-h5k/5U50IJJFpzfL6nO9jaaumfjO/f2NjK/oYB2Djzm4p9L+3T9qWpZqZ2hAbLPuuYq9wrU08WQyBTL5GbPk5Q=="],

    "deep-is": ["deep-is@0.1.4", "", {}, "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ=="],

    "delayed-stream": ["delayed-stream@1.0.0", "", {}, "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ=="],

    "dequal": ["dequal@2.0.3", "", {}, "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA=="],

    "detect-node-es": ["detect-node-es@1.1.0", "", {}, "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ=="],

    "devlop": ["devlop@1.1.0", "", { "dependencies": { "dequal": "^2.0.0" } }, "sha512-RWmIqhcFf1lRYBvNmr7qTNuyCt/7/ns2jbpp1+PalgE/rDQcBT0fioSMUpJ93irlUhC5hrg4cYqe6U+0ImW0rA=="],

    "didyoumean": ["didyoumean@1.2.2", "", {}, "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw=="],

    "dlv": ["dlv@1.1.3", "", {}, "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA=="],

    "dom-accessibility-api": ["dom-accessibility-api@0.6.3", "", {}, "sha512-7ZgogeTnjuHbo+ct10G9Ffp0mif17idi0IyWNVA/wcwcm7NPOD/WEHVP3n7n3MhXqxoIYm8d6MuZohYWIZ4T3w=="],

    "dom-helpers": ["dom-helpers@5.2.1", "", { "dependencies": { "@babel/runtime": "^7.8.7", "csstype": "^3.0.2" } }, "sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA=="],

    "domexception": ["domexception@4.0.0", "", { "dependencies": { "webidl-conversions": "^7.0.0" } }, "sha512-A2is4PLG+eeSfoTMA95/s4pvAoSo2mKtiM5jlHkAVewmiO8ISFTFKZjH7UAM1Atli/OT/7JHOrJRJiMKUZKYBw=="],

    "dunder-proto": ["dunder-proto@1.0.1", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.1", "es-errors": "^1.3.0", "gopd": "^1.2.0" } }, "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A=="],

    "eastasianwidth": ["eastasianwidth@0.2.0", "", {}, "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA=="],

    "electron-to-chromium": ["electron-to-chromium@1.5.192", "", {}, "sha512-rP8Ez0w7UNw/9j5eSXCe10o1g/8B1P5SM90PCCMVkIRQn2R0LEHWz4Eh9RnxkniuDe1W0cTSOB3MLlkTGDcuCg=="],

    "embla-carousel": ["embla-carousel@8.6.0", "", {}, "sha512-SjWyZBHJPbqxHOzckOfo8lHisEaJWmwd23XppYFYVh10bU66/Pn5tkVkbkCMZVdbUE5eTCI2nD8OyIP4Z+uwkA=="],

    "embla-carousel-react": ["embla-carousel-react@8.6.0", "", { "dependencies": { "embla-carousel": "8.6.0", "embla-carousel-reactive-utils": "8.6.0" }, "peerDependencies": { "react": "^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-0/PjqU7geVmo6F734pmPqpyHqiM99olvyecY7zdweCw+6tKEXnrE90pBiBbMMU8s5tICemzpQ3hi5EpxzGW+JA=="],

    "embla-carousel-reactive-utils": ["embla-carousel-reactive-utils@8.6.0", "", { "peerDependencies": { "embla-carousel": "8.6.0" } }, "sha512-fMVUDUEx0/uIEDM0Mz3dHznDhfX+znCCDCeIophYb1QGVM7YThSWX+wz11zlYwWFOr74b4QLGg0hrGPJeG2s4A=="],

    "emoji-regex": ["emoji-regex@9.2.2", "", {}, "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg=="],

    "entities": ["entities@6.0.1", "", {}, "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g=="],

    "es-define-property": ["es-define-property@1.0.1", "", {}, "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g=="],

    "es-errors": ["es-errors@1.3.0", "", {}, "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw=="],

    "es-module-lexer": ["es-module-lexer@1.7.0", "", {}, "sha512-jEQoCwk8hyb2AZziIOLhDqpm5+2ww5uIE6lkO/6jcOCusfk6LhMHpXXfBLXTZ7Ydyt0j4VoUQv6uGNYbdW+kBA=="],

    "es-object-atoms": ["es-object-atoms@1.1.1", "", { "dependencies": { "es-errors": "^1.3.0" } }, "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA=="],

    "es-set-tostringtag": ["es-set-tostringtag@2.1.0", "", { "dependencies": { "es-errors": "^1.3.0", "get-intrinsic": "^1.2.6", "has-tostringtag": "^1.0.2", "hasown": "^2.0.2" } }, "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA=="],

    "esbuild": ["esbuild@0.25.0", "", { "optionalDependencies": { "@esbuild/aix-ppc64": "0.25.0", "@esbuild/android-arm": "0.25.0", "@esbuild/android-arm64": "0.25.0", "@esbuild/android-x64": "0.25.0", "@esbuild/darwin-arm64": "0.25.0", "@esbuild/darwin-x64": "0.25.0", "@esbuild/freebsd-arm64": "0.25.0", "@esbuild/freebsd-x64": "0.25.0", "@esbuild/linux-arm": "0.25.0", "@esbuild/linux-arm64": "0.25.0", "@esbuild/linux-ia32": "0.25.0", "@esbuild/linux-loong64": "0.25.0", "@esbuild/linux-mips64el": "0.25.0", "@esbuild/linux-ppc64": "0.25.0", "@esbuild/linux-riscv64": "0.25.0", "@esbuild/linux-s390x": "0.25.0", "@esbuild/linux-x64": "0.25.0", "@esbuild/netbsd-arm64": "0.25.0", "@esbuild/netbsd-x64": "0.25.0", "@esbuild/openbsd-arm64": "0.25.0", "@esbuild/openbsd-x64": "0.25.0", "@esbuild/sunos-x64": "0.25.0", "@esbuild/win32-arm64": "0.25.0", "@esbuild/win32-ia32": "0.25.0", "@esbuild/win32-x64": "0.25.0" }, "bin": "bin/esbuild" }, "sha512-BXq5mqc8ltbaN34cDqWuYKyNhX8D/Z0J1xdtdQ8UcIIIyJyz+ZMKUt58tF3SrZ85jcfN/PZYhjR5uDQAYNVbuw=="],

    "escalade": ["escalade@3.2.0", "", {}, "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA=="],

    "escape-string-regexp": ["escape-string-regexp@4.0.0", "", {}, "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA=="],

    "escodegen": ["escodegen@2.1.0", "", { "dependencies": { "esprima": "^4.0.1", "estraverse": "^5.2.0", "esutils": "^2.0.2" }, "optionalDependencies": { "source-map": "~0.6.1" }, "bin": { "escodegen": "bin/escodegen.js", "esgenerate": "bin/esgenerate.js" } }, "sha512-2NlIDTwUWJN0mRPQOdtQBzbUHvdGY2P1VXSyU83Q3xKxM7WHX2Ql8dKq782Q9TgQUNOLEzEYu9bzLNj1q88I5w=="],

    "eslint": ["eslint@9.32.0", "", { "dependencies": { "@eslint-community/eslint-utils": "^4.2.0", "@eslint-community/regexpp": "^4.12.1", "@eslint/config-array": "^0.21.0", "@eslint/config-helpers": "^0.3.0", "@eslint/core": "^0.15.0", "@eslint/eslintrc": "^3.3.1", "@eslint/js": "9.32.0", "@eslint/plugin-kit": "^0.3.4", "@humanfs/node": "^0.16.6", "@humanwhocodes/module-importer": "^1.0.1", "@humanwhocodes/retry": "^0.4.2", "@types/estree": "^1.0.6", "@types/json-schema": "^7.0.15", "ajv": "^6.12.4", "chalk": "^4.0.0", "cross-spawn": "^7.0.6", "debug": "^4.3.2", "escape-string-regexp": "^4.0.0", "eslint-scope": "^8.4.0", "eslint-visitor-keys": "^4.2.1", "espree": "^10.4.0", "esquery": "^1.5.0", "esutils": "^2.0.2", "fast-deep-equal": "^3.1.3", "file-entry-cache": "^8.0.0", "find-up": "^5.0.0", "glob-parent": "^6.0.2", "ignore": "^5.2.0", "imurmurhash": "^0.1.4", "is-glob": "^4.0.0", "json-stable-stringify-without-jsonify": "^1.0.1", "lodash.merge": "^4.6.2", "minimatch": "^3.1.2", "natural-compare": "^1.4.0", "optionator": "^0.9.3" }, "peerDependencies": { "jiti": "*" }, "bin": "bin/eslint.js" }, "sha512-LSehfdpgMeWcTZkWZVIJl+tkZ2nuSkyyB9C27MZqFWXuph7DvaowgcTvKqxvpLW1JZIk8PN7hFY3Rj9LQ7m7lg=="],

    "eslint-plugin-react-hooks": ["eslint-plugin-react-hooks@5.2.0", "", { "peerDependencies": { "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0" } }, "sha512-+f15FfK64YQwZdJNELETdn5ibXEUQmW1DZL6KXhNnc2heoy/sg9VJJeT7n8TlMWouzWqSWavFkIhHyIbIAEapg=="],

    "eslint-plugin-react-refresh": ["eslint-plugin-react-refresh@0.4.20", "", { "peerDependencies": { "eslint": ">=8.40" } }, "sha512-XpbHQ2q5gUF8BGOX4dHe+71qoirYMhApEPZ7sfhF/dNnOF1UXnCMGZf79SFTBO7Bz5YEIT4TMieSlJBWhP9WBA=="],

    "eslint-scope": ["eslint-scope@8.4.0", "", { "dependencies": { "esrecurse": "^4.3.0", "estraverse": "^5.2.0" } }, "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg=="],

    "eslint-visitor-keys": ["eslint-visitor-keys@4.2.1", "", {}, "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ=="],

    "espree": ["espree@10.4.0", "", { "dependencies": { "acorn": "^8.15.0", "acorn-jsx": "^5.3.2", "eslint-visitor-keys": "^4.2.1" } }, "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ=="],

    "esprima": ["esprima@4.0.1", "", { "bin": { "esparse": "bin/esparse.js", "esvalidate": "bin/esvalidate.js" } }, "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A=="],

    "esquery": ["esquery@1.6.0", "", { "dependencies": { "estraverse": "^5.1.0" } }, "sha512-ca9pw9fomFcKPvFLXhBKUK90ZvGibiGOvRJNbjljY7s7uq/5YO4BOzcYtJqExdx99rF6aAcnRxHmcUHcz6sQsg=="],

    "esrecurse": ["esrecurse@4.3.0", "", { "dependencies": { "estraverse": "^5.2.0" } }, "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag=="],

    "estraverse": ["estraverse@5.3.0", "", {}, "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA=="],

    "estree-util-is-identifier-name": ["estree-util-is-identifier-name@3.0.0", "", {}, "sha512-hFtqIDZTIUZ9BXLb8y4pYGyk6+wekIivNVTcmvk8NoOh+VeRn5y6cEHzbURrWbfp1fIqdVipilzj+lfaadNZmg=="],

    "estree-walker": ["estree-walker@3.0.3", "", { "dependencies": { "@types/estree": "^1.0.0" } }, "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g=="],

    "esutils": ["esutils@2.0.3", "", {}, "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g=="],

    "eventemitter3": ["eventemitter3@4.0.7", "", {}, "sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw=="],

    "expect-type": ["expect-type@1.3.0", "", {}, "sha512-knvyeauYhqjOYvQ66MznSMs83wmHrCycNEN6Ao+2AeYEfxUIkuiVxdEa1qlGEPK+We3n0THiDciYSsCcgW/DoA=="],

    "extend": ["extend@3.0.2", "", {}, "sha512-fjquC59cD7CyW6urNXK0FBufkZcoiGG80wTuPujX590cB5Ttln20E2UB4S/WARVqhXffZl2LNgS+gQdPIIim/g=="],

    "fast-deep-equal": ["fast-deep-equal@3.1.3", "", {}, "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q=="],

    "fast-equals": ["fast-equals@5.2.2", "", {}, "sha512-V7/RktU11J3I36Nwq2JnZEM7tNm17eBJz+u25qdxBZeCKiX6BkVSZQjwWIr+IobgnZy+ag73tTZgZi7tr0LrBw=="],

    "fast-glob": ["fast-glob@3.3.2", "", { "dependencies": { "@nodelib/fs.stat": "^2.0.2", "@nodelib/fs.walk": "^1.2.3", "glob-parent": "^5.1.2", "merge2": "^1.3.0", "micromatch": "^4.0.4" } }, "sha512-oX2ruAFQwf/Orj8m737Y5adxDQO0LAB7/S5MnxCdTNDd4p6BsyIVsv9JQsATbTSq8KHRpLwIHbVlUNatxd+1Ow=="],

    "fast-json-stable-stringify": ["fast-json-stable-stringify@2.1.0", "", {}, "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw=="],

    "fast-levenshtein": ["fast-levenshtein@2.0.6", "", {}, "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw=="],

    "fastq": ["fastq@1.17.1", "", { "dependencies": { "reusify": "^1.0.4" } }, "sha512-sRVD3lWVIXWg6By68ZN7vho9a1pQcN/WBFaAAsDDFzlJjvoGx0P8z7V1t72grFJfJhu3YPZBuu25f7Kaw2jN1w=="],

    "fdir": ["fdir@6.5.0", "", { "peerDependencies": { "picomatch": "^3 || ^4" } }, "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg=="],

    "file-entry-cache": ["file-entry-cache@8.0.0", "", { "dependencies": { "flat-cache": "^4.0.0" } }, "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ=="],

    "fill-range": ["fill-range@7.1.1", "", { "dependencies": { "to-regex-range": "^5.0.1" } }, "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg=="],

    "find-up": ["find-up@5.0.0", "", { "dependencies": { "locate-path": "^6.0.0", "path-exists": "^4.0.0" } }, "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng=="],

    "flat-cache": ["flat-cache@4.0.1", "", { "dependencies": { "flatted": "^3.2.9", "keyv": "^4.5.4" } }, "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw=="],

    "flatted": ["flatted@3.3.1", "", {}, "sha512-X8cqMLLie7KsNUDSdzeN8FYK9rEt4Dt67OsG/DNGnYTSDBG4uFAJFBnUeiV+zCVAvwFy56IjM9sH51jVaEhNxw=="],

    "foreground-child": ["foreground-child@3.3.0", "", { "dependencies": { "cross-spawn": "^7.0.0", "signal-exit": "^4.0.1" } }, "sha512-Ld2g8rrAyMYFXBhEqMz8ZAHBi4J4uS1i/CxGMDnjyFWddMXLVcDp051DZfu+t7+ab7Wv6SMqpWmyFIj5UbfFvg=="],

    "form-data": ["form-data@4.0.5", "", { "dependencies": { "asynckit": "^0.4.0", "combined-stream": "^1.0.8", "es-set-tostringtag": "^2.1.0", "hasown": "^2.0.2", "mime-types": "^2.1.12" } }, "sha512-8RipRLol37bNs2bhoV67fiTEvdTrbMUYcFTiy3+wuuOnUog2QBHCZWXDRijWQfAkhBj2Uf5UnVaiWwA5vdd82w=="],

    "fraction.js": ["fraction.js@4.3.7", "", {}, "sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew=="],

    "framer-motion": ["framer-motion@12.34.3", "", { "dependencies": { "motion-dom": "^12.34.3", "motion-utils": "^12.29.2", "tslib": "^2.4.0" }, "peerDependencies": { "@emotion/is-prop-valid": "*", "react": "^18.0.0 || ^19.0.0", "react-dom": "^18.0.0 || ^19.0.0" }, "optionalPeers": ["@emotion/is-prop-valid"] }, "sha512-v81ecyZKYO/DfpTwHivqkxSUBzvceOpoI+wLfgCgoUIKxlFKEXdg0oR9imxwXumT4SFy8vRk9xzJ5l3/Du/55Q=="],

    "fsevents": ["fsevents@2.3.3", "", { "os": "darwin" }, "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw=="],

    "function-bind": ["function-bind@1.1.2", "", {}, "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA=="],

    "get-intrinsic": ["get-intrinsic@1.3.0", "", { "dependencies": { "call-bind-apply-helpers": "^1.0.2", "es-define-property": "^1.0.1", "es-errors": "^1.3.0", "es-object-atoms": "^1.1.1", "function-bind": "^1.1.2", "get-proto": "^1.0.1", "gopd": "^1.2.0", "has-symbols": "^1.1.0", "hasown": "^2.0.2", "math-intrinsics": "^1.1.0" } }, "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ=="],

    "get-nonce": ["get-nonce@1.0.1", "", {}, "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q=="],

    "get-proto": ["get-proto@1.0.1", "", { "dependencies": { "dunder-proto": "^1.0.1", "es-object-atoms": "^1.0.0" } }, "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g=="],

    "glob": ["glob@10.4.5", "", { "dependencies": { "foreground-child": "^3.1.0", "jackspeak": "^3.1.2", "minimatch": "^9.0.4", "minipass": "^7.1.2", "package-json-from-dist": "^1.0.0", "path-scurry": "^1.11.1" }, "bin": "dist/esm/bin.mjs" }, "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg=="],

    "glob-parent": ["glob-parent@6.0.2", "", { "dependencies": { "is-glob": "^4.0.3" } }, "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A=="],

    "globals": ["globals@15.15.0", "", {}, "sha512-7ACyT3wmyp3I61S4fG682L0VA2RGD9otkqGJIwNUMF1SWUombIIk+af1unuDYgMm082aHYwD+mzJvv9Iu8dsgg=="],

    "gopd": ["gopd@1.2.0", "", {}, "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg=="],

    "graphemer": ["graphemer@1.4.0", "", {}, "sha512-EtKwoO6kxCL9WO5xipiHTZlSzBm7WLT627TqC/uVRd0HKmq8NXyebnNYxDoBi7wt8eTWrUrKXCOVaFq9x1kgag=="],

    "has-flag": ["has-flag@4.0.0", "", {}, "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ=="],

    "has-symbols": ["has-symbols@1.1.0", "", {}, "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ=="],

    "has-tostringtag": ["has-tostringtag@1.0.2", "", { "dependencies": { "has-symbols": "^1.0.3" } }, "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw=="],

    "hasown": ["hasown@2.0.2", "", { "dependencies": { "function-bind": "^1.1.2" } }, "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ=="],

    "hast-util-to-jsx-runtime": ["hast-util-to-jsx-runtime@2.3.6", "", { "dependencies": { "@types/estree": "^1.0.0", "@types/hast": "^3.0.0", "@types/unist": "^3.0.0", "comma-separated-tokens": "^2.0.0", "devlop": "^1.0.0", "estree-util-is-identifier-name": "^3.0.0", "hast-util-whitespace": "^3.0.0", "mdast-util-mdx-expression": "^2.0.0", "mdast-util-mdx-jsx": "^3.0.0", "mdast-util-mdxjs-esm": "^2.0.0", "property-information": "^7.0.0", "space-separated-tokens": "^2.0.0", "style-to-js": "^1.0.0", "unist-util-position": "^5.0.0", "vfile-message": "^4.0.0" } }, "sha512-zl6s8LwNyo1P9uw+XJGvZtdFF1GdAkOg8ujOw+4Pyb76874fLps4ueHXDhXWdk6YHQ6OgUtinliG7RsYvCbbBg=="],

    "hast-util-whitespace": ["hast-util-whitespace@3.0.0", "", { "dependencies": { "@types/hast": "^3.0.0" } }, "sha512-88JUN06ipLwsnv+dVn+OIYOvAuvBMy/Qoi6O7mQHxdPXpjy+Cd6xRkWwux7DKO+4sYILtLBRIKgsdpS2gQc7qw=="],

    "html-encoding-sniffer": ["html-encoding-sniffer@3.0.0", "", { "dependencies": { "whatwg-encoding": "^2.0.0" } }, "sha512-oWv4T4yJ52iKrufjnyZPkrN0CH3QnrUqdB6In1g5Fe1mia8GmF36gnfNySxoZtxD5+NmYw1EElVXiBk93UeskA=="],

    "html-url-attributes": ["html-url-attributes@3.0.1", "", {}, "sha512-ol6UPyBWqsrO6EJySPz2O7ZSr856WDrEzM5zMqp+FJJLGMW35cLYmmZnl0vztAZxRUoNZJFTCohfjuIJ8I4QBQ=="],

    "http-proxy-agent": ["http-proxy-agent@5.0.0", "", { "dependencies": { "@tootallnate/once": "2", "agent-base": "6", "debug": "4" } }, "sha512-n2hY8YdoRE1i7r6M0w9DIw5GgZN0G25P8zLCRQ8rjXtTU3vsNFBI/vWK/UIeE6g5MUUz6avwAPXmL6Fy9D/90w=="],

    "https-proxy-agent": ["https-proxy-agent@5.0.1", "", { "dependencies": { "agent-base": "6", "debug": "4" } }, "sha512-dFcAjpTQFgoLMzC2VwU+C/CbS7uRL0lWmxDITmqm7C+7F0Odmj6s9l6alZc6AELXhrnggM2CeWSXHGOdX2YtwA=="],

    "iconv-lite": ["iconv-lite@0.6.3", "", { "dependencies": { "safer-buffer": ">= 2.1.2 < 3.0.0" } }, "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw=="],

    "ignore": ["ignore@5.3.2", "", {}, "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g=="],

    "import-fresh": ["import-fresh@3.3.1", "", { "dependencies": { "parent-module": "^1.0.0", "resolve-from": "^4.0.0" } }, "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ=="],

    "imurmurhash": ["imurmurhash@0.1.4", "", {}, "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA=="],

    "indent-string": ["indent-string@4.0.0", "", {}, "sha512-EdDDZu4A2OyIK7Lr/2zG+w5jmbuk1DVBnEwREQvBzspBJkCEbRa8GxU1lghYcaGJCnRWibjDXlq779X1/y5xwg=="],

    "inline-style-parser": ["inline-style-parser@0.2.7", "", {}, "sha512-Nb2ctOyNR8DqQoR0OwRG95uNWIC0C1lCgf5Naz5H6Ji72KZ8OcFZLz2P5sNgwlyoJ8Yif11oMuYs5pBQa86csA=="],

    "input-otp": ["input-otp@1.4.2", "", { "peerDependencies": { "react": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-l3jWwYNvrEa6NTCt7BECfCm48GvwuZzkoeG3gBL2w4CHeOXW3eKFmf9UNYkNfYc3mxMrthMnxjIE07MT0zLBQA=="],

    "internmap": ["internmap@2.0.3", "", {}, "sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg=="],

    "is-alphabetical": ["is-alphabetical@2.0.1", "", {}, "sha512-FWyyY60MeTNyeSRpkM2Iry0G9hpr7/9kD40mD/cGQEuilcZYS4okz8SN2Q6rLCJ8gbCt6fN+rC+6tMGS99LaxQ=="],

    "is-alphanumerical": ["is-alphanumerical@2.0.1", "", { "dependencies": { "is-alphabetical": "^2.0.0", "is-decimal": "^2.0.0" } }, "sha512-hmbYhX/9MUMF5uh7tOXyK/n0ZvWpad5caBA17GsC6vyuCqaWliRG5K1qS9inmUhEMaOBIW7/whAnSwveW/LtZw=="],

    "is-binary-path": ["is-binary-path@2.1.0", "", { "dependencies": { "binary-extensions": "^2.0.0" } }, "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw=="],

    "is-core-module": ["is-core-module@2.15.1", "", { "dependencies": { "hasown": "^2.0.2" } }, "sha512-z0vtXSwucUJtANQWldhbtbt7BnL0vxiFjIdDLAatwhDYty2bad6s+rijD6Ri4YuYJubLzIJLUidCh09e1djEVQ=="],

    "is-decimal": ["is-decimal@2.0.1", "", {}, "sha512-AAB9hiomQs5DXWcRB1rqsxGUstbRroFOPPVAomNk/3XHR5JyEZChOyTWe2oayKnsSsr/kcGqF+z6yuH6HHpN0A=="],

    "is-extglob": ["is-extglob@2.1.1", "", {}, "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ=="],

    "is-fullwidth-code-point": ["is-fullwidth-code-point@3.0.0", "", {}, "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg=="],

    "is-glob": ["is-glob@4.0.3", "", { "dependencies": { "is-extglob": "^2.1.1" } }, "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg=="],

    "is-hexadecimal": ["is-hexadecimal@2.0.1", "", {}, "sha512-DgZQp241c8oO6cA1SbTEWiXeoxV42vlcJxgH+B3hi1AiqqKruZR3ZGF8In3fj4+/y/7rHvlOZLZtgJ/4ttYGZg=="],

    "is-number": ["is-number@7.0.0", "", {}, "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng=="],

    "is-plain-obj": ["is-plain-obj@4.1.0", "", {}, "sha512-+Pgi+vMuUNkJyExiMBt5IlFoMyKnr5zhJ4Uspz58WOhBF5QoIZkFyNHIbBAtHwzVAgk5RtndVNsDRN61/mmDqg=="],

    "is-potential-custom-element-name": ["is-potential-custom-element-name@1.0.1", "", {}, "sha512-bCYeRA2rVibKZd+s2625gGnGF/t7DSqDs4dP7CrLA1m7jKWz6pps0LpYLJN8Q64HtmPKJ1hrN3nzPNKFEKOUiQ=="],

    "isexe": ["isexe@2.0.0", "", {}, "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw=="],

    "jackspeak": ["jackspeak@3.4.3", "", { "dependencies": { "@isaacs/cliui": "^8.0.2" }, "optionalDependencies": { "@pkgjs/parseargs": "^0.11.0" } }, "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw=="],

    "jiti": ["jiti@1.21.6", "", { "bin": "bin/jiti.js" }, "sha512-2yTgeWTWzMWkHu6Jp9NKgePDaYHbntiwvYuuJLbbN9vl7DC9DvXKOB2BC3ZZ92D3cvV/aflH0osDfwpHepQ53w=="],

    "js-tokens": ["js-tokens@4.0.0", "", {}, "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="],

    "js-yaml": ["js-yaml@4.1.0", "", { "dependencies": { "argparse": "^2.0.1" }, "bin": "bin/js-yaml.js" }, "sha512-wpxZs9NoxZaJESJGIZTyDEaYpl0FKSA+FB9aJiyemKhMwkxQg63h4T1KJgUGHpTqPDNRcmmYLugrRjJlBtWvRA=="],

    "jsdom": ["jsdom@20.0.3", "", { "dependencies": { "abab": "^2.0.6", "acorn": "^8.8.1", "acorn-globals": "^7.0.0", "cssom": "^0.5.0", "cssstyle": "^2.3.0", "data-urls": "^3.0.2", "decimal.js": "^10.4.2", "domexception": "^4.0.0", "escodegen": "^2.0.0", "form-data": "^4.0.0", "html-encoding-sniffer": "^3.0.0", "http-proxy-agent": "^5.0.0", "https-proxy-agent": "^5.0.1", "is-potential-custom-element-name": "^1.0.1", "nwsapi": "^2.2.2", "parse5": "^7.1.1", "saxes": "^6.0.0", "symbol-tree": "^3.2.4", "tough-cookie": "^4.1.2", "w3c-xmlserializer": "^4.0.0", "webidl-conversions": "^7.0.0", "whatwg-encoding": "^2.0.0", "whatwg-mimetype": "^3.0.0", "whatwg-url": "^11.0.0", "ws": "^8.11.0", "xml-name-validator": "^4.0.0" }, "peerDependencies": { "canvas": "^2.5.0" }, "optionalPeers": ["canvas"] }, "sha512-SYhBvTh89tTfCD/CRdSOm13mOBa42iTaTyfyEWBdKcGdPxPtLFBXuHR8XHb33YNYaP+lLbmSvBTsnoesCNJEsQ=="],

    "json-buffer": ["json-buffer@3.0.1", "", {}, "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ=="],

    "json-schema-traverse": ["json-schema-traverse@0.4.1", "", {}, "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg=="],

    "json-stable-stringify-without-jsonify": ["json-stable-stringify-without-jsonify@1.0.1", "", {}, "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw=="],

    "keyv": ["keyv@4.5.4", "", { "dependencies": { "json-buffer": "3.0.1" } }, "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw=="],

    "levn": ["levn@0.4.1", "", { "dependencies": { "prelude-ls": "^1.2.1", "type-check": "~0.4.0" } }, "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ=="],

    "lilconfig": ["lilconfig@3.1.3", "", {}, "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw=="],

    "lines-and-columns": ["lines-and-columns@1.2.4", "", {}, "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg=="],

    "locate-path": ["locate-path@6.0.0", "", { "dependencies": { "p-locate": "^5.0.0" } }, "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw=="],

    "lodash": ["lodash@4.17.21", "", {}, "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="],

    "lodash.castarray": ["lodash.castarray@4.4.0", "", {}, "sha512-aVx8ztPv7/2ULbArGJ2Y42bG1mEQ5mGjpdvrbJcJFU3TbYybe+QlLS4pst9zV52ymy2in1KpFPiZnAOATxD4+Q=="],

    "lodash.isplainobject": ["lodash.isplainobject@4.0.6", "", {}, "sha512-oSXzaWypCMHkPC3NvBEaPHf0KsA5mvPrOPgQWDsbg8n7orZ290M0BmC/jgRZ4vcJ6DTAhjrsSYgdsW/F+MFOBA=="],

    "lodash.merge": ["lodash.merge@4.6.2", "", {}, "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ=="],

    "longest-streak": ["longest-streak@3.1.0", "", {}, "sha512-9Ri+o0JYgehTaVBBDoMqIl8GXtbWg711O3srftcHhZ0dqnETqLaoIK0x17fUw9rFSlK/0NlsKe0Ahhyl5pXE2g=="],

    "loose-envify": ["loose-envify@1.4.0", "", { "dependencies": { "js-tokens": "^3.0.0 || ^4.0.0" }, "bin": "cli.js" }, "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q=="],

    "loupe": ["loupe@3.2.1", "", {}, "sha512-CdzqowRJCeLU72bHvWqwRBBlLcMEtIvGrlvef74kMnV2AolS9Y8xUv1I0U/MNAWMhBlKIoyuEgoJ0t/bbwHbLQ=="],

    "lovable-tagger": ["lovable-tagger@1.1.13", "", { "dependencies": { "esbuild": "^0.25.0", "tailwindcss": "^3.4.17" }, "peerDependencies": { "vite": ">=5.0.0 <8.0.0" } }, "sha512-RBEYDxao7Xf8ya29L0cd+ocE7Gs80xPOIOwwck65Hoie8YDKViuXi3UYV14DoNWIvaJ7WVPf7SG3cc844nFqGA=="],

    "lru-cache": ["lru-cache@10.4.3", "", {}, "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ=="],

    "lucide-react": ["lucide-react@0.462.0", "", { "peerDependencies": { "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc" } }, "sha512-NTL7EbAao9IFtuSivSZgrAh4fZd09Lr+6MTkqIxuHaH2nnYiYIzXPo06cOxHg9wKLdj6LL8TByG4qpePqwgx/g=="],

    "magic-string": ["magic-string@0.30.21", "", { "dependencies": { "@jridgewell/sourcemap-codec": "^1.5.5" } }, "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ=="],

    "math-intrinsics": ["math-intrinsics@1.1.0", "", {}, "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g=="],

    "mdast-util-from-markdown": ["mdast-util-from-markdown@2.0.3", "", { "dependencies": { "@types/mdast": "^4.0.0", "@types/unist": "^3.0.0", "decode-named-character-reference": "^1.0.0", "devlop": "^1.0.0", "mdast-util-to-string": "^4.0.0", "micromark": "^4.0.0", "micromark-util-decode-numeric-character-reference": "^2.0.0", "micromark-util-decode-string": "^2.0.0", "micromark-util-normalize-identifier": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0", "unist-util-stringify-position": "^4.0.0" } }, "sha512-W4mAWTvSlKvf8L6J+VN9yLSqQ9AOAAvHuoDAmPkz4dHf553m5gVj2ejadHJhoJmcmxEnOv6Pa8XJhpxE93kb8Q=="],

    "mdast-util-mdx-expression": ["mdast-util-mdx-expression@2.0.1", "", { "dependencies": { "@types/estree-jsx": "^1.0.0", "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "devlop": "^1.0.0", "mdast-util-from-markdown": "^2.0.0", "mdast-util-to-markdown": "^2.0.0" } }, "sha512-J6f+9hUp+ldTZqKRSg7Vw5V6MqjATc+3E4gf3CFNcuZNWD8XdyI6zQ8GqH7f8169MM6P7hMBRDVGnn7oHB9kXQ=="],

    "mdast-util-mdx-jsx": ["mdast-util-mdx-jsx@3.2.0", "", { "dependencies": { "@types/estree-jsx": "^1.0.0", "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "@types/unist": "^3.0.0", "ccount": "^2.0.0", "devlop": "^1.1.0", "mdast-util-from-markdown": "^2.0.0", "mdast-util-to-markdown": "^2.0.0", "parse-entities": "^4.0.0", "stringify-entities": "^4.0.0", "unist-util-stringify-position": "^4.0.0", "vfile-message": "^4.0.0" } }, "sha512-lj/z8v0r6ZtsN/cGNNtemmmfoLAFZnjMbNyLzBafjzikOM+glrjNHPlf6lQDOTccj9n5b0PPihEBbhneMyGs1Q=="],

    "mdast-util-mdxjs-esm": ["mdast-util-mdxjs-esm@2.0.1", "", { "dependencies": { "@types/estree-jsx": "^1.0.0", "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "devlop": "^1.0.0", "mdast-util-from-markdown": "^2.0.0", "mdast-util-to-markdown": "^2.0.0" } }, "sha512-EcmOpxsZ96CvlP03NghtH1EsLtr0n9Tm4lPUJUBccV9RwUOneqSycg19n5HGzCf+10LozMRSObtVr3ee1WoHtg=="],

    "mdast-util-phrasing": ["mdast-util-phrasing@4.1.0", "", { "dependencies": { "@types/mdast": "^4.0.0", "unist-util-is": "^6.0.0" } }, "sha512-TqICwyvJJpBwvGAMZjj4J2n0X8QWp21b9l0o7eXyVJ25YNWYbJDVIyD1bZXE6WtV6RmKJVYmQAKWa0zWOABz2w=="],

    "mdast-util-to-hast": ["mdast-util-to-hast@13.2.1", "", { "dependencies": { "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "@ungap/structured-clone": "^1.0.0", "devlop": "^1.0.0", "micromark-util-sanitize-uri": "^2.0.0", "trim-lines": "^3.0.0", "unist-util-position": "^5.0.0", "unist-util-visit": "^5.0.0", "vfile": "^6.0.0" } }, "sha512-cctsq2wp5vTsLIcaymblUriiTcZd0CwWtCbLvrOzYCDZoWyMNV8sZ7krj09FSnsiJi3WVsHLM4k6Dq/yaPyCXA=="],

    "mdast-util-to-markdown": ["mdast-util-to-markdown@2.1.2", "", { "dependencies": { "@types/mdast": "^4.0.0", "@types/unist": "^3.0.0", "longest-streak": "^3.0.0", "mdast-util-phrasing": "^4.0.0", "mdast-util-to-string": "^4.0.0", "micromark-util-classify-character": "^2.0.0", "micromark-util-decode-string": "^2.0.0", "unist-util-visit": "^5.0.0", "zwitch": "^2.0.0" } }, "sha512-xj68wMTvGXVOKonmog6LwyJKrYXZPvlwabaryTjLh9LuvovB/KAH+kvi8Gjj+7rJjsFi23nkUxRQv1KqSroMqA=="],

    "mdast-util-to-string": ["mdast-util-to-string@4.0.0", "", { "dependencies": { "@types/mdast": "^4.0.0" } }, "sha512-0H44vDimn51F0YwvxSJSm0eCDOJTRlmN0R1yBh4HLj9wiV1Dn0QoXGbvFAWj2hSItVTlCmBF1hqKlIyUBVFLPg=="],

    "merge2": ["merge2@1.4.1", "", {}, "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg=="],

    "micromark": ["micromark@4.0.2", "", { "dependencies": { "@types/debug": "^4.0.0", "debug": "^4.0.0", "decode-named-character-reference": "^1.0.0", "devlop": "^1.0.0", "micromark-core-commonmark": "^2.0.0", "micromark-factory-space": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-chunked": "^2.0.0", "micromark-util-combine-extensions": "^2.0.0", "micromark-util-decode-numeric-character-reference": "^2.0.0", "micromark-util-encode": "^2.0.0", "micromark-util-normalize-identifier": "^2.0.0", "micromark-util-resolve-all": "^2.0.0", "micromark-util-sanitize-uri": "^2.0.0", "micromark-util-subtokenize": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-zpe98Q6kvavpCr1NPVSCMebCKfD7CA2NqZ+rykeNhONIJBpc1tFKt9hucLGwha3jNTNI8lHpctWJWoimVF4PfA=="],

    "micromark-core-commonmark": ["micromark-core-commonmark@2.0.3", "", { "dependencies": { "decode-named-character-reference": "^1.0.0", "devlop": "^1.0.0", "micromark-factory-destination": "^2.0.0", "micromark-factory-label": "^2.0.0", "micromark-factory-space": "^2.0.0", "micromark-factory-title": "^2.0.0", "micromark-factory-whitespace": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-chunked": "^2.0.0", "micromark-util-classify-character": "^2.0.0", "micromark-util-html-tag-name": "^2.0.0", "micromark-util-normalize-identifier": "^2.0.0", "micromark-util-resolve-all": "^2.0.0", "micromark-util-subtokenize": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-RDBrHEMSxVFLg6xvnXmb1Ayr2WzLAWjeSATAoxwKYJV94TeNavgoIdA0a9ytzDSVzBy2YKFK+emCPOEibLeCrg=="],

    "micromark-factory-destination": ["micromark-factory-destination@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-Xe6rDdJlkmbFRExpTOmRj9N3MaWmbAgdpSrBQvCFqhezUn4AHqJHbaEnfbVYYiexVSs//tqOdY/DxhjdCiJnIA=="],

    "micromark-factory-label": ["micromark-factory-label@2.0.1", "", { "dependencies": { "devlop": "^1.0.0", "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-VFMekyQExqIW7xIChcXn4ok29YE3rnuyveW3wZQWWqF4Nv9Wk5rgJ99KzPvHjkmPXF93FXIbBp6YdW3t71/7Vg=="],

    "micromark-factory-space": ["micromark-factory-space@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-zRkxjtBxxLd2Sc0d+fbnEunsTj46SWXgXciZmHq0kDYGnck/ZSGj9/wULTV95uoeYiK5hRXP2mJ98Uo4cq/LQg=="],

    "micromark-factory-title": ["micromark-factory-title@2.0.1", "", { "dependencies": { "micromark-factory-space": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-5bZ+3CjhAd9eChYTHsjy6TGxpOFSKgKKJPJxr293jTbfry2KDoWkhBb6TcPVB4NmzaPhMs1Frm9AZH7OD4Cjzw=="],

    "micromark-factory-whitespace": ["micromark-factory-whitespace@2.0.1", "", { "dependencies": { "micromark-factory-space": "^2.0.0", "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-Ob0nuZ3PKt/n0hORHyvoD9uZhr+Za8sFoP+OnMcnWK5lngSzALgQYKMr9RJVOWLqQYuyn6ulqGWSXdwf6F80lQ=="],

    "micromark-util-character": ["micromark-util-character@2.1.1", "", { "dependencies": { "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-wv8tdUTJ3thSFFFJKtpYKOYiGP2+v96Hvk4Tu8KpCAsTMs6yi+nVmGh1syvSCsaxz45J6Jbw+9DD6g97+NV67Q=="],

    "micromark-util-chunked": ["micromark-util-chunked@2.0.1", "", { "dependencies": { "micromark-util-symbol": "^2.0.0" } }, "sha512-QUNFEOPELfmvv+4xiNg2sRYeS/P84pTW0TCgP5zc9FpXetHY0ab7SxKyAQCNCc1eK0459uoLI1y5oO5Vc1dbhA=="],

    "micromark-util-classify-character": ["micromark-util-classify-character@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-K0kHzM6afW/MbeWYWLjoHQv1sgg2Q9EccHEDzSkxiP/EaagNzCm7T/WMKZ3rjMbvIpvBiZgwR3dKMygtA4mG1Q=="],

    "micromark-util-combine-extensions": ["micromark-util-combine-extensions@2.0.1", "", { "dependencies": { "micromark-util-chunked": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-OnAnH8Ujmy59JcyZw8JSbK9cGpdVY44NKgSM7E9Eh7DiLS2E9RNQf0dONaGDzEG9yjEl5hcqeIsj4hfRkLH/Bg=="],

    "micromark-util-decode-numeric-character-reference": ["micromark-util-decode-numeric-character-reference@2.0.2", "", { "dependencies": { "micromark-util-symbol": "^2.0.0" } }, "sha512-ccUbYk6CwVdkmCQMyr64dXz42EfHGkPQlBj5p7YVGzq8I7CtjXZJrubAYezf7Rp+bjPseiROqe7G6foFd+lEuw=="],

    "micromark-util-decode-string": ["micromark-util-decode-string@2.0.1", "", { "dependencies": { "decode-named-character-reference": "^1.0.0", "micromark-util-character": "^2.0.0", "micromark-util-decode-numeric-character-reference": "^2.0.0", "micromark-util-symbol": "^2.0.0" } }, "sha512-nDV/77Fj6eH1ynwscYTOsbK7rR//Uj0bZXBwJZRfaLEJ1iGBR6kIfNmlNqaqJf649EP0F3NWNdeJi03elllNUQ=="],

    "micromark-util-encode": ["micromark-util-encode@2.0.1", "", {}, "sha512-c3cVx2y4KqUnwopcO9b/SCdo2O67LwJJ/UyqGfbigahfegL9myoEFoDYZgkT7f36T0bLrM9hZTAaAyH+PCAXjw=="],

    "micromark-util-html-tag-name": ["micromark-util-html-tag-name@2.0.1", "", {}, "sha512-2cNEiYDhCWKI+Gs9T0Tiysk136SnR13hhO8yW6BGNyhOC4qYFnwF1nKfD3HFAIXA5c45RrIG1ub11GiXeYd1xA=="],

    "micromark-util-normalize-identifier": ["micromark-util-normalize-identifier@2.0.1", "", { "dependencies": { "micromark-util-symbol": "^2.0.0" } }, "sha512-sxPqmo70LyARJs0w2UclACPUUEqltCkJ6PhKdMIDuJ3gSf/Q+/GIe3WKl0Ijb/GyH9lOpUkRAO2wp0GVkLvS9Q=="],

    "micromark-util-resolve-all": ["micromark-util-resolve-all@2.0.1", "", { "dependencies": { "micromark-util-types": "^2.0.0" } }, "sha512-VdQyxFWFT2/FGJgwQnJYbe1jjQoNTS4RjglmSjTUlpUMa95Htx9NHeYW4rGDJzbjvCsl9eLjMQwGeElsqmzcHg=="],

    "micromark-util-sanitize-uri": ["micromark-util-sanitize-uri@2.0.1", "", { "dependencies": { "micromark-util-character": "^2.0.0", "micromark-util-encode": "^2.0.0", "micromark-util-symbol": "^2.0.0" } }, "sha512-9N9IomZ/YuGGZZmQec1MbgxtlgougxTodVwDzzEouPKo3qFWvymFHWcnDi2vzV1ff6kas9ucW+o3yzJK9YB1AQ=="],

    "micromark-util-subtokenize": ["micromark-util-subtokenize@2.1.0", "", { "dependencies": { "devlop": "^1.0.0", "micromark-util-chunked": "^2.0.0", "micromark-util-symbol": "^2.0.0", "micromark-util-types": "^2.0.0" } }, "sha512-XQLu552iSctvnEcgXw6+Sx75GflAPNED1qx7eBJ+wydBb2KCbRZe+NwvIEEMM83uml1+2WSXpBAcp9IUCgCYWA=="],

    "micromark-util-symbol": ["micromark-util-symbol@2.0.1", "", {}, "sha512-vs5t8Apaud9N28kgCrRUdEed4UJ+wWNvicHLPxCa9ENlYuAY31M0ETy5y1vA33YoNPDFTghEbnh6efaE8h4x0Q=="],

    "micromark-util-types": ["micromark-util-types@2.0.2", "", {}, "sha512-Yw0ECSpJoViF1qTU4DC6NwtC4aWGt1EkzaQB8KPPyCRR8z9TWeV0HbEFGTO+ZY1wB22zmxnJqhPyTpOVCpeHTA=="],

    "micromatch": ["micromatch@4.0.8", "", { "dependencies": { "braces": "^3.0.3", "picomatch": "^2.3.1" } }, "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA=="],

    "mime-db": ["mime-db@1.52.0", "", {}, "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg=="],

    "mime-types": ["mime-types@2.1.35", "", { "dependencies": { "mime-db": "1.52.0" } }, "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw=="],

    "min-indent": ["min-indent@1.0.1", "", {}, "sha512-I9jwMn07Sy/IwOj3zVkVik2JTvgpaykDZEigL6Rx6N9LbMywwUSMtxET+7lVoDLLd3O3IXwJwvuuns8UB/HeAg=="],

    "minimatch": ["minimatch@3.1.2", "", { "dependencies": { "brace-expansion": "^1.1.7" } }, "sha512-J7p63hRiAjw1NDEww1W7i37+ByIrOWO5XQQAzZ3VOcL0PNybwpfmV/N05zFAzwQ9USyEcX6t3UO+K5aqBQOIHw=="],

    "minipass": ["minipass@7.1.2", "", {}, "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw=="],

    "motion-dom": ["motion-dom@12.34.3", "", { "dependencies": { "motion-utils": "^12.29.2" } }, "sha512-sYgFe+pR9aIM7o4fhs2aXtOI+oqlUd33N9Yoxcgo1Fv7M20sRkHtCmzE/VRNIcq7uNJ+qio+Xubt1FXH3pQ+eQ=="],

    "motion-utils": ["motion-utils@12.29.2", "", {}, "sha512-G3kc34H2cX2gI63RqU+cZq+zWRRPSsNIOjpdl9TN4AQwC4sgwYPl/Q/Obf/d53nOm569T0fYK+tcoSV50BWx8A=="],

    "ms": ["ms@2.1.3", "", {}, "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="],

    "mz": ["mz@2.7.0", "", { "dependencies": { "any-promise": "^1.0.0", "object-assign": "^4.0.1", "thenify-all": "^1.0.0" } }, "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q=="],

    "nanoid": ["nanoid@3.3.11", "", { "bin": "bin/nanoid.cjs" }, "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w=="],

    "natural-compare": ["natural-compare@1.4.0", "", {}, "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw=="],

    "next-themes": ["next-themes@0.3.0", "", { "peerDependencies": { "react": "^16.8 || ^17 || ^18", "react-dom": "^16.8 || ^17 || ^18" } }, "sha512-/QHIrsYpd6Kfk7xakK4svpDI5mmXP0gfvCoJdGpZQ2TOrQZmsW0QxjaiLn8wbIKjtm4BTSqLoix4lxYYOnLJ/w=="],

    "node-releases": ["node-releases@2.0.19", "", {}, "sha512-xxOWJsBKtzAq7DY0J+DTzuz58K8e7sJbdgwkbMWQe8UYB6ekmsQ45q0M/tJDsGaZmbC+l7n57UV8Hl5tHxO9uw=="],

    "normalize-path": ["normalize-path@3.0.0", "", {}, "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA=="],

    "normalize-range": ["normalize-range@0.1.2", "", {}, "sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA=="],

    "nwsapi": ["nwsapi@2.2.23", "", {}, "sha512-7wfH4sLbt4M0gCDzGE6vzQBo0bfTKjU7Sfpqy/7gs1qBfYz2vEJH6vXcBKpO3+6Yu1telwd0t9HpyOoLEQQbIQ=="],

    "object-assign": ["object-assign@4.1.1", "", {}, "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg=="],

    "object-hash": ["object-hash@3.0.0", "", {}, "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw=="],

    "optionator": ["optionator@0.9.4", "", { "dependencies": { "deep-is": "^0.1.3", "fast-levenshtein": "^2.0.6", "levn": "^0.4.1", "prelude-ls": "^1.2.1", "type-check": "^0.4.0", "word-wrap": "^1.2.5" } }, "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g=="],

    "p-limit": ["p-limit@3.1.0", "", { "dependencies": { "yocto-queue": "^0.1.0" } }, "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ=="],

    "p-locate": ["p-locate@5.0.0", "", { "dependencies": { "p-limit": "^3.0.2" } }, "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw=="],

    "package-json-from-dist": ["package-json-from-dist@1.0.1", "", {}, "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw=="],

    "parent-module": ["parent-module@1.0.1", "", { "dependencies": { "callsites": "^3.0.0" } }, "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g=="],

    "parse-entities": ["parse-entities@4.0.2", "", { "dependencies": { "@types/unist": "^2.0.0", "character-entities-legacy": "^3.0.0", "character-reference-invalid": "^2.0.0", "decode-named-character-reference": "^1.0.0", "is-alphanumerical": "^2.0.0", "is-decimal": "^2.0.0", "is-hexadecimal": "^2.0.0" } }, "sha512-GG2AQYWoLgL877gQIKeRPGO1xF9+eG1ujIb5soS5gPvLQ1y2o8FL90w2QWNdf9I361Mpp7726c+lj3U0qK1uGw=="],

    "parse5": ["parse5@7.3.0", "", { "dependencies": { "entities": "^6.0.0" } }, "sha512-IInvU7fabl34qmi9gY8XOVxhYyMyuH2xUNpb2q8/Y+7552KlejkRvqvD19nMoUW/uQGGbqNpA6Tufu5FL5BZgw=="],

    "path-exists": ["path-exists@4.0.0", "", {}, "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w=="],

    "path-key": ["path-key@3.1.1", "", {}, "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q=="],

    "path-parse": ["path-parse@1.0.7", "", {}, "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw=="],

    "path-scurry": ["path-scurry@1.11.1", "", { "dependencies": { "lru-cache": "^10.2.0", "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0" } }, "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA=="],

    "pathe": ["pathe@2.0.3", "", {}, "sha512-WUjGcAqP1gQacoQe+OBJsFA7Ld4DyXuUIjZ5cc75cLHvJ7dtNsTugphxIADwspS+AraAUePCKrSVtPLFj/F88w=="],

    "pathval": ["pathval@2.0.1", "", {}, "sha512-//nshmD55c46FuFw26xV/xFAaB5HF9Xdap7HJBBnrKdAd6/GxDBaNA1870O79+9ueg61cZLSVc+OaFlfmObYVQ=="],

    "picocolors": ["picocolors@1.1.1", "", {}, "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA=="],

    "picomatch": ["picomatch@4.0.3", "", {}, "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q=="],

    "pify": ["pify@2.3.0", "", {}, "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog=="],

    "pirates": ["pirates@4.0.6", "", {}, "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg=="],

    "postcss": ["postcss@8.5.6", "", { "dependencies": { "nanoid": "^3.3.11", "picocolors": "^1.1.1", "source-map-js": "^1.2.1" } }, "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg=="],

    "postcss-import": ["postcss-import@15.1.0", "", { "dependencies": { "postcss-value-parser": "^4.0.0", "read-cache": "^1.0.0", "resolve": "^1.1.7" }, "peerDependencies": { "postcss": "^8.0.0" } }, "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew=="],

    "postcss-js": ["postcss-js@4.0.1", "", { "dependencies": { "camelcase-css": "^2.0.1" }, "peerDependencies": { "postcss": "^8.4.21" } }, "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw=="],

    "postcss-load-config": ["postcss-load-config@4.0.2", "", { "dependencies": { "lilconfig": "^3.0.0", "yaml": "^2.3.4" }, "peerDependencies": { "postcss": ">=8.0.9", "ts-node": ">=9.0.0" }, "optionalPeers": ["ts-node"] }, "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ=="],

    "postcss-nested": ["postcss-nested@6.2.0", "", { "dependencies": { "postcss-selector-parser": "^6.1.1" }, "peerDependencies": { "postcss": "^8.2.14" } }, "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ=="],

    "postcss-selector-parser": ["postcss-selector-parser@6.0.10", "", { "dependencies": { "cssesc": "^3.0.0", "util-deprecate": "^1.0.2" } }, "sha512-IQ7TZdoaqbT+LCpShg46jnZVlhWD2w6iQYAcYXfHARZ7X1t/UGhhceQDs5X0cGqKvYlHNOuv7Oa1xmb0oQuA3w=="],

    "postcss-value-parser": ["postcss-value-parser@4.2.0", "", {}, "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ=="],

    "prelude-ls": ["prelude-ls@1.2.1", "", {}, "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g=="],

    "prop-types": ["prop-types@15.8.1", "", { "dependencies": { "loose-envify": "^1.4.0", "object-assign": "^4.1.1", "react-is": "^16.13.1" } }, "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg=="],

    "property-information": ["property-information@7.1.0", "", {}, "sha512-TwEZ+X+yCJmYfL7TPUOcvBZ4QfoT5YenQiJuX//0th53DE6w0xxLEtfK3iyryQFddXuvkIk51EEgrJQ0WJkOmQ=="],

    "psl": ["psl@1.15.0", "", { "dependencies": { "punycode": "^2.3.1" } }, "sha512-JZd3gMVBAVQkSs6HdNZo9Sdo0LNcQeMNP3CozBJb3JYC/QUYZTnKxP+f8oWRX4rHP5EurWxqAHTSwUCjlNKa1w=="],

    "punycode": ["punycode@2.3.1", "", {}, "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg=="],

    "querystringify": ["querystringify@2.2.0", "", {}, "sha512-FIqgj2EUvTa7R50u0rGsyTftzjYmv/a3hO345bZNrqabNqjtgiDMgmo4mkUjd+nzU5oF3dClKqFIPUKybUyqoQ=="],

    "queue-microtask": ["queue-microtask@1.2.3", "", {}, "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A=="],

    "react": ["react@18.3.1", "", { "dependencies": { "loose-envify": "^1.1.0" } }, "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ=="],

    "react-day-picker": ["react-day-picker@8.10.1", "", { "peerDependencies": { "date-fns": "^2.28.0 || ^3.0.0", "react": "^16.8.0 || ^17.0.0 || ^18.0.0" } }, "sha512-TMx7fNbhLk15eqcMt+7Z7S2KF7mfTId/XJDjKE8f+IUcFn0l08/kI4FiYTL/0yuOLmEcbR4Fwe3GJf/NiiMnPA=="],

    "react-dom": ["react-dom@18.3.1", "", { "dependencies": { "loose-envify": "^1.1.0", "scheduler": "^0.23.2" }, "peerDependencies": { "react": "^18.3.1" } }, "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw=="],

    "react-hook-form": ["react-hook-form@7.61.1", "", { "peerDependencies": { "react": "^16.8.0 || ^17 || ^18 || ^19" } }, "sha512-2vbXUFDYgqEgM2RcXcAT2PwDW/80QARi+PKmHy5q2KhuKvOlG8iIYgf7eIlIANR5trW9fJbP4r5aub3a4egsew=="],

    "react-is": ["react-is@18.3.1", "", {}, "sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg=="],

    "react-markdown": ["react-markdown@10.1.0", "", { "dependencies": { "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "devlop": "^1.0.0", "hast-util-to-jsx-runtime": "^2.0.0", "html-url-attributes": "^3.0.0", "mdast-util-to-hast": "^13.0.0", "remark-parse": "^11.0.0", "remark-rehype": "^11.0.0", "unified": "^11.0.0", "unist-util-visit": "^5.0.0", "vfile": "^6.0.0" }, "peerDependencies": { "@types/react": ">=18", "react": ">=18" } }, "sha512-qKxVopLT/TyA6BX3Ue5NwabOsAzm0Q7kAPwq6L+wWDwisYs7R8vZ0nRXqq6rkueboxpkjvLGU9fWifiX/ZZFxQ=="],

    "react-remove-scroll": ["react-remove-scroll@2.7.1", "", { "dependencies": { "react-remove-scroll-bar": "^2.3.7", "react-style-singleton": "^2.2.3", "tslib": "^2.1.0", "use-callback-ref": "^1.3.3", "use-sidecar": "^1.1.3" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-HpMh8+oahmIdOuS5aFKKY6Pyog+FNaZV/XyJOq7b4YFwsFHe5yYfdbIalI4k3vU2nSDql7YskmUseHsRrJqIPA=="],

    "react-remove-scroll-bar": ["react-remove-scroll-bar@2.3.8", "", { "dependencies": { "react-style-singleton": "^2.2.2", "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q=="],

    "react-resizable-panels": ["react-resizable-panels@2.1.9", "", { "peerDependencies": { "react": "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-z77+X08YDIrgAes4jl8xhnUu1LNIRp4+E7cv4xHmLOxxUPO/ML7PSrE813b90vj7xvQ1lcf7g2uA9GeMZonjhQ=="],

    "react-router": ["react-router@6.30.1", "", { "dependencies": { "@remix-run/router": "1.23.0" }, "peerDependencies": { "react": ">=16.8" } }, "sha512-X1m21aEmxGXqENEPG3T6u0Th7g0aS4ZmoNynhbs+Cn+q+QGTLt+d5IQ2bHAXKzKcxGJjxACpVbnYQSCRcfxHlQ=="],

    "react-router-dom": ["react-router-dom@6.30.1", "", { "dependencies": { "@remix-run/router": "1.23.0", "react-router": "6.30.1" }, "peerDependencies": { "react": ">=16.8", "react-dom": ">=16.8" } }, "sha512-llKsgOkZdbPU1Eg3zK8lCn+sjD9wMRZZPuzmdWWX5SUs8OFkN5HnFVC0u5KMeMaC9aoancFI/KoLuKPqN+hxHw=="],

    "react-smooth": ["react-smooth@4.0.4", "", { "dependencies": { "fast-equals": "^5.0.1", "prop-types": "^15.8.1", "react-transition-group": "^4.4.5" }, "peerDependencies": { "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0", "react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q=="],

    "react-style-singleton": ["react-style-singleton@2.2.3", "", { "dependencies": { "get-nonce": "^1.0.0", "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ=="],

    "react-transition-group": ["react-transition-group@4.4.5", "", { "dependencies": { "@babel/runtime": "^7.5.5", "dom-helpers": "^5.0.1", "loose-envify": "^1.4.0", "prop-types": "^15.6.2" }, "peerDependencies": { "react": ">=16.6.0", "react-dom": ">=16.6.0" } }, "sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g=="],

    "read-cache": ["read-cache@1.0.0", "", { "dependencies": { "pify": "^2.3.0" } }, "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA=="],

    "readdirp": ["readdirp@3.6.0", "", { "dependencies": { "picomatch": "^2.2.1" } }, "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA=="],

    "recharts": ["recharts@2.15.4", "", { "dependencies": { "clsx": "^2.0.0", "eventemitter3": "^4.0.1", "lodash": "^4.17.21", "react-is": "^18.3.1", "react-smooth": "^4.0.4", "recharts-scale": "^0.4.4", "tiny-invariant": "^1.3.1", "victory-vendor": "^36.6.8" }, "peerDependencies": { "react": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0", "react-dom": "^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw=="],

    "recharts-scale": ["recharts-scale@0.4.5", "", { "dependencies": { "decimal.js-light": "^2.4.1" } }, "sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w=="],

    "redent": ["redent@3.0.0", "", { "dependencies": { "indent-string": "^4.0.0", "strip-indent": "^3.0.0" } }, "sha512-6tDA8g98We0zd0GvVeMT9arEOnTw9qM03L9cJXaCjrip1OO764RDBLBfrB4cwzNGDj5OA5ioymC9GkizgWJDUg=="],

    "remark-parse": ["remark-parse@11.0.0", "", { "dependencies": { "@types/mdast": "^4.0.0", "mdast-util-from-markdown": "^2.0.0", "micromark-util-types": "^2.0.0", "unified": "^11.0.0" } }, "sha512-FCxlKLNGknS5ba/1lmpYijMUzX2esxW5xQqjWxw2eHFfS2MSdaHVINFmhjo+qN1WhZhNimq0dZATN9pH0IDrpA=="],

    "remark-rehype": ["remark-rehype@11.1.2", "", { "dependencies": { "@types/hast": "^3.0.0", "@types/mdast": "^4.0.0", "mdast-util-to-hast": "^13.0.0", "unified": "^11.0.0", "vfile": "^6.0.0" } }, "sha512-Dh7l57ianaEoIpzbp0PC9UKAdCSVklD8E5Rpw7ETfbTl3FqcOOgq5q2LVDhgGCkaBv7p24JXikPdvhhmHvKMsw=="],

    "requires-port": ["requires-port@1.0.0", "", {}, "sha512-KigOCHcocU3XODJxsu8i/j8T9tzT4adHiecwORRQ0ZZFcp7ahwXuRU1m+yuO90C5ZUyGeGfocHDI14M3L3yDAQ=="],

    "resolve": ["resolve@1.22.8", "", { "dependencies": { "is-core-module": "^2.13.0", "path-parse": "^1.0.7", "supports-preserve-symlinks-flag": "^1.0.0" }, "bin": "bin/resolve" }, "sha512-oKWePCxqpd6FlLvGV1VU0x7bkPmmCNolxzjMf4NczoDnQcIWrAF+cPtZn5i6n+RfD2d9i0tzpKnG6Yk168yIyw=="],

    "resolve-from": ["resolve-from@4.0.0", "", {}, "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g=="],

    "reusify": ["reusify@1.0.4", "", {}, "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw=="],

    "rollup": ["rollup@4.24.0", "", { "dependencies": { "@types/estree": "1.0.6" }, "optionalDependencies": { "@rollup/rollup-android-arm-eabi": "4.24.0", "@rollup/rollup-android-arm64": "4.24.0", "@rollup/rollup-darwin-arm64": "4.24.0", "@rollup/rollup-darwin-x64": "4.24.0", "@rollup/rollup-linux-arm-gnueabihf": "4.24.0", "@rollup/rollup-linux-arm-musleabihf": "4.24.0", "@rollup/rollup-linux-arm64-gnu": "4.24.0", "@rollup/rollup-linux-arm64-musl": "4.24.0", "@rollup/rollup-linux-powerpc64le-gnu": "4.24.0", "@rollup/rollup-linux-riscv64-gnu": "4.24.0", "@rollup/rollup-linux-s390x-gnu": "4.24.0", "@rollup/rollup-linux-x64-gnu": "4.24.0", "@rollup/rollup-linux-x64-musl": "4.24.0", "@rollup/rollup-win32-arm64-msvc": "4.24.0", "@rollup/rollup-win32-ia32-msvc": "4.24.0", "@rollup/rollup-win32-x64-msvc": "4.24.0", "fsevents": "~2.3.2" }, "bin": "dist/bin/rollup" }, "sha512-DOmrlGSXNk1DM0ljiQA+i+o0rSLhtii1je5wgk60j49d1jHT5YYttBv1iWOnYSTG+fZZESUOSNiAl89SIet+Cg=="],

    "run-parallel": ["run-parallel@1.2.0", "", { "dependencies": { "queue-microtask": "^1.2.2" } }, "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA=="],

    "safer-buffer": ["safer-buffer@2.1.2", "", {}, "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg=="],

    "saxes": ["saxes@6.0.0", "", { "dependencies": { "xmlchars": "^2.2.0" } }, "sha512-xAg7SOnEhrm5zI3puOOKyy1OMcMlIJZYNJY7xLBwSze0UjhPLnWfj2GF2EpT0jmzaJKIWKHLsaSSajf35bcYnA=="],

    "scheduler": ["scheduler@0.23.2", "", { "dependencies": { "loose-envify": "^1.1.0" } }, "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ=="],

    "semver": ["semver@7.7.2", "", { "bin": "bin/semver.js" }, "sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA=="],

    "shebang-command": ["shebang-command@2.0.0", "", { "dependencies": { "shebang-regex": "^3.0.0" } }, "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA=="],

    "shebang-regex": ["shebang-regex@3.0.0", "", {}, "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A=="],

    "siginfo": ["siginfo@2.0.0", "", {}, "sha512-ybx0WO1/8bSBLEWXZvEd7gMW3Sn3JFlW3TvX1nREbDLRNQNaeNN8WK0meBwPdAaOI7TtRRRJn/Es1zhrrCHu7g=="],

    "signal-exit": ["signal-exit@4.1.0", "", {}, "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw=="],

    "sonner": ["sonner@1.7.4", "", { "peerDependencies": { "react": "^18.0.0 || ^19.0.0 || ^19.0.0-rc", "react-dom": "^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-DIS8z4PfJRbIyfVFDVnK9rO3eYDtse4Omcm6bt0oEr5/jtLgysmjuBl1frJ9E/EQZrFmKx2A8m/s5s9CRXIzhw=="],

    "source-map": ["source-map@0.6.1", "", {}, "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g=="],

    "source-map-js": ["source-map-js@1.2.1", "", {}, "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA=="],

    "space-separated-tokens": ["space-separated-tokens@2.0.2", "", {}, "sha512-PEGlAwrG8yXGXRjW32fGbg66JAlOAwbObuqVoJpv/mRgoWDQfgH1wDPvtzWyUSNAXBGSk8h755YDbbcEy3SH2Q=="],

    "stackback": ["stackback@0.0.2", "", {}, "sha512-1XMJE5fQo1jGH6Y/7ebnwPOBEkIEnT4QF32d5R1+VXdXveM0IBMJt8zfaxX1P3QhVwrYe+576+jkANtSS2mBbw=="],

    "std-env": ["std-env@3.10.0", "", {}, "sha512-5GS12FdOZNliM5mAOxFRg7Ir0pWz8MdpYm6AY6VPkGpbA7ZzmbzNcBJQ0GPvvyWgcY7QAhCgf9Uy89I03faLkg=="],

    "string-width": ["string-width@5.1.2", "", { "dependencies": { "eastasianwidth": "^0.2.0", "emoji-regex": "^9.2.2", "strip-ansi": "^7.0.1" } }, "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA=="],

    "string-width-cjs": ["string-width@4.2.3", "", { "dependencies": { "emoji-regex": "^8.0.0", "is-fullwidth-code-point": "^3.0.0", "strip-ansi": "^6.0.1" } }, "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g=="],

    "stringify-entities": ["stringify-entities@4.0.4", "", { "dependencies": { "character-entities-html4": "^2.0.0", "character-entities-legacy": "^3.0.0" } }, "sha512-IwfBptatlO+QCJUo19AqvrPNqlVMpW9YEL2LIVY+Rpv2qsjCGxaDLNRgeGsQWJhfItebuJhsGSLjaBbNSQ+ieg=="],

    "strip-ansi": ["strip-ansi@7.1.0", "", { "dependencies": { "ansi-regex": "^6.0.1" } }, "sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ=="],

    "strip-ansi-cjs": ["strip-ansi@6.0.1", "", { "dependencies": { "ansi-regex": "^5.0.1" } }, "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A=="],

    "strip-indent": ["strip-indent@3.0.0", "", { "dependencies": { "min-indent": "^1.0.0" } }, "sha512-laJTa3Jb+VQpaC6DseHhF7dXVqHTfJPCRDaEbid/drOhgitgYku/letMUqOXFoWV0zIIUbjpdH2t+tYj4bQMRQ=="],

    "strip-json-comments": ["strip-json-comments@3.1.1", "", {}, "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig=="],

    "strip-literal": ["strip-literal@3.1.0", "", { "dependencies": { "js-tokens": "^9.0.1" } }, "sha512-8r3mkIM/2+PpjHoOtiAW8Rg3jJLHaV7xPwG+YRGrv6FP0wwk/toTpATxWYOW0BKdWwl82VT2tFYi5DlROa0Mxg=="],

    "style-to-js": ["style-to-js@1.1.21", "", { "dependencies": { "style-to-object": "1.0.14" } }, "sha512-RjQetxJrrUJLQPHbLku6U/ocGtzyjbJMP9lCNK7Ag0CNh690nSH8woqWH9u16nMjYBAok+i7JO1NP2pOy8IsPQ=="],

    "style-to-object": ["style-to-object@1.0.14", "", { "dependencies": { "inline-style-parser": "0.2.7" } }, "sha512-LIN7rULI0jBscWQYaSswptyderlarFkjQ+t79nzty8tcIAceVomEVlLzH5VP4Cmsv6MtKhs7qaAiwlcp+Mgaxw=="],

    "sucrase": ["sucrase@3.35.0", "", { "dependencies": { "@jridgewell/gen-mapping": "^0.3.2", "commander": "^4.0.0", "glob": "^10.3.10", "lines-and-columns": "^1.1.6", "mz": "^2.7.0", "pirates": "^4.0.1", "ts-interface-checker": "^0.1.9" }, "bin": { "sucrase": "bin/sucrase", "sucrase-node": "bin/sucrase-node" } }, "sha512-8EbVDiu9iN/nESwxeSxDKe0dunta1GOlHufmSSXxMD2z2/tMZpDMpvXQGsc+ajGo8y2uYUmixaSRUc/QPoQ0GA=="],

    "supports-color": ["supports-color@7.2.0", "", { "dependencies": { "has-flag": "^4.0.0" } }, "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw=="],

    "supports-preserve-symlinks-flag": ["supports-preserve-symlinks-flag@1.0.0", "", {}, "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w=="],

    "symbol-tree": ["symbol-tree@3.2.4", "", {}, "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw=="],

    "tailwind-merge": ["tailwind-merge@2.6.0", "", {}, "sha512-P+Vu1qXfzediirmHOC3xKGAYeZtPcV9g76X+xg2FD4tYgR71ewMA35Y3sCz3zhiN/dwefRpJX0yBcgwi1fXNQA=="],

    "tailwindcss": ["tailwindcss@3.4.17", "", { "dependencies": { "@alloc/quick-lru": "^5.2.0", "arg": "^5.0.2", "chokidar": "^3.6.0", "didyoumean": "^1.2.2", "dlv": "^1.1.3", "fast-glob": "^3.3.2", "glob-parent": "^6.0.2", "is-glob": "^4.0.3", "jiti": "^1.21.6", "lilconfig": "^3.1.3", "micromatch": "^4.0.8", "normalize-path": "^3.0.0", "object-hash": "^3.0.0", "picocolors": "^1.1.1", "postcss": "^8.4.47", "postcss-import": "^15.1.0", "postcss-js": "^4.0.1", "postcss-load-config": "^4.0.2", "postcss-nested": "^6.2.0", "postcss-selector-parser": "^6.1.2", "resolve": "^1.22.8", "sucrase": "^3.35.0" }, "bin": { "tailwind": "lib/cli.js", "tailwindcss": "lib/cli.js" } }, "sha512-w33E2aCvSDP0tW9RZuNXadXlkHXqFzSkQew/aIa2i/Sj8fThxwovwlXHSPXTbAHwEIhBFXAedUhP2tueAKP8Og=="],

    "tailwindcss-animate": ["tailwindcss-animate@1.0.7", "", { "peerDependencies": { "tailwindcss": ">=3.0.0 || insiders" } }, "sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA=="],

    "thenify": ["thenify@3.3.1", "", { "dependencies": { "any-promise": "^1.0.0" } }, "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw=="],

    "thenify-all": ["thenify-all@1.6.0", "", { "dependencies": { "thenify": ">= 3.1.0 < 4" } }, "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA=="],

    "tiny-invariant": ["tiny-invariant@1.3.3", "", {}, "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg=="],

    "tinybench": ["tinybench@2.9.0", "", {}, "sha512-0+DUvqWMValLmha6lr4kD8iAMK1HzV0/aKnCtWb9v9641TnP/MFb7Pc2bxoxQjTXAErryXVgUOfv2YqNllqGeg=="],

    "tinyexec": ["tinyexec@0.3.2", "", {}, "sha512-KQQR9yN7R5+OSwaK0XQoj22pwHoTlgYqmUscPYoknOoWCWfj/5/ABTMRi69FrKU5ffPVh5QcFikpWJI/P1ocHA=="],

    "tinyglobby": ["tinyglobby@0.2.15", "", { "dependencies": { "fdir": "^6.5.0", "picomatch": "^4.0.3" } }, "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ=="],

    "tinypool": ["tinypool@1.1.1", "", {}, "sha512-Zba82s87IFq9A9XmjiX5uZA/ARWDrB03OHlq+Vw1fSdt0I+4/Kutwy8BP4Y/y/aORMo61FQ0vIb5j44vSo5Pkg=="],

    "tinyrainbow": ["tinyrainbow@2.0.0", "", {}, "sha512-op4nsTR47R6p0vMUUoYl/a+ljLFVtlfaXkLQmqfLR1qHma1h/ysYk4hEXZ880bf2CYgTskvTa/e196Vd5dDQXw=="],

    "tinyspy": ["tinyspy@4.0.4", "", {}, "sha512-azl+t0z7pw/z958Gy9svOTuzqIk6xq+NSheJzn5MMWtWTFywIacg2wUlzKFGtt3cthx0r2SxMK0yzJOR0IES7Q=="],

    "to-regex-range": ["to-regex-range@5.0.1", "", { "dependencies": { "is-number": "^7.0.0" } }, "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ=="],

    "tough-cookie": ["tough-cookie@4.1.4", "", { "dependencies": { "psl": "^1.1.33", "punycode": "^2.1.1", "universalify": "^0.2.0", "url-parse": "^1.5.3" } }, "sha512-Loo5UUvLD9ScZ6jh8beX1T6sO1w2/MpCRpEP7V280GKMVUQ0Jzar2U3UJPsrdbziLEMMhu3Ujnq//rhiFuIeag=="],

    "tr46": ["tr46@3.0.0", "", { "dependencies": { "punycode": "^2.1.1" } }, "sha512-l7FvfAHlcmulp8kr+flpQZmVwtu7nfRV7NZujtN0OqES8EL4O4e0qqzL0DC5gAvx/ZC/9lk6rhcUwYvkBnBnYA=="],

    "trim-lines": ["trim-lines@3.0.1", "", {}, "sha512-kRj8B+YHZCc9kQYdWfJB2/oUl9rA99qbowYYBtr4ui4mZyAQ2JpvVBd/6U2YloATfqBhBTSMhTpgBHtU0Mf3Rg=="],

    "trough": ["trough@2.2.0", "", {}, "sha512-tmMpK00BjZiUyVyvrBK7knerNgmgvcV/KLVyuma/SC+TQN167GrMRciANTz09+k3zW8L8t60jWO1GpfkZdjTaw=="],

    "ts-api-utils": ["ts-api-utils@2.1.0", "", { "peerDependencies": { "typescript": ">=4.8.4" } }, "sha512-CUgTZL1irw8u29bzrOD/nH85jqyc74D6SshFgujOIA7osm2Rz7dYH77agkx7H4FBNxDq7Cjf+IjaX/8zwFW+ZQ=="],

    "ts-interface-checker": ["ts-interface-checker@0.1.13", "", {}, "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA=="],

    "tslib": ["tslib@2.8.0", "", {}, "sha512-jWVzBLplnCmoaTr13V9dYbiQ99wvZRd0vNWaDRg+aVYRcjDF3nDksxFDE/+fkXnKhpnUUkmx5pK/v8mCtLVqZA=="],

    "type-check": ["type-check@0.4.0", "", { "dependencies": { "prelude-ls": "^1.2.1" } }, "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew=="],

    "typescript": ["typescript@5.8.3", "", { "bin": { "tsc": "bin/tsc", "tsserver": "bin/tsserver" } }, "sha512-p1diW6TqL9L07nNxvRMM7hMMw4c5XOo/1ibL4aAIGmSAt9slTE1Xgw5KWuof2uTOvCg9BY7ZRi+GaF+7sfgPeQ=="],

    "typescript-eslint": ["typescript-eslint@8.38.0", "", { "dependencies": { "@typescript-eslint/eslint-plugin": "8.38.0", "@typescript-eslint/parser": "8.38.0", "@typescript-eslint/typescript-estree": "8.38.0", "@typescript-eslint/utils": "8.38.0" }, "peerDependencies": { "eslint": "^8.57.0 || ^9.0.0", "typescript": ">=4.8.4 <5.9.0" } }, "sha512-FsZlrYK6bPDGoLeZRuvx2v6qrM03I0U0SnfCLPs/XCCPCFD80xU9Pg09H/K+XFa68uJuZo7l/Xhs+eDRg2l3hg=="],

    "undici-types": ["undici-types@6.21.0", "", {}, "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ=="],

    "unified": ["unified@11.0.5", "", { "dependencies": { "@types/unist": "^3.0.0", "bail": "^2.0.0", "devlop": "^1.0.0", "extend": "^3.0.0", "is-plain-obj": "^4.0.0", "trough": "^2.0.0", "vfile": "^6.0.0" } }, "sha512-xKvGhPWw3k84Qjh8bI3ZeJjqnyadK+GEFtazSfZv/rKeTkTjOJho6mFqh2SM96iIcZokxiOpg78GazTSg8+KHA=="],

    "unist-util-is": ["unist-util-is@6.0.1", "", { "dependencies": { "@types/unist": "^3.0.0" } }, "sha512-LsiILbtBETkDz8I9p1dQ0uyRUWuaQzd/cuEeS1hoRSyW5E5XGmTzlwY1OrNzzakGowI9Dr/I8HVaw4hTtnxy8g=="],

    "unist-util-position": ["unist-util-position@5.0.0", "", { "dependencies": { "@types/unist": "^3.0.0" } }, "sha512-fucsC7HjXvkB5R3kTCO7kUjRdrS0BJt3M/FPxmHMBOm8JQi2BsHAHFsy27E0EolP8rp0NzXsJ+jNPyDWvOJZPA=="],

    "unist-util-stringify-position": ["unist-util-stringify-position@4.0.0", "", { "dependencies": { "@types/unist": "^3.0.0" } }, "sha512-0ASV06AAoKCDkS2+xw5RXJywruurpbC4JZSm7nr7MOt1ojAzvyyaO+UxZf18j8FCF6kmzCZKcAgN/yu2gm2XgQ=="],

    "unist-util-visit": ["unist-util-visit@5.1.0", "", { "dependencies": { "@types/unist": "^3.0.0", "unist-util-is": "^6.0.0", "unist-util-visit-parents": "^6.0.0" } }, "sha512-m+vIdyeCOpdr/QeQCu2EzxX/ohgS8KbnPDgFni4dQsfSCtpz8UqDyY5GjRru8PDKuYn7Fq19j1CQ+nJSsGKOzg=="],

    "unist-util-visit-parents": ["unist-util-visit-parents@6.0.2", "", { "dependencies": { "@types/unist": "^3.0.0", "unist-util-is": "^6.0.0" } }, "sha512-goh1s1TBrqSqukSc8wrjwWhL0hiJxgA8m4kFxGlQ+8FYQ3C/m11FcTs4YYem7V664AhHVvgoQLk890Ssdsr2IQ=="],

    "universalify": ["universalify@0.2.0", "", {}, "sha512-CJ1QgKmNg3CwvAv/kOFmtnEN05f0D/cn9QntgNOQlQF9dgvVTHj3t+8JPdjqawCHk7V/KA+fbUqzZ9XWhcqPUg=="],

    "update-browserslist-db": ["update-browserslist-db@1.1.3", "", { "dependencies": { "escalade": "^3.2.0", "picocolors": "^1.1.1" }, "peerDependencies": { "browserslist": ">= 4.21.0" }, "bin": "cli.js" }, "sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw=="],

    "uri-js": ["uri-js@4.4.1", "", { "dependencies": { "punycode": "^2.1.0" } }, "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg=="],

    "url-parse": ["url-parse@1.5.10", "", { "dependencies": { "querystringify": "^2.1.1", "requires-port": "^1.0.0" } }, "sha512-WypcfiRhfeUP9vvF0j6rw0J3hrWrw6iZv3+22h6iRMJ/8z1Tj6XfLP4DsUix5MhMPnXpiHDoKyoZ/bdCkwBCiQ=="],

    "use-callback-ref": ["use-callback-ref@1.3.3", "", { "dependencies": { "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg=="],

    "use-sidecar": ["use-sidecar@1.1.3", "", { "dependencies": { "detect-node-es": "^1.1.0", "tslib": "^2.0.0" }, "peerDependencies": { "@types/react": "*", "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc" } }, "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ=="],

    "use-sync-external-store": ["use-sync-external-store@1.5.0", "", { "peerDependencies": { "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0" } }, "sha512-Rb46I4cGGVBmjamjphe8L/UnvJD+uPPtTkNvX5mZgqdbavhI4EbgIWJiIHXJ8bc/i9EQGPRh4DwEURJ552Do0A=="],

    "util-deprecate": ["util-deprecate@1.0.2", "", {}, "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw=="],

    "vaul": ["vaul@0.9.9", "", { "dependencies": { "@radix-ui/react-dialog": "^1.1.1" }, "peerDependencies": { "react": "^16.8 || ^17.0 || ^18.0", "react-dom": "^16.8 || ^17.0 || ^18.0" } }, "sha512-7afKg48srluhZwIkaU+lgGtFCUsYBSGOl8vcc8N/M3YQlZFlynHD15AE+pwrYdc826o7nrIND4lL9Y6b9WWZZQ=="],

    "vfile": ["vfile@6.0.3", "", { "dependencies": { "@types/unist": "^3.0.0", "vfile-message": "^4.0.0" } }, "sha512-KzIbH/9tXat2u30jf+smMwFCsno4wHVdNmzFyL+T/L3UGqqk6JKfVqOFOZEpZSHADH1k40ab6NUIXZq422ov3Q=="],

    "vfile-message": ["vfile-message@4.0.3", "", { "dependencies": { "@types/unist": "^3.0.0", "unist-util-stringify-position": "^4.0.0" } }, "sha512-QTHzsGd1EhbZs4AsQ20JX1rC3cOlt/IWJruk893DfLRr57lcnOeMaWG4K0JrRta4mIJZKth2Au3mM3u03/JWKw=="],

    "victory-vendor": ["victory-vendor@36.9.2", "", { "dependencies": { "@types/d3-array": "^3.0.3", "@types/d3-ease": "^3.0.0", "@types/d3-interpolate": "^3.0.1", "@types/d3-scale": "^4.0.2", "@types/d3-shape": "^3.1.0", "@types/d3-time": "^3.0.0", "@types/d3-timer": "^3.0.0", "d3-array": "^3.1.6", "d3-ease": "^3.0.1", "d3-interpolate": "^3.0.1", "d3-scale": "^4.0.2", "d3-shape": "^3.1.0", "d3-time": "^3.0.0", "d3-timer": "^3.0.1" } }, "sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ=="],

    "vite": ["vite@5.4.19", "", { "dependencies": { "esbuild": "^0.21.3", "postcss": "^8.4.43", "rollup": "^4.20.0" }, "optionalDependencies": { "fsevents": "~2.3.3" }, "peerDependencies": { "@types/node": "^18.0.0 || >=20.0.0", "less": "*", "lightningcss": "^1.21.0", "sass": "*", "sass-embedded": "*", "stylus": "*", "sugarss": "*", "terser": "^5.4.0" }, "optionalPeers": ["less", "lightningcss", "sass", "sass-embedded", "stylus", "sugarss", "terser"], "bin": "bin/vite.js" }, "sha512-qO3aKv3HoQC8QKiNSTuUM1l9o/XX3+c+VTgLHbJWHZGeTPVAg2XwazI9UWzoxjIJCGCV2zU60uqMzjeLZuULqA=="],

    "vite-node": ["vite-node@3.2.4", "", { "dependencies": { "cac": "^6.7.14", "debug": "^4.4.1", "es-module-lexer": "^1.7.0", "pathe": "^2.0.3", "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0" }, "bin": "vite-node.mjs" }, "sha512-EbKSKh+bh1E1IFxeO0pg1n4dvoOTt0UDiXMd/qn++r98+jPO1xtJilvXldeuQ8giIB5IkpjCgMleHMNEsGH6pg=="],

    "vitest": ["vitest@3.2.4", "", { "dependencies": { "@types/chai": "^5.2.2", "@vitest/expect": "3.2.4", "@vitest/mocker": "3.2.4", "@vitest/pretty-format": "^3.2.4", "@vitest/runner": "3.2.4", "@vitest/snapshot": "3.2.4", "@vitest/spy": "3.2.4", "@vitest/utils": "3.2.4", "chai": "^5.2.0", "debug": "^4.4.1", "expect-type": "^1.2.1", "magic-string": "^0.30.17", "pathe": "^2.0.3", "picomatch": "^4.0.2", "std-env": "^3.9.0", "tinybench": "^2.9.0", "tinyexec": "^0.3.2", "tinyglobby": "^0.2.14", "tinypool": "^1.1.1", "tinyrainbow": "^2.0.0", "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0", "vite-node": "3.2.4", "why-is-node-running": "^2.3.0" }, "peerDependencies": { "@edge-runtime/vm": "*", "@types/debug": "^4.1.12", "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0", "@vitest/browser": "3.2.4", "@vitest/ui": "3.2.4", "happy-dom": "*", "jsdom": "*" }, "optionalPeers": ["@edge-runtime/vm", "@vitest/browser", "@vitest/ui", "happy-dom"], "bin": "vitest.mjs" }, "sha512-LUCP5ev3GURDysTWiP47wRRUpLKMOfPh+yKTx3kVIEiu5KOMeqzpnYNsKyOoVrULivR8tLcks4+lga33Whn90A=="],

    "w3c-xmlserializer": ["w3c-xmlserializer@4.0.0", "", { "dependencies": { "xml-name-validator": "^4.0.0" } }, "sha512-d+BFHzbiCx6zGfz0HyQ6Rg69w9k19nviJspaj4yNscGjrHu94sVP+aRm75yEbCh+r2/yR+7q6hux9LVtbuTGBw=="],

    "webidl-conversions": ["webidl-conversions@7.0.0", "", {}, "sha512-VwddBukDzu71offAQR975unBIGqfKZpM+8ZX6ySk8nYhVoo5CYaZyzt3YBvYtRtO+aoGlqxPg/B87NGVZ/fu6g=="],

    "whatwg-encoding": ["whatwg-encoding@2.0.0", "", { "dependencies": { "iconv-lite": "0.6.3" } }, "sha512-p41ogyeMUrw3jWclHWTQg1k05DSVXPLcVxRTYsXUk+ZooOCZLcoYgPZ/HL/D/N+uQPOtcp1me1WhBEaX02mhWg=="],

    "whatwg-mimetype": ["whatwg-mimetype@3.0.0", "", {}, "sha512-nt+N2dzIutVRxARx1nghPKGv1xHikU7HKdfafKkLNLindmPU/ch3U31NOCGGA/dmPcmb1VlofO0vnKAcsm0o/Q=="],

    "whatwg-url": ["whatwg-url@11.0.0", "", { "dependencies": { "tr46": "^3.0.0", "webidl-conversions": "^7.0.0" } }, "sha512-RKT8HExMpoYx4igMiVMY83lN6UeITKJlBQ+vR/8ZJ8OCdSiN3RwCq+9gH0+Xzj0+5IrM6i4j/6LuvzbZIQgEcQ=="],

    "which": ["which@2.0.2", "", { "dependencies": { "isexe": "^2.0.0" }, "bin": { "node-which": "bin/node-which" } }, "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA=="],

    "why-is-node-running": ["why-is-node-running@2.3.0", "", { "dependencies": { "siginfo": "^2.0.0", "stackback": "0.0.2" }, "bin": "cli.js" }, "sha512-hUrmaWBdVDcxvYqnyh09zunKzROWjbZTiNy8dBEjkS7ehEDQibXJ7XvlmtbwuTclUiIyN+CyXQD4Vmko8fNm8w=="],

    "word-wrap": ["word-wrap@1.2.5", "", {}, "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA=="],

    "wrap-ansi": ["wrap-ansi@8.1.0", "", { "dependencies": { "ansi-styles": "^6.1.0", "string-width": "^5.0.1", "strip-ansi": "^7.0.1" } }, "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ=="],

    "wrap-ansi-cjs": ["wrap-ansi@7.0.0", "", { "dependencies": { "ansi-styles": "^4.0.0", "string-width": "^4.1.0", "strip-ansi": "^6.0.0" } }, "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q=="],

    "ws": ["ws@8.19.0", "", { "peerDependencies": { "bufferutil": "^4.0.1", "utf-8-validate": ">=5.0.2" }, "optionalPeers": ["bufferutil", "utf-8-validate"] }, "sha512-blAT2mjOEIi0ZzruJfIhb3nps74PRWTCz1IjglWEEpQl5XS/UNama6u2/rjFkDDouqr4L67ry+1aGIALViWjDg=="],

    "xml-name-validator": ["xml-name-validator@4.0.0", "", {}, "sha512-ICP2e+jsHvAj2E2lIHxa5tjXRlKDJo4IdvPvCXbXQGdzSfmSpNVyIKMvoZHjDY9DP0zV17iI85o90vRFXNccRw=="],

    "xmlchars": ["xmlchars@2.2.0", "", {}, "sha512-JZnDKK8B0RCDw84FNdDAIpZK+JuJw+s7Lz8nksI7SIuU3UXJJslUthsi+uWBUYOwPFwW7W7PRLRfUKpxjtjFCw=="],

    "yaml": ["yaml@2.6.0", "", { "bin": "bin.mjs" }, "sha512-a6ae//JvKDEra2kdi1qzCyrJW/WZCgFi8ydDV+eXExl95t+5R+ijnqHJbz9tmMh8FUjx3iv2fCQ4dclAQlO2UQ=="],

    "yocto-queue": ["yocto-queue@0.1.0", "", {}, "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q=="],

    "zod": ["zod@3.25.76", "", {}, "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ=="],

    "zwitch": ["zwitch@2.0.4", "", {}, "sha512-bXE4cR/kVZhKZX/RjPEflHaKVhUVl85noU3v6b8apfQEc1x4A+zBxjZ4lN8LqGd6WZ3dl98pY4o717VFmoPp+A=="],

    "@eslint-community/eslint-utils/eslint-visitor-keys": ["eslint-visitor-keys@3.4.3", "", {}, "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag=="],

    "@eslint/eslintrc/globals": ["globals@14.0.0", "", {}, "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ=="],

    "@humanfs/node/@humanwhocodes/retry": ["@humanwhocodes/retry@0.3.1", "", {}, "sha512-JBxkERygn7Bv/GbN5Rv8Ul6LVknS+5Bp6RgDC/O8gEBU/yeH5Ui5C/OlWrTb6qct7LjjfT6Re2NxB0ln0yYybA=="],

    "@typescript-eslint/eslint-plugin/ignore": ["ignore@7.0.5", "", {}, "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg=="],

    "@typescript-eslint/typescript-estree/minimatch": ["minimatch@9.0.5", "", { "dependencies": { "brace-expansion": "^2.0.1" } }, "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow=="],

    "anymatch/picomatch": ["picomatch@2.3.1", "", {}, "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA=="],

    "chokidar/glob-parent": ["glob-parent@5.1.2", "", { "dependencies": { "is-glob": "^4.0.1" } }, "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow=="],

    "cssstyle/cssom": ["cssom@0.3.8", "", {}, "sha512-b0tGHbfegbhPJpxpiBPU2sCkigAqtM9O121le6bbOlgyV+NyGyCmVfJ6QW9eRjz8CpNfWEOYBIMIGRYkLwsIYg=="],

    "fast-glob/glob-parent": ["glob-parent@5.1.2", "", { "dependencies": { "is-glob": "^4.0.1" } }, "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow=="],

    "glob/minimatch": ["minimatch@9.0.5", "", { "dependencies": { "brace-expansion": "^2.0.1" } }, "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow=="],

    "micromatch/picomatch": ["picomatch@2.3.1", "", {}, "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA=="],

    "parse-entities/@types/unist": ["@types/unist@2.0.11", "", {}, "sha512-CmBKiL6NNo/OqgmMn95Fk9Whlp2mtvIv+KNpQKN2F4SjvrEesubTRWGYSg+BnWZOnlCaSTU1sMpsBOzgbYhnsA=="],

    "postcss-nested/postcss-selector-parser": ["postcss-selector-parser@6.1.2", "", { "dependencies": { "cssesc": "^3.0.0", "util-deprecate": "^1.0.2" } }, "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg=="],

    "prop-types/react-is": ["react-is@16.13.1", "", {}, "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="],

    "readdirp/picomatch": ["picomatch@2.3.1", "", {}, "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA=="],

    "string-width-cjs/emoji-regex": ["emoji-regex@8.0.0", "", {}, "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="],

    "string-width-cjs/strip-ansi": ["strip-ansi@6.0.1", "", { "dependencies": { "ansi-regex": "^5.0.1" } }, "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A=="],

    "strip-ansi-cjs/ansi-regex": ["ansi-regex@5.0.1", "", {}, "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="],

    "strip-literal/js-tokens": ["js-tokens@9.0.1", "", {}, "sha512-mxa9E9ITFOt0ban3j6L5MpjwegGz6lBQmM1IJkWeBZGcMxto50+eWdjC/52xDbS2vy0k7vIMK0Fe2wfL9OQSpQ=="],

    "tailwindcss/postcss-selector-parser": ["postcss-selector-parser@6.1.2", "", { "dependencies": { "cssesc": "^3.0.0", "util-deprecate": "^1.0.2" } }, "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg=="],

    "tinyglobby/picomatch": ["picomatch@4.0.3", "", {}, "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q=="],

    "vite/esbuild": ["esbuild@0.21.5", "", { "optionalDependencies": { "@esbuild/aix-ppc64": "0.21.5", "@esbuild/android-arm": "0.21.5", "@esbuild/android-arm64": "0.21.5", "@esbuild/android-x64": "0.21.5", "@esbuild/darwin-arm64": "0.21.5", "@esbuild/darwin-x64": "0.21.5", "@esbuild/freebsd-arm64": "0.21.5", "@esbuild/freebsd-x64": "0.21.5", "@esbuild/linux-arm": "0.21.5", "@esbuild/linux-arm64": "0.21.5", "@esbuild/linux-ia32": "0.21.5", "@esbuild/linux-loong64": "0.21.5", "@esbuild/linux-mips64el": "0.21.5", "@esbuild/linux-ppc64": "0.21.5", "@esbuild/linux-riscv64": "0.21.5", "@esbuild/linux-s390x": "0.21.5", "@esbuild/linux-x64": "0.21.5", "@esbuild/netbsd-x64": "0.21.5", "@esbuild/openbsd-x64": "0.21.5", "@esbuild/sunos-x64": "0.21.5", "@esbuild/win32-arm64": "0.21.5", "@esbuild/win32-ia32": "0.21.5", "@esbuild/win32-x64": "0.21.5" }, "bin": "bin/esbuild" }, "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw=="],

    "wrap-ansi/ansi-styles": ["ansi-styles@6.2.1", "", {}, "sha512-bN798gFfQX+viw3R7yrGWRqnrN2oRkEkUjjl4JNn4E8GxxbjtG3FbrEIIY3l8/hrwUwIeCZvi4QuOTP4MErVug=="],

    "wrap-ansi-cjs/string-width": ["string-width@4.2.3", "", { "dependencies": { "emoji-regex": "^8.0.0", "is-fullwidth-code-point": "^3.0.0", "strip-ansi": "^6.0.1" } }, "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g=="],

    "wrap-ansi-cjs/strip-ansi": ["strip-ansi@6.0.1", "", { "dependencies": { "ansi-regex": "^5.0.1" } }, "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A=="],

    "@typescript-eslint/typescript-estree/minimatch/brace-expansion": ["brace-expansion@2.0.2", "", { "dependencies": { "balanced-match": "^1.0.0" } }, "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ=="],

    "glob/minimatch/brace-expansion": ["brace-expansion@2.0.2", "", { "dependencies": { "balanced-match": "^1.0.0" } }, "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ=="],

    "string-width-cjs/strip-ansi/ansi-regex": ["ansi-regex@5.0.1", "", {}, "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="],

    "vite/esbuild/@esbuild/aix-ppc64": ["@esbuild/aix-ppc64@0.21.5", "", { "os": "aix", "cpu": "ppc64" }, "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ=="],

    "vite/esbuild/@esbuild/android-arm": ["@esbuild/android-arm@0.21.5", "", { "os": "android", "cpu": "arm" }, "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg=="],

    "vite/esbuild/@esbuild/android-arm64": ["@esbuild/android-arm64@0.21.5", "", { "os": "android", "cpu": "arm64" }, "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A=="],

    "vite/esbuild/@esbuild/android-x64": ["@esbuild/android-x64@0.21.5", "", { "os": "android", "cpu": "x64" }, "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA=="],

    "vite/esbuild/@esbuild/darwin-arm64": ["@esbuild/darwin-arm64@0.21.5", "", { "os": "darwin", "cpu": "arm64" }, "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ=="],

    "vite/esbuild/@esbuild/darwin-x64": ["@esbuild/darwin-x64@0.21.5", "", { "os": "darwin", "cpu": "x64" }, "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw=="],

    "vite/esbuild/@esbuild/freebsd-arm64": ["@esbuild/freebsd-arm64@0.21.5", "", { "os": "freebsd", "cpu": "arm64" }, "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g=="],

    "vite/esbuild/@esbuild/freebsd-x64": ["@esbuild/freebsd-x64@0.21.5", "", { "os": "freebsd", "cpu": "x64" }, "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ=="],

    "vite/esbuild/@esbuild/linux-arm": ["@esbuild/linux-arm@0.21.5", "", { "os": "linux", "cpu": "arm" }, "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA=="],

    "vite/esbuild/@esbuild/linux-arm64": ["@esbuild/linux-arm64@0.21.5", "", { "os": "linux", "cpu": "arm64" }, "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q=="],

    "vite/esbuild/@esbuild/linux-ia32": ["@esbuild/linux-ia32@0.21.5", "", { "os": "linux", "cpu": "ia32" }, "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg=="],

    "vite/esbuild/@esbuild/linux-loong64": ["@esbuild/linux-loong64@0.21.5", "", { "os": "linux", "cpu": "none" }, "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg=="],

    "vite/esbuild/@esbuild/linux-mips64el": ["@esbuild/linux-mips64el@0.21.5", "", { "os": "linux", "cpu": "none" }, "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg=="],

    "vite/esbuild/@esbuild/linux-ppc64": ["@esbuild/linux-ppc64@0.21.5", "", { "os": "linux", "cpu": "ppc64" }, "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w=="],

    "vite/esbuild/@esbuild/linux-riscv64": ["@esbuild/linux-riscv64@0.21.5", "", { "os": "linux", "cpu": "none" }, "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA=="],

    "vite/esbuild/@esbuild/linux-s390x": ["@esbuild/linux-s390x@0.21.5", "", { "os": "linux", "cpu": "s390x" }, "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A=="],

    "vite/esbuild/@esbuild/linux-x64": ["@esbuild/linux-x64@0.21.5", "", { "os": "linux", "cpu": "x64" }, "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ=="],

    "vite/esbuild/@esbuild/netbsd-x64": ["@esbuild/netbsd-x64@0.21.5", "", { "os": "none", "cpu": "x64" }, "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg=="],

    "vite/esbuild/@esbuild/openbsd-x64": ["@esbuild/openbsd-x64@0.21.5", "", { "os": "openbsd", "cpu": "x64" }, "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow=="],

    "vite/esbuild/@esbuild/sunos-x64": ["@esbuild/sunos-x64@0.21.5", "", { "os": "sunos", "cpu": "x64" }, "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg=="],

    "vite/esbuild/@esbuild/win32-arm64": ["@esbuild/win32-arm64@0.21.5", "", { "os": "win32", "cpu": "arm64" }, "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A=="],

    "vite/esbuild/@esbuild/win32-ia32": ["@esbuild/win32-ia32@0.21.5", "", { "os": "win32", "cpu": "ia32" }, "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA=="],

    "vite/esbuild/@esbuild/win32-x64": ["@esbuild/win32-x64@0.21.5", "", { "os": "win32", "cpu": "x64" }, "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw=="],

    "wrap-ansi-cjs/string-width/emoji-regex": ["emoji-regex@8.0.0", "", {}, "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="],

    "wrap-ansi-cjs/strip-ansi/ansi-regex": ["ansi-regex@5.0.1", "", {}, "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ=="],
  }
}
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- TODO: Set the document title to the name of your application -->
    <title>Lovable App</title>
    <meta name="description" content="Lovable Generated Project" />
    <meta name="author" content="Lovable" />

    <!-- TODO: Update og:title to match your application name -->
    <meta property="og:title" content="Lovable App" />
    <meta property="og:description" content="Lovable Generated Project" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Lovable" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.34.3",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.16",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^20.0.3",
    "lovable-tagger": "^1.1.13",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19",
    "vitest": "^3.2.4"
  }
}
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        health: {
          teal: "hsl(var(--health-teal))",
          purple: "hsl(var(--health-purple))",
          coral: "hsl(var(--health-coral))",
          green: "hsl(var(--health-green))",
          blue: "hsl(var(--health-blue))",
          yellow: "hsl(var(--health-yellow))",
          pink: "hsl(var(--health-pink))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--primary) / 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px hsl(var(--primary) / 0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "count-up": "count-up 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
{
  "compilerOptions": {
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleDetection": "force",
    "moduleResolution": "bundler",
    "noEmit": true,
    "noFallthroughCasesInSwitch": false,
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "skipLibCheck": true,
    "strict": false,
    "target": "ES2020",
    "types": [
      "vitest/globals"
    ],
    "useDefineForClassFields": true
  },
  "include": [
    "src"
  ]
}{"version":"7.0.0-dev.20260224.1","root":[[62,65],69,75,[117,118],[120,121],[126,131],[133,135],[206,208],210,217,220,[224,225],227,[229,230],489,[526,527],[529,530],[532,533],537,539,541,[573,574],576,578,580,[583,584],586,588,610,612,614,[616,620],622,[624,625],[627,628],[631,633],810,815],"fileNames":["lib.es5.d.ts","lib.es2015.d.ts","lib.es2016.d.ts","lib.es2017.d.ts","lib.es2018.d.ts","lib.es2019.d.ts","lib.es2020.d.ts","lib.dom.d.ts","lib.dom.iterable.d.ts","lib.es2015.core.d.ts","lib.es2015.collection.d.ts","lib.es2015.generator.d.ts","lib.es2015.iterable.d.ts","lib.es2015.promise.d.ts","lib.es2015.proxy.d.ts","lib.es2015.reflect.d.ts","lib.es2015.symbol.d.ts","lib.es2015.symbol.wellknown.d.ts","lib.es2016.array.include.d.ts","lib.es2016.intl.d.ts","lib.es2017.arraybuffer.d.ts","lib.es2017.date.d.ts","lib.es2017.object.d.ts","lib.es2017.sharedmemory.d.ts","lib.es2017.string.d.ts","lib.es2017.intl.d.ts","lib.es2017.typedarrays.d.ts","lib.es2018.asyncgenerator.d.ts","lib.es2018.asynciterable.d.ts","lib.es2018.intl.d.ts","lib.es2018.promise.d.ts","lib.es2018.regexp.d.ts","lib.es2019.array.d.ts","lib.es2019.object.d.ts","lib.es2019.string.d.ts","lib.es2019.symbol.d.ts","lib.es2019.intl.d.ts","lib.es2020.bigint.d.ts","lib.es2020.date.d.ts","lib.es2020.promise.d.ts","lib.es2020.sharedmemory.d.ts","lib.es2020.string.d.ts","lib.es2020.symbol.wellknown.d.ts","lib.es2020.intl.d.ts","lib.es2020.number.d.ts","lib.decorators.d.ts","lib.decorators.legacy.d.ts","./node_modules/@types/react/global.d.ts","./node_modules/csstype/index.d.ts","./node_modules/@types/prop-types/index.d.ts","./node_modules/@types/react/index.d.ts","./node_modules/@types/react/jsx-runtime.d.ts","./node_modules/@radix-ui/react-context/dist/index.d.mts","./node_modules/@radix-ui/react-primitive/dist/index.d.mts","./node_modules/@radix-ui/react-dismissable-layer/dist/index.d.mts","./node_modules/@radix-ui/react-toast/dist/index.d.mts","./node_modules/clsx/clsx.d.mts","./node_modules/class-variance-authority/dist/types.d.ts","./node_modules/class-variance-authority/dist/index.d.ts","./node_modules/lucide-react/dist/lucide-react.d.ts","./node_modules/tailwind-merge/dist/types.d.ts","./src/lib/utils.ts","./src/components/ui/toast.tsx","./src/hooks/use-toast.ts","./src/components/ui/toaster.tsx","./node_modules/next-themes/dist/types.d.ts","./node_modules/next-themes/dist/index.d.ts","./node_modules/sonner/dist/index.d.ts","./src/components/ui/sonner.tsx","./node_modules/@radix-ui/react-arrow/dist/index.d.mts","./node_modules/@radix-ui/rect/dist/index.d.mts","./node_modules/@radix-ui/react-popper/dist/index.d.mts","./node_modules/@radix-ui/react-portal/dist/index.d.mts","./node_modules/@radix-ui/react-tooltip/dist/index.d.mts","./src/components/ui/tooltip.tsx","./node_modules/@tanstack/query-core/build/modern/removable.d.ts","./node_modules/@tanstack/query-core/build/modern/subscribable.d.ts","./node_modules/@tanstack/query-core/build/modern/hydration-Cvr-9VdO.d.ts","./node_modules/@tanstack/query-core/build/modern/queriesObserver.d.ts","./node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.d.ts","./node_modules/@tanstack/query-core/build/modern/notifyManager.d.ts","./node_modules/@tanstack/query-core/build/modern/focusManager.d.ts","./node_modules/@tanstack/query-core/build/modern/onlineManager.d.ts","./node_modules/@tanstack/query-core/build/modern/streamedQuery.d.ts","./node_modules/@tanstack/query-core/build/modern/index.d.ts","./node_modules/@tanstack/react-query/build/modern/types.d.ts","./node_modules/@tanstack/react-query/build/modern/useQueries.d.ts","./node_modules/@tanstack/react-query/build/modern/queryOptions.d.ts","./node_modules/@tanstack/react-query/build/modern/useQuery.d.ts","./node_modules/@tanstack/react-query/build/modern/useSuspenseQuery.d.ts","./node_modules/@tanstack/react-query/build/modern/useSuspenseInfiniteQuery.d.ts","./node_modules/@tanstack/react-query/build/modern/useSuspenseQueries.d.ts","./node_modules/@tanstack/react-query/build/modern/usePrefetchQuery.d.ts","./node_modules/@tanstack/react-query/build/modern/usePrefetchInfiniteQuery.d.ts","./node_modules/@tanstack/react-query/build/modern/infiniteQueryOptions.d.ts","./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.d.ts","./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.d.ts","./node_modules/@tanstack/react-query/build/modern/HydrationBoundary.d.ts","./node_modules/@tanstack/react-query/build/modern/useIsFetching.d.ts","./node_modules/@tanstack/react-query/build/modern/useMutationState.d.ts","./node_modules/@tanstack/react-query/build/modern/useMutation.d.ts","./node_modules/@tanstack/react-query/build/modern/mutationOptions.d.ts","./node_modules/@tanstack/react-query/build/modern/useInfiniteQuery.d.ts","./node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.d.ts","./node_modules/@tanstack/react-query/build/modern/index.d.ts","./node_modules/@remix-run/router/dist/history.d.ts","./node_modules/@remix-run/router/dist/utils.d.ts","./node_modules/@remix-run/router/dist/router.d.ts","./node_modules/@remix-run/router/dist/index.d.ts","./node_modules/react-router/dist/lib/context.d.ts","./node_modules/react-router/dist/lib/components.d.ts","./node_modules/react-router/dist/lib/hooks.d.ts","./node_modules/react-router/dist/lib/deprecations.d.ts","./node_modules/react-router/dist/index.d.ts","./node_modules/react-router-dom/dist/dom.d.ts","./node_modules/react-router-dom/dist/index.d.ts","./src/components/NavLink.tsx","./src/components/layout/AppSidebar.tsx","./node_modules/@radix-ui/react-slot/dist/index.d.mts","./src/components/ui/button.tsx","./src/components/ui/input.tsx","./node_modules/motion-utils/dist/index.d.ts","./node_modules/motion-dom/dist/index.d.ts","./node_modules/framer-motion/dist/types.d-CQ4vRM6h.d.ts","./node_modules/framer-motion/dist/types/index.d.ts","./src/components/AIChatbot.tsx","./src/components/layout/AppLayout.tsx","./src/components/ui/card.tsx","./src/pages/Index.tsx","./src/components/ui/badge.tsx","./src/pages/Reports.tsx","./node_modules/@radix-ui/react-progress/dist/index.d.mts","./src/components/ui/progress.tsx","./src/pages/Medicines.tsx","./src/pages/Appointments.tsx","./node_modules/recharts/types/container/Surface.d.ts","./node_modules/recharts/types/container/Layer.d.ts","./node_modules/@types/d3-time/index.d.ts","./node_modules/@types/d3-scale/index.d.ts","./node_modules/victory-vendor/d3-scale.d.ts","./node_modules/recharts/types/cartesian/XAxis.d.ts","./node_modules/recharts/types/cartesian/YAxis.d.ts","./node_modules/recharts/types/util/types.d.ts","./node_modules/recharts/types/component/DefaultLegendContent.d.ts","./node_modules/recharts/types/util/payload/getUniqPayload.d.ts","./node_modules/recharts/types/component/Legend.d.ts","./node_modules/recharts/types/component/DefaultTooltipContent.d.ts","./node_modules/recharts/types/component/Tooltip.d.ts","./node_modules/recharts/types/component/ResponsiveContainer.d.ts","./node_modules/recharts/types/component/Cell.d.ts","./node_modules/recharts/types/component/Text.d.ts","./node_modules/recharts/types/component/Label.d.ts","./node_modules/recharts/types/component/LabelList.d.ts","./node_modules/recharts/types/component/Customized.d.ts","./node_modules/recharts/types/shape/Sector.d.ts","./node_modules/@types/d3-path/index.d.ts","./node_modules/@types/d3-shape/index.d.ts","./node_modules/victory-vendor/d3-shape.d.ts","./node_modules/recharts/types/shape/Curve.d.ts","./node_modules/recharts/types/shape/Rectangle.d.ts","./node_modules/recharts/types/shape/Polygon.d.ts","./node_modules/recharts/types/shape/Dot.d.ts","./node_modules/recharts/types/shape/Cross.d.ts","./node_modules/recharts/types/shape/Symbols.d.ts","./node_modules/recharts/types/polar/PolarGrid.d.ts","./node_modules/recharts/types/polar/PolarRadiusAxis.d.ts","./node_modules/recharts/types/polar/PolarAngleAxis.d.ts","./node_modules/recharts/types/polar/Pie.d.ts","./node_modules/recharts/types/polar/Radar.d.ts","./node_modules/recharts/types/polar/RadialBar.d.ts","./node_modules/recharts/types/cartesian/Brush.d.ts","./node_modules/recharts/types/util/IfOverflowMatches.d.ts","./node_modules/recharts/types/cartesian/ReferenceLine.d.ts","./node_modules/recharts/types/cartesian/ReferenceDot.d.ts","./node_modules/recharts/types/cartesian/ReferenceArea.d.ts","./node_modules/recharts/types/cartesian/CartesianAxis.d.ts","./node_modules/recharts/types/cartesian/CartesianGrid.d.ts","./node_modules/recharts/types/cartesian/Line.d.ts","./node_modules/recharts/types/cartesian/Area.d.ts","./node_modules/recharts/types/util/BarUtils.d.ts","./node_modules/recharts/types/cartesian/Bar.d.ts","./node_modules/recharts/types/cartesian/ZAxis.d.ts","./node_modules/recharts/types/cartesian/ErrorBar.d.ts","./node_modules/recharts/types/cartesian/Scatter.d.ts","./node_modules/recharts/types/util/getLegendProps.d.ts","./node_modules/recharts/types/util/ChartUtils.d.ts","./node_modules/recharts/types/chart/AccessibilityManager.d.ts","./node_modules/recharts/types/chart/types.d.ts","./node_modules/recharts/types/chart/generateCategoricalChart.d.ts","./node_modules/recharts/types/chart/LineChart.d.ts","./node_modules/recharts/types/chart/BarChart.d.ts","./node_modules/recharts/types/chart/PieChart.d.ts","./node_modules/recharts/types/chart/Treemap.d.ts","./node_modules/recharts/types/chart/Sankey.d.ts","./node_modules/recharts/types/chart/RadarChart.d.ts","./node_modules/recharts/types/chart/ScatterChart.d.ts","./node_modules/recharts/types/chart/AreaChart.d.ts","./node_modules/recharts/types/chart/RadialBarChart.d.ts","./node_modules/recharts/types/chart/ComposedChart.d.ts","./node_modules/recharts/types/chart/SunburstChart.d.ts","./node_modules/recharts/types/shape/Trapezoid.d.ts","./node_modules/recharts/types/numberAxis/Funnel.d.ts","./node_modules/recharts/types/chart/FunnelChart.d.ts","./node_modules/recharts/types/util/Global.d.ts","./node_modules/recharts/types/index.d.ts","./src/pages/HealthTracker.tsx","./src/pages/NotFound.tsx","./src/App.tsx","./node_modules/@types/react-dom/client.d.ts","./src/main.tsx","./node_modules/vite/types/hmrPayload.d.ts","./node_modules/vite/types/customEvent.d.ts","./node_modules/vite/types/hot.d.ts","./node_modules/vite/types/importGlob.d.ts","./node_modules/vite/types/importMeta.d.ts","./node_modules/vite/client.d.ts","./src/vite-env.d.ts","./node_modules/@radix-ui/react-collapsible/dist/index.d.mts","./node_modules/@radix-ui/react-accordion/dist/index.d.mts","./src/components/ui/accordion.tsx","./node_modules/@radix-ui/react-focus-scope/dist/index.d.mts","./node_modules/@radix-ui/react-dialog/dist/index.d.mts","./node_modules/@radix-ui/react-alert-dialog/dist/index.d.mts","./src/components/ui/alert-dialog.tsx","./src/components/ui/alert.tsx","./node_modules/@radix-ui/react-aspect-ratio/dist/index.d.mts","./src/components/ui/aspect-ratio.tsx","./node_modules/@radix-ui/react-avatar/dist/index.d.mts","./src/components/ui/avatar.tsx","./src/components/ui/breadcrumb.tsx","./node_modules/date-fns/locale/types.d.ts","./node_modules/date-fns/fp/types.d.ts","./node_modules/date-fns/types.d.ts","./node_modules/date-fns/add.d.ts","./node_modules/date-fns/addBusinessDays.d.ts","./node_modules/date-fns/addDays.d.ts","./node_modules/date-fns/addHours.d.ts","./node_modules/date-fns/addISOWeekYears.d.ts","./node_modules/date-fns/addMilliseconds.d.ts","./node_modules/date-fns/addMinutes.d.ts","./node_modules/date-fns/addMonths.d.ts","./node_modules/date-fns/addQuarters.d.ts","./node_modules/date-fns/addSeconds.d.ts","./node_modules/date-fns/addWeeks.d.ts","./node_modules/date-fns/addYears.d.ts","./node_modules/date-fns/areIntervalsOverlapping.d.ts","./node_modules/date-fns/clamp.d.ts","./node_modules/date-fns/closestIndexTo.d.ts","./node_modules/date-fns/closestTo.d.ts","./node_modules/date-fns/compareAsc.d.ts","./node_modules/date-fns/compareDesc.d.ts","./node_modules/date-fns/constructFrom.d.ts","./node_modules/date-fns/constructNow.d.ts","./node_modules/date-fns/daysToWeeks.d.ts","./node_modules/date-fns/differenceInBusinessDays.d.ts","./node_modules/date-fns/differenceInCalendarDays.d.ts","./node_modules/date-fns/differenceInCalendarISOWeekYears.d.ts","./node_modules/date-fns/differenceInCalendarISOWeeks.d.ts","./node_modules/date-fns/differenceInCalendarMonths.d.ts","./node_modules/date-fns/differenceInCalendarQuarters.d.ts","./node_modules/date-fns/differenceInCalendarWeeks.d.ts","./node_modules/date-fns/differenceInCalendarYears.d.ts","./node_modules/date-fns/differenceInDays.d.ts","./node_modules/date-fns/differenceInHours.d.ts","./node_modules/date-fns/differenceInISOWeekYears.d.ts","./node_modules/date-fns/differenceInMilliseconds.d.ts","./node_modules/date-fns/differenceInMinutes.d.ts","./node_modules/date-fns/differenceInMonths.d.ts","./node_modules/date-fns/differenceInQuarters.d.ts","./node_modules/date-fns/differenceInSeconds.d.ts","./node_modules/date-fns/differenceInWeeks.d.ts","./node_modules/date-fns/differenceInYears.d.ts","./node_modules/date-fns/eachDayOfInterval.d.ts","./node_modules/date-fns/eachHourOfInterval.d.ts","./node_modules/date-fns/eachMinuteOfInterval.d.ts","./node_modules/date-fns/eachMonthOfInterval.d.ts","./node_modules/date-fns/eachQuarterOfInterval.d.ts","./node_modules/date-fns/eachWeekOfInterval.d.ts","./node_modules/date-fns/eachWeekendOfInterval.d.ts","./node_modules/date-fns/eachWeekendOfMonth.d.ts","./node_modules/date-fns/eachWeekendOfYear.d.ts","./node_modules/date-fns/eachYearOfInterval.d.ts","./node_modules/date-fns/endOfDay.d.ts","./node_modules/date-fns/endOfDecade.d.ts","./node_modules/date-fns/endOfHour.d.ts","./node_modules/date-fns/endOfISOWeek.d.ts","./node_modules/date-fns/endOfISOWeekYear.d.ts","./node_modules/date-fns/endOfMinute.d.ts","./node_modules/date-fns/endOfMonth.d.ts","./node_modules/date-fns/endOfQuarter.d.ts","./node_modules/date-fns/endOfSecond.d.ts","./node_modules/date-fns/endOfToday.d.ts","./node_modules/date-fns/endOfTomorrow.d.ts","./node_modules/date-fns/endOfWeek.d.ts","./node_modules/date-fns/endOfYear.d.ts","./node_modules/date-fns/endOfYesterday.d.ts","./node_modules/date-fns/_lib/format/formatters.d.ts","./node_modules/date-fns/_lib/format/longFormatters.d.ts","./node_modules/date-fns/format.d.ts","./node_modules/date-fns/formatDistance.d.ts","./node_modules/date-fns/formatDistanceStrict.d.ts","./node_modules/date-fns/formatDistanceToNow.d.ts","./node_modules/date-fns/formatDistanceToNowStrict.d.ts","./node_modules/date-fns/formatDuration.d.ts","./node_modules/date-fns/formatISO.d.ts","./node_modules/date-fns/formatISO9075.d.ts","./node_modules/date-fns/formatISODuration.d.ts","./node_modules/date-fns/formatRFC3339.d.ts","./node_modules/date-fns/formatRFC7231.d.ts","./node_modules/date-fns/formatRelative.d.ts","./node_modules/date-fns/fromUnixTime.d.ts","./node_modules/date-fns/getDate.d.ts","./node_modules/date-fns/getDay.d.ts","./node_modules/date-fns/getDayOfYear.d.ts","./node_modules/date-fns/getDaysInMonth.d.ts","./node_modules/date-fns/getDaysInYear.d.ts","./node_modules/date-fns/getDecade.d.ts","./node_modules/date-fns/_lib/defaultOptions.d.ts","./node_modules/date-fns/getDefaultOptions.d.ts","./node_modules/date-fns/getHours.d.ts","./node_modules/date-fns/getISODay.d.ts","./node_modules/date-fns/getISOWeek.d.ts","./node_modules/date-fns/getISOWeekYear.d.ts","./node_modules/date-fns/getISOWeeksInYear.d.ts","./node_modules/date-fns/getMilliseconds.d.ts","./node_modules/date-fns/getMinutes.d.ts","./node_modules/date-fns/getMonth.d.ts","./node_modules/date-fns/getOverlappingDaysInIntervals.d.ts","./node_modules/date-fns/getQuarter.d.ts","./node_modules/date-fns/getSeconds.d.ts","./node_modules/date-fns/getTime.d.ts","./node_modules/date-fns/getUnixTime.d.ts","./node_modules/date-fns/getWeek.d.ts","./node_modules/date-fns/getWeekOfMonth.d.ts","./node_modules/date-fns/getWeekYear.d.ts","./node_modules/date-fns/getWeeksInMonth.d.ts","./node_modules/date-fns/getYear.d.ts","./node_modules/date-fns/hoursToMilliseconds.d.ts","./node_modules/date-fns/hoursToMinutes.d.ts","./node_modules/date-fns/hoursToSeconds.d.ts","./node_modules/date-fns/interval.d.ts","./node_modules/date-fns/intervalToDuration.d.ts","./node_modules/date-fns/intlFormat.d.ts","./node_modules/date-fns/intlFormatDistance.d.ts","./node_modules/date-fns/isAfter.d.ts","./node_modules/date-fns/isBefore.d.ts","./node_modules/date-fns/isDate.d.ts","./node_modules/date-fns/isEqual.d.ts","./node_modules/date-fns/isExists.d.ts","./node_modules/date-fns/isFirstDayOfMonth.d.ts","./node_modules/date-fns/isFriday.d.ts","./node_modules/date-fns/isFuture.d.ts","./node_modules/date-fns/isLastDayOfMonth.d.ts","./node_modules/date-fns/isLeapYear.d.ts","./node_modules/date-fns/isMatch.d.ts","./node_modules/date-fns/isMonday.d.ts","./node_modules/date-fns/isPast.d.ts","./node_modules/date-fns/isSameDay.d.ts","./node_modules/date-fns/isSameHour.d.ts","./node_modules/date-fns/isSameISOWeek.d.ts","./node_modules/date-fns/isSameISOWeekYear.d.ts","./node_modules/date-fns/isSameMinute.d.ts","./node_modules/date-fns/isSameMonth.d.ts","./node_modules/date-fns/isSameQuarter.d.ts","./node_modules/date-fns/isSameSecond.d.ts","./node_modules/date-fns/isSameWeek.d.ts","./node_modules/date-fns/isSameYear.d.ts","./node_modules/date-fns/isSaturday.d.ts","./node_modules/date-fns/isSunday.d.ts","./node_modules/date-fns/isThisHour.d.ts","./node_modules/date-fns/isThisISOWeek.d.ts","./node_modules/date-fns/isThisMinute.d.ts","./node_modules/date-fns/isThisMonth.d.ts","./node_modules/date-fns/isThisQuarter.d.ts","./node_modules/date-fns/isThisSecond.d.ts","./node_modules/date-fns/isThisWeek.d.ts","./node_modules/date-fns/isThisYear.d.ts","./node_modules/date-fns/isThursday.d.ts","./node_modules/date-fns/isToday.d.ts","./node_modules/date-fns/isTomorrow.d.ts","./node_modules/date-fns/isTuesday.d.ts","./node_modules/date-fns/isValid.d.ts","./node_modules/date-fns/isWednesday.d.ts","./node_modules/date-fns/isWeekend.d.ts","./node_modules/date-fns/isWithinInterval.d.ts","./node_modules/date-fns/isYesterday.d.ts","./node_modules/date-fns/lastDayOfDecade.d.ts","./node_modules/date-fns/lastDayOfISOWeek.d.ts","./node_modules/date-fns/lastDayOfISOWeekYear.d.ts","./node_modules/date-fns/lastDayOfMonth.d.ts","./node_modules/date-fns/lastDayOfQuarter.d.ts","./node_modules/date-fns/lastDayOfWeek.d.ts","./node_modules/date-fns/lastDayOfYear.d.ts","./node_modules/date-fns/_lib/format/lightFormatters.d.ts","./node_modules/date-fns/lightFormat.d.ts","./node_modules/date-fns/max.d.ts","./node_modules/date-fns/milliseconds.d.ts","./node_modules/date-fns/millisecondsToHours.d.ts","./node_modules/date-fns/millisecondsToMinutes.d.ts","./node_modules/date-fns/millisecondsToSeconds.d.ts","./node_modules/date-fns/min.d.ts","./node_modules/date-fns/minutesToHours.d.ts","./node_modules/date-fns/minutesToMilliseconds.d.ts","./node_modules/date-fns/minutesToSeconds.d.ts","./node_modules/date-fns/monthsToQuarters.d.ts","./node_modules/date-fns/monthsToYears.d.ts","./node_modules/date-fns/nextDay.d.ts","./node_modules/date-fns/nextFriday.d.ts","./node_modules/date-fns/nextMonday.d.ts","./node_modules/date-fns/nextSaturday.d.ts","./node_modules/date-fns/nextSunday.d.ts","./node_modules/date-fns/nextThursday.d.ts","./node_modules/date-fns/nextTuesday.d.ts","./node_modules/date-fns/nextWednesday.d.ts","./node_modules/date-fns/parse/_lib/types.d.ts","./node_modules/date-fns/parse/_lib/Setter.d.ts","./node_modules/date-fns/parse/_lib/Parser.d.ts","./node_modules/date-fns/parse/_lib/parsers.d.ts","./node_modules/date-fns/parse.d.ts","./node_modules/date-fns/parseISO.d.ts","./node_modules/date-fns/parseJSON.d.ts","./node_modules/date-fns/previousDay.d.ts","./node_modules/date-fns/previousFriday.d.ts","./node_modules/date-fns/previousMonday.d.ts","./node_modules/date-fns/previousSaturday.d.ts","./node_modules/date-fns/previousSunday.d.ts","./node_modules/date-fns/previousThursday.d.ts","./node_modules/date-fns/previousTuesday.d.ts","./node_modules/date-fns/previousWednesday.d.ts","./node_modules/date-fns/quartersToMonths.d.ts","./node_modules/date-fns/quartersToYears.d.ts","./node_modules/date-fns/roundToNearestHours.d.ts","./node_modules/date-fns/roundToNearestMinutes.d.ts","./node_modules/date-fns/secondsToHours.d.ts","./node_modules/date-fns/secondsToMilliseconds.d.ts","./node_modules/date-fns/secondsToMinutes.d.ts","./node_modules/date-fns/set.d.ts","./node_modules/date-fns/setDate.d.ts","./node_modules/date-fns/setDay.d.ts","./node_modules/date-fns/setDayOfYear.d.ts","./node_modules/date-fns/setDefaultOptions.d.ts","./node_modules/date-fns/setHours.d.ts","./node_modules/date-fns/setISODay.d.ts","./node_modules/date-fns/setISOWeek.d.ts","./node_modules/date-fns/setISOWeekYear.d.ts","./node_modules/date-fns/setMilliseconds.d.ts","./node_modules/date-fns/setMinutes.d.ts","./node_modules/date-fns/setMonth.d.ts","./node_modules/date-fns/setQuarter.d.ts","./node_modules/date-fns/setSeconds.d.ts","./node_modules/date-fns/setWeek.d.ts","./node_modules/date-fns/setWeekYear.d.ts","./node_modules/date-fns/setYear.d.ts","./node_modules/date-fns/startOfDay.d.ts","./node_modules/date-fns/startOfDecade.d.ts","./node_modules/date-fns/startOfHour.d.ts","./node_modules/date-fns/startOfISOWeek.d.ts","./node_modules/date-fns/startOfISOWeekYear.d.ts","./node_modules/date-fns/startOfMinute.d.ts","./node_modules/date-fns/startOfMonth.d.ts","./node_modules/date-fns/startOfQuarter.d.ts","./node_modules/date-fns/startOfSecond.d.ts","./node_modules/date-fns/startOfToday.d.ts","./node_modules/date-fns/startOfTomorrow.d.ts","./node_modules/date-fns/startOfWeek.d.ts","./node_modules/date-fns/startOfWeekYear.d.ts","./node_modules/date-fns/startOfYear.d.ts","./node_modules/date-fns/startOfYesterday.d.ts","./node_modules/date-fns/sub.d.ts","./node_modules/date-fns/subBusinessDays.d.ts","./node_modules/date-fns/subDays.d.ts","./node_modules/date-fns/subHours.d.ts","./node_modules/date-fns/subISOWeekYears.d.ts","./node_modules/date-fns/subMilliseconds.d.ts","./node_modules/date-fns/subMinutes.d.ts","./node_modules/date-fns/subMonths.d.ts","./node_modules/date-fns/subQuarters.d.ts","./node_modules/date-fns/subSeconds.d.ts","./node_modules/date-fns/subWeeks.d.ts","./node_modules/date-fns/subYears.d.ts","./node_modules/date-fns/toDate.d.ts","./node_modules/date-fns/transpose.d.ts","./node_modules/date-fns/weeksToDays.d.ts","./node_modules/date-fns/yearsToDays.d.ts","./node_modules/date-fns/yearsToMonths.d.ts","./node_modules/date-fns/yearsToQuarters.d.ts","./node_modules/date-fns/index.d.mts","./node_modules/react-day-picker/dist/index.d.ts","./src/components/ui/calendar.tsx","./node_modules/embla-carousel/esm/components/Alignment.d.ts","./node_modules/embla-carousel/esm/components/NodeRects.d.ts","./node_modules/embla-carousel/esm/components/Axis.d.ts","./node_modules/embla-carousel/esm/components/SlidesToScroll.d.ts","./node_modules/embla-carousel/esm/components/Limit.d.ts","./node_modules/embla-carousel/esm/components/ScrollContain.d.ts","./node_modules/embla-carousel/esm/components/DragTracker.d.ts","./node_modules/embla-carousel/esm/components/utils.d.ts","./node_modules/embla-carousel/esm/components/Animations.d.ts","./node_modules/embla-carousel/esm/components/Counter.d.ts","./node_modules/embla-carousel/esm/components/EventHandler.d.ts","./node_modules/embla-carousel/esm/components/EventStore.d.ts","./node_modules/embla-carousel/esm/components/PercentOfView.d.ts","./node_modules/embla-carousel/esm/components/ResizeHandler.d.ts","./node_modules/embla-carousel/esm/components/Vector1d.d.ts","./node_modules/embla-carousel/esm/components/ScrollBody.d.ts","./node_modules/embla-carousel/esm/components/ScrollBounds.d.ts","./node_modules/embla-carousel/esm/components/ScrollLooper.d.ts","./node_modules/embla-carousel/esm/components/ScrollProgress.d.ts","./node_modules/embla-carousel/esm/components/SlideRegistry.d.ts","./node_modules/embla-carousel/esm/components/ScrollTarget.d.ts","./node_modules/embla-carousel/esm/components/ScrollTo.d.ts","./node_modules/embla-carousel/esm/components/SlideFocus.d.ts","./node_modules/embla-carousel/esm/components/Translate.d.ts","./node_modules/embla-carousel/esm/components/SlideLooper.d.ts","./node_modules/embla-carousel/esm/components/SlidesHandler.d.ts","./node_modules/embla-carousel/esm/components/SlidesInView.d.ts","./node_modules/embla-carousel/esm/components/Engine.d.ts","./node_modules/embla-carousel/esm/components/OptionsHandler.d.ts","./node_modules/embla-carousel/esm/components/Plugins.d.ts","./node_modules/embla-carousel/esm/components/EmblaCarousel.d.ts","./node_modules/embla-carousel/esm/components/DragHandler.d.ts","./node_modules/embla-carousel/esm/components/Options.d.ts","./node_modules/embla-carousel/esm/index.d.ts","./node_modules/embla-carousel-react/esm/components/useEmblaCarousel.d.ts","./node_modules/embla-carousel-react/esm/index.d.ts","./src/components/ui/carousel.tsx","./src/components/ui/chart.tsx","./node_modules/@radix-ui/react-checkbox/dist/index.d.mts","./src/components/ui/checkbox.tsx","./src/components/ui/collapsible.tsx","./node_modules/cmdk/dist/index.d.ts","./src/components/ui/dialog.tsx","./src/components/ui/command.tsx","./node_modules/@radix-ui/react-roving-focus/dist/index.d.mts","./node_modules/@radix-ui/react-menu/dist/index.d.mts","./node_modules/@radix-ui/react-context-menu/dist/index.d.mts","./src/components/ui/context-menu.tsx","./node_modules/vaul/dist/index.d.mts","./src/components/ui/drawer.tsx","./node_modules/@radix-ui/react-dropdown-menu/dist/index.d.mts","./src/components/ui/dropdown-menu.tsx","./node_modules/@radix-ui/react-label/dist/index.d.mts","./node_modules/react-hook-form/dist/constants.d.ts","./node_modules/react-hook-form/dist/utils/createSubject.d.ts","./node_modules/react-hook-form/dist/types/events.d.ts","./node_modules/react-hook-form/dist/types/path/common.d.ts","./node_modules/react-hook-form/dist/types/path/eager.d.ts","./node_modules/react-hook-form/dist/types/path/index.d.ts","./node_modules/react-hook-form/dist/types/fieldArray.d.ts","./node_modules/react-hook-form/dist/types/resolvers.d.ts","./node_modules/react-hook-form/dist/types/form.d.ts","./node_modules/react-hook-form/dist/types/utils.d.ts","./node_modules/react-hook-form/dist/types/fields.d.ts","./node_modules/react-hook-form/dist/types/errors.d.ts","./node_modules/react-hook-form/dist/types/validator.d.ts","./node_modules/react-hook-form/dist/types/controller.d.ts","./node_modules/react-hook-form/dist/types/index.d.ts","./node_modules/react-hook-form/dist/controller.d.ts","./node_modules/react-hook-form/dist/form.d.ts","./node_modules/react-hook-form/dist/logic/appendErrors.d.ts","./node_modules/react-hook-form/dist/logic/createFormControl.d.ts","./node_modules/react-hook-form/dist/logic/index.d.ts","./node_modules/react-hook-form/dist/useController.d.ts","./node_modules/react-hook-form/dist/useFieldArray.d.ts","./node_modules/react-hook-form/dist/useForm.d.ts","./node_modules/react-hook-form/dist/useFormContext.d.ts","./node_modules/react-hook-form/dist/useFormState.d.ts","./node_modules/react-hook-form/dist/useWatch.d.ts","./node_modules/react-hook-form/dist/utils/get.d.ts","./node_modules/react-hook-form/dist/utils/set.d.ts","./node_modules/react-hook-form/dist/utils/index.d.ts","./node_modules/react-hook-form/dist/index.d.ts","./src/components/ui/label.tsx","./src/components/ui/form.tsx","./node_modules/@radix-ui/react-hover-card/dist/index.d.mts","./src/components/ui/hover-card.tsx","./node_modules/input-otp/dist/index.d.ts","./src/components/ui/input-otp.tsx","./node_modules/@radix-ui/react-menubar/dist/index.d.mts","./src/components/ui/menubar.tsx","./node_modules/@radix-ui/react-visually-hidden/dist/index.d.mts","./node_modules/@radix-ui/react-navigation-menu/dist/index.d.mts","./src/components/ui/navigation-menu.tsx","./src/components/ui/pagination.tsx","./node_modules/@radix-ui/react-popover/dist/index.d.mts","./src/components/ui/popover.tsx","./node_modules/@radix-ui/react-radio-group/dist/index.d.mts","./src/components/ui/radio-group.tsx","./node_modules/react-resizable-panels/dist/declarations/src/Panel.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/types.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/PanelGroup.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/PanelResizeHandleRegistry.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/PanelResizeHandle.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/constants.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/assert.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/csp.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/cursor.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getPanelElement.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getPanelElementsForGroup.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getPanelGroupElement.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getResizeHandleElement.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getResizeHandleElementIndex.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getResizeHandleElementsForGroup.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/dom/getResizeHandlePanelIds.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/rects/types.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/rects/getIntersectingRectangle.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/utils/rects/intersects.d.ts","./node_modules/react-resizable-panels/dist/declarations/src/index.d.ts","./node_modules/react-resizable-panels/dist/react-resizable-panels.cjs.d.mts","./src/components/ui/resizable.tsx","./node_modules/@radix-ui/react-scroll-area/dist/index.d.mts","./src/components/ui/scroll-area.tsx","./node_modules/@radix-ui/react-select/dist/index.d.mts","./src/components/ui/select.tsx","./node_modules/@radix-ui/react-separator/dist/index.d.mts","./src/components/ui/separator.tsx","./src/components/ui/sheet.tsx","./src/hooks/use-mobile.tsx","./src/components/ui/skeleton.tsx","./src/components/ui/sidebar.tsx","./node_modules/@radix-ui/react-slider/dist/index.d.mts","./src/components/ui/slider.tsx","./node_modules/@radix-ui/react-switch/dist/index.d.mts","./src/components/ui/switch.tsx","./src/components/ui/table.tsx","./node_modules/@radix-ui/react-tabs/dist/index.d.mts","./src/components/ui/tabs.tsx","./src/components/ui/textarea.tsx","./node_modules/@radix-ui/react-toggle/dist/index.d.mts","./node_modules/@radix-ui/react-toggle-group/dist/index.d.mts","./src/components/ui/toggle.tsx","./src/components/ui/toggle-group.tsx","./src/components/ui/use-toast.ts","./node_modules/@vitest/pretty-format/dist/index.d.ts","./node_modules/@vitest/utils/dist/types.d.ts","./node_modules/@vitest/utils/dist/helpers.d.ts","./node_modules/tinyrainbow/dist/index-8b61d5bc.d.ts","./node_modules/tinyrainbow/dist/node.d.ts","./node_modules/@vitest/utils/dist/index.d.ts","./node_modules/@vitest/runner/dist/tasks.d-CkscK4of.d.ts","./node_modules/@vitest/utils/dist/types.d-BCElaP-c.d.ts","./node_modules/@vitest/utils/dist/diff.d.ts","./node_modules/@vitest/runner/dist/types.d.ts","./node_modules/@vitest/utils/dist/error.d.ts","./node_modules/@vitest/runner/dist/index.d.ts","./node_modules/vitest/optional-types.d.ts","./node_modules/vitest/dist/chunks/environment.d.cL3nLXbE.d.ts","./node_modules/@types/node/compatibility/disposable.d.ts","./node_modules/@types/node/compatibility/indexable.d.ts","./node_modules/@types/node/compatibility/iterators.d.ts","./node_modules/@types/node/compatibility/index.d.ts","./node_modules/@types/node/globals.typedarray.d.ts","./node_modules/@types/node/buffer.buffer.d.ts","./node_modules/undici-types/header.d.ts","./node_modules/undici-types/readable.d.ts","./node_modules/undici-types/file.d.ts","./node_modules/undici-types/fetch.d.ts","./node_modules/undici-types/formdata.d.ts","./node_modules/undici-types/connector.d.ts","./node_modules/undici-types/client.d.ts","./node_modules/undici-types/errors.d.ts","./node_modules/undici-types/dispatcher.d.ts","./node_modules/undici-types/global-dispatcher.d.ts","./node_modules/undici-types/global-origin.d.ts","./node_modules/undici-types/pool-stats.d.ts","./node_modules/undici-types/pool.d.ts","./node_modules/undici-types/handlers.d.ts","./node_modules/undici-types/balanced-pool.d.ts","./node_modules/undici-types/agent.d.ts","./node_modules/undici-types/mock-interceptor.d.ts","./node_modules/undici-types/mock-agent.d.ts","./node_modules/undici-types/mock-client.d.ts","./node_modules/undici-types/mock-pool.d.ts","./node_modules/undici-types/mock-errors.d.ts","./node_modules/undici-types/proxy-agent.d.ts","./node_modules/undici-types/env-http-proxy-agent.d.ts","./node_modules/undici-types/retry-handler.d.ts","./node_modules/undici-types/retry-agent.d.ts","./node_modules/undici-types/api.d.ts","./node_modules/undici-types/interceptors.d.ts","./node_modules/undici-types/util.d.ts","./node_modules/undici-types/cookies.d.ts","./node_modules/undici-types/patch.d.ts","./node_modules/undici-types/websocket.d.ts","./node_modules/undici-types/eventsource.d.ts","./node_modules/undici-types/filereader.d.ts","./node_modules/undici-types/diagnostics-channel.d.ts","./node_modules/undici-types/content-type.d.ts","./node_modules/undici-types/cache.d.ts","./node_modules/undici-types/index.d.ts","./node_modules/@types/node/globals.d.ts","./node_modules/@types/node/assert.d.ts","./node_modules/@types/node/assert/strict.d.ts","./node_modules/@types/node/async_hooks.d.ts","./node_modules/@types/node/buffer.d.ts","./node_modules/@types/node/child_process.d.ts","./node_modules/@types/node/cluster.d.ts","./node_modules/@types/node/console.d.ts","./node_modules/@types/node/constants.d.ts","./node_modules/@types/node/crypto.d.ts","./node_modules/@types/node/dgram.d.ts","./node_modules/@types/node/diagnostics_channel.d.ts","./node_modules/@types/node/dns.d.ts","./node_modules/@types/node/dns/promises.d.ts","./node_modules/@types/node/domain.d.ts","./node_modules/@types/node/dom-events.d.ts","./node_modules/@types/node/events.d.ts","./node_modules/@types/node/fs.d.ts","./node_modules/@types/node/fs/promises.d.ts","./node_modules/@types/node/http.d.ts","./node_modules/@types/node/http2.d.ts","./node_modules/@types/node/https.d.ts","./node_modules/@types/node/inspector.d.ts","./node_modules/@types/node/module.d.ts","./node_modules/@types/node/net.d.ts","./node_modules/@types/node/os.d.ts","./node_modules/@types/node/path.d.ts","./node_modules/@types/node/perf_hooks.d.ts","./node_modules/@types/node/process.d.ts","./node_modules/@types/node/punycode.d.ts","./node_modules/@types/node/querystring.d.ts","./node_modules/@types/node/readline.d.ts","./node_modules/@types/node/readline/promises.d.ts","./node_modules/@types/node/repl.d.ts","./node_modules/@types/node/sea.d.ts","./node_modules/@types/node/sqlite.d.ts","./node_modules/@types/node/stream.d.ts","./node_modules/@types/node/stream/promises.d.ts","./node_modules/@types/node/stream/consumers.d.ts","./node_modules/@types/node/stream/web.d.ts","./node_modules/@types/node/string_decoder.d.ts","./node_modules/@types/node/test.d.ts","./node_modules/@types/node/timers.d.ts","./node_modules/@types/node/timers/promises.d.ts","./node_modules/@types/node/tls.d.ts","./node_modules/@types/node/trace_events.d.ts","./node_modules/@types/node/tty.d.ts","./node_modules/@types/node/url.d.ts","./node_modules/@types/node/util.d.ts","./node_modules/@types/node/v8.d.ts","./node_modules/@types/node/vm.d.ts","./node_modules/@types/node/wasi.d.ts","./node_modules/@types/node/worker_threads.d.ts","./node_modules/@types/node/zlib.d.ts","./node_modules/@types/node/index.d.ts","./node_modules/@types/estree/index.d.ts","./node_modules/rollup/dist/rollup.d.ts","./node_modules/rollup/dist/parseAst.d.ts","./node_modules/vite/dist/node/types.d-aGj9QkWt.d.ts","./node_modules/vite/node_modules/esbuild/lib/main.d.ts","./node_modules/source-map-js/source-map.d.ts","./node_modules/postcss/lib/previous-map.d.ts","./node_modules/postcss/lib/input.d.ts","./node_modules/postcss/lib/css-syntax-error.d.ts","./node_modules/postcss/lib/declaration.d.ts","./node_modules/postcss/lib/root.d.ts","./node_modules/postcss/lib/warning.d.ts","./node_modules/postcss/lib/lazy-result.d.ts","./node_modules/postcss/lib/no-work-result.d.ts","./node_modules/postcss/lib/processor.d.ts","./node_modules/postcss/lib/result.d.ts","./node_modules/postcss/lib/document.d.ts","./node_modules/postcss/lib/rule.d.ts","./node_modules/postcss/lib/node.d.ts","./node_modules/postcss/lib/comment.d.ts","./node_modules/postcss/lib/container.d.ts","./node_modules/postcss/lib/at-rule.d.ts","./node_modules/postcss/lib/list.d.ts","./node_modules/postcss/lib/postcss.d.ts","./node_modules/postcss/lib/postcss.d.mts","./node_modules/vite/dist/node/runtime.d.ts","./node_modules/vite/types/metadata.d.ts","./node_modules/vite/dist/node/index.d.ts","./node_modules/@vitest/mocker/dist/registry.d-D765pazg.d.ts","./node_modules/@vitest/mocker/dist/types.d-D_aRZRdy.d.ts","./node_modules/@vitest/mocker/dist/index.d.ts","./node_modules/@vitest/utils/dist/source-map.d.ts","./node_modules/vite-node/dist/trace-mapping.d-DLVdEqOp.d.ts","./node_modules/vite-node/dist/index.d-DGmxD2U7.d.ts","./node_modules/vite-node/dist/index.d.ts","./node_modules/@vitest/snapshot/dist/environment.d-DHdQ1Csl.d.ts","./node_modules/@vitest/snapshot/dist/rawSnapshot.d-lFsMJFUd.d.ts","./node_modules/@vitest/snapshot/dist/index.d.ts","./node_modules/@vitest/snapshot/dist/environment.d.ts","./node_modules/vitest/dist/chunks/config.d.D2ROskhv.d.ts","./node_modules/vitest/dist/chunks/worker.d.1GmBbd7G.d.ts","./node_modules/@types/deep-eql/index.d.ts","./node_modules/assertion-error/index.d.ts","./node_modules/@types/chai/index.d.ts","./node_modules/@vitest/runner/dist/utils.d.ts","./node_modules/tinybench/dist/index.d.ts","./node_modules/vitest/dist/chunks/benchmark.d.BwvBVTda.d.ts","./node_modules/vite-node/dist/client.d.ts","./node_modules/vitest/dist/chunks/coverage.d.S9RMNXIe.d.ts","./node_modules/@vitest/snapshot/dist/manager.d.ts","./node_modules/vitest/dist/chunks/reporters.d.BFLkQcL6.d.ts","./node_modules/vitest/dist/chunks/worker.d.CKwWzBSj.d.ts","./node_modules/@vitest/spy/dist/index.d.ts","./node_modules/@vitest/expect/dist/index.d.ts","./node_modules/vitest/dist/chunks/global.d.MAmajcmJ.d.ts","./node_modules/vitest/dist/chunks/vite.d.CMLlLIFP.d.ts","./node_modules/vitest/dist/chunks/mocker.d.BE_2ls6u.d.ts","./node_modules/vitest/dist/chunks/suite.d.FvehnV49.d.ts","./node_modules/expect-type/dist/utils.d.ts","./node_modules/expect-type/dist/overloads.d.ts","./node_modules/expect-type/dist/branding.d.ts","./node_modules/expect-type/dist/messages.d.ts","./node_modules/expect-type/dist/index.d.ts","./node_modules/vitest/dist/index.d.ts","./src/test/example.test.ts","./node_modules/@types/aria-query/index.d.ts","./node_modules/@testing-library/jest-dom/types/matchers.d.ts","./node_modules/@testing-library/jest-dom/types/jest.d.ts","./node_modules/@testing-library/jest-dom/types/index.d.ts","./src/test/setup.ts","./node_modules/vitest/globals.d.ts"],"fileInfos":[{"version":"a1aa1a5e065d48ef5c7bb99e38412f96","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"d4306fb2e47f74835e8674ffac07d76f","impliedNodeFormat":99},{"version":"e437c5c1302869326c3bb93da85bbbcf","impliedNodeFormat":99},{"version":"e4324975a566567b21d350615f1fc6ac","impliedNodeFormat":99},{"version":"333b1b9a2a9ac3b8497dba5c63b5ba50","impliedNodeFormat":99},{"version":"6cffacd662b6eb5fa7a36aa2ea366bfa","impliedNodeFormat":99},{"version":"b4c34f9c23304dbef2d23698637ed638","impliedNodeFormat":99},{"version":"b0005e04f9f8ae4714f8298a8c3df499","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"abad6dd56cc8caf095c165df8124d237","impliedNodeFormat":99},{"version":"01ac052ec4a79e87229f90466a9645f8","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"edba5df642941aa062a62f6328c6df3d","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"6344b55f26a4e81d9608777dbfb877dd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"3c0ed28e53d3695b363e256ec1c023fd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4c2761daba7f17141c25baa0821ac5da","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b87656acabd63e69379ff6ffcfe52fc7","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"597469522da047a5af5222cc6989f405","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"bb3a710cbcda0533bb127712927cbe37","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"55d97a8c6fbf34a30450a7b1e5f7a298","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"0ee05eb59426d33e374226d8dcfa708b","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"e347c14030993906efcfbb88915b6a05","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b0231263857c9b6a03641acdc9280ceb","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"3b15c4a83b598cacb4067676e6f0abed","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b417d97b7934cef63b1889abec0bbfbf","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"09a6cf4032ebba60ce22a501e663f881","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"7a42de379b489e8f7b647455bebfc576","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"e22cc07e3f3cc242ba52fa3f8ea1fc58","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"2c45da767a1bfbb220848df1bc4029e4","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b44c3e0fbaf2130cdcf6ac38b120ffa1","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b612fb5cf8e5d964b92063a75207632a","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"02705151a5e1551b9162a9ed8ab763f7","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"41025e398be9215d32e4337335da8f0b","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"52684c2b1f353a5538e4f275182a54cd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"6dedb6a4f90d1df3a6fbe5693e44886c","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"ca3f36fe3562c07e0f0d71c2bebd3f6d","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"409974d6129befbb8226ddd1c6558568","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4d9cfde2a1ae1b4925f1f9bc10848e5d","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"7e1daecc66dd564144e3bb1a0266b5fd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a8e1d9bb35fd0637f2f9fd2b2a54f2ec","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4f168501772a6543182765bfd5f2fbfe","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a19c80aad1b2162103496f5ba293a732","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b69afa63cd5d059851c78adb2856ee09","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"ae2fc5d954e9b0f5feee3d481b953c27","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"1cfd3091a071d8b6feec15277643bafe","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"692bcd75364db0f65d428801c7884466","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a0d87491913d843139e0c993650a3235","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"f64453cbf9671f28158677fa5c43967a","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"33f317af5428801f944a478d2c1e38e5","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"227e9b8001bb8366a6a64a4bf132ee1b","affectsGlobalScope":true,"impliedNodeFormat":1},"fdca13c9e1b0225fe2ea7411fc134684","83ce387bc14a652e4bb5770ea0d54fd8",{"version":"20a2f53cda1a6fc85e397e1bc2530b12","affectsGlobalScope":true,"impliedNodeFormat":1},"6cf9f954dfe35ddb7805fa637c7fa795",{"version":"151c0879ba4b0b702ae7ec951d898dc7","impliedNodeFormat":99},{"version":"1e65cf01f0d246e2f5f9cca07bd0bef5","impliedNodeFormat":99},{"version":"f25f1e34fef3fad8a0ea411a796b0102","impliedNodeFormat":99},{"version":"830dc6515232cf8b9e14a0e5c215641c","impliedNodeFormat":99},{"version":"263b4be26685f5fba0419dc81bb83583","impliedNodeFormat":99},"e18bc2cb7cd59c043b51769e6efa3ced","aec59b32ed0cd3e073ad36c0e36c09ce","65b9b6b82bfaede22abc1b1f33ba9d1c","3e11a6ed6c3756181654f992fdbd9e85","09808d1359d4b2b3b192a3a1ce961775","26f83bea8d7372ebb17802ce396a71a5","d4629d9c08fdb0681b87299a046e6629","b1e4a5db7ce1012011c90d9fceb5b7d2","1010c92eac606148f23ad09ba44a6923","2f27d778c7601ab43a5d21a7ef49d6b7","c8f5dd926eb11faa43e0024fa38e260e","fabd443897a354105dd18d94b2b5f8f7",{"version":"13b1620321c4ee94ad0ca6a0ac07540f","impliedNodeFormat":99},{"version":"637aee1b10e393c5bc3b6fefdb83abf1","impliedNodeFormat":99},{"version":"b6bbaa79649ceb3fbbb2b7b167671f68","impliedNodeFormat":99},{"version":"e9ae46903c290bd6fa0b28fae2f8c34a","impliedNodeFormat":99},{"version":"34eda22602b696b2bf5abe751f1e46a1","impliedNodeFormat":99},"32e58ddbf908181206408dd41198fee4",{"version":"221286093578616c1bf126f829618f48","impliedNodeFormat":99},{"version":"ffe74b8fb78b4146ede37b77ec387b19","impliedNodeFormat":99},{"version":"e39aab0e5be08b221ec97efd85c2facd","impliedNodeFormat":99},{"version":"918f7392ed5a15a08a77db720963649a","impliedNodeFormat":99},{"version":"1a2509b61d4a71d993bff168b33e0f8d","impliedNodeFormat":99},{"version":"e7ec2012e49c33285c8b26d96aa68866","impliedNodeFormat":99},{"version":"7dc12477ff21d9daa12f31ede2e47067","impliedNodeFormat":99},{"version":"d930be2ea89104aecb9dd30098f6b5e4","impliedNodeFormat":99},{"version":"bce1fee59a5a7909de32d72f57afa8b9","impliedNodeFormat":99},{"version":"c0089ffe5dce469bececb5c9351d0e96","impliedNodeFormat":99},{"version":"3b17e396dc9d51341248ea205367c04f","impliedNodeFormat":99},{"version":"4e6b100108db3391d57e8c2fc8c7a6b0","impliedNodeFormat":99},{"version":"2ba4d5900f5c49b9f961d586b71a44be","impliedNodeFormat":99},{"version":"1dc08a4664b21175b846b1fc25cf6e56","impliedNodeFormat":99},{"version":"070ab05ba00f67bebc8fb248fb697ee8","impliedNodeFormat":99},{"version":"b991a81d78856cfe923b722c3e9bb548","impliedNodeFormat":99},{"version":"81d0b165700330ae93e36d7dd5ef6ce6","impliedNodeFormat":99},{"version":"c6c1fc69e75da4132541d77823d801b9","impliedNodeFormat":99},{"version":"8ce87c0a13e2365d57d3547ad85e323c","impliedNodeFormat":99},{"version":"426f0cfc4f0cc4ec517eabcc4ba9422d","impliedNodeFormat":99},{"version":"bea587f580df88da5f0159092471432d","impliedNodeFormat":99},{"version":"df55791c1b61a00582c6f893da8e0a09","impliedNodeFormat":99},{"version":"13a2ad3ec349e4d31a5059688f4f872f","impliedNodeFormat":99},{"version":"4b809a69c3a47a0ca3ac284eeac50531","impliedNodeFormat":99},{"version":"2fa82f832b61d0111d355cc65d93f709","impliedNodeFormat":99},{"version":"fccf1b869ac794d1e2ff5e2698e68d72","impliedNodeFormat":99},{"version":"7245631d84b130a1cda0f9de79e46d9a","impliedNodeFormat":99},{"version":"8dc0a3efc6e98e56a24e4b2f20d709a6","impliedNodeFormat":99},{"version":"a4857d3685478bca09c60f78d9ffae5a","impliedNodeFormat":99},{"version":"7a30a26745957cec5227a2e1643953a1","impliedNodeFormat":99},"bf76a0707ef09ca69aff8201d2044228","e7c0bee759ed180ef5ab457e66706380","90c8307ca8fa01be9264c4580252418f","a50accdcfd48afddc2a82da228535334","91806dc8ced7f542616a972111d0da02","40e008d0e62f8309e6e14e352dd856a0","fd757ba70e3fc4a3bb932b0ea4214896","b27bb780064478d0f835af8ff50070a5","ab8b0f702def092860bb19827237f55e","231152c4daeec70840510d8ebf23c348",{"version":"fd8aacfff4b09e571cfcd761f0241415","affectsGlobalScope":true,"impliedNodeFormat":1},"609b1e97b9658b378959393921f6b992",{"version":"ec6ffb4df9d2fc7ed58b7ecb5674cf5c","signature":"2cf19b7a7bd4793c752b28ec844663ff","impliedNodeFormat":1},{"version":"ac7731ce5fc89e6bfe1ec037735f01dd","impliedNodeFormat":99},"3a8c2e885cbe68309ce61b5f2640a734","54ae4541419e82bf3f7f0002e38f185e","d01fc6b8a5aebea5be8e5ddacfb77934",{"version":"712fd9e38c6b9f61cc8eb02f45393e48","affectsGlobalScope":true,"impliedNodeFormat":1},"c8e24a6f764286f01e35274ba9a75bd4","261655df8faf61fee32e7787acb11435",{"version":"cb68f977d20aa7bd8e5228714c32d483","signature":"28cfbbf44d3d6f5919ab417ec46f9262","impliedNodeFormat":1},{"version":"286c55e6fb02ca3b911e640de4ce7f8d","signature":"6dd5ab2fb29e4086ea59422ae4a09f8f","impliedNodeFormat":1},"3a458d05e7cd0f21d03f00a74561a4ec",{"version":"f6a8798fd8ae1e0e3c1d0a9e0fb8ac05","signature":"646c99e62ef57dbbdc6aaac654f3b469","impliedNodeFormat":1},"4b439f6ae9db0f094fbbbd7ed88dd317",{"version":"7a4270da44e5c72f2eb600be8a1a89c0","signature":"f3dc319118a3d116f268a1d2bcca55cd","impliedNodeFormat":1},{"version":"85f9f3379dd9d47d5e49e9d58d3f4c7d","impliedNodeFormat":99},"f0cfba4e0eaf4e0fcdb2f077afd54962",{"version":"9869208482d59ca896c24f12da548da5","signature":"29b539970b94ac1b0b79897edb664db8","impliedNodeFormat":1},{"version":"e84313a57909de1b16bd1a44b5fcae24","signature":"1017c50d4861e9e19abaaf6d95a137f5","impliedNodeFormat":1},"5ede306ffff31cfd8ab9e77b3c15410d","4abbdc4b36d17d1012245b1abd928bfe","fe89f9cb126aa3719c9f92667b715d3e","847d39f5db923887fa132d1f7504a296","da3fb97be1f44b0afbf3cb1d8e6f437a","49aa16673264f669c94eedb1d31b0d5a","735f795f891494ec0c4eba21d344c320","5bb0b955247798522ddad9e3965ea0f2","022d530868611b0c04e696e80c5a2698","b4128a913fcaab429aaf7874095d10a0","eb818ba80b0806f20accd951753e0063","b8ec147a8ff3cf7e1d7eadd7daca6210","60a0ae4443de90fafbbbac14970938c7","c45a608071f9d1c725da6a4e00aaf7a0","db516740ac7842c5ad44c9c6a657b73e","83e920beb42379d8125cbb553bc3e5a1","2bbd088de0f4bde28f134022438ce4e1","7a3636b50feb47748ae958a02d065889","9b346c202771be0d2650127568e15eab","3625964b8b997fb552bf473e0bf45ecc","5151824378f707ddfdb3e31b0bec4786",{"version":"cdbe9802ec40c9d4f5e986b85e87dc17","affectsGlobalScope":true,"impliedNodeFormat":1},"30916869d52d002ed48c8f673eefe4c1","a181dd3ad6a94e3cd07ef8e7a8388a06","025ae9c29d2aa6d9b5d67eadd88cc3a2","46e6ea5cc5762e54a3d1a52aa23e110a","96a5ff063da4e1f0f431054fffb17766","8e2fba21d8d63ebc3a4b0f9928700dfe","51f74c34d746aa710a58e636cc4c5a24","535dcee5c5361e30291098c7e3e38fb5","99f0cc62c55882fb7547e9c325ededac","ddbf7870591836849c708c79a2073610","d60ea913f9e2c2881c7c3657b4a69507","5fa141f9cf08bf696f53e7bf7d8f45b3","9f777fc9c22ebee77a10253a2546dd76","c23d2b071908a6603258fa08c6a534aa","847aa0d2fa28f221f1db7c1fca04bbeb","11f3d81eadfc03c1489ee9c9aacbf9ff","9d24f817e6ed58ee599e0520e27cf4e6","7037602ef783ec00df82217a8a79d1b4","6254499ca0163e5ab91b60e6a81b260f","a77a5ed60d916c4907ee737700a2490d","0cce2a9f40f889ff71ffab2ed84e271d","fd51f38237c3c3661ca3822a3ef97340","fb91f62e96388b86f4912dd7cd242125","61f9adec44f96a383e1e06821ac299f8","a84512249ef5ed028c42b208b70d7c53","a70ad7892ed24df5f0e33969cf44e460","6b525baff71529ac444b7ca1cb1b7322","9f43eb13f7ca8baa5bf744444aef9498","67bcbd7355f8d60d97ea3fd9aabe1a8b","947a3b474d5ddbfca8cc8d851ee01761","d6d6e688b501dd6994f7540b6734ab21","6da1fc6d05a1d067f35a55f8d87e9036","b79dc6afee3d2f6463af8ddf3ad9890e","93af9d06085891220e06fa611c06037f","f006b1dad8e940d7f9b9696fc1a275fc","d9e09ab64e804fcb9a757319dc95363f","7114f59ebe1654ccf7e7e2d3d911cad0","239e8d976a7c3081210b89737d08925b","ca22ba919ebb62981bb24bb3361693d8","9c09b177bab9858ca5f4610052a660a8","57c4da54d9a858b805f223c316e24ac7","e6676caa99d526156d1e0915ad09f55b","890e293ce1585cb3108144f20d02c28e","a7bd65e9fdb9b5a15ea9945a6b16f13c","1d07d8f0799d555d71aa899f39dbe3bf","9acb408f6fa80996d796f832a44682c6","89edf7fa91278b0286851d92a63720ef","f6b526acce79c1e84a93082e8190dded",{"version":"132a4e0577c1704f3ab675657893c78a","signature":"35002cd8142a9a50ebc97a1eed2f5f6b","impliedNodeFormat":1},"3d8e3fee9f9cc18bd15427f35d06d28c",{"version":"70e229000bd6782308bf7d5e0747fe01","signature":"ad7ee22f3e5f518f71a5e814357d51c1","impliedNodeFormat":1},"afd4aff079724e2c03007b641f40c761","3ea7c54adc63f2dd93601056738fad50","c41dfa992327d5d9ac91f5ba67140a9f","bc40746db9f4f7844c2c87b3f766c2c2","057dd0248541710a8c55273d076f5ea8","c69df9466cdbac67af017c84c2535476",{"version":"76932602640307ead380510045ba7f35","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ceb19bd0d7cfb1da1f37fdba7e09bf98","affectsGlobalScope":true,"impliedNodeFormat":99},"55df8bc3066b56c0d7293a43c4545f5e",{"version":"04c9a667fb06ae13485a7978c0302fc0","impliedNodeFormat":99},{"version":"a27fbb3bf84044b0c96d65e1e2e5bb69","impliedNodeFormat":99},"33204c396ca6aa77e179002e0b9c3c6b",{"version":"7c872349a7fb4ea61fe784eb1c6e054d","impliedNodeFormat":99},{"version":"7b16b7e305ab97a5e892705fca9165a8","impliedNodeFormat":99},{"version":"0b92e0aa0ab2960da2fcc08e6fcd240e","impliedNodeFormat":99},"0a81b11a6799a6b40ff8976b2c32f38c","9d322696f3e07876e8f1404a75ae46a1",{"version":"b5b0e3fed8d44782dc24d1bd31e928e3","impliedNodeFormat":99},"05f2b6fca994df0d1373d66b639b8d4b",{"version":"5a990245d2750113d4d871ee66c6ba0b","impliedNodeFormat":99},"d7adfb1c7f4bbcb234602a21c52bd6b7","09d27688c20cbf31382d7447ecc49c82","39bb92902f199e657f49bcf11b32fe9a","dea45407972e7f41f6bd06f8b92b3324","834583bae1892a40f72716160db5daae","dfe20b349f2df365b0fb94ea6c79b443","15fdaa84cf74c82106a63a3962aa2a16","f0881cab76f756c87502b7e8b90f5503","19758438b6a06b1546a4ded9bf2961bc","fbe46023ca17973e0f95a6e579ac2b6e","76b50e28e2dc070f0b822e675f8bf7f6","e77c0820a8d3d488a24342ec51c071b3","3ebb1ef73381e4dacf7bf4ce664d6e36","706da6ee784673f4c96cf012093e71c6","c01f149ef8bfc24454f90aeceac12596","6611258d8dc9df87f7890744552e665e","c7dcc8c463c416c2d74dba0323996f04","0dbefa6ba21664ddbc3634b5e4542346","d819f86b5b9c6c7fadba013eae2a7b46","a46578ffbde6b6486fedec34c26fe9c6","8d03f1861460399fc45e0de1614d12ed","76d3f86287227ca3302a50c033bab637","dea8cb53214dae3e983fd0327d305e29","05de8a5fc3e2cddaa635a1c83d044368","286a6a46b7450c3bdf75ae7f0b3295e4","a3e4940c74b4a5534b77d15e6b707517","e146b062ed5f290135ef06ac51bf610e","f3b36f1e9bd8b3db0aaa6f082b181d7d","1afb7f77751f9c75c9e9870759e18bbf","ff9cc0327c28d75d2ca4b4908bc6e0ff","6b833dbba722f74dbb88b7fedf098141","23d77573157d960e4bce4a0bd86bd0bf","96a5466ac21e3496cd70860850f5e506","283db4cf645b118287d7ba288781615b","dd7fd58745df2c95a28f2de4ce202d11","071afb585c220084119cf22c44b31c95","af90b39e0a99717ff98b6c3b4267483d","127e3ddd104f2fb08ec0f4f3fbe5d04a","6bd4744107a637e347cf0851ea54fbf1","c4cb4871636336661187793101f25fd5","647557c47ac82ee84d4f5067f603a975","3c8f1d756b7066f1bff6a47ca7426984","22010dac44be61147a8740ee17660501","43c52643bc38590f597d56db0aec5004","34752b5e6fdbd5d8109c604817958cf3","4d843168eff54a737b432696944ede12","f8568d28b0664220be5f88c4f06359f0","f1703f2a5baa6f4d61c23685b26c4650","bddf70e90114741ab1608b9c55a84496","28e2eb449a78340794f59565893b0dbd","b461d51da2329daa987dc025cc0bf869","4c0d4fad5a4db3c16233ce174e04fa2d","d4c3037fd40288b5ad3a411c4c941765","8d30e98efc37c20307e9a3a173983b21","fb79a3092a2a131f40d7356db92e14d7","aea29dbb8c21fd37e7de6442a5925bd8","d79decbb3afc46384480e8d0f3afdd15","bf7c22e45695d8d37edaa043bbd30598","3a722c8cbc80fcf8316e67fe8e57c1f0","37bc954aea7f89fde917cc649d0cc603","cf209de516a8ff30ac331b6d88f89e2d","c040493d4f4abb2e912736b9efcccb47","c411a15af3e3b1df9aad1d39200ba063","84bd34e077628bd28d4f0f484385a1ef","4e675c831128d1a0a04b5795388475b0","4a56d1734fc44c9da224c4f982e2fc56","8bc3b58ba936689b21b89c005b503be0","7bb405662d4ba0043ccc7bd25476e9d0","72dce66afd0e123f3e04b86e23024dbd","12e627c8831e969dbca900c42e2e67fe","2a86207f95a13de714ccceee0440e32a","0d346b53c6535411ef90cc589d352b9e","d3dba2a605e572b19c51bcb13c147088","ed9ca0b540551b16b2d977a112be903b","95df518e42d3d2429adc7c7adb4ab362","5043a34226bbc076879aec9d1b28ade1","a9a20f5414c94100861cf80679466ed6","4b1058e782cf290efe6ababe532c2e9b","045b2973af51fe3446d99f838cfa815d","2b8b3d58db1532ddf9a964b295097f77","f26b9d6d0cf306f0f5e3282eb4784c5f","d9ec30524dd42ae95c01ad9a848afd76","c27f15973572b9a02e600109d6d5cb9e","1a6a07953f9faad91ff2c0b49278287c","3dbb4f7f8a0791867a3c0fabea7f070a","bbd111a9c344b692fb8d9ece0af8a875","b1d4fe7dc747ad1116131e10bffa6a78","06daa3602c9b018232b04e1cbaf2a658","17b3c6109ad721113d4c267ea4cbbc93","20ee10ff645c052c7ad1c2c3bde5893b","8e0551430310683bc3b44412ec770394","4efac12997465fb0fe3c27f2fbea7691","b4574f93988e9077ce41997f83680d81","9c3dcaede85973fa214824738e1ce9d7","e0d0f35e261791e69fd4e32f1af4f9a5","459c11c925d1f8a51c3437707b663c85","fb2d8a1a3cb1045f52624b1ac62a8f31","5e006ca2bf0cea3f67e7095c080c6607","ceedd67eb7ca5ea472f1a8939df72a8a","687711e7c8dd8158e239f4cd87d2f8e3","7f83d598210c22d60c41bdfd5bcad632","964659dc6523fba74c15bb33ce9db59a","8ff0e1494bb27a7a981c79a717e8e011","cc7d37c3f602825d9a34b8ce9b92752f","6d958447d2a03a947c9720fea1dd5bf5","2832e85830b8b772822161d14cc56a17","f0d0b08eb87e0e38eac7f37395ee5708","cb8dbd8f688623a6aaa3da390e2d7770","b4412df4d7852f4d1f6771f21765cb07","8a3493ceaeb4330665b41ac562013786","282322cd20cc035b27f26eabfd128a6f","f15e5220dded0e9176116c9df9e033c6","12a950039fed9ed9ab552b6324ce4e6b","dbaaa8e8e72a43a2f1d1415f9bd8d254","2721d130895663f458fbfc0c421ad9ec","5a98f08bc74c943852564c2e2ba601dc","eff9eabbf22b5b94a1f22665ffcf678a","2ac3d437c2371d2ac0ab01e7e4f33671","c9837ce5f1e7a4b11159c4fb842db480","c847e88a286a558587b49dcea75db180","09eb9f6bd5b33b1fbb1ddb5c9498d556","f6f8da5764374e4596f21528c973a8ac","b9a7da96a416e322d48de0e6f4b6d9f6","1bd2211e666d43e145b92c04dfd9e8a6","d6d0fa90513eec079efe4e36233a0881","19bf250176c24391b12a2798f0a52000","8c06916c3733a124770a8880ec560352","71f7493611389c00c5f5c98aa17078d2","8d3d4702a0cc2155d3d25bc25c2bd11a","4f51fa22d886c21d86326ba98adb06a6","dce0dfaf21a25649f8e33a7a4d07b94c","ff35d0a17f4eeed40bf9693e554b0f72","73525db09e64c0f3b8bcbb6d9ea15e49","7b0ea94a4fcea0ea0f3831072edd3901","53d40984b3be3278f0071e5365c2a372","490b84a70068ce6f57cde568e3f13dee","2580ca36f292b4cf43d5651149e227ae","5b87111ace7dfa205427efc69f639efb","7485173648c603b4cbc072c19b2aa6ab","9f4992b8af84202f0b3fcddeb370a419","33069d3ad738ec76e495c36756b2ddea","415cc35c3a32612b69581f159925ba4b","d2bc91129368ab1e54666896685096ed","94fa3202ac213c3c322cb28c61b7251d","6615f0604715c67514cb92d14aea0f41","803bfcecb5cd6c321275318b8b8b7460","28714d82c844f5879baad253763d229b","298cfaff2f95d3a69186027d59058d1c","860404ebabea7f9de5fc9b102e02a63c","57c470e4ffac67e37e0cd903f872f220","318f19d9d58eacf70983a9b933aad00a","fd2fc61e9a2378036cf9326bc4f70524","8d516216dc61c894c1d95fd91ec0842f","bc1c63e388c29f4d5873815ff7e06c58","1d16ebe021236c098a1509152477de30","9dbce5c507e02f18ed1b6df42e103891","772bcc987abf20c033e77ff433ccb623","7112281e7dd8481ea5a57d819e346742","55115607a2c5ae1cc5de2a8c40b28e9d","f9c139f9604394f692b62f9aa1ed40c3","c6c89d2a509ab69ff5e63259e2109327","ae82f0626c1a92fc7e028621df0f8bfa","02f4791b5786df7c8173d0bb6f0ebf2b","8819175d8ac2b78f4106c644e0aae526","895f1e7d383dbb97eb93d5d5f4456c78","bd12c41031517b3bdeb0d6b6dc0a6597","b40a0e2cefe4831cb73dcf87ad75cf60","3bd9bf2a78ddbf547fdcb04663b5ec1d","16f8699c72a15ab090cffa8e7cd5a0a9","ceb4649465a5ebe83cc48bc1d20d8783","64e4f61e2be0375db46d278b715303d8","417346dd2ff866c200b38e353bd8f79a","3a120c41de86f6f6c6270e4201a7a2c7","77143ac0cc88df10debc91a04de30795","2988882803ae8e5ec2f19da51165f56b","6520e3562d96730f49f2178c2a8000be","0ad62e33726cb001b6cddae8fe9cfb9f","44805e89290b39106cc0064c75c0c1f1","4da6779df4ce39feedd5db407154883c","65fb30caa1bb9c3ddc201181da128ad7","9b3c44919a5f44acd9e3606875555947","2b9beeb5403d8eb2cf1de35b2b4492c7","c4be86303dbce217e44643d6aaa88df2","77b1b9ef481fd361a22d2565f31de5dc","41b7416b405b1656deaea4477e590685","670cb102e909b9f06f101bfbed6884ce","e57502733124795238456c7287e9cf11","2b4daf69e39dbb2232d74b104f4eb22c","3352531bcc886fb6d838cfa05c6e7b01","e106e9efd902480814f922f2086745cb","e80c73f493efd55d066a8dc1a1792044","6f5cc45dae13a7c6efb20bfc26e9da27","5db0c58d4eb00e8369da6231f41b6937","970af09da24517aae03bebfc684c6522","c3c91d0c2557072e6d1c4cde2cec9648","d8d11e27a0eb37174923a5d5dc1cdf0c","a094d8d1a4f3c0e78dcf566b8358730e","90f779593d429ce89603ab5f74f23c71","c1f25a071a8d7e3e586b43ed35402c5f","75cf9501bb837a0a14c299c1d3033696","16ca5939d131ce9fa180c0212a4c53e4","f00ac367ac508409832d909056a75011","bec2130fcf3b996e4a04ef9c090091d7","f53dc34b20bd8d880fbd82cbc37f233d","c78cfd22b584be8d17579d24ac416bfb","6405e20c2a03cb65e47804fe7267bf01","492196709c845b12f36ae745ebd0357d","980fe33d8313ea26b0a6abc68ea737c5","82b085e3998086ef91cda43c459aba33","09e6ae0bf828d97d47faddabbfb3519a","1f5100a8536cb9793e65d77c5a00337e","2ae778e870052a21a0413273587e4a93","d01758ad56a7e4b78b779f42df6b664b","2422182a79c04b4db6cc71df07727eaa","634121d61a54b532c33d2c1795e15c98","e0b7aeda9d5be2e186bad3ddd8979179","61975eaa25c98124df28de725b5f8a34","9f9629c9f82a85d9be916d8bcf356d54","0b00b527d84b426d51d46f5b67cee613","ebf6cbd4e5deb04b5a53200f7ac2e16f","4eca0ddf426933eadb127fd504ca92a9","0ccbb753e8df3caa3162e87ff756a2a2","311a24e2d13d55f6e54a9d2afffc9929","ca8641a18568b8017e7f2edcffd21aa2","98ff95892e849b2ee64d85dde9352bd9","b03921e201743860dc1758bd6f88026c","462a3c5d70269be3053261c80eb2ae24","9602331a621221c0a62ca825c1c0a7dd","e7eda23f638b8765439b055f0ffff824","b3bc0bd3be6b8f3081ac62623ef1fc6d","29f33a3bad1f2f46fcb07bf6d4178868","99ea0e9cf8257755e4939270b3fcdee1","644cfe9a416be8bfdc180a5ea9db0a58","2b3735b191e4d56840278c66a9534a7f","0b3b52e2c490aacc1bfca0d5f1f48bef","bd885a9c65eac1645a33dd410c56bc63","7f151ef43411f6f4ca587501c3452fc5","d1b5efe678a42cc81e4a7b15c12f5cfc","dfffdf0a2ef4fc844eb55742a5d16b8b","05276e72a408ca0139f57541e69606c1","05927913282056822b4eb66ac686a002","41fd2ce3b2674c95d71eced90afe2db3","c590d0098f8888e51d2d2c24a6fdf8fb","cbce2de92d621df9025c4074a5acbfcc","8ea5188d29f9f36d6e293919114c66af","e5dfd26f8189c4057fc1c209e305a11d","414234666931a21fc0832903f28e169b","b59cebe75f8438d79a792052aa2ea863","22348b19a948d370021c7b68ee08df72","fb84b0e51ded6c3f0da4891035888b4c","72ddb83172f3c68311f508b395b9b142","c6bf4c04d7ebd819fd4e9846877c1c08","cb264fd74a8901ae9868440400efab1b","181550bebdf6e1963b79a69e8bbd8ea5","fd5caced4442bfe95b83388c5a0b6013","febd794c8915e1e89393b4fce5baf090","415e119b48e03768bcc1ddd7c3e30124","fca1276710f971ea6b3e1b1e1d83ced8",{"version":"00d0a457be595470f50298403cdb214b","impliedNodeFormat":99},"9a4e9bfa020617d19d6ec7b46711d9d2","5714411e3f1ab81f27fe6597a3ebfcc4",{"version":"005de456b013bb2de73c926e1eb59cb5","impliedNodeFormat":99},{"version":"db91602fbaf4940cab52e43ceeb5dbb4","impliedNodeFormat":99},{"version":"17912b47173a6ed5afc4f8c95745fe62","impliedNodeFormat":99},{"version":"c2269ef63dc210672d4d22aa8e484182","impliedNodeFormat":99},{"version":"95585affc2946c597c9eda3ccddf917e","impliedNodeFormat":99},{"version":"e5ef846a94d0bb2065471f85416dbb5f","impliedNodeFormat":99},{"version":"ad1a1a205a8a70604a9f08d611de79b9","impliedNodeFormat":99},{"version":"99fa261602f053ff9268622e81fdfef0","impliedNodeFormat":99},{"version":"3b902c080fd5534ff0e9fc71574a2a44","impliedNodeFormat":99},{"version":"0feadca75b1db6079c258d0ccfca7040","impliedNodeFormat":99},{"version":"16e7e00154a2d2e47e5b63cd03e18f9f","impliedNodeFormat":99},{"version":"52e88f664b4297791b4937331af5bac3","impliedNodeFormat":99},{"version":"40d8b819008aa34ac08f57f40dd9ff6e","impliedNodeFormat":99},{"version":"cdf40cf3a9c146b026a05d26ed99b4f9","impliedNodeFormat":99},{"version":"385bb765966603070a553f02550210df","impliedNodeFormat":99},{"version":"707fd9becaa9bccb9633570b9546bb4c","impliedNodeFormat":99},{"version":"681948e6acadfee569deef851d8c4536","impliedNodeFormat":99},{"version":"86b3d51721267eb3c508442ac261a56c","impliedNodeFormat":99},{"version":"51a00240cb44e903ebb5caa871f8ab58","impliedNodeFormat":99},{"version":"4a7d05a11f8ef5fe0ea9b808bc0110a8","impliedNodeFormat":99},{"version":"7f06357a37ddee37e80a3cd865a2d639","impliedNodeFormat":99},{"version":"70e05d7b838ee443dc96f3ec171bc20a","impliedNodeFormat":99},{"version":"cf77dcecb3413add15526468d2b59842","impliedNodeFormat":99},{"version":"c686e722d900ed3148c28965423fd2d1","impliedNodeFormat":99},{"version":"9cfad2a2d30ae26b0cc681c8120e56d8","impliedNodeFormat":99},{"version":"72cce206be37a99f7e02f637d87b1964","impliedNodeFormat":99},{"version":"01f248ec69deb6fe34102b88175c8d1b","impliedNodeFormat":99},{"version":"53054e137dbe1fc87d55cd6a06b8cc10","impliedNodeFormat":99},{"version":"24b6e053e1927547db93c03e45e99e64","impliedNodeFormat":99},{"version":"b8849f4f0b0d50df7217ace7576ed8d2","impliedNodeFormat":99},{"version":"281bdf01ea0a6bd2a362ec25c30348ee","impliedNodeFormat":99},{"version":"9da79192c968be17f550336bc0a50bae","impliedNodeFormat":99},{"version":"5ba961d84e855adc92183948191a0d1b","impliedNodeFormat":99},{"version":"43415440e4ccf1bc04cf40b09366af7e","impliedNodeFormat":99},{"version":"14c8f667bfd09ddb391f039169b92628","impliedNodeFormat":99},{"version":"9340b8f5a2adf464855333f8a8277eab","impliedNodeFormat":99},"298a048c27a88a7552574a6c378f2e54","d07f309c16a8e456ef917a8e0de77e22",{"version":"5ba7d4bd2bbf10cef1c0ead4aa019bf9","impliedNodeFormat":99},"c4f23d780e853f286800a9acbeec7b38","8abc5cbb57ae3a68bcdb914e2e4d4977","b7af1f9e9c3bdbf766b0161c98ffbfe4","4c9294514d491cf844c31126b7d9daf1","9b7df5d9fe9ab76d09b425be71cf0902",{"version":"ce21850b8ed5b7c802538d3e03db388b","impliedNodeFormat":99},{"version":"aa2011d6cf452532a7e5fea28f31ed69","impliedNodeFormat":99},{"version":"27e420dd0deb34446175a2798b5af56a","impliedNodeFormat":99},"b4ae344433986a48472169e22e788f14",{"version":"b1e288676e44c3d9747a0440fd4ccf39","impliedNodeFormat":99},"86e4277a5a371262d15294302b43665f",{"version":"bc90bdbaef298c676380acd82b0d2f6f","impliedNodeFormat":99},"17c29a4d215c2ffd8095ca0156f9015e",{"version":"5cc1bae6605590c1b386b3f488f25cf3","impliedNodeFormat":99},"54c3795b8aaebcaca235f39f2c58e8f7","41b7cfe334457127b2b03c845f26922b","1f87611fd9d17851b87d0f5f5185abd5","8324418019a7f1da7ef032e7d17baa83","bb9e7f76baad11a1ff897b82a875048e","6fb3d95726c5ef9bba10aead02269017","94a8ee24ec622d84f393cec48dc4fd7d","6ca76e538391700237075a4735ecd744","131a14bd52fc255b017e6fde8cb5a197","e18f34e659a168afb33b471dc40c5641","2338d3d1a2c1c42a7f22736f8f44d7a2","93bf3cae95092c820d7e827b790488fd","ffcd3ac38c1692a1898c0546dca37f4f","66fa0ee995bb171237ad0e697c570702","842fbe4444de202cde6dc29e654e855e","72c11602a341cf3cb73ba0490f263520","62a3f0c86dfc6f7016a7c665fae4eafb","bea7500000cd133dd3e031c5256a3346","a3eb82210ba1ed3e7d46dee905a08c0c","922609198d2f7e87da0be488b4fbd174","8389f10589d1516dadf1965f1fe5f84d","47b802f670151da9b03ae43335e23b7e","90cb0856ab064667f1cf1f19295ea77b","edb44dd2ad283aedc84ba4d067974752","9b1cca1242ccd5b1e53c8d395c29245c","a2376d62bca194361ab9574d347491c1","ad65ee9144c7c31e0b01175fa5585c72","e894d00dbe0a73233929ff203174873a","dfd58076896a63d798bb31402cb73f24","339b04a61e6176d6d775f0d86ef4c860","00acf40a4260e74478546dcef7be6834","7af745241871abe12c62150466ca77fe",{"version":"1cc76819f298a873e29e2562c3f4a838","impliedNodeFormat":99},"cdaf43d9b2e5f83ee6266137fa7f38d4","03282f2d2745b624e1766d2b1c61de93","2fd097b6963abafdec38a2f86cc4a62f",{"version":"2cbc3bf96a870ec6019eb7ea56ad8ed0","impliedNodeFormat":99},"3432a0fd5efc3455417d8c8e05d5b247",{"version":"567a88abfd1a1d3a07d70ed80a4942f1","impliedNodeFormat":99},{"version":"eeb197a689c094e8a4f6a50467d1dc16","impliedNodeFormat":99},"15107870f56baf59890a1640803ea465","5c865a0253ab1d12ad5f5ab0f4003c4f",{"version":"445dd3208964fa49c7ba5753659991a2","impliedNodeFormat":99},"eed2e2f0ecadfccd86d43af40588ebc2",{"version":"22a62d89fd5b97bde52db27941d689b7","impliedNodeFormat":99},"1c17e30cfabae89b7f81526b751eecc8","8c8a642e601ec29fd41b61c4155cbc38","bbe8cf6a92c8b91832f024a3060706c5","f2e21b2c6ae9fa9e1381b1c16382280f","0e10dfbc22eae9a599e158bea0c32262","dfa3f5de4e59ae3c7a586927adc48d9a","e1be9bc2ff10827da0b20f72cb09b7f1","8709f241800e1608f43fe4926be37d11","186c74e4e4da539ff5a928ce50d3620e","930b385f513658398efcef23554dff71","88b3d7e800f6ded7073ef9145cf48317","953657ad67afaa231a6bbc353675a1c2","6e19a481f35422876c877ff280a86f80","22fe921c3f57478b21171d5cdf332283","159f6c9b65919f5740b1b33ec99efaa9","b8fe8a15eca48fcd5e5938abeeb586b2","8028a9f12b111602d5d401b4a2ed5c45","4ef78e2d01565c2fd053639c5de4b6d2","1ddb9bbcaeb41731ecb8bbfb5de76a9f","183abe096fe94f4d6c093d3000f1aad6","8864287453dd25a49288749a5b0688de",{"version":"b6bd7e23d7a4b324b0745ecac0b52433","impliedNodeFormat":99},"1e47a9eb7cf87dd5f69c9ef263e68d1d",{"version":"a701a855e117a8431822f859e8f2ed42","impliedNodeFormat":99},"33fa3d091e814e520422318df5ecd616",{"version":"b41038787fc2eaa924fedb20a36eca4b","impliedNodeFormat":99},"07d8544fadd6b9d3debfae1a26a29202",{"version":"ebba461e124b611c596648c78b29c16a","impliedNodeFormat":99},"becc1afe7056e159d07b0ff258b723af","263547c0f3962de4dfefbdb38073b38b","dfe5cba7ad62c08aa847b0b1a32c2d47","f42cf6badc5c0fd5f337762d9bef3f91","53c468c912b91cca24eecf6373c915ae",{"version":"d80864320f9dc918570820174b6f70d5","impliedNodeFormat":99},"a2026bf26d30f5f49e5571a60ee3f625",{"version":"4d49296db4927e4f22cbf6f892415d6d","impliedNodeFormat":99},"2bbaa7e719dd283a04d3c4212bb87861","522041aedd27f049cbba975f67f1134d",{"version":"827193ea6b94cff7d093d864d4738aea","impliedNodeFormat":99},"5671ea2e465d4a5b082aeac4328447cf","b2af6f4b87ce49f849f924338d99630f",{"version":"035cb2c818a43ff72ca54fde184b718d","impliedNodeFormat":99},{"version":"9defc359b0f95fd95a5d3920ad6ee897","impliedNodeFormat":99},"a348009db438d0ff425a80f636c87b46","1518c0e625325ca3e3e952ee3e8e4568","762b8985567fab8758ae467af041e23a",{"version":"d0bbeadf521d484ae7ae0bc75c7d6c14","impliedNodeFormat":99},{"version":"4a34aac19796f40f102183899589be84","impliedNodeFormat":99},{"version":"46811a806f8d383aa55aa84b40e3e4fb","impliedNodeFormat":99},{"version":"047ed03c58d125d7131205a40e043441","impliedNodeFormat":99},{"version":"6bc26469f8c97a3606d70470d3baa18e","impliedNodeFormat":99},{"version":"760610acce1106fb28406eae4db8d546","impliedNodeFormat":99},{"version":"26cb329741c1055e0c26ab2215151b88","impliedNodeFormat":99},{"version":"abe007be89c2ad52c4d67fc2b0f6da6b","impliedNodeFormat":99},{"version":"cc38d96878e8357710c638afd9dd398f","impliedNodeFormat":99},{"version":"b5e86ccfbfb5da05a3eef952d3c8f7c5","impliedNodeFormat":99},{"version":"5202abb5d92223508d6afd4a3965e124","impliedNodeFormat":99},{"version":"792aef110c5fa168e9c0703afef83018","impliedNodeFormat":99},{"version":"12ef69651d34bd52b62cd73a2998b589","impliedNodeFormat":99},{"version":"1a9653e316ebea89b22f62552edbac0c","impliedNodeFormat":99},{"version":"5fd84cb7055cb580f7698d4a32062548","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"913b52a39743d1c11984e4e124b1f3a8","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"3e57a4cd3267159f3772bebd73534451","affectsGlobalScope":true,"impliedNodeFormat":1},"fe51d7a9bcdbcce1e65bbcf39b212298",{"version":"60edda1b5f28f8e7d7a6fae700faef3c","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ecdcb80604ca736ed275e4330a3acd50","affectsGlobalScope":true,"impliedNodeFormat":1},"628b774b54637325e286752c79c12432","bb1f9e3091b88e9d0e93b7198c736af3","514fd35e5eb35bb2e5cbb908af0a0aa2","ed57ae88565308729f2327f26d684976","dcd932d6b0038f2e250e30dc10125b22","9508c917bd7e458745e222a82dd24ef0","fabf86f455f96b90538cc26320ab2765","14550b4cd9f433e0addd8b6d67614d23","cf0ac6aebc25cb780674653aaeee688e","35fef7bac8048f583e4ce6eaa0c2a4c0","6752dc653fc7a333027249fd851fdb62","b9ad7e689b46dfba362c1bf174e69018","8b0a2930dfabdf27c69c6bb1eeabcdc8","4513b1ed15523d247040689f37fa9db2","5c0c499eed773a750903d9497beafacd","2377da227d1bac82ff7b3f2081ddf8d3","beef985b474fefeb80d27fb2c8778371","c79fc9d9f09ae598a374ae7c0b5284a4","f2caa3cebb1e6be855519004830a6be0","8ebc9f2a77c900e710801214c5cb994c","ec617a0e0577dd6a3210c3b067ecb325","1db5d06e485bd82d6d5f6e36925a8714","24b864518967840216c779b5e5f00975","8719cd8047700bfb6046798390053823","f2840afb502c94db92dab0fb8d27812f","a7e7d08b372210c203745d3eac61a411","531183cc80535e0e94226d720e5eb038","f627eb958ca52c85e42f04dce4661f86","9a43fc665bce9012a3d5fe1b574ff4dc","13f4b4da6546a34719fd6bde15fb63dd","a589216508844bfc00e62fc2d97fda45","865aea1c3209e31b076cb6fe780e769e","12e64aaf26af0f5c8f1b263dd66e3feb","928971ebbcdf5b093ef37669b33bddf6","b744265d8ad12b7d4d5c5dc35d18d44e","eff32168b8348b822afeed9cbf61afa7","9aafd1f29b4d8861c1c6c34bf83c0721",{"version":"814527021f6afe953fcb36ef7f2a0af7","affectsGlobalScope":true,"impliedNodeFormat":1},"f6fcdc4f3f8b43b4eda0d95b17b65f7d","7deced3ef46e082f97d49bb71622526a","f8c976cb12f3420b8cc8d03d579ada06",{"version":"38ac64ffbf3c3d55b209904202bb5296","affectsGlobalScope":true,"impliedNodeFormat":1},"cbae34574fe31d4a5ef3adee146fb6f5","2066e32c917596ee32bf42917ab050c9",{"version":"9fc8636e70e507ea8d98a7aabd265ee5","affectsGlobalScope":true,"impliedNodeFormat":1},"b2b472cd0bf0f8d5f022e00ca1c401f4",{"version":"a1bbb60dddfdb6ab1692bcbdb652cfb6","affectsGlobalScope":true,"impliedNodeFormat":1},"71d31d905c438c7a784cf53076c31bfb","368083bf07350d0955aaf442403bae9e","e87ecaa89ba60f1afc89dc6cdbf88949","5c5c7649711b5d982cf39fe9b6744080","958d9865bfe33c94973e3d58ac66b1d0",{"version":"cb0b77b9a8e6edb694cd6c637486ffef","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f475d178fd9409f5f49a7dec2cf0834e","affectsGlobalScope":true,"impliedNodeFormat":1},"051d8553fb6c914c591a6674e3e3b8ad","458392a6ea151d7404585cb9ec7a33cf","90b979cc7f116b66956ec73d3f4d2687","6e4dca32cc65698c0a9637bf3217f848","a92b87ae39326c5d9ea9dff140121610","db7a5833bb46490b0087145f8a716bec",{"version":"de03e4eee2ad023d78cd8dbbb4e00085","affectsGlobalScope":true,"impliedNodeFormat":1},"8183c2dd99937f13a8c57c1270390d32","2500b39777a662899066e61fcf737a52","bdbbfddd2833453519a4c6864652469e",{"version":"536c2a5e6ccf45220da85ad4992f9cd5","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d7f83f5e4587064452ba79173eeb307b","affectsGlobalScope":true,"impliedNodeFormat":1},"d1dfd59bf8b7e71f40ee1d3a2f1b5fcf","9292aa21e6668349e0642faa07be7750","8ccb81bc00ea59aa908d31dbe50bb31a","dd0c03e63afe38f86d61b2d54a9ad760","0548d84bf13d6b5d3ef34d9755610be1","e9adf16c2cd7aa8e5e0117603a04c226","83f890f3d9ec2bb1476d57761b8e97fd","efe14f23bf33236571a4d0d5177e48d8","c8206d568b54e5ea06131963eecd576a","141101b35aa85ab5ae3d1836f602d9c2",{"version":"2ed70491374f27b7d4ff5db624057a07","affectsGlobalScope":true,"impliedNodeFormat":1},"c2e6363d164e809228f71291dcc83add","d64f5ee437e1d638acaadedd71d7525a",{"version":"ea001113f32054398156e39095350f0a","affectsGlobalScope":true,"impliedNodeFormat":1},"7345aabef559e464447357f201cc05f8","3dadc65964b2cdb7268e6ded36f2bfa7","d63b35c1a5097295f0659f5583c8fb83","3509aa3de97926c2922f378a248ddb48",{"version":"e6099c385b8384a91dc4f1e601769a6f","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2479ac25f87afa19e92f80accccd08f3","affectsGlobalScope":true,"impliedNodeFormat":1},"96607501f53964d0b5b18d4fbe34aee0","f277d9147e1f990364890d327fecb724","eb4ea93209a96f6f1a9c85b8d43816fb",{"version":"7f9824da17f78c6191556208c98102fb","affectsGlobalScope":true,"impliedNodeFormat":1},"68f890176ef501f8442469acfedc0414","a7106559a4309e79d396f27199eda706","5d671957ec914f30eff949de0a89bb8d",{"version":"bd9754f38a611c76aba59ded4330be6b","affectsGlobalScope":true,"impliedNodeFormat":1},"ec8179256edf276707d3fc2d546c08a5",{"version":"3e9947c80f076a191d01091547b58b23","impliedNodeFormat":99},{"version":"9a46e873ee3113eb1ec9417022c2ec56","affectsGlobalScope":true,"impliedNodeFormat":1},"07e14c037c571c6a65227f6028ba71bb","e0d71344e08090d242ddbb62202bf525","cb388ab2b69f225dfc1713f375cdf700","bd1ac570ac6462dd37f134886d47b59e","05d39561dc324d83b21f1f75257bb14a","e45043f374eb5ed478726d5a2b57e00e","c3c8b27013c9eef710cf3b4651ed5d30","e9ace6a4040eca965b9bfb930f846e1e","68694a8f369c36362861a107d633314f","dcbfb791583f55a7052a66993c6a768c","5561f39c7d4c83b7753fc2aec55dceba","37c6157c8da787727a0d91c04d6417ca","da942b7f92675632be38fbe393c25eec","935192a885a2c1300f35de0c84fcb04d","2e97d8eb4916aec3abb69b0604c31832","3c8aaa3d1e0d528b17aff81f65d91879","38d9bd5d6de46b1c4960bbe6e7059d78","2c57a35029458c772083ca627c5963bc","8e2e72ac1d5bd18528c0fc7d3665c5f1",{"version":"8ddb259287bbefd133968a222c647fa6","impliedNodeFormat":99},{"version":"175d1ce79fb7bcebcf51d8bed373276f","impliedNodeFormat":99},"d929083a600293ef8150310a8f1a77f9",{"version":"f15b5919b156648b63436c7d8ecb2538","impliedNodeFormat":99},{"version":"9b5e69335ff2cf80807033fd392e4c7d","impliedNodeFormat":99},{"version":"26a3d121f808c6f534eb02a2d279b2f4","impliedNodeFormat":99},{"version":"c81bdeef55f96b766eb4245de4c1f29c","impliedNodeFormat":99},{"version":"24397a42c173c121ab8439d16b8343bb","impliedNodeFormat":99},{"version":"0e2c28ead35d0b37adaeb4cbc4fe2064","impliedNodeFormat":99},{"version":"c9d0dd2db6985b312e032dce78717773","impliedNodeFormat":99},{"version":"d9bdc34e679178d44735429fea18e1d9","impliedNodeFormat":99},{"version":"2f0406ad94423951fc42ea6e06bfd47e","impliedNodeFormat":99},{"version":"0c310a2096044c3fce341df30cf3c540","impliedNodeFormat":99},{"version":"cb1f460814f21fbb5919e12e575a7704","impliedNodeFormat":99},{"version":"8b1f1f76637614136d1051671cd8cc40","impliedNodeFormat":99},{"version":"c11c3c5ed5f180417ff68ee210aec72f","impliedNodeFormat":99},{"version":"3b1ef372b126bca6be4228bbb9b6e029","impliedNodeFormat":99},"548472bfd4ebe2f1c8f494b960a27836",{"version":"fa98b0905a86da0a95fa8fd3e974e038","impliedNodeFormat":99},{"version":"5ede871fecbb2b6f672a99d3c3c6bee7","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"d9afb74d21f3b9a9e7d789fb6c3c9d3b","impliedNodeFormat":99},{"version":"bd01f3bcdc72c9256e5cd5093d132df3","impliedNodeFormat":99},{"version":"8ca3617f0328577c543038653e018a96","impliedNodeFormat":99},{"version":"4084703c50878314396922cc751c0b6d","impliedNodeFormat":99},{"version":"358b875332bbefee5f6496a429432f8a","impliedNodeFormat":99},{"version":"3e72aec4169c1786c0b3126495b63d20","impliedNodeFormat":99},{"version":"b180eae4387ab8fcc2f95e9eceab01a6","impliedNodeFormat":99},{"version":"9376086656968fc5a21cc2e5d6f3e241","impliedNodeFormat":99},{"version":"6f959b65cd0d5754c6a611c28e18fb2b","impliedNodeFormat":99},{"version":"4e1cd3b4494144f269c17afe74d36f8a","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"00af79716f8b6eab6d5741d9604aec99","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a9d7fb1eca38174fbecb24b914ebce4c","impliedNodeFormat":99},{"version":"ca2ed698836bbc9a5dc3204e83b21d7c","impliedNodeFormat":99},{"version":"a3104fc604e3c1c25d9568a60dfccef5","impliedNodeFormat":99},"8d8a98bf45979ce5401d9ca4027940cd","7d98e95d38525423bbe0f05e0a508a41","96920299d013de56061cbc74a1d658b2","439adabdf29be1212ec7acc292679f21","3eb46d20ed056dcbfa5e75bad9014661",{"version":"77d206d4ba13f8f632271d29d3d31338","impliedNodeFormat":99},"f32e7010c1e3585f0a69c1ed94cc94e1","56d080dfccb3c53a2d6c74c4f24252e3","75ebd62d9641cc8b34ba9b09be8283a9",{"version":"753f71e16f2994f332390bb1c997b0e3","affectsGlobalScope":true,"impliedNodeFormat":1},"8def0ea0e249f49397d74a4f5bdd45a5","f2e201fc252256cba1d1e50abd92e059",{"version":"dd196a5fa0ae2b1608301e2bf6534bc5","affectsGlobalScope":true,"impliedNodeFormat":99}],"fileIdsList":[[51,53,54,216,218,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,216,222,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,54,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,52,53,54,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,216,535,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,55,73,216,221,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,55,72,73,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,55,72,73,216,221,534,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,52,53,54,216,534,535,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,55,216,581,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,55,72,73,216,221,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,70,71,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,216,534,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,55,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,53,54,216,534,629,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[106,107,108,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[106,107,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[106,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[77,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[76,77,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[76,77,78,79,80,81,82,83,84,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[76,77,78,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,85,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,52,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,52,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[85,86,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[85,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[85,86,95,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[85,86,88,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,813],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,812],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,811],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,787,788],[138,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[156,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,648,649,650,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,690,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,690,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,651,652,653,691,692,693,694,695,696,697,698,699,700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743],[48,49,50,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,638,639,642,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,798],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,774,775],[216,639,640,642,643,644,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,639,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,639,640,642,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,639,640,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,781],[216,634,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,781,782],[216,634,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,781],[216,634,641,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,635,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,634,635,636,638,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,634,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[57,58,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[57,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,222,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,233,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,231,233,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,231,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,233,297,298,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,300,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,301,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,318,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,394,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,233,298,418,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,231,415,416,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,415,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,417,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,231,232,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,523,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,524,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,497,517,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,491,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,492,496,497,498,499,500,502,504,505,510,511,520,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,492,497,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,500,517,519,522,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,491,492,493,494,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,521,522,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,520,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,490,492,493,495,503,512,515,516,521,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,497,522,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,518,520,522,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,491,492,497,500,520,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,504,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,494,502,504,505,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,494,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,494,504,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,498,499,500,504,505,510,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,500,501,505,509,511,520,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,492,504,513,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,493,494,495,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,500,520,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,500,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,491,492,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,492,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,496,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,500,505,517,518,519,520,522,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,804,805],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,804,805,806,807],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,804,806],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,804],[51,123,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,52,122,123,124,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[122,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,66,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,766],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,764,766],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,755,763,764,765,767,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,753],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,756,761,766,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,752,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,756,757,760,761,762,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,756,757,758,760,761,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,753,754,755,756,757,761,762,763,765,766,767,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,751,753,754,755,756,757,758,760,761,762,763,764,765,766,767,768],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,751,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,756,758,759,761,762,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,760,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,761,762,766,769],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,754,764],[51,216,487,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,557,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,557,558,559,562,563,564,565,566,567,568,571,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,557,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,560,561,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,555,557,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,552,553,555,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,548,551,553,555,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,552,555,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,543,544,545,548,549,550,552,553,554,555,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,545,548,549,550,551,552,553,554,555,556,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,552,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,546,552,553,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,546,547,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,551,553,554,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,551,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,543,548,553,554,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,569,570,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,590,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,216,592,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,590,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,589,591,592,593,594,595,596,597,598,599,600,601,602,603,604,606,607,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,589,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,605,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,608,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[109,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,109,114,115,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[109,110,111,112,113,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,109,110,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,109,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[109,111,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,159,162,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,152,160,180,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,140,143,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,178,181,184,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,152,159,162,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,152,160,172,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,152,162,172,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,152,172,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,141,142,143,147,153,159,164,182,183,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[143,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,187,188,189,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,160,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,186,187,188,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,186,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,152,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,144,145,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,145,147,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[136,137,141,142,143,144,146,147,148,149,150,151,152,153,154,155,159,160,161,162,163,164,165,166,167,168,169,170,171,173,174,175,176,177,178,179,181,182,183,184,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,201,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,155,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,162,166,167,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,153,155,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,158,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,181,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,143,158,185,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,146,186,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,140,141,142,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,747,772],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,746],[216,637,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,666,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,657,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,659,662,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745],[216,653,657,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745],[216,653,654,655,658,661,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,669,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,654,660,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,683,684,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,658,662,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745],[216,653,683,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745],[216,653,656,657,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745],[216,653,656,657,658,659,660,661,662,663,664,666,667,668,669,670,671,672,673,674,675,676,677,678,679,680,681,682,684,685,686,687,688,689,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,677,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,669,670,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,660,662,670,671,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,661,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,654,657,662,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,662,666,670,671,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,666,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,660,662,665,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,654,659,662,669,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,657,662,683,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745],[139,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[157,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,778,779],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,778],[215,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[211,212,213,214,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,745,747,748,749,750,770,771,772],[211,212,213,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,749],[211,212,213,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[211,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[212,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[213,214,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,747],[216,645,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,790,791,800],[216,634,642,645,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,783,784,800],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,793],[216,646,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,634,645,647,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,783,792,799],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,776],[216,634,639,642,645,647,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,773,776,777,780,783,785,786,789,792,794,795,800,801],[216,645,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,790,791,792,800],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,773,796],[216,645,647,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,780,783,785,800],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,786],[216,634,639,642,645,646,647,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,773,776,777,780,783,784,785,786,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,808],[216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744,809],[65,69,75,105,116,127,129,131,134,135,206,207,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,120,121,125,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,116,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[118,126,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,117,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,219,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,120,216,223,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,62,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,226,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,228,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,119,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,62,119,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,120,216,488,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,120,216,525,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,205,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,528,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[216,218,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,222,531,532,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,536,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,222,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,538,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,540,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,119,216,542,572,573,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,575,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,577,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,62,216,542,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,579,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,60,62,216,582,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,120,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,585,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,132,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,587,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[60,62,216,609,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,611,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,62,216,613,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,615,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,60,62,216,222,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,60,62,75,119,120,121,216,616,617,618,619,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[62,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,621,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[67,68,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,623,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,216,626,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,56,59,60,62,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[63,64,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,62,216,630,631,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,59,62,216,629,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,62,74,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[64,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,63,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[57,61,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[208,209,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,120,125,128,130,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,120,125,128,205,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[60,116,120,125,128,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,120,125,128,130,133,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,116,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744],[51,60,120,121,125,128,130,216,653,692,693,694,695,696,697,698,699,700,701,702,703,704,705,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723,724,725,726,727,728,729,730,731,732,733,734,735,736,737,738,739,740,741,742,743,744]],"options":{"allowImportingTsExtensions":true,"jsx":4,"module":99,"noFallthroughCasesInSwitch":false,"noImplicitAny":false,"noUnusedLocals":false,"noUnusedParameters":false,"skipLibCheck":true,"strict":false,"target":7,"useDefineForClassFields":true},"referencedMap":[[219,1],[223,2],[70,3],[226,3],[228,4],[528,5],[218,4],[536,6],[53,7],[222,8],[55,3],[540,6],[221,3],[575,9],[542,3],[535,10],[579,11],[582,12],[585,13],[72,14],[73,3],[54,7],[132,4],[587,15],[534,4],[611,4],[613,13],[615,3],[621,4],[119,7],[623,4],[626,15],[56,16],[630,17],[629,3],[74,9],[581,3],[71,18],[106,18],[109,19],[108,20],[107,21],[82,22],[78,23],[85,24],[80,25],[81,18],[83,22],[79,25],[76,18],[84,25],[77,18],[98,26],[104,7],[96,26],[97,27],[105,28],[95,29],[102,29],[88,29],[86,30],[103,31],[99,30],[101,29],[100,30],[94,30],[93,29],[87,29],[89,32],[91,29],[92,29],[90,29],[814,33],[813,34],[812,35],[811,18],[789,36],[156,18],[139,37],[157,38],[138,18],[787,18],[746,18],[692,39],[693,40],[694,41],[653,42],[695,43],[696,44],[697,45],[648,18],[651,46],[649,18],[650,18],[698,47],[699,48],[700,49],[701,50],[702,51],[703,52],[704,53],[706,18],[705,54],[707,55],[708,56],[709,57],[691,58],[652,18],[710,59],[711,60],[712,61],[745,62],[713,63],[714,64],[715,65],[716,66],[717,67],[718,68],[719,69],[720,70],[721,71],[722,72],[723,73],[724,74],[725,75],[726,76],[727,77],[729,78],[728,79],[730,80],[731,81],[732,82],[733,83],[734,84],[735,85],[736,86],[737,87],[738,88],[739,89],[740,90],[741,91],[742,92],[743,93],[744,94],[50,18],[209,7],[48,18],[51,95],[52,7],[799,96],[776,97],[774,18],[775,18],[634,18],[645,98],[640,99],[643,100],[790,101],[781,18],[784,102],[783,103],[795,103],[782,104],[798,18],[642,105],[644,105],[636,106],[639,107],[777,106],[641,108],[635,18],[788,18],[59,109],[58,110],[57,18],[531,111],[49,18],[318,112],[297,113],[394,18],[298,114],[234,112],[235,18],[236,18],[237,18],[238,18],[239,18],[240,18],[241,18],[242,18],[243,18],[244,18],[245,18],[246,112],[247,112],[248,18],[249,18],[250,18],[251,18],[252,18],[253,18],[254,18],[255,18],[256,18],[257,18],[258,18],[259,18],[260,18],[261,112],[262,18],[263,18],[264,112],[265,18],[266,18],[267,112],[268,18],[269,112],[270,112],[271,112],[272,18],[273,112],[274,112],[275,112],[276,112],[277,112],[278,112],[279,112],[280,18],[281,18],[282,112],[283,18],[284,18],[285,18],[286,18],[287,18],[288,18],[289,18],[290,18],[291,18],[292,18],[293,18],[294,112],[295,18],[296,18],[299,115],[300,112],[301,112],[302,116],[303,117],[304,112],[305,112],[306,112],[307,112],[308,18],[309,18],[310,112],[232,18],[311,18],[312,18],[313,18],[314,18],[315,18],[316,18],[317,18],[319,118],[320,18],[321,18],[322,18],[323,18],[324,18],[325,18],[326,18],[327,18],[328,112],[329,18],[330,18],[331,18],[332,18],[333,112],[334,112],[335,112],[336,112],[337,18],[338,18],[339,18],[340,18],[487,119],[341,112],[342,112],[343,18],[344,18],[345,18],[346,18],[347,18],[348,18],[349,18],[350,18],[351,18],[352,18],[353,18],[354,18],[355,112],[356,18],[357,18],[358,18],[359,18],[360,18],[361,18],[362,18],[363,18],[364,18],[365,18],[366,112],[367,18],[368,18],[369,18],[370,18],[371,18],[372,18],[373,18],[374,18],[375,18],[376,112],[377,18],[378,18],[379,18],[380,18],[381,18],[382,18],[383,18],[384,18],[385,112],[386,18],[387,18],[388,18],[389,18],[390,18],[391,18],[392,112],[393,18],[395,120],[231,112],[396,18],[397,112],[398,18],[399,18],[400,18],[401,18],[402,18],[403,18],[404,18],[405,18],[406,18],[407,112],[408,18],[409,18],[410,18],[411,18],[412,18],[413,18],[414,18],[419,121],[417,122],[416,123],[418,124],[415,112],[420,18],[421,18],[422,112],[423,18],[424,18],[425,18],[426,18],[427,18],[428,18],[429,18],[430,18],[431,18],[432,112],[433,112],[434,18],[435,18],[436,18],[437,112],[438,18],[439,112],[440,18],[441,118],[442,18],[443,18],[444,18],[445,18],[446,18],[447,18],[448,18],[449,18],[450,18],[451,112],[452,112],[453,18],[454,18],[455,18],[456,18],[457,18],[458,18],[459,18],[460,18],[461,18],[462,18],[463,18],[464,18],[465,112],[466,112],[467,18],[468,18],[469,112],[470,18],[471,18],[472,18],[473,18],[474,18],[475,18],[476,18],[477,18],[478,18],[479,18],[480,18],[481,18],[482,112],[233,125],[483,18],[484,18],[485,18],[486,18],[524,126],[525,127],[490,18],[498,128],[492,129],[499,18],[521,130],[496,131],[520,132],[517,133],[500,134],[501,18],[494,18],[491,18],[522,135],[518,136],[502,18],[519,137],[503,138],[505,139],[506,140],[495,141],[507,142],[508,141],[510,142],[511,143],[512,144],[514,145],[509,146],[515,147],[516,148],[493,149],[513,150],[504,18],[497,151],[523,152],[806,153],[808,154],[807,155],[805,156],[804,18],[124,157],[125,158],[577,7],[60,7],[123,159],[122,18],[67,160],[66,7],[767,161],[765,162],[766,163],[754,164],[755,162],[762,165],[753,166],[758,167],[768,18],[759,168],[764,169],[770,170],[769,171],[752,172],[760,173],[761,174],[756,175],[763,161],[757,176],[488,177],[543,18],[558,178],[559,178],[572,179],[560,180],[561,180],[562,181],[556,182],[554,183],[545,18],[549,184],[553,185],[551,186],[557,187],[546,188],[547,189],[548,190],[550,191],[552,192],[555,193],[563,180],[564,180],[565,180],[566,178],[567,180],[568,180],[544,180],[569,18],[571,194],[570,180],[589,7],[591,195],[593,196],[592,197],[594,18],[608,198],[590,18],[595,18],[596,18],[597,18],[598,18],[599,18],[600,18],[601,18],[602,18],[603,18],[604,199],[606,200],[607,200],[605,18],[609,201],[115,202],[116,203],[114,204],[111,205],[110,206],[113,207],[112,205],[179,208],[181,209],[171,210],[176,211],[177,212],[183,213],[178,214],[175,215],[174,216],[173,217],[184,218],[141,211],[142,211],[182,211],[187,219],[197,220],[191,220],[199,220],[203,220],[190,220],[192,220],[195,220],[198,220],[194,221],[196,220],[200,7],[193,211],[189,222],[188,223],[150,7],[154,7],[144,211],[147,7],[152,211],[153,224],[146,225],[149,7],[151,7],[148,226],[137,7],[136,7],[205,227],[202,228],[168,229],[167,211],[165,7],[166,211],[169,230],[170,231],[163,7],[159,232],[162,211],[161,211],[160,211],[155,211],[164,232],[201,211],[180,233],[186,234],[204,18],[172,18],[185,235],[145,18],[143,236],[748,237],[747,238],[68,7],[751,18],[61,18],[791,18],[637,18],[638,239],[669,240],[679,241],[668,240],[689,242],[660,243],[659,18],[688,244],[682,245],[687,243],[662,246],[676,247],[661,248],[685,249],[657,250],[656,244],[686,251],[658,252],[663,241],[664,18],[667,241],[654,18],[690,253],[680,254],[671,255],[672,256],[674,257],[670,258],[673,259],[683,244],[665,260],[666,261],[675,262],[655,18],[678,254],[677,241],[681,18],[684,263],[538,111],[140,264],[158,265],[793,266],[779,267],[780,266],[778,18],[216,268],[773,269],[771,270],[749,271],[750,18],[212,272],[211,18],[213,273],[214,18],[215,274],[772,275],[792,276],[785,277],[794,278],[647,279],[800,280],[802,281],[796,282],[803,283],[801,284],[786,285],[797,286],[809,287],[816,288],[646,18],[208,289],[126,290],[117,291],[127,292],[118,293],[220,294],[224,295],[225,296],[227,297],[229,298],[130,296],[230,299],[120,300],[489,301],[128,302],[526,303],[527,304],[529,305],[530,306],[533,307],[537,308],[532,309],[539,310],[541,311],[574,312],[576,313],[578,314],[121,302],[573,315],[580,316],[583,317],[584,318],[586,319],[133,320],[588,321],[610,322],[612,323],[614,324],[616,325],[617,326],[620,327],[619,328],[622,329],[69,330],[624,331],[625,302],[627,332],[628,302],[63,333],[65,334],[632,335],[631,336],[75,337],[633,338],[618,7],[64,339],[62,340],[210,341],[135,342],[206,343],[129,344],[134,345],[207,346],[131,347],[810,288],[815,18],[217,18],[46,18],[47,18],[8,18],[9,18],[11,18],[10,18],[2,18],[12,18],[13,18],[14,18],[15,18],[16,18],[17,18],[18,18],[19,18],[3,18],[20,18],[21,18],[4,18],[22,18],[26,18],[23,18],[24,18],[25,18],[27,18],[28,18],[29,18],[5,18],[30,18],[31,18],[32,18],[33,18],[6,18],[37,18],[34,18],[35,18],[36,18],[38,18],[7,18],[39,18],[44,18],[45,18],[40,18],[41,18],[42,18],[43,18],[1,18]],"affectedFilesPendingEmit":[208,126,117,127,118,220,224,225,227,229,130,230,120,489,128,526,527,529,530,533,537,532,539,541,574,576,578,121,573,580,583,584,586,133,588,610,612,614,616,617,620,619,622,69,624,625,627,628,63,65,632,631,75,633,618,64,62,210,135,206,129,134,207,131,810,815]}
{
  "compilerOptions": {
    "allowJs": true,
    "noImplicitAny": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "skipLibCheck": true,
    "strictNullChecks": false
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ]
}{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
{"version":"7.0.0-dev.20260224.1","root":[199],"fileNames":["lib.es5.d.ts","lib.es2015.d.ts","lib.es2016.d.ts","lib.es2017.d.ts","lib.es2018.d.ts","lib.es2019.d.ts","lib.es2020.d.ts","lib.es2021.d.ts","lib.es2022.d.ts","lib.es2023.d.ts","lib.es2015.core.d.ts","lib.es2015.collection.d.ts","lib.es2015.generator.d.ts","lib.es2015.iterable.d.ts","lib.es2015.promise.d.ts","lib.es2015.proxy.d.ts","lib.es2015.reflect.d.ts","lib.es2015.symbol.d.ts","lib.es2015.symbol.wellknown.d.ts","lib.es2016.array.include.d.ts","lib.es2016.intl.d.ts","lib.es2017.arraybuffer.d.ts","lib.es2017.date.d.ts","lib.es2017.object.d.ts","lib.es2017.sharedmemory.d.ts","lib.es2017.string.d.ts","lib.es2017.intl.d.ts","lib.es2017.typedarrays.d.ts","lib.es2018.asyncgenerator.d.ts","lib.es2018.asynciterable.d.ts","lib.es2018.intl.d.ts","lib.es2018.promise.d.ts","lib.es2018.regexp.d.ts","lib.es2019.array.d.ts","lib.es2019.object.d.ts","lib.es2019.string.d.ts","lib.es2019.symbol.d.ts","lib.es2019.intl.d.ts","lib.es2020.bigint.d.ts","lib.es2020.date.d.ts","lib.es2020.promise.d.ts","lib.es2020.sharedmemory.d.ts","lib.es2020.string.d.ts","lib.es2020.symbol.wellknown.d.ts","lib.es2020.intl.d.ts","lib.es2020.number.d.ts","lib.es2021.promise.d.ts","lib.es2021.string.d.ts","lib.es2021.weakref.d.ts","lib.es2021.intl.d.ts","lib.es2022.array.d.ts","lib.es2022.error.d.ts","lib.es2022.intl.d.ts","lib.es2022.object.d.ts","lib.es2022.string.d.ts","lib.es2022.regexp.d.ts","lib.es2023.array.d.ts","lib.es2023.collection.d.ts","lib.es2023.intl.d.ts","lib.decorators.d.ts","lib.decorators.legacy.d.ts","./node_modules/@types/node/compatibility/disposable.d.ts","./node_modules/@types/node/compatibility/indexable.d.ts","./node_modules/@types/node/compatibility/iterators.d.ts","./node_modules/@types/node/compatibility/index.d.ts","./node_modules/@types/node/globals.typedarray.d.ts","./node_modules/@types/node/buffer.buffer.d.ts","./node_modules/undici-types/header.d.ts","./node_modules/undici-types/readable.d.ts","./node_modules/undici-types/file.d.ts","./node_modules/undici-types/fetch.d.ts","./node_modules/undici-types/formdata.d.ts","./node_modules/undici-types/connector.d.ts","./node_modules/undici-types/client.d.ts","./node_modules/undici-types/errors.d.ts","./node_modules/undici-types/dispatcher.d.ts","./node_modules/undici-types/global-dispatcher.d.ts","./node_modules/undici-types/global-origin.d.ts","./node_modules/undici-types/pool-stats.d.ts","./node_modules/undici-types/pool.d.ts","./node_modules/undici-types/handlers.d.ts","./node_modules/undici-types/balanced-pool.d.ts","./node_modules/undici-types/agent.d.ts","./node_modules/undici-types/mock-interceptor.d.ts","./node_modules/undici-types/mock-agent.d.ts","./node_modules/undici-types/mock-client.d.ts","./node_modules/undici-types/mock-pool.d.ts","./node_modules/undici-types/mock-errors.d.ts","./node_modules/undici-types/proxy-agent.d.ts","./node_modules/undici-types/env-http-proxy-agent.d.ts","./node_modules/undici-types/retry-handler.d.ts","./node_modules/undici-types/retry-agent.d.ts","./node_modules/undici-types/api.d.ts","./node_modules/undici-types/interceptors.d.ts","./node_modules/undici-types/util.d.ts","./node_modules/undici-types/cookies.d.ts","./node_modules/undici-types/patch.d.ts","./node_modules/undici-types/websocket.d.ts","./node_modules/undici-types/eventsource.d.ts","./node_modules/undici-types/filereader.d.ts","./node_modules/undici-types/diagnostics-channel.d.ts","./node_modules/undici-types/content-type.d.ts","./node_modules/undici-types/cache.d.ts","./node_modules/undici-types/index.d.ts","./node_modules/@types/node/globals.d.ts","./node_modules/@types/node/assert.d.ts","./node_modules/@types/node/assert/strict.d.ts","./node_modules/@types/node/async_hooks.d.ts","./node_modules/@types/node/buffer.d.ts","./node_modules/@types/node/child_process.d.ts","./node_modules/@types/node/cluster.d.ts","./node_modules/@types/node/console.d.ts","./node_modules/@types/node/constants.d.ts","./node_modules/@types/node/crypto.d.ts","./node_modules/@types/node/dgram.d.ts","./node_modules/@types/node/diagnostics_channel.d.ts","./node_modules/@types/node/dns.d.ts","./node_modules/@types/node/dns/promises.d.ts","./node_modules/@types/node/domain.d.ts","./node_modules/@types/node/dom-events.d.ts","./node_modules/@types/node/events.d.ts","./node_modules/@types/node/fs.d.ts","./node_modules/@types/node/fs/promises.d.ts","./node_modules/@types/node/http.d.ts","./node_modules/@types/node/http2.d.ts","./node_modules/@types/node/https.d.ts","./node_modules/@types/node/inspector.d.ts","./node_modules/@types/node/module.d.ts","./node_modules/@types/node/net.d.ts","./node_modules/@types/node/os.d.ts","./node_modules/@types/node/path.d.ts","./node_modules/@types/node/perf_hooks.d.ts","./node_modules/@types/node/process.d.ts","./node_modules/@types/node/punycode.d.ts","./node_modules/@types/node/querystring.d.ts","./node_modules/@types/node/readline.d.ts","./node_modules/@types/node/readline/promises.d.ts","./node_modules/@types/node/repl.d.ts","./node_modules/@types/node/sea.d.ts","./node_modules/@types/node/sqlite.d.ts","./node_modules/@types/node/stream.d.ts","./node_modules/@types/node/stream/promises.d.ts","./node_modules/@types/node/stream/consumers.d.ts","./node_modules/@types/node/stream/web.d.ts","./node_modules/@types/node/string_decoder.d.ts","./node_modules/@types/node/test.d.ts","./node_modules/@types/node/timers.d.ts","./node_modules/@types/node/timers/promises.d.ts","./node_modules/@types/node/tls.d.ts","./node_modules/@types/node/trace_events.d.ts","./node_modules/@types/node/tty.d.ts","./node_modules/@types/node/url.d.ts","./node_modules/@types/node/util.d.ts","./node_modules/@types/node/v8.d.ts","./node_modules/@types/node/vm.d.ts","./node_modules/@types/node/wasi.d.ts","./node_modules/@types/node/worker_threads.d.ts","./node_modules/@types/node/zlib.d.ts","./node_modules/@types/node/index.d.ts","./node_modules/@types/estree/index.d.ts","./node_modules/rollup/dist/rollup.d.ts","./node_modules/rollup/dist/parseAst.d.ts","./node_modules/vite/types/hmrPayload.d.ts","./node_modules/vite/types/customEvent.d.ts","./node_modules/vite/types/hot.d.ts","./node_modules/vite/dist/node/types.d-aGj9QkWt.d.ts","./node_modules/vite/node_modules/esbuild/lib/main.d.ts","./node_modules/source-map-js/source-map.d.ts","./node_modules/postcss/lib/previous-map.d.ts","./node_modules/postcss/lib/input.d.ts","./node_modules/postcss/lib/css-syntax-error.d.ts","./node_modules/postcss/lib/declaration.d.ts","./node_modules/postcss/lib/root.d.ts","./node_modules/postcss/lib/warning.d.ts","./node_modules/postcss/lib/lazy-result.d.ts","./node_modules/postcss/lib/no-work-result.d.ts","./node_modules/postcss/lib/processor.d.ts","./node_modules/postcss/lib/result.d.ts","./node_modules/postcss/lib/document.d.ts","./node_modules/postcss/lib/rule.d.ts","./node_modules/postcss/lib/node.d.ts","./node_modules/postcss/lib/comment.d.ts","./node_modules/postcss/lib/container.d.ts","./node_modules/postcss/lib/at-rule.d.ts","./node_modules/postcss/lib/list.d.ts","./node_modules/postcss/lib/postcss.d.ts","./node_modules/postcss/lib/postcss.d.mts","./node_modules/vite/dist/node/runtime.d.ts","./node_modules/vite/types/importGlob.d.ts","./node_modules/vite/types/metadata.d.ts","./node_modules/vite/dist/node/index.d.ts","./node_modules/@swc/types/assumptions.d.ts","./node_modules/@swc/types/index.d.ts","./node_modules/@swc/core/binding.d.ts","./node_modules/@swc/core/spack.d.ts","./node_modules/@swc/core/index.d.ts","./node_modules/@vitejs/plugin-react-swc/index.d.ts","./node_modules/lovable-tagger/dist/index.d.ts","./vite.config.ts","./node_modules/@types/aria-query/index.d.ts","./node_modules/@types/deep-eql/index.d.ts","./node_modules/assertion-error/index.d.ts","./node_modules/@types/chai/index.d.ts","./node_modules/@types/d3-array/index.d.ts","./node_modules/@types/d3-color/index.d.ts","./node_modules/@types/d3-ease/index.d.ts","./node_modules/@types/d3-interpolate/index.d.ts","./node_modules/@types/d3-path/index.d.ts","./node_modules/@types/d3-time/index.d.ts","./node_modules/@types/d3-scale/index.d.ts","./node_modules/@types/d3-shape/index.d.ts","./node_modules/@types/d3-timer/index.d.ts","./node_modules/@types/json-schema/index.d.ts","./node_modules/@types/prop-types/index.d.ts","./node_modules/@types/react/global.d.ts","./node_modules/csstype/index.d.ts","./node_modules/@types/react/index.d.ts","./node_modules/@types/react-dom/index.d.ts"],"fileInfos":[{"version":"a1aa1a5e065d48ef5c7bb99e38412f96","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"d4306fb2e47f74835e8674ffac07d76f","impliedNodeFormat":99},{"version":"e437c5c1302869326c3bb93da85bbbcf","impliedNodeFormat":99},{"version":"e4324975a566567b21d350615f1fc6ac","impliedNodeFormat":99},{"version":"333b1b9a2a9ac3b8497dba5c63b5ba50","impliedNodeFormat":99},{"version":"6cffacd662b6eb5fa7a36aa2ea366bfa","impliedNodeFormat":99},{"version":"b4c34f9c23304dbef2d23698637ed638","impliedNodeFormat":99},{"version":"e5cb86a5fc491796ecd1d2dd348d208f","impliedNodeFormat":99},{"version":"feb6c6fb19cdb246a5d8acb36a6901c7","impliedNodeFormat":99},{"version":"9443a7f109277ffaa79d893ed2549995","impliedNodeFormat":99},{"version":"01ac052ec4a79e87229f90466a9645f8","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"edba5df642941aa062a62f6328c6df3d","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"6344b55f26a4e81d9608777dbfb877dd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"3c0ed28e53d3695b363e256ec1c023fd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4c2761daba7f17141c25baa0821ac5da","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b87656acabd63e69379ff6ffcfe52fc7","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"597469522da047a5af5222cc6989f405","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"bb3a710cbcda0533bb127712927cbe37","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"55d97a8c6fbf34a30450a7b1e5f7a298","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"0ee05eb59426d33e374226d8dcfa708b","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"e347c14030993906efcfbb88915b6a05","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b0231263857c9b6a03641acdc9280ceb","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"3b15c4a83b598cacb4067676e6f0abed","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b417d97b7934cef63b1889abec0bbfbf","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"09a6cf4032ebba60ce22a501e663f881","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"7a42de379b489e8f7b647455bebfc576","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"e22cc07e3f3cc242ba52fa3f8ea1fc58","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"2c45da767a1bfbb220848df1bc4029e4","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b44c3e0fbaf2130cdcf6ac38b120ffa1","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b612fb5cf8e5d964b92063a75207632a","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"02705151a5e1551b9162a9ed8ab763f7","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"41025e398be9215d32e4337335da8f0b","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"52684c2b1f353a5538e4f275182a54cd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"6dedb6a4f90d1df3a6fbe5693e44886c","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"ca3f36fe3562c07e0f0d71c2bebd3f6d","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"409974d6129befbb8226ddd1c6558568","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4d9cfde2a1ae1b4925f1f9bc10848e5d","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"7e1daecc66dd564144e3bb1a0266b5fd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a8e1d9bb35fd0637f2f9fd2b2a54f2ec","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4f168501772a6543182765bfd5f2fbfe","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a19c80aad1b2162103496f5ba293a732","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"b69afa63cd5d059851c78adb2856ee09","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"ae2fc5d954e9b0f5feee3d481b953c27","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"1cfd3091a071d8b6feec15277643bafe","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"692bcd75364db0f65d428801c7884466","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"a0d87491913d843139e0c993650a3235","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4ef72aa378127e7b7abba915b0110b1e","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"3ec74c6a7d4463f0254db3a74cf75646","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"84c2bdfa470d075526cce6322d81b0b6","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"0b3844c2b8c73e4e1ab91431411cad11","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"4fc71cf4a15b8d99675a31df77f26e07","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"d1b49564ddaeca3df5b6dbae925d2242","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"6a25be566d60ccfc2d6e8b7bfdeefa83","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"8a20e27646985dfd58c57ca6566553dd","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"9969f02ad3cdcbf4f709405cda44167f","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"9c9be4792a7a4f42c15ae7360bf28779","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"8cf777fe00349b71ee9c4b6f3fe7fd19","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"74f96bc192530c9723f572bfff3d3078","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"1df91c56b25955c56387426f378173c5","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"f64453cbf9671f28158677fa5c43967a","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"33f317af5428801f944a478d2c1e38e5","affectsGlobalScope":true,"impliedNodeFormat":99},{"version":"5fd84cb7055cb580f7698d4a32062548","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"913b52a39743d1c11984e4e124b1f3a8","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"3e57a4cd3267159f3772bebd73534451","affectsGlobalScope":true,"impliedNodeFormat":1},"fe51d7a9bcdbcce1e65bbcf39b212298",{"version":"60edda1b5f28f8e7d7a6fae700faef3c","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"ecdcb80604ca736ed275e4330a3acd50","affectsGlobalScope":true,"impliedNodeFormat":1},"628b774b54637325e286752c79c12432","bb1f9e3091b88e9d0e93b7198c736af3","514fd35e5eb35bb2e5cbb908af0a0aa2","ed57ae88565308729f2327f26d684976","dcd932d6b0038f2e250e30dc10125b22","9508c917bd7e458745e222a82dd24ef0","fabf86f455f96b90538cc26320ab2765","14550b4cd9f433e0addd8b6d67614d23","cf0ac6aebc25cb780674653aaeee688e","35fef7bac8048f583e4ce6eaa0c2a4c0","6752dc653fc7a333027249fd851fdb62","b9ad7e689b46dfba362c1bf174e69018","8b0a2930dfabdf27c69c6bb1eeabcdc8","4513b1ed15523d247040689f37fa9db2","5c0c499eed773a750903d9497beafacd","2377da227d1bac82ff7b3f2081ddf8d3","beef985b474fefeb80d27fb2c8778371","c79fc9d9f09ae598a374ae7c0b5284a4","f2caa3cebb1e6be855519004830a6be0","8ebc9f2a77c900e710801214c5cb994c","ec617a0e0577dd6a3210c3b067ecb325","1db5d06e485bd82d6d5f6e36925a8714","24b864518967840216c779b5e5f00975","8719cd8047700bfb6046798390053823","f2840afb502c94db92dab0fb8d27812f","a7e7d08b372210c203745d3eac61a411","531183cc80535e0e94226d720e5eb038","f627eb958ca52c85e42f04dce4661f86","9a43fc665bce9012a3d5fe1b574ff4dc","13f4b4da6546a34719fd6bde15fb63dd","a589216508844bfc00e62fc2d97fda45","865aea1c3209e31b076cb6fe780e769e","12e64aaf26af0f5c8f1b263dd66e3feb","928971ebbcdf5b093ef37669b33bddf6","b744265d8ad12b7d4d5c5dc35d18d44e","eff32168b8348b822afeed9cbf61afa7","9aafd1f29b4d8861c1c6c34bf83c0721",{"version":"814527021f6afe953fcb36ef7f2a0af7","affectsGlobalScope":true,"impliedNodeFormat":1},"f6fcdc4f3f8b43b4eda0d95b17b65f7d","7deced3ef46e082f97d49bb71622526a","f8c976cb12f3420b8cc8d03d579ada06",{"version":"38ac64ffbf3c3d55b209904202bb5296","affectsGlobalScope":true,"impliedNodeFormat":1},"cbae34574fe31d4a5ef3adee146fb6f5","2066e32c917596ee32bf42917ab050c9",{"version":"9fc8636e70e507ea8d98a7aabd265ee5","affectsGlobalScope":true,"impliedNodeFormat":1},"b2b472cd0bf0f8d5f022e00ca1c401f4",{"version":"a1bbb60dddfdb6ab1692bcbdb652cfb6","affectsGlobalScope":true,"impliedNodeFormat":1},"71d31d905c438c7a784cf53076c31bfb","368083bf07350d0955aaf442403bae9e","e87ecaa89ba60f1afc89dc6cdbf88949","5c5c7649711b5d982cf39fe9b6744080","958d9865bfe33c94973e3d58ac66b1d0",{"version":"cb0b77b9a8e6edb694cd6c637486ffef","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f475d178fd9409f5f49a7dec2cf0834e","affectsGlobalScope":true,"impliedNodeFormat":1},"051d8553fb6c914c591a6674e3e3b8ad","458392a6ea151d7404585cb9ec7a33cf","90b979cc7f116b66956ec73d3f4d2687","6e4dca32cc65698c0a9637bf3217f848","a92b87ae39326c5d9ea9dff140121610","db7a5833bb46490b0087145f8a716bec",{"version":"de03e4eee2ad023d78cd8dbbb4e00085","affectsGlobalScope":true,"impliedNodeFormat":1},"8183c2dd99937f13a8c57c1270390d32","2500b39777a662899066e61fcf737a52","bdbbfddd2833453519a4c6864652469e",{"version":"536c2a5e6ccf45220da85ad4992f9cd5","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d7f83f5e4587064452ba79173eeb307b","affectsGlobalScope":true,"impliedNodeFormat":1},"d1dfd59bf8b7e71f40ee1d3a2f1b5fcf","9292aa21e6668349e0642faa07be7750","8ccb81bc00ea59aa908d31dbe50bb31a","dd0c03e63afe38f86d61b2d54a9ad760","0548d84bf13d6b5d3ef34d9755610be1","e9adf16c2cd7aa8e5e0117603a04c226","83f890f3d9ec2bb1476d57761b8e97fd","efe14f23bf33236571a4d0d5177e48d8","c8206d568b54e5ea06131963eecd576a","141101b35aa85ab5ae3d1836f602d9c2",{"version":"2ed70491374f27b7d4ff5db624057a07","affectsGlobalScope":true,"impliedNodeFormat":1},"c2e6363d164e809228f71291dcc83add","d64f5ee437e1d638acaadedd71d7525a",{"version":"ea001113f32054398156e39095350f0a","affectsGlobalScope":true,"impliedNodeFormat":1},"7345aabef559e464447357f201cc05f8","3dadc65964b2cdb7268e6ded36f2bfa7","d63b35c1a5097295f0659f5583c8fb83","3509aa3de97926c2922f378a248ddb48",{"version":"e6099c385b8384a91dc4f1e601769a6f","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2479ac25f87afa19e92f80accccd08f3","affectsGlobalScope":true,"impliedNodeFormat":1},"96607501f53964d0b5b18d4fbe34aee0","f277d9147e1f990364890d327fecb724","eb4ea93209a96f6f1a9c85b8d43816fb",{"version":"7f9824da17f78c6191556208c98102fb","affectsGlobalScope":true,"impliedNodeFormat":1},"68f890176ef501f8442469acfedc0414","a7106559a4309e79d396f27199eda706","5d671957ec914f30eff949de0a89bb8d",{"version":"bd9754f38a611c76aba59ded4330be6b","affectsGlobalScope":true,"impliedNodeFormat":1},"ec8179256edf276707d3fc2d546c08a5","c41dfa992327d5d9ac91f5ba67140a9f","bc40746db9f4f7844c2c87b3f766c2c2","057dd0248541710a8c55273d076f5ea8",{"version":"3e9947c80f076a191d01091547b58b23","impliedNodeFormat":99},{"version":"9a46e873ee3113eb1ec9417022c2ec56","affectsGlobalScope":true,"impliedNodeFormat":1},"07e14c037c571c6a65227f6028ba71bb","e0d71344e08090d242ddbb62202bf525","cb388ab2b69f225dfc1713f375cdf700","bd1ac570ac6462dd37f134886d47b59e","05d39561dc324d83b21f1f75257bb14a","e45043f374eb5ed478726d5a2b57e00e","c3c8b27013c9eef710cf3b4651ed5d30","e9ace6a4040eca965b9bfb930f846e1e","68694a8f369c36362861a107d633314f","dcbfb791583f55a7052a66993c6a768c","5561f39c7d4c83b7753fc2aec55dceba","37c6157c8da787727a0d91c04d6417ca","da942b7f92675632be38fbe393c25eec","935192a885a2c1300f35de0c84fcb04d","2e97d8eb4916aec3abb69b0604c31832","3c8aaa3d1e0d528b17aff81f65d91879","38d9bd5d6de46b1c4960bbe6e7059d78","2c57a35029458c772083ca627c5963bc","8e2e72ac1d5bd18528c0fc7d3665c5f1",{"version":"8ddb259287bbefd133968a222c647fa6","impliedNodeFormat":99},{"version":"175d1ce79fb7bcebcf51d8bed373276f","impliedNodeFormat":99},"c69df9466cdbac67af017c84c2535476","d929083a600293ef8150310a8f1a77f9",{"version":"f15b5919b156648b63436c7d8ecb2538","impliedNodeFormat":99},"391a10a703000a233c0206299f3931c0","c38c7ababb066e53f003217c51e28063","783009f3a18a30d8070aaf8b19362416","b5801d9ad3c209be6ba2ed4d6d79e372","3e0d9d96c4e4a8193f87ce5972e1ba8c",{"version":"f261a57c6fb4eeaa5fefdbc9f05e32c1","impliedNodeFormat":99},{"version":"b329dba13f85d23ecf914ea5797db1d1","impliedNodeFormat":99},"5a6b18cbd44206f065d803f468d330d0","56d080dfccb3c53a2d6c74c4f24252e3","548472bfd4ebe2f1c8f494b960a27836",{"version":"fa98b0905a86da0a95fa8fd3e974e038","impliedNodeFormat":99},{"version":"5ede871fecbb2b6f672a99d3c3c6bee7","affectsGlobalScope":true,"impliedNodeFormat":99},"54475d975743595ac0c9c193ff90b44d","9ab5b4a18e12baa493c9fbdd71496f10","47760859353f290db4ec4e84f32a459f","cd07fc30e4bc989a49610f7c66a0f9a8","5151824378f707ddfdb3e31b0bec4786","fe89f9cb126aa3719c9f92667b715d3e","847d39f5db923887fa132d1f7504a296",{"version":"cdbe9802ec40c9d4f5e986b85e87dc17","affectsGlobalScope":true,"impliedNodeFormat":1},"81de33ebc29f505cbb508380190230b0","295c0cb8891e7424d3a27dc56dc1b430","83ce387bc14a652e4bb5770ea0d54fd8",{"version":"227e9b8001bb8366a6a64a4bf132ee1b","affectsGlobalScope":true,"impliedNodeFormat":1},"fdca13c9e1b0225fe2ea7411fc134684",{"version":"20a2f53cda1a6fc85e397e1bc2530b12","affectsGlobalScope":true,"impliedNodeFormat":1},"08d3e1862ea40bb361967978dd7ea51d"],"fileIdsList":[[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,193,194,195],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,193],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,192],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,201,202],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,205],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,209],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,208],[67,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[62,63,64,67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,104,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,104,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[65,66,67,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,217],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,214,215,216],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,191,196],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,191],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,183],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,181,183],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,172,180,181,182,184,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,170],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,173,178,183,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,169,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,173,174,177,178,179,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,173,174,175,177,178,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,170,171,172,173,174,178,179,180,182,183,184,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,168,170,171,172,173,174,175,177,178,179,180,181,182,183,184,185],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,168,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,173,175,176,178,179,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,177,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,178,179,183,186],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,171,181],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,161,190],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,160],[67,76,80,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,76,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,71,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,73,76,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159],[67,71,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159],[67,68,69,72,75,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,76,83,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,68,74,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,76,97,98,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,72,76,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159],[67,97,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159],[67,70,71,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159],[67,70,71,72,73,74,75,76,77,78,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,98,99,100,101,102,103,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,76,91,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,76,83,84,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,74,76,84,85,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,75,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,68,71,76,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,76,80,84,85,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,80,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,74,76,79,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,68,73,76,83,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158],[67,71,76,97,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,161,162,163,164,165,166,167,187,188,189,190],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,163,164,165,166],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,163,164,165],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,163],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,164],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,161],[67,106,107,108,109,110,111,112,113,114,115,116,117,118,119,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,191,197,198]],"options":{"allowImportingTsExtensions":true,"module":99,"noFallthroughCasesInSwitch":true,"noUnusedLocals":false,"noUnusedParameters":false,"skipLibCheck":true,"strict":true,"target":9},"referencedMap":[[194,1],[196,2],[195,3],[192,1],[193,4],[200,1],[203,5],[204,1],[205,1],[206,1],[207,6],[208,1],[210,7],[211,8],[209,1],[212,1],[201,1],[160,1],[213,1],[106,9],[107,10],[108,11],[67,12],[109,13],[110,14],[111,15],[62,1],[65,16],[63,1],[64,1],[112,17],[113,18],[114,19],[115,20],[116,21],[117,22],[118,23],[120,1],[119,24],[121,25],[122,26],[123,27],[105,28],[66,1],[124,29],[125,30],[126,31],[159,32],[127,33],[128,34],[129,35],[130,36],[131,37],[132,38],[133,39],[134,40],[135,41],[136,42],[137,43],[138,44],[139,45],[140,46],[141,47],[143,48],[142,49],[144,50],[145,51],[146,52],[147,53],[148,54],[149,55],[150,56],[151,57],[152,58],[153,59],[154,60],[155,61],[156,62],[157,63],[158,64],[214,1],[218,65],[215,1],[217,66],[197,67],[202,1],[216,1],[198,68],[184,69],[182,70],[183,71],[171,72],[172,70],[179,73],[170,74],[175,75],[185,1],[176,76],[181,77],[187,78],[186,79],[169,80],[177,81],[178,82],[173,83],[180,69],[174,84],[162,85],[161,86],[168,1],[83,87],[93,88],[82,87],[103,89],[74,90],[73,1],[102,91],[96,92],[101,90],[76,93],[90,94],[75,95],[99,96],[71,97],[70,91],[100,98],[72,99],[77,88],[78,1],[81,88],[68,1],[104,100],[94,101],[85,102],[86,103],[88,104],[84,105],[87,106],[97,91],[79,107],[80,108],[89,109],[69,1],[92,101],[91,88],[95,1],[98,110],[191,111],[188,112],[166,113],[167,1],[164,114],[163,1],[165,115],[189,1],[190,116],[199,117],[60,1],[61,1],[12,1],[11,1],[2,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[3,1],[21,1],[22,1],[4,1],[23,1],[27,1],[24,1],[25,1],[26,1],[28,1],[29,1],[30,1],[5,1],[31,1],[32,1],[33,1],[34,1],[6,1],[38,1],[35,1],[36,1],[37,1],[39,1],[7,1],[40,1],[45,1],[46,1],[41,1],[42,1],[43,1],[44,1],[8,1],[50,1],[47,1],[48,1],[49,1],[51,1],[9,1],[52,1],[53,1],[54,1],[56,1],[55,1],[57,1],[58,1],[10,1],[59,1],[1,1]],"affectedFilesPendingEmit":[199]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
