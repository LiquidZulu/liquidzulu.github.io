import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { container, item, logo, title, subtitle } from './HomeLogo.module.css'
import { ReactComponent as LogoSVG } from '../../static/logo.svg'
import Content from '../elements/content'
import Inner from '../elements/inner'
import { UpDown, UpDownWide } from '../styles/animations'

export default function HomeLogo({
    offset,
    factor = 1,
}: {
    offset: number
    factor?: number
}) {
    const META = useStaticQuery(graphql`
        query HomeLogoQuery {
            site(siteMetadata: { siteTitle: {} }) {
                siteMetadata {
                    title
                    subtitle
                    logo {
                        png
                    }
                }
            }
        }
    `).site.siteMetadata
    return (
        <>
            <UpDown>
                <Content
                    sx={{ variant: `texts.bigger` }}
                    speed={0.2}
                    offset={0}
                    factor={0.8}
                >
                    <Inner>
                        <center>
                            <img src={META.logo.png} className={logo} />
                        </center>
                    </Inner>
                </Content>
            </UpDown>
            <Content
                sx={{ variant: `texts.bigger` }}
                speed={0.8}
                offset={0}
                factor={1.3}
            >
                <Inner>
                    <h1 className={title}>{META.title}</h1>
                    <h2 className={subtitle}>{META.subtitle}</h2>
                </Inner>
            </Content>
        </>
    )
}
