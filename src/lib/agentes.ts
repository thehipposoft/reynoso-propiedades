export interface Agente {
  odooUserId: number;
  nombre: string;
  fotoUrl: string;
  email?: string | null;
  telefono?: string | null;
}

export const AGENTES: Agente[] = [
   {
     odooUserId: 7,
     nombre: "Juan Pablo Rocha",
     fotoUrl: "/assets/images/agentes/juan-pablo.jpeg",
   },
    {
     odooUserId: 20,
     nombre: "Ivana Veliz",
     fotoUrl: "/assets/images/agentes/ivana.jpeg",
   },
    {
     odooUserId: 13,
     nombre: "Rosario Moreno",
     fotoUrl: "/assets/images/agentes/rosario.jpeg",
   },
    {
     odooUserId: 8,
     nombre: "Virginia Luque",
     fotoUrl: "/assets/images/agentes/virginia.jpeg",
   },
];

export function getAgentePorOdooId(odooUserId: number): Agente | null {
  return AGENTES.find((agente) => agente.odooUserId === odooUserId) ?? null;
}
