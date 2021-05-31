import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

function Technology({ fixed, name }) {
  return (
    <div className="flex items-center">
      <GatsbyImage image={fixed} alt={name} />
      <p className="ml-3 mb-0 text-sm font-normal text-gray-300">{name}</p>
    </div>
  );
}

function Section({ children, title }) {
  return (
    <section
      className="container mx-auto flex flex-col gap-4"
      style={{ minWidth: 180 }}
    >
      <h3 className="m-0 font-bold text-gray-400 text-base uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function Sidebar() {
  const data = useStaticQuery(graphql`query Sidebar {
  icons: allFile(filter: {absolutePath: {regex: "^//tech//"}}) {
    edges {
      node {
        name
        relativePath
        image: childImageSharp {
          gatsbyImageData(
            width: 30
            height: 30
            quality: 100
            transformOptions: {fit: INSIDE}
            layout: FIXED
          )
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
    <div className="grid sticky top-10 gap-8 md:gap-7 grid-flow-col md:grid-flow-row overflow-auto">
      {Object.entries(sorted).map(([section, icons]) => (
        <Section title={section} key={section}>
          {icons.map(icon => (
            <Technology
              fixed={icon.image.fixed}
              name={icon.name}
              key={icon.name}
            />
          ))}
        </Section>
      ))}
    </div>
  )
}
