import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Callout, Cards, Steps, Tabs, Bleed, FileTree } from 'nextra/components'

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components with Nextra components
export function useMDXComponents(components) {
    return {
        ...themeComponents,
        Callout,
        Cards,
        Steps,
        Tabs,
        Bleed,
        FileTree,
        ...components
    }
}