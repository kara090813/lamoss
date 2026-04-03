"use client";

import { useState, FormEvent } from "react";
import { Mail, Globe, User, Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inquiryTypes = [
  "일반 문의",
  "기술 지원",
  "비즈니스 제안",
  "커스텀 개발",
  "협업 요청",
  "기타",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_dfu9pzq",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_jn0zjxk",
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          inquiry_type: formData.type,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "MoXDZC3HQoIwTU43Z"
      );
      setStatus("success");
      setFormData({ name: "", email: "", company: "", type: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="relative py-14 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 grid-pattern" />
          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
            <h1 className="page-enter text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="gradient-text">고객센터</span>
            </h1>
            <p className="page-enter page-enter-delay-1 text-base sm:text-lg text-muted">
              궁금한 점이 있으시면 언제든지 연락주세요
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 sm:py-16">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
              {/* Contact Info */}
              <div className="page-enter space-y-5 sm:space-y-6">
                <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 space-y-5 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-bold">연락처 정보</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted">이메일</p>
                        <p className="text-sm font-medium break-all">kara090813@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Globe size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted">웹사이트</p>
                        <p className="text-sm font-medium">https://www.lamoss.net</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-muted">대표</p>
                        <p className="text-sm font-medium">이상윤</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inquiry Types */}
                <div className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">문의 유형</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { label: "일반 문의", desc: "서비스 이용 관련" },
                      { label: "제휴 문의", desc: "비즈니스 협력" },
                      { label: "기술 지원", desc: "앱 사용 문제" },
                      { label: "언론 문의", desc: "보도자료 관련" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-3 rounded-lg bg-surface-light/50"
                      >
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="page-enter page-enter-delay-1 lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 space-y-5 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        이름 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        이메일 <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        회사명
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors"
                        placeholder="(선택사항)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        문의 유형 <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors"
                      >
                        <option value="">선택하세요</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      제목 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors"
                      placeholder="문의 제목을 입력해주세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      메시지 <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors resize-none"
                      placeholder="문의 내용을 입력해주세요"
                    />
                  </div>

                  {/* Status Messages */}
                  {status === "success" && (
                    <div className="flex items-start gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                      <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                      문의가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다.
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-start gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      문의 전송에 실패했습니다. 잠시 후 다시 시도하거나 직접 이메일로 연락 부탁드립니다.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 w-full px-8 py-3.5 sm:py-4 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-medium rounded-xl transition-colors duration-200"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        문의하기
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
