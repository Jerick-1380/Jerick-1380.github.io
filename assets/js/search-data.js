// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-jerick-shi",
    title: "Jerick Shi",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-hobbies",
          title: "hobbies",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/hobbies/";
          },
        },{id: "post-rethinking-education-my-vision-for-an-ai-enhanced-classroom",
        
          title: "Rethinking Education: My Vision for an AI-Enhanced Classroom",
        
        description: "Imagining a future classroom where AI tools enhance learning through collaborative homework, conversational exams, and authentic project-based assessment",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/rethinking-education-ai-enhanced-classroom/";
          
        },
      },{id: "post-how-i-actually-learn-complex-research-papers-with-ai-and-why-you-should-too",
        
          title: "How I Actually Learn Complex Research Papers with AI (And Why You Should...",
        
        description: "A practical walkthrough of using AI to understand dense academic papers, from adversarial training to developing genuine mathematical intuition",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/learning-research-papers-with-ai/";
          
        },
      },{id: "post-why-ai-can-39-t-actually-do-your-math-homework-and-what-that-tells-us-about-intelligence",
        
          title: "Why AI Can&#39;t Actually Do Your Math Homework (And What That Tells Us...",
        
        description: "Exploring how AI&#39;s current failures in mathematics reveal the nature of intelligence, and why this window of distinguishability is rapidly closing",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/why-ai-cant-do-math-homework/";
          
        },
      },{id: "post-the-two-way-street-what-great-tas-and-smart-students-both-know",
        
          title: "The Two-Way Street: What Great TAs and Smart Students Both Know",
        
        description: "Lessons from six semesters of teaching on the transformational relationship between TAs and students when both parties engage thoughtfully",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/two-way-street-tas-and-students/";
          
        },
      },{id: "post-after-5-000-homework-assignments-i-know-why-math-fails-students-and-how-we-can-all-do-better",
        
          title: "After 5,000 Homework Assignments, I Know Why Math Fails Students (And How We...",
        
        description: "Insights from grading thousands of assignments on why students struggle with math and practical strategies for both learners and educators",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/after-5000-homework-assignments/";
          
        },
      },{id: "post-why-calculus-shouldn-39-t-be-the-end-goal-of-high-school-math",
        
          title: "Why Calculus Shouldn&#39;t Be the End Goal of High School Math",
        
        description: "Arguing for diversified math pathways beyond calculus to show students the breadth of mathematical thinking",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/calculus-shouldnt-be-end-goal/";
          
        },
      },{id: "post-why-competitive-math-matters-more-than-ever-in-the-age-of-ai",
        
          title: "Why Competitive Math Matters More Than Ever in the Age of AI",
        
        description: "How mathematical maturity and creative problem-solving from competition math become essential as AI handles routine calculations",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/competitive-math-matters-ai-age/";
          
        },
      },{id: "post-exploring-the-future-of-math-education-intuition-algorithms-and-engaging-content",
        
          title: "Exploring the Future of Math Education: Intuition, Algorithms, and Engaging Content",
        
        description: "My first blog post exploring how to make mathematics more intuitive through better storytelling, visualization, and starting with real-world problems",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/future-of-math-education/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-paper-market-dependent-communication-in-multi-agent-alpha-generation-accepted-to-neurips-genai-in-finance-workshop",
          title: 'Paper “Market-Dependent Communication in Multi-Agent Alpha Generation” accepted to NeurIPS GenAI in Finance...',
          description: "",
          section: "News",},{id: "news-paper-behavioral-and-strategic-deception-in-large-language-models-a-taxonomy-and-benchmark-analysis-accepted-to-iclr-agents-in-the-wild-safety-security-and-beyond-workshop",
          title: 'Paper “Behavioral and Strategic Deception in Large Language Models: A Taxonomy and Benchmark...',
          description: "",
          section: "News",},{id: "news-paper-cheap-talk-empty-promise-frontier-llms-easily-break-public-promises-for-self-interest-accepted-to-iclr-ai-for-mechanism-design-and-strategic-decision-making-workshop",
          title: 'Paper “Cheap Talk, Empty Promise: Frontier LLMs easily break public promises for self-interest”...',
          description: "",
          section: "News",},{id: "projects-senior-thesis-why-multi-agent-conversations-cannot-fix-llm-forecasting",
          title: 'Senior Thesis: Why Multi-Agent Conversations Cannot Fix LLM Forecasting',
          description: "Evidence from Convergence Analysis",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_senior_thesis/";
            },},{id: "projects-predictive-power-of-llms-in-financial-markets",
          title: 'Predictive Power of LLMs in Financial Markets',
          description: "First Place, Meeting of the Minds Math Division",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_meeting_minds/";
            },},{id: "projects-mathematical-contest-in-modeling-honorable-mention",
          title: 'Mathematical Contest in Modeling: Honorable Mention',
          description: "Modeling lamprey population dynamics with adaptive sex-determination mechanisms",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_mcm/";
            },},{id: "projects-operations-research-ii-optimizing-movie-scheduling-solutions",
          title: 'Operations Research II: Optimizing Movie Scheduling Solutions',
          description: "Linear programming approach to theater scheduling",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_operations_research/";
            },},{id: "projects-intermediate-deep-learning-predicting-closing-price-for-kaggle-competition",
          title: 'Intermediate Deep Learning: Predicting Closing Price for Kaggle Competition',
          description: "Optiver Trading at the Close competition",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_deep_learning/";
            },},{id: "projects-intro-to-ml-sentiment-analysis-and-stock-prices",
          title: 'Intro to ML: Sentiment Analysis and Stock Prices',
          description: "Using techniques from 10-315 for sentiment analysis with applications to stock market prediction",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_intro_ml/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/Shi_Jerick_CV.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6A%75%6E%6B%61%69%73@%61%6E%64%72%65%77.%63%6D%75.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=6wj2mTQAAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Jerick-1380", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jerick-shi-293773216", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@@DummyR18", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
