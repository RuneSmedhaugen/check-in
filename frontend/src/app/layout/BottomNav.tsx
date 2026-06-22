import {
  NavLink,
} from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Today",
  },
  
  {
    to: "/food",
    label: "Food",
  },

  {
    to: "/workouts",
    label: "Workouts",
  },

  {
    to: "/log",
    label: "Log",
  },
  
  {
    to: "/insights",
    label: "Insights",
  },
  
  {
    to: "/history",
    label: "History",
  },

  {
    to: "/settings",
    label: "Settings",
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