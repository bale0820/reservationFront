// components/HeroSection.tsx
type HeroProps = { title: string; subtitle: string; bg: string };

export function HeroSection({ title, subtitle, bg }: HeroProps) {
    return (
        <section style={{
            position: "relative",
            background: bg,
            color: "white",
            padding: "96px 24px",
            textAlign: "center",
            marginBottom: "64px",
        }}>
            <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "24px" }}>{title}</h1>
            <p style={{ fontSize: "18px", maxWidth: "768px", margin: "0 auto", opacity: 0.9 }}>
                {subtitle}
            </p>
        </section>
    );
}
