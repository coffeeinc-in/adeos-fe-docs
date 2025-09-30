# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ADEOS FE is a comprehensive documentation platform built with Nextra 4 and Next.js 15, focusing on documenting the ADEOS (Annotation Detection and Extraction Optimization System) - a real-time annotation processing system. The documentation covers WebSocket architecture, Python backend integration, Redis-based queue management, and frontend implementation patterns.

## Common Commands

### Development
```bash
# Install dependencies (uses yarn by default)
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

### Post-Build
After building, Pagefind automatically indexes the site:
```bash
# This runs automatically after 'yarn build'
pagefind --site .next/server/app --output-path public/_pagefind
```

## Architecture

### Framework Stack
- **Next.js 15** with App Router (`app/` directory)
- **Nextra 4** for documentation site generation
- **Nextra Theme Docs** for documentation styling
- **Pagefind** for full-text search indexing
- **TypeScript** with relaxed strictness (`strict: false`)

### Directory Structure

```
├── app/                          # Next.js App Router
│   ├── [[...mdxPath]]/          # Dynamic MDX page routing
│   │   └── page.jsx             # MDX page renderer
│   ├── layout.tsx               # Root layout with Nextra components
│   └── api/                     # API routes (currently empty)
├── content/                      # Documentation content
│   ├── _meta.ts                 # Top-level navigation config
│   ├── index.mdx                # Homepage
│   ├── demo-v1/                 # Demo v1 documentation
│   │   └── _meta.ts             # Demo v1 navigation
│   └── sprint-02/               # Sprint 02 documentation
│       └── _meta.ts             # Sprint 02 navigation
├── public/                       # Static assets
│   └── _pagefind/               # Generated search index
└── mdx-components.js            # MDX component registry
```

### Key Files

**`app/layout.tsx`**: Root layout defining:
- Site metadata (title: "Adeos FE", description, Open Graph, Twitter cards)
- Custom navbar with logo
- Banner announcement for open source contributions
- Footer with Coffee Inc. branding
- GitHub repository link: `https://github.com/coffeeinc-in/adeos-fe-docs`

**`app/[[...mdxPath]]/page.jsx`**: Dynamic MDX page handler that:
- Uses `generateStaticParamsFor('mdxPath')` for static generation
- Imports and renders MDX pages from `content/` directory
- Generates metadata from MDX frontmatter
- Wraps content with custom MDX components

**`mdx-components.js`**: Exports custom MDX components including:
- Callout, Cards, Steps, Tabs, Bleed, FileTree from Nextra

**`next.config.mjs`**: Nextra configuration with:
- Search enabled
- Default copy code button enabled

### Content Organization

Documentation is organized in `content/` directory with `_meta.ts` files defining navigation structure:
- Each directory needs a `_meta.ts` file for navigation
- Format: `export default { 'file-or-dir-name': 'Display Title' }`
- `index` key refers to `index.mdx` in that directory

Current sections:
- **Demo v1**: File handling, prefill data, analytics/telemetry
- **Sprint 02**: WebSocket architecture, Python backend, Redis integration, extraction workers, UI optimizations, deployment configs
- **Existing Flow (ADEOS FE)**: Frontend file processing flow from upload to annotation extraction
- **Backend Processing (FastAPI)**: Backend API documentation covering file upload, page image generation, and batch processing with WebSocket

## Path Aliases

TypeScript paths configured in `tsconfig.json`:
```typescript
"@/*": ["./*"]  // Root-relative imports
```

## Documentation Content

The repository documents a real-time annotation processing system with:
- Next.js 15 frontend with WebSocket context
- Python FastAPI backend with Redis services
- Node.js WebSocket server for real-time updates
- Text, table, and diagram extraction workers
- Batch processing with API fallback

When adding new documentation:
1. Create `.mdx` files in appropriate `content/` subdirectory
2. Update corresponding `_meta.ts` file with navigation entry
3. Follow existing structure: Overview → Architecture → Implementation → Examples
4. Include code examples, diagrams (Mermaid supported), and real-world use cases

### Documentation Standards

Reference: `content/existing-flow/file-selection.mdx` as the standard template for documentation structure.

