import {
  NavLink,
} from "react-router-dom";

import {
  Home,
  Utensils,
  Dumbbell,
  FileText,
  Brain,
  History,
  Settings,
} from "lucide-react";

const navItems = [
  {
    to: "/",
    label: "Today",
    icon: Home,
  },
  
  {
    to: "/food",
    label: "Food",
    icon: Utensils,
  },

  {
    to: "/workouts",
    label: "Workouts",
    icon: Dumbbell,
  },

  {
    to: "/log",
    label: "Log",
    icon: FileText,
  },
  
  {
    to: "/insights",
    label: "Insights",
    icon: Brain,
  },
  
  {
    to: "/history",
    label: "History",
    icon: History,
  },

  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-md justify-around p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "text-sm transition-colors",

                isActive
                  ? "text-white"
                  : "text-slate-500",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}