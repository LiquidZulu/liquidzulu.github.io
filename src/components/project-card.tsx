/** @jsx jsx */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx } from 'theme-ui'
import { sha256 } from 'js-sha256'
import random_seed from 'random-seed'
import { tools } from '../util/color'

type ProjectCardProps = {
    slug: string
    useSlug: boolean
    link: string
    title: string
    children: React.ReactNode
    bg: string
}

const ProjectCard = ({
    slug,
    useSlug,
    link,
    title,
    children,
    bg,
}: ProjectCardProps) => {
    const META = useStaticQuery(graphql`
        query ProjectCardQuery {
            site(siteMetadata: { siteTitle: {} }) {
                siteMetadata {
                    env {
                        PROJECT_CARD__HUE_SHIFT_INITIAL
                        PROJECT_CARD__HUE_SHIFT_SUBSEQUENT
                    }
                    projects {
                        description
                        slug
                        title
                    }
                }
            }
        }
    `).site.siteMetadata
    return (
        <>
            <a
                href={useSlug ? link : `/${slug}`}
                target="_blank"
                rel="noreferrer noopener"
                sx={{
                    width: `100%`,
                    boxShadow: `lg`,
                    position: `relative`,
                    textDecoration: `none`,
                    borderRadius: `lg`,
                    px: 4,
                    py: [4, 5],
                    color: `white`,
                    background:
                        typeof bg === 'undefined'
                            ? (() => {
                                  const hue = tools.hue.shift(
                                      random_seed.create(
                                          sha256(
                                              JSON.stringify({
                                                  slug,
                                                  useSlug,
                                                  link,
                                                  title,
                                                  children,
                                                  bg,
                                              })
                                          )
                                      )(360),
                                      META.env.PROJECT_CARD__HUE_SHIFT_INITIAL
                                  )
                                  const shifted = tools.hue.shift(
                                      hue,
                                      META.env
                                          .PROJECT_CARD__HUE_SHIFT_SUBSEQUENT
                                  )
                                  return `linear-gradient(to right, hsla(${hue}, 83%, 45%, 1) 0%, hsla(${shifted}, 83%, 45%, 1) 100%)`
                              })()
                            : bg,
                    transition: `all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important`,
                    '&:hover': {
                        color: `white !important`,
                        transform: `translateY(-5px)`,
                        boxShadow: `xl`,
                    },
                }}
            >
                <div
                    sx={{
                        opacity: 0.85,
                        textShadow: `0 2px 10px rgba(0, 0, 0, 0.3)`,
                    }}
                >
                    {useSlug
                        ? META.projects.find((i) => i.slug === slug).description
                        : children}
                </div>
                <div
                    sx={{
                        textTransform: `uppercase`,
                        letterSpacing: `wide`,
                        pt: 4,
                        fontSize: [4, 5],
                        fontWeight: `medium`,
                        lineHeight: 1,
                    }}
                >
                    {useSlug
                        ? META.projects.find((i) => i.slug === slug).title
                        : title}
                </div>
            </a>
        </>
    )
}

export default ProjectCard
