import React from "react";
import Image, { TechImage } from "./Image";

function Technology({ tech, children }) {
  return (
    <div className="flex items-center my-3">
      {tech}
      <p className="ml-2 mb-0 text-sm font-normal text-gray-500">{children}</p>
    </div>
  );
}

function Section({ children, title }) {
  return (
    <section className="container mx-auto mb-8">
      <h3 className="mb-5 font-bold text-gray-400 text-base uppercase">{title}</h3>
      {children}
    </section>
  );
}

export default function Sidebar() {
  return (
    <div>
      <Section title="Currently Loving">
        <Technology tech={<TechImage name="ts.png" alt="Typescript" />}>
          Typescript
        </Technology>
        <Technology tech={<TechImage name="ts.png" alt="Typescript" />}>
          Typescript
        </Technology>
      </Section>
      <Section title="Currently Learning">
        <Technology tech={<TechImage name="ts.png" alt="Typescript" />}>
          Typescript
        </Technology>
        <Technology tech={<TechImage name="ts.png" alt="Typescript" />}>
          Typescript
        </Technology>
      </Section>
      <Section title="Uhhhh...">
        <Technology tech={<TechImage name="ts.png" alt="Typescript" />}>
          Typescript
        </Technology>
        <Technology tech={<TechImage name="ts.png" alt="Typescript" />}>
          Typescript
        </Technology>
      </Section>
    </div>
  );
}
