"use client";
import Image from "next/image";
import Link from "next/link";

export default function TaxLawyerLandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Section */}
        <div className="space-y-6">
          <span className="uppercase tracking-widest text-sm text-gray-600">
            Tax Lawyer
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            Guiding You <br />
            Through <span className="text-green-600">Tax</span> <br />
            Complexity
          </h1>
          <p className="text-gray-500 max-w-md">
            We simplify tax complexities with tailored strategies, resolving
            disputes and ensuring compliance for local and international needs.
          </p>
          <Link
            href="#"
            className="inline-block px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-full font-medium transition"
          >
            Start Consultation
          </Link>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              "International Taxation",
              "Tax Disputes",
              "Tax Planning",
              "Tax Compliance",
              "Consultations",
            ].map((label, idx) => (
              <span
                key={idx}
                className="px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-600"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg bg-green-900 p-6">
            <Image
              src="/images/farm.png" // <-- adjust if necessary
              alt="Justice Statue with Leaves"
              width={600}
              height={600}
              className="rounded-3xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
