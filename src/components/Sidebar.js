import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

function Technology({ fixed, name }) {
  return (
    <div className="flex items-center my-3">
      <Img fixed={fixed} alt={name} />
      <p className="ml-3 mb-0 text-sm font-normal text-gray-500">{name}</p>
    </div>
  )
}

function Section({ children, title }) {
  return (
    <section className="container mx-auto mb-8">
      <h3 className="mb-5 font-bold text-gray-400 text-base uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function Sidebar() {
  const data = useStaticQuery(graphql`
    query Sidebar {
      icons: allFile(filter: { absolutePath: { regex: "//tech/" } }) {
        edges {
          node {
            name
            relativePath
            image: childImageSharp {
              fixed(width: 30, height: 30, fit: INSIDE, quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)
  const sorted = data.icons.edges.reduce((all, { node: icon }) => {
    const [, type] = icon.relativePath.split("/")
    if (!all[type]) {
      all[type] = []
    }
    all[type].push(icon)
    return all
  }, {})
  return (
    <div className="xs:flex-col md:flex xl:block">
      {Object.entries(sorted).map(([section, icons]) => (
        <Section title={section} key={section}>
          {icons.map(icon => (
            // <h1>{JSON.stringify(icon)}</h1>
            <Technology
              fixed={icon.image.fixed}
              name={icon.name}
              key={icon.name}
            />
          ))}
        </Section>
      ))}
      {/* <Section title="Learning">
        <Technology tech="rust.png" name="Rust" />
      </Section>
      <Section title="Wanting">
        <Technology tech="elixir.png" name="Elixir" />
        <Technology tech="rabbitmq.png" name="RabbitMQ" />
      </Section> */}
    </div>
  )
}
