import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProperties, getPropertyBySlug } from "@/src/lib/api/properties";
import { SinglePropiedad } from "@/src/components/SinglePropiedad";
import { Footer } from "@/src/components/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const propiedades = await getProperties();
  return propiedades.map(({ slug }) => ({ slug }));
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const propiedad = await getPropertyBySlug(slug);

  if (!propiedad) return { title: "Propiedad no encontrada" };

  return {
    title: `${propiedad.titulo} | Reynoso Bienes Raíces`,
    description: propiedad.descripcion.replace(/<[^>]*>/g, " ").slice(0, 160),
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
