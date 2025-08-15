import { CourseData, PageLayoutComponent } from '../types/course';

export const createDefaultCourseData = (): CourseData => ({
  title: "New Course",
  slug: "new-course",
  description: "Course description here",
  releasedAt: new Date().toISOString(),
  lastEditAt: new Date().toISOString(),
  previewImage: "",
  coverImage: "",
  curriculumType: "short_course",
  levels: ["beginner"],
  topics: [
    { text: "Machine Learning" },
    { text: "AI" }
  ],
  partnerships: [],
  skills: [
    { text: "Python Programming" },
    { text: "Data Analysis" }
  ],
  enrollButton: {
    label: "Enroll Now",
    enrollUrl: "#",
    enrollHubspotFormId: ""
  },
  og: {
    title: "New Course",
    description: "Course description here",
    image: "",
    imageAlt: "Course Image",
    imageType: "image/png",
    type: "website",
    siteName: "DeepLearning.AI"
  },
  hero: {
    titleColor: "#ffffff",
    backgroundCSS: "linear-gradient(318deg, rgba(25,25,182,1) 0%, rgba(38,38,102,1) 100%)",
    illustrationImage: "",
    backgroundImage: null
  },
  video: {
    youtubeVideoId: "",
    thumbnail: ""
  },
  pageLayout: [],
  syllabus: {
    courses: [
      {
        title: "Course Module 1",
        slug: "course-module-1",
        content: "## Module 1: Introduction\n\nThis is a sample course module."
      }
    ]
  }
});

export const defaultComponents: Record<PageLayoutComponent['component'], () => PageLayoutComponent> = {
  feature_list: () => ({
    component: 'feature_list',
    key: `feature-list-${Date.now()}`,
    title: "What you'll learn",
    features: [
      {
        description: "Learn the fundamentals of the subject"
      },
      {
        description: "Apply concepts through hands-on practice"
      }
    ]
  }),
  
  text_block: () => ({
    component: 'text_block',
    key: `text-block-${Date.now()}`,
    title: "About this course",
    body: "This course will teach you the essential skills and knowledge needed to succeed in this field."
  }),
  
  instructors: () => ({
    component: 'instructors',
    key: `instructors-${Date.now()}`,
    instructors: [
      {
        name: "Instructor Name",
        jobTitle: "Expert in Field",
        description: "Brief instructor bio and background",
        socialLinks: {
          linkedin: "#",
          twitter: "#",
          website: "#"
        },
        featuredImage: ""
      }
    ]
  }),
  
  testimonials: () => ({
    component: 'testimonials',
    key: `testimonials-${Date.now()}`,
    title: "What learners say",
    testimonials: [
      {
        name: "Student Name",
        jobTitle: "Job Title",
        content: "This course was incredibly valuable and well-structured."
      }
    ]
  }),
  
  faqs: () => ({
    component: 'faqs',
    key: `faqs-${Date.now()}`,
    faqs: [
      {
        question: "How long is this course?",
        answer: "The course takes approximately X hours to complete."
      },
      {
        question: "What prerequisites are needed?",
        answer: "No prior experience is required."
      }
    ]
  }),
  
  promo_banner: () => ({
    component: 'promo_banner',
    key: `promo-banner-${Date.now()}`,
    title: "Special Offer - Enroll Today!",
    button: {
      url: "#",
      hubspotFormId: "",
      label: "Enroll Now",
      variant: "primary"
    },
    backgroundCSS: "",
    illustrationImage: ""
  }),
  
  skills: () => ({
    component: 'skills',
    key: `skills-${Date.now()}`,
    title: "Skills you'll gain",
    skills: [
      { text: "Skill 1" },
      { text: "Skill 2" },
      { text: "Skill 3" }
    ]
  }),
  
  newsletter: () => ({
    component: 'newsletter',
    key: `newsletter-${Date.now()}`,
    title: "Stay updated",
    description: "Get the latest news and updates about our courses",
    hubspotFormId: ""
  })
};