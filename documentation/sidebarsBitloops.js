module.exports = {
  bitloopsLanguageSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      link: {
        type: 'generated-index',
        description: 'This section introduces Bitloops Language (BL) and our Vision. We also explain why BL is different to other programming languages, and how developers write clean, well-designed code, build high-quality, maintainable software and learn important software development principles that senior engineers understand after decades of experience.',
      },
      items: [
        'introduction/welcome',
        'introduction/Bitloops_at_a_glance',
        'introduction/bigidea',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        description: 'This is an introductory tutorial for developers learn how Bitloops Language (BL) works and gain some confidence using Bitloops Language. You will lear how to install BL, how it works through a quick demonstration and see some example code snippets.',
      },
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/code-examples',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'generated-index',
        description: 'Bitloops Language (BL) has been designed and built by incorporating several software engineering principles, best practices and patterns that greatly improve the quality of a software system. This chapter provides a description of each BL element, which are the building blocks of the Language itself.',
      },
      items: [
        'reference/application-error',
        'reference/domain-error',
        'reference/domain-event',
      ],
    },
    {
      type: 'category',
      label: 'How-to Guides',
      link: {
        type: 'generated-index',
        description: 'This section provides an overview of how to use elements of Bitloops Language (BL), and how to use these elements when writing code and building software using BL.',
      },
      items: [
        'how-to-guides/define-a-dto',
        'how-to-guides/define-a-value-object',
        'how-to-guides/define-an-entity',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: {
        type: 'generated-index',
        description: 'This chapter focuses on providing in-depth tutorials using the Bitloops Language. These tutorials are comprehensive lessons on how to build specific functions, microservices or applications using the Bitloops Language. We provide you with a detailed, step-by-step instructions of how to complete a particular project.',
      },
      items: [
        'tutorials/building-todo-app',
      ],
    },
    'faqs',
    'getting-help',
    {
      type: 'category',
      label: 'Learning',
      link: {
        type: 'generated-index',
        description: 'This chapter provides a broad and detailed overview of how software should be built. Here you will find reference material regarding software development principles, design patterns, methodologies and best-practices.',
      },
      items: [
        {
          type: 'category',
          label: 'Software Architecture',
          link: {
            type: 'generated-index',
            description: 'Unlock the power of software architecture with this in-depth review. Discover the key principles, patterns, and practices of software architecture, and learn how to create systems that are scalable, maintainable, and secure. Whether you are a seasoned architect or a newcomer to the field, this article will equip you with the knowledge and insights you need to build software that meets the needs of your users and your business.',
          },
          items: [
            'learning/software-architecture/layered-architecture',
            'learning/software-architecture/hexagonal-architecture',
            'learning/software-architecture/onion-architecture',
            'learning/software-architecture/clean-architecture',
            'learning/software-architecture/event-driven-architecture',
            'learning/software-architecture/microservices-architecture',
          ],
        },
        {
          type: 'category',
          label: 'Software Design',
          link: {
            type: 'generated-index',
            description: 'Looking for the latest best practices and principles in software engineering? Our experts cover the latest software engineering methodologies, design patterns and practices. Learn how to create scalable, maintainable, and performant software systems using DDD, Hexagonal Architecture, CQRS, Event Sourcing and many other design patterns, architectural styles, and development methodologies.',
          },
          items: [
            'learning/software-design/domain-driven-design',
            'learning/software-design/behavior-driven-development',
            'learning/software-design/test-driven-development',
            'learning/software-design/cqrs',
            'learning/software-design/event-sourcing',
          ],
        },
        'learning/software-design-books',
      ],
    },
  ],
};
