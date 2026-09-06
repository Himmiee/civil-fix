import { AlertCircle, Zap, Trash2, Droplets, MoreHorizontal, LucideIcon } from "lucide-react";

export type Category = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

export const CATEGORIES: Category[] = [
  { id: "pothole", label: "Pothole / Road", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-100" },
  { id: "streetlight", label: "Streetlight", icon: Zap, color: "text-blue-600", bg: "bg-blue-100" },
  { id: "waste", label: "Waste / Trash", icon: Trash2, color: "text-emerald-600", bg: "bg-emerald-100" },
  { id: "water", label: "Water Leak", icon: Droplets, color: "text-cyan-600", bg: "bg-cyan-100" },
  { id: "other", label: "Other", icon: MoreHorizontal, color: "text-slate-600", bg: "bg-slate-100" },
];
