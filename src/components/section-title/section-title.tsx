import React from "react";

export default function SectionTitle({ title }: { title: string }) {
  return <h2 className="mb-2 text-2xl font-bold text-indigo-900">{title}</h2>;
}
