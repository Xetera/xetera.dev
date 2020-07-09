import React from "react";
import Image, { TechImage } from "./Image";

function Technology({ tech, name }) {
  return (
    <div className="flex items-center my-3">
      <TechImage name={tech} alt={name} />
      <p className="ml-3 mb-0 text-sm font-normal text-gray-500">{name}</p>
    </div>
  );
}

function Section({ children, title }) {
  return (
    <section className="container mx-auto mb-8">
      <h3 className="mb-5 font-bold text-gray-400 text-base uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

export default function Sidebar() {
  return (
    <div>
      <Section title="Loving">
        <Technology tech="ts.png" name="Typescript" />
        <Technology tech="haskell.png" name="Haskell" />
        <Technology tech="react.png" name="React" />
        <Technology tech="graphql.png" name="GraphQL" />
        <Technology tech="postgres.png" name="PostgreSQL" />
      </Section>
      <Section title="Learning">
        <Technology tech="kubernetes.png" name="Kubernetes" />
        <Technology tech="rust.png" name="Rust" />
      </Section>
      <Section title="Wanting">
        <Technology tech="elixir.png" name="Elixir" />
        <Technology tech="rabbitmq.png" name="RabbitMQ" />
      </Section>
    </div>
  );
}
