// src/app/propiedades/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPropertyBySlug } from "@/src/lib/odoo/properties";
import { SinglePropiedad } from "@/src/components/SinglePropiedad";
import { Footer } from "@/src/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const propiedad = await getPropertyBySlug(slug);

  if (!propiedad) return { title: "Propiedad no encontrada" };

  return {
    title: `${propiedad.nombre} | Reynoso Bienes Raíces`,
    description: propiedad.descripcion?.slice(0, 160) ?? undefined,
  };
};

export default async function PropiedadPage({ params }: Props) {
  const { slug } = await params;
  const propiedad = await getPropertyBySlug(slug);

  if (!propiedad) notFound();

  return (
    <main>
      <SinglePropiedad propiedad={propiedad} />
      <Footer />
    </main>
  );
}