/** @jsx jsx */
import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { jsx } from 'theme-ui'
import Divider from '../elements/divider'
import Inner from '../elements/inner'
import Content from '../elements/content'
import SVG from './svg'
import { UpDown, UpDownWide } from '../styles/animations'
// @ts-ignore
//import Logo from "../@lekoarts/gatsby-theme-cara/sections/logo";
//import Intro from "../@lekoarts/gatsby-theme-cara/sections/intro";
import HomeLogo from './HomeLogo'

const Hero = ({ offset, factor = 1 }: { offset: number; factor?: number }) => (
    <div>
        <Divider speed={-0.1} offset={offset} factor={factor}>
            <SVG
                icon="box"
                width={6}
                color="icon_darkest"
                left="10%"
                top="10%"
            />
        </Divider>
        <Divider speed={-0.08} offset={offset} factor={factor}>
            <SVG
                icon="circle"
                width={6}
                color="icon_darkest"
                left="4%"
                top="20%"
            />
            <SVG
                icon="triangle"
                width={8}
                stroke
                color="icon_darkest"
                left="25%"
                top="5%"
            />
            <SVG
                icon="box"
                width={12}
                color="icon_darkest"
                left="60%"
                top="20%"
            />
            <SVG
                icon="circle"
                width={12}
                color="icon_darkest"
                left="50%"
                top="60%"
            />
            <SVG
                icon="triangle"
                width={16}
                stroke
                color="icon_darkest"
                left="30%"
                top="65%"
            />
            <SVG
                icon="circle"
                width={6}
                color="icon_darkest"
                left="70%"
                top="10%"
            />
            <SVG
                icon="box"
                width={6}
                color="icon_darker"
                left="57%"
                top="15%"
            />
            <SVG
                icon="upDown"
                width={8}
                color="icon_darkest"
                left="95%"
                top="90%"
            />
        </Divider>
        <Divider speed={-0.06} offset={offset} factor={factor}>
            <UpDown>
                <SVG
                    icon="upDown"
                    hiddenMobile
                    width={8}
                    color="icon_darkest"
                    left="45%"
                    top="10%"
                />
            </UpDown>
            <UpDownWide>
                <SVG
                    icon="triangle"
                    width={100}
                    stroke
                    color="icon_purple"
                    left="50%"
                    top="5%"
                />
                <SVG
                    icon="circle"
                    width={16}
                    color="icon_darker"
                    left="70%"
                    top="90%"
                />
            </UpDownWide>
        </Divider>
        <Divider speed={-0.04} offset={offset} factor={factor}>
            <SVG
                icon="hexa"
                width={8}
                stroke
                color="icon_darker"
                left="80%"
                top="50%"
            />
        </Divider>
        <Divider speed={-0.02} offset={offset} factor={factor}></Divider>
        <Divider speed={0} offset={offset} factor={factor}>
            <SVG
                icon="circle"
                hiddenMobile
                width={24}
                color="icon_darker"
                left="5%"
                top="70%"
            />
        </Divider>
        <Divider speed={0.02} offset={offset} factor={factor}>
            <UpDown>
                <SVG
                    icon="hexa"
                    width={16}
                    stroke
                    color="icon_darker"
                    left="20%"
                    top="40%"
                />
                <SVG
                    icon="upDown"
                    hiddenMobile
                    width={24}
                    color="icon_pink"
                    left="90%"
                    top="45%"
                />
                <SVG
                    icon="hexa"
                    width={256}
                    stroke
                    color="icon_red"
                    left="50%"
                    top="70%"
                />
            </UpDown>
            <UpDownWide>
                <SVG
                    icon="cross"
                    width={100}
                    stroke
                    color="icon_pink"
                    left="15%"
                    top="-3%"
                />
            </UpDownWide>
        </Divider>
        <Divider speed={0.04} offset={offset} factor={factor}>
            <SVG
                icon="upDown"
                hiddenMobile
                width={24}
                color="icon_darker"
                left="40%"
                top="80%"
            />
            <UpDown>
                <SVG
                    icon="triangle"
                    hiddenMobile
                    width={600}
                    stroke
                    color="icon_orange"
                    left="-17%"
                    top="-4%"
                />
            </UpDown>
        </Divider>
        <Divider speed={0.06} offset={offset} factor={factor}></Divider>
        <Divider speed={0.08} offset={offset} factor={factor}>
            <UpDownWide>
                <SVG
                    icon="box"
                    hiddenMobile
                    width={380}
                    color="icon_purple"
                    left="5%"
                    top="80%"
                />
            </UpDownWide>
        </Divider>
        <Divider speed={0.3} offset={offset} factor={factor}>
            <UpDownWide>
                <SVG
                    icon="arrowUp"
                    hiddenMobile
                    width={512}
                    color="icon_blue"
                    left="60%"
                    top="-30%"
                />
            </UpDownWide>
            <UpDown>
                <SVG
                    icon="circle"
                    width={1024}
                    color="icon_green"
                    left="37%"
                    top="5%"
                />
            </UpDown>
        </Divider>
        <HomeLogo offset factor />
    </div>
)

export default Hero
