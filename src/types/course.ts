// Base interfaces for course data structure
export interface Topic {
  text: string;
}

export interface Skill {
  text: string;
}

export interface Partnership {
  title: string;
  url: string;
  logo: string;
  icon: string;
}

export interface EnrollButton {
  label: string;
  enrollUrl: string;
  enrollHubspotFormId: string;
}

export interface OGData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageType: string;
  type: string;
  siteName: string;
}

export interface HeroData {
  titleColor: string;
  backgroundCSS: string;
  illustrationImage: string;
  backgroundImage: string | null;
}

export interface VideoData {
  youtubeVideoId: string;
  thumbnail: string;
}

// Component-specific interfaces
export interface FeatureListItem {
  title?: string;
  description: string;
}

export interface FeatureListComponent {
  component: 'feature_list';
  key: string;
  title: string;
  description?: string;
  itemStyle?: 'card' | 'list';
  features: FeatureListItem[];
}

export interface TextBlockComponent {
  component: 'text_block';
  key: string;
  title: string;
  body: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  website?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
}

export interface InstructorData {
  name: string;
  jobTitle: string;
  description: string;
  socialLinks: SocialLinks;
  featuredImage: string;
}

export interface InstructorsComponent {
  component: 'instructors';
  key: string;
  instructors: InstructorData[];
}

export interface TestimonialData {
  name: string;
  jobTitle: string;
  content: string;
}

export interface TestimonialsComponent {
  component: 'testimonials';
  key: string;
  title: string;
  testimonials: TestimonialData[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQsComponent {
  component: 'faqs';
  key: string;
  faqs: FAQItem[];
}

export interface PromoBannerButton {
  url: string;
  hubspotFormId: string;
  label: string;
  variant: string;
}

export interface PromoBannerComponent {
  component: 'promo_banner';
  key: string;
  title: string;
  button: PromoBannerButton;
  backgroundCSS: string;
  illustrationImage: string;
}

export interface SkillsComponent {
  component: 'skills';
  key: string;
  title: string;
  skills: Skill[];
}

export interface NewsletterComponent {
  component: 'newsletter';
  key: string;
  title: string;
  description: string;
  hubspotFormId: string;
}

// Union type for all page layout components
export type PageLayoutComponent = 
  | FeatureListComponent
  | TextBlockComponent
  | InstructorsComponent
  | TestimonialsComponent
  | FAQsComponent
  | PromoBannerComponent
  | SkillsComponent
  | NewsletterComponent;

// Course interface
export interface CourseOutline {
  title: string;
  slug: string;
  content: string;
}

export interface Syllabus {
  courses: CourseOutline[];
}

export interface CourseData {
  title: string;
  slug: string;
  description: string;
  releasedAt: string;
  lastEditAt: string;
  previewImage: string;
  coverImage: string;
  curriculumType: string;
  levels: string[];
  topics: Topic[];
  partnerships: Partnership[];
  skills: Skill[];
  enrollButton: EnrollButton;
  og: OGData;
  hero: HeroData;
  video: VideoData;
  pageLayout: PageLayoutComponent[];
  syllabus: Syllabus;
}

// Editor-specific types
export interface EditorState {
  courseData: CourseData;
  selectedComponentId: string | null;
  isDragging: boolean;
  mode: 'edit' | 'preview';
}

export interface ComponentType {
  type: PageLayoutComponent['component'];
  label: string;
  icon: string;
  description: string;
}

export interface DragItem {
  id: string;
  type: 'new-component' | 'existing-component';
  componentType: PageLayoutComponent['component'];
}