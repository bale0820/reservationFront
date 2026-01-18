// components/FeatureCard.tsx
import { useRouter } from "next/navigation";
import { Feature } from "@/types/feature";

export function FeatureCard({ feature }: { feature: Feature }) {
    const router = useRouter();

    return (
        <div className="featureCard bg-white p-8 rounded-lg shadow text-center">
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
            <button
                className="mt-4 px-4 py-2  text-white rounded "
                onClick={() => router.push(feature.path)}
            >
                {feature.buttonText}
            </button>
        </div>
    );
}
