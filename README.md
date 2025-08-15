# Course Landing Page Editor

A WYSIWYG drag-and-drop editor for creating course landing pages, built with React, TypeScript, and Tailwind CSS.

## Features

- **Drag & Drop Interface**: Easily add and reorder components
- **Editable Components**: 
  - Feature List (What you'll learn)
  - Text Blocks (About course, Who should join)
  - Instructor profiles
  - Promo banners
  - Skills sections
  - FAQs
- **Hero Section**: Editable fields for title, description, enroll button, and video
- **Live Preview**: Switch between edit and preview modes
- **JSON Export**: Export your course data in the required format
- **Auto-save**: Automatically saves to browser localStorage
- **Component Properties**: Edit component properties in the right panel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. The development server will automatically open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## How to Use

### Basic Workflow

1. **Add Components**: Drag components from the left palette to the main canvas
   - Feature List: For "What you'll learn" sections
   - Text Block: For rich text content like "About this course"
   - Instructors: For instructor profiles
   - Promo Banner: For call-to-action sections
   - Skills: For displaying skills/topics
   - FAQs: For frequently asked questions

2. **Edit Components**: 
   - Click on any component to select it
   - Use the properties panel on the right to edit content
   - The hero section (fixed at top) can be edited by clicking on it

3. **Reorder Components**: Drag components by their drag handle (⋮⋮ icon) to reorder

4. **Component Actions**:
   - **Duplicate**: Copy a component (⧉ icon)
   - **Delete**: Remove a component (× icon)

5. **Preview**: Click the "Preview" button to see how your course page will look

6. **Export**: Click "Export JSON" to download your course data

### Component Details

#### Hero Section
- Fixed position at the top
- Editable: Title, description, enroll button text/URL, video ID
- Background styling and images supported

#### Feature List
- Card or list style options
- Multiple features with titles and descriptions
- Perfect for "What you'll learn" sections

#### Text Block
- Rich text content with basic markdown support
- Headers, bold text, bullet points
- Good for "About this course" or "Who should join" sections

#### Instructors
- Profile image, name, job title, bio
- Social media links (LinkedIn, Twitter, Website)
- Supports multiple instructors

#### Promo Banner
- Call-to-action banners
- Customizable button styles (primary, secondary, white)
- Background gradients and images

#### Skills
- Tag-style display of skills/topics
- Easy text-based editing (one skill per line)

#### FAQs
- Expandable question/answer pairs
- Add/remove FAQ items dynamically

## Data Storage

- **Auto-save**: Changes are automatically saved to browser localStorage
- **Export**: Generate JSON files compatible with the course schema
- **Import**: The editor loads saved data when refreshed

## File Structure

```
src/
├── components/
│   ├── editor/              # Editor interface components
│   ├── course-components/   # Course page components
│   └── preview/            # Preview mode components
├── types/                  # TypeScript interfaces
├── utils/                  # Utilities (storage, mock data)
└── styles/                 # CSS styles
```

## Customization

The editor outputs JSON in a specific schema format. You can:

1. Modify component templates in `src/utils/mockData.ts`
2. Add new component types by:
   - Adding the type to `src/types/course.ts`
   - Creating the component in `src/components/course-components/`
   - Adding it to the palette and form editors

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)

## Development

### Scripts

- `npm run dev`: Start development server at http://localhost:3000
- `npm run build`: Production build
- `npm run build:dev`: Development build (files only, no server)
- `npm test`: Run tests (Vitest)

### Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **@dnd-kit**: Drag and drop functionality
- **react-hook-form**: Form management
- **Webpack**: Build tooling

## Limitations

- Image upload is not implemented (uses URLs only)
- Course outline section is static (not editable)
- Limited to predefined component types
- Browser storage only (no server persistence)

## License

This project is for internal use.