**Structure Pattern**:
1. **Title and Overview**: Brief description of what the document covers
2. **Process Overview**: High-level summary of the workflow
3. **Flow Diagrams**: Visual representations using Mermaid
   - Use Mermaid `graph TD` for flowcharts
   - Use `sequenceDiagram` for interaction flows
   - Apply dark-mode-friendly colors:
     - Blue (#2563eb): Start/User actions
     - Orange (#f59e0b): Navigation
     - Red (#dc2626): API calls
     - Green (#16a34a): Success/End states
   - Always include `color:#fff` for text visibility in dark mode
4. **Step-by-Step Flow**: Use `<Steps>` component for sequential processes
5. **Key Components**: Tables showing component responsibilities and API endpoints
6. **Error Handling**: Use `<Callout type="warning">` for error scenarios with code examples
7. **Performance Optimizations**: List optimization techniques
8. **API Contract**: Document all API endpoints with request/response examples
9. **Related Documentation**: Link to related pages

**Mermaid Diagram Best Practices**:
- Always use vibrant, high-contrast colors
- Include stroke colors and width for better visibility
- Set text color to white (`color:#fff`) for all styled nodes
- Example styling:
  ```
  style NodeName fill:#2563eb,stroke:#1e40af,stroke-width:2px,color:#fff
  ```

### Backend Documentation Standards

Reference: `content/backend-processing/batch-processing.mdx` as the standard template for backend API documentation.

**Backend Structure Pattern**:
1. **Title and Overview**: Brief description of the backend process/API
2. **Process Overview**: High-level summary of what the backend does
3. **Complete Flow Diagram**: Use Mermaid `graph TD` (flow diagrams) for backend processes
   - **IMPORTANT**: Always use flow diagrams (`graph TD`), NOT sequence diagrams
   - Include validation, processing, storage, and response steps
   - Use the same dark-mode-friendly color palette
   - Show decision points (success/error paths)
   - Avoid special characters (curly braces, colons, commas) in node labels
4. **API Endpoint**: Document HTTP method, route, headers, parameters
   - Include full request body examples (JSON/multipart)
   - Include full response examples
   - Document query parameters and headers
5. **Implementation Flow**: Use `<Steps>` component for backend logic
   - Authentication/validation
   - Database operations
   - External service calls (Azure, AI models)
   - Background tasks
   - Response formatting
6. **Database Schema**: Show MongoDB document structure with field types
7. **Background Tasks**: Document async operations with code examples
8. **Error Handling**: Use `<Callout type="warning">` with error scenarios
   - HTTP status codes
   - Error response formats
   - Recovery strategies
9. **Performance Metrics**: Tables showing timing, throughput, optimization
10. **Code Reference**: Link to actual backend file paths with line numbers
11. **Related Documentation**: Link to frontend docs and other backend pages

**Backend API Documentation Format**:
```markdown
### POST /api/endpoint/path

Brief description of what the endpoint does.

**Headers**:
\```http
Authorization: Bearer {jwt_token}
Content-Type: application/json
\```

**Query Parameters**:
- `param_name` (required): Description

**Request Body**:
\```json
{
  "field": "value"
}
\```

**Response**:
\```json
{
  "result": "value"
}
\```

**Response Time**: Expected timing information
```

**Database Schema Documentation**:
```markdown
### collection_name

\```javascript
{
  _id: ObjectId("..."),
  fieldName: "type",  // Description
  nestedField: {
    subField: value
  },
  createdAt: ISODate("...")
}
\```
```

**Python Code Examples**:
- Include imports at the top
- Show async/await patterns
- Include error handling (try/except)
- Add comments for complex logic
- Reference actual backend file paths

**Flow Diagram Best Practices**:
- Always use `graph TD` (top-down flow diagrams) for backend processes
- Label nodes clearly: `[Service: Action]` or `[Action Description]`
- Use decision nodes `{}` for conditional logic (e.g., `{Check Credits?}`)
- Show error paths with edge labels: `-->|Error| ErrorNode`
- Apply consistent color coding:
  - Blue: Entry points (API requests)
  - Orange: Processing steps (transformations, validations)
  - Red: External service calls (Azure, MongoDB, AI)
  - Green: Success states (responses, completions)
  - Red: Error states

## MDX Features

Available components in MDX files:
- `<Callout>`: Highlight important information
- `<Cards>`: Grid of cards for navigation
- `<Steps>`: Numbered step-by-step instructions
- `<Tabs>`: Tabbed content sections
- `<Bleed>`: Full-width content
- `<FileTree>`: Visual file/directory structure

## Search

Pagefind generates search index after build. The search functionality is built into Nextra theme and automatically includes all MDX content.

## Documentation based on ADEOS Project

File path: /Users/ghost/Desktop/Coffee/Adeos/adeos-fe

