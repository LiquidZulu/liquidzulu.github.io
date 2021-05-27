/** @jsx jsx */
import { Box, Flex, Link, jsx } from 'theme-ui'

const Footer = () => {
    return (
        <Box as="footer" variant="footer">
            Made with <a href="https://www.gatsbyjs.com/">gatsby.js</a>,
            licensed under{' '}
            <a href="https://github.com/liquidzulu/liquidzulu.github.io/LICENSE">
                GPL-3.0
            </a>
            <br />
            <Flex
                sx={{
                    justifyContent: `center`,
                    alignItems: `center`,
                    mt: 3,
                    color: `text`,
                    fontWeight: `semibold`,
                    a: { color: `text` },
                }}
            >
                <img
                    width="60"
                    height="60"
                    src="/logo.svg"
                    alt="LiquidZulu Logo"
                />
            </Flex>
        </Box>
    )
}

export default Footer
