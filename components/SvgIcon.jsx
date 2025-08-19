'use client';
import { useTheme } from 'nextra-theme-docs';
import React from 'react';

const SvgIcon = ({ 
  src, 
  alt = "Icon", 
  width = 24, 
  height = 24, 
  color = "", 
  className = "",
  ...props 
}) => {
  const [svgContent, setSvgContent] = React.useState('');
  const theme = useTheme();
  React.useEffect(() => {
    if (src) {
      fetch(src)
        .then(response => response.text())
        .then(svg => {
          let modifiedSvg = svg;
          
          // Handle theme-based color changes
          if (color) {
            // Use provided color
            modifiedSvg = modifiedSvg.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${color}"`);
            modifiedSvg = modifiedSvg.replace(/fill="#[0-9a-fA-F]{3}"/g, `fill="${color}"`);
            modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, `fill="${color}"`);
          } else {
            // Auto-adjust based on theme (handle system theme)
            const isDarkMode = theme.theme === 'dark' || 
              (theme.theme === 'system' && theme.resolvedTheme === 'dark');
            const targetColor = isDarkMode ? '#ffffff' : '#000000';
            modifiedSvg = modifiedSvg.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${targetColor}"`);
            modifiedSvg = modifiedSvg.replace(/fill="#[0-9a-fA-F]{3}"/g, `fill="${targetColor}"`);
            modifiedSvg = modifiedSvg.replace(/fill="[^"]*"/g, `fill="${targetColor}"`);
          }
          
          setSvgContent(modifiedSvg);
        })
        .catch(error => console.error('Error loading SVG:', error));
    }
  }, [src, color, theme.theme, theme.resolvedTheme]);

  if (!svgContent) {
    return null;
  }

  return (
    <div
      className={`svg-icon ${className}`}
      style={{ 
        width, 
        height, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};

export default SvgIcon;