import {
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Layers,
  Palette,
  MonitorSmartphone,
  MessageSquare,
  Rocket,
  TrendingUp,
  Award,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  HelpCircle,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

const iconsMap: Record<string, ComponentType<LucideProps>> = {
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Layers,
  Palette,
  MonitorSmartphone,
  MessageSquare,
  Rocket,
  TrendingUp,
  Award,
  Globe,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Sparkles,
};

export function resolveIcon(name: string): ComponentType<LucideProps> {
  return iconsMap[name] || HelpCircle;
}
