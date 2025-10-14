// components/PageTemplate.tsx
import Link from "next/link";
import { HeroSection } from "./HeroSection";
import { Page } from "@/types/page";


export function PageTemplate({ hero, image, sectionTitle, paragraphs, features, cta }: Page) {
    return (
        <main style={{ fontFamily: "Arial, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
            {/* Hero */}
            <HeroSection {...hero} />
            {/* Content */}
            <section style={{
                maxWidth: "1200px", margin: "0 auto", padding: "64px 24px",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center"
            }}>
                <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
                    <img src={image} alt={sectionTitle} style={{ width: "100%", height: "auto", objectFit: "cover" }} />
                </div>
                <div>
                    <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a", marginBottom: "16px" }}>{sectionTitle}</h2>
                    {paragraphs.map((p, i) => <p key={i} style={{ color: "#374151", fontSize: "18px", lineHeight: 1.7, marginBottom: "16px" }}>{p}</p>)}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "24px", paddingTop: "24px" }}>
                        {features.map((f, i) => (
                            <div key={i} style={{ background: "#eff6ff", padding: "16px", borderRadius: "12px" }}>
                                <h3 style={{ fontWeight: "600", color: "#16a34a", marginBottom: "8px" }}>{f.icon} {f.title}</h3>
                                <p style={{ fontSize: "14px", color: "#4b5563" }}>{f.text}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ paddingTop: "32px" }}>
                        <Link href={cta.href} style={{
                            backgroundColor: "#16a34a", color: "white", padding: "12px 24px",
                            borderRadius: "8px", fontWeight: "600", textDecoration: "none"
                        }}>
                            {cta.label}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
