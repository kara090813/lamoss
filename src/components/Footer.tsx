import Link from "next/link";
import { Mail, Globe } from "lucide-react";

const quickLinks = [
  { href: "/about", label: "회사소개" },
  { href: "/projects", label: "프로젝트" },
  { href: "/privacy", label: "개인정보 보호" },
  { href: "/terms", label: "이용약관" },
  { href: "/contact", label: "고객센터" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-black text-base">M</span>
              </div>
              <span className="text-lg font-bold">
                La<span className="text-primary">Moss</span> Tech
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              기술로 채우는 일상의 빈틈,
              <br />
              혁신으로 만드는 더 나은 삶
            </p>
            <div className="text-sm text-muted space-y-1">
              <p>대표: 이상윤</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              바로가기
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              연락처
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted">
                <Mail size={14} className="text-primary" />
                kara090813@gmail.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted">
                <Globe size={14} className="text-primary" />
                https://www.lamoss.net
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} LaMoss Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
