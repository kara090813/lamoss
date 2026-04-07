"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import privacyData from "@/data/privacy.json";

function PrivacyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getInitialIndex = () => {
    const tab = searchParams.get("tab");
    if (tab) {
      const idx = privacyData.findIndex((p) => p.info.id === tab);
      if (idx !== -1) return idx;
    }
    return 0;
  };

  const [selectedPolicy, setSelectedPolicy] = useState(getInitialIndex);
  const [lang, setLang] = useState<"ko" | "en">(() => {
    const l = searchParams.get("lang");
    return l === "en" ? "en" : "ko";
  });

  useEffect(() => {
    const id = privacyData[selectedPolicy].info.id;
    const params = new URLSearchParams();
    params.set("tab", id);
    if (lang !== "ko") params.set("lang", lang);
    router.replace(`/privacy?${params.toString()}`, { scroll: false });
  }, [selectedPolicy, lang, router]);

  const policy = privacyData[selectedPolicy];
  const items = lang === "ko" ? policy.itemsKo : policy.itemsEn;
  const title = lang === "ko" ? policy.info.titleKo : policy.info.titleEn;
  const date = lang === "ko" ? policy.info.dateKo : policy.info.dateEn;

  return (
    <>
      {/* Hero */}
      <section className="relative py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <h1 className="page-enter text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">정책 및 약관</span>
          </h1>
          <p className="page-enter page-enter-delay-1 text-base sm:text-lg text-muted">
            LaMoss Tech의 개인정보 처리방침 및 서비스 이용약관
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            {/* Policy Tabs */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {privacyData.map((p, idx) => (
                <button
                  key={p.info.id}
                  onClick={() => setSelectedPolicy(idx)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    idx === selectedPolicy
                      ? "bg-primary text-white"
                      : "glass text-muted hover:text-foreground"
                  }`}
                >
                  {lang === "ko" ? p.info.titleKo : p.info.titleEn}
                </button>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 glass rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => setLang("ko")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lang === "ko"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                한국어
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  lang === "en"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground"
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Policy Header */}
          <div className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-5 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-muted">
              {lang === "ko" ? "시행일" : "Effective Date"}: {date}
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-3 sm:space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${selectedPolicy}-${lang}-${idx}`}
                className="glass rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <h3 className="text-base sm:text-lg font-bold">{item.title}</h3>
                </div>
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {item.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <Suspense>
          <PrivacyContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
