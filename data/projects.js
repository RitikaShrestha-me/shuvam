/*
  PROJECTS ON WATCH: one object per project. Edit this file to change the showcase,
  the story previews in the intro AND each project's detail page.

  Required: id (letters, digits, dashes), title, summary. Everything else is optional:
  empty or missing fields are simply not shown.

    tag                      short label shown above the title
    kind                     'academic' | 'personal' | 'freelance' | 'company'  (Past work filters)
    org, period              e.g. 'Télécom SudParis', '2026'
    summary                  one short paragraph for the showcase card
    nodes[]                  3-5 steps of the flow animation (also Figure 1 on the detail page)
    stack[]                  tools and technologies
    video                    OPTIONAL demo video: YouTube link, Google Drive link or .mp4 path
    report                   OPTIONAL report: "assets/projects/<id>/report.pdf", { label, url, note } or a list of those
    photos                   OPTIONAL photos: ["assets/projects/<id>/1.jpg", { src, caption }, ...]
                             (video, report and photos are shown side by side; whatever is missing is not shown)
    agent                    true = visitors can try the live Job Application Agent here
    themes[], story{}        used by the intro's "What are you curious about?" cards
    detail{}                 the project page:
        subtitle, type, status, role, team, affiliation, abstractLabel
        abstract             the summary paragraph at the top
        keywords[]
        figureCaption        caption under Figure 1 (the flow of `nodes`)
        sections[]           { title, body:[paragraphs], bullets:[...] } in the order you want
        links[]              OPTIONAL { label, url, note }: shown as "Further reading and resources"
        cite                 OPTIONAL { year, venue }: adds a "Cite this work" box
*/
const PROJECTS = [
  // {
  //   id: "job-agent",
  //   title: "Job Application Agent",
  //   tag: "NEW · AI AGENT",
  //   kind: "personal",
  //   summary:
  //     "Give it a job link and it reads the posting, matches it against the profile and returns a CV tailored to the role, ready to apply with.",
  //   nodes: [
  //     "Job link",
  //     "Parse posting",
  //     "Match profile",
  //     "Tailor CV",
  //     "Export",
  //   ],
  //   stack: ["n8n", "Ollama", "LLM agent", "Automation"],
  //   agent: true,
  //   video: "", // add a demo video link here, e.g. "https://www.youtube.com/watch?v=..."
  //   themes: ["ai", "product"],
  //   story: {
  //     prob: "Tailoring a CV for every job posting by hand takes time.",
  //     how: "An agent reads the posting, matches it against my profile and drafts a tailored CV.",
  //     status: "Live demo in the portfolio",
  //   },
  //   detail: {
  //     subtitle: "An AI agent that turns a job link into a tailored CV",
  //     type: "Personal project · AI agent",
  //     status: "Working demo",
  //     abstract:
  //       "Applying for roles means re-reading every posting and reshaping the CV to fit it. This agent takes a job link, extracts the requirements, matches them against my profile and returns a CV tailored to the role, together with the skills it matched and the gaps to address before applying.",
  //     keywords: [
  //       "AI agent",
  //       "n8n",
  //       "Ollama",
  //       "LLM",
  //       "Automation",
  //       "CV tailoring",
  //     ],
  //     figureCaption:
  //       "From job link to tailored CV: the five steps the agent follows.",
  //     sections: [
  //       {
  //         title: "Motivation",
  //         body: [
  //           "Tailoring a CV for each posting by hand is slow and repetitive, and it is easy to miss what a role really asks for.",
  //           "The aim is to automate the loop up to the point where a person decides: the agent prepares, the person applies.",
  //         ],
  //       },
  //       {
  //         title: "Approach",
  //         bullets: [
  //           "Read the job link, or a pasted job description.",
  //           "Extract the requirements of the role.",
  //           "Match them against the facts in my profile.",
  //           "Tailor the CV: a role-specific headline and summary, with the most relevant projects first.",
  //           "Review the matched skills and the gaps, then export the CV.",
  //         ],
  //       },
  //       {
  //         title: "Design decisions",
  //         bullets: [
  //           "The tailoring only uses facts from my profile, so it never invents experience.",
  //           "Gaps are reported instead of hidden, so I know what to address before applying.",
  //           "Without the n8n connection, the page works from a pasted job description with a built-in keyword matcher.",
  //         ],
  //       },
  //       {
  //         title: "Limitations and next steps",
  //         bullets: [
  //           "Opening a job link needs the n8n connection; in demo mode the description is pasted.",
  //           "The built-in matcher is simple keyword matching, so it is less nuanced than the language model.",
  //         ],
  //       },
  //     ],
  //     links: [
  //       // OPTIONAL: add resources for readers who want to know more, for example:
  //       // { label: "Source code", url: "https://github.com/...", note: "Repository" },
  //     ],
  //   },
  // },
  {
    id: "glof-early-warning",
    title: "GLOF early warning system",
    tag: "IOT · DIGITAL TWINS",
    kind: "academic",
    org: "Télécom SudParis",
    summary:
      "A group project at Télécom SudParis: an early-warning system for glacial lake outburst floods in Himalayan lakes. Sensor data flows through MQTT into InfluxDB, a hazard engine scores the risk, and operators review each alert before the ministry is notified on Telegram. Built to survive sensor disruption and documented in C4 diagrams revised after professor feedback.",
    nodes: [
      "Lake sensors",
      "MQTT + InfluxDB",
      "Hazard engine",
      "Operator review",
      "Telegram alert",
    ],
    stack: [
      "MQTT",
      "InfluxDB",
      "Eclipse Mosquitto",
      "n8n",
      "Docker",
      "Next.js",
      "C4",
    ],
    video:
      "https://drive.google.com/file/d/1lwzqLHtnU2FKISg2zGB-vkR5Q1Kf7w6r/preview",
    themes: ["data"],
    story: {
      prob: "Glacial lake outburst floods in the Himalaya need early warning.",
      how: "MQTT and InfluxDB feed a hazard engine, with operator review before alerts, documented in C4.",
      status: "Group project, Télécom SudParis",
    },
    detail: {
      subtitle:
        "Early warning for glacial lake outburst floods, with a human in the loop",
      type: "Group project · IoT and digital twins",
      status: "Course project",
      affiliation: "Télécom SudParis, Institut Polytechnique de Paris",
      team: "Group project",
      abstract:
        "This group project designs an early-warning system for glacial lake outburst floods (GLOF) in Himalayan lakes. Sensor data flows through MQTT into InfluxDB, a hazard engine scores the risk, and human operators review each alert before the ministry is notified on Telegram. The system is designed to keep working when sensor data is disrupted.",
      keywords: [
        "IoT",
        "Digital twins",
        "MQTT",
        "InfluxDB",
        "n8n",
        "C4 model",
        "Early warning",
      ],
      figureCaption: "Data path from lake sensors to the ministry alert.",
      sections: [
        {
          title: "Problem",
          body: [
            "Glacial lakes in the Himalaya can release sudden floods downstream. An early warning depends on trustworthy sensor data and on a fast, accountable decision to alert.",
          ],
        },
        {
          title: "Approach",
          bullets: [
            "Lake sensors publish telemetry over MQTT.",
            "Telemetry is stored as time series in InfluxDB.",
            "A hazard engine scores the risk from the incoming data.",
            "Operators review each alert before it goes out.",
            "The ministry is notified on Telegram.",
          ],
        },
        {
          title: "Resilience to sensor disruption",
          bullets: [
            "A queue policy after MQTT protects the data flow when sensors drop out.",
            "A sensor watchdog notices when a sensor's heartbeat goes silent.",
            "Human operators validate the data flow and can respond immediately.",
          ],
        },
        {
          title: "Implementation",
          body: [
            "The flow runs as n8n workflows: telemetry ingestion from MQTT into InfluxDB, scheduled sensor simulators, and a main pipeline with a sensor watchdog, validator, hazard engine, risk analysis, alert orchestration, human review and ministry notification. Eclipse Mosquitto, InfluxDB and n8n run in Docker.",
          ],
        },
        {
          title: "Documentation",
          body: [
            "The architecture is documented with C4 container diagrams. After professor feedback the diagram was revised to show the queue policy after MQTT, the processing components, operator validation and the detailed backend logic from ingestion to alerts.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "bnpl-dashboard",
    title: "BNPL credit risk dashboard",
    tag: "BUSINESS INTELLIGENCE · ANALYTICS",
    kind: "academic",
    org: "Asian Institute of Technology",
    summary:
      "Interactive Tableau dashboards for a buy-now-pay-later credit risk decision-support platform, built to surface key business metrics and actionable insights, and demonstrated as a locally run prototype.",
    nodes: ["Data", "Risk metrics", "Dashboards", "Decision support"],
    stack: ["Tableau", "Dashboard design", "KPI analysis", "Credit risk"],
    // demo video (Google Drive preview link)
    video: "",
    themes: ["data"],
    story: {
      prob: "Buy-now-pay-later credit risk needs to be visible at a glance.",
      how: "Interactive Tableau dashboards that support credit decisions, shown as a local prototype.",
      status: "Prototype built",
    },
    detail: {
      subtitle: "Dashboards that make credit risk visible for decision makers",
      type: "Course project · Business intelligence · Analytics",
      status: "Prototype built",
      affiliation: "Asian Institute of Technology",
      abstract:
        "Interactive Tableau dashboards for a buy-now-pay-later (BNPL) credit risk decision-support platform. The dashboards surface key business metrics and actionable insights, and are demonstrated as a locally run prototype.",
      keywords: [
        "BNPL",
        "Credit risk",
        "Tableau",
        "KPI analysis",
        "Decision support",
      ],
      figureCaption: "From data to decision support.",
      sections: [
        {
          title: "Problem",
          body: [
            "Buy-now-pay-later lending needs credit risk to be visible at a glance, so that decisions about approvals and exposure rest on clear metrics.",
          ],
        },
        {
          title: "Approach",
          bullets: [
            "Define the key credit risk metrics and KPIs a decision maker needs.",
            "Design interactive dashboards that surface those metrics and the insights behind them.",
            "Demonstrate the platform as a locally run prototype.",
          ],
        },
        {
          title: "Perspective",
          body: [
            "The framing draws on credit risk and financial analysis from my MBA in Finance.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "air-quality-alerts",
    title: "Air Quality Alert System",
    tag: "DATA ENGINEERING · MLOPS",
    kind: "academic",
    org: "Asian Institute of Technology",
    summary:
      "An end-to-end pipeline covering data ingestion, PM2.5 forecasting, model training and automated alerting.",
    nodes: ["Ingest data", "Forecast PM2.5", "Train model", "Send alert"],
    stack: ["Python", "MLOps", "Time-series forecasting"],
    video: "https://www.youtube.com/embed/bKIyRBS0cFE",
    themes: ["data"],
    story: {
      prob: "Poor air quality needs to be flagged before it hurts.",
      how: "A pipeline ingests data, forecasts PM2.5, retrains the model and sends alerts.",
      status: "Pipeline built",
    },
    detail: {
      subtitle:
        "From raw measurements to a PM2.5 forecast and an automated alert",
      type: "Course project · Data engineering and MLOps",
      status: "Pipeline built",
      affiliation: "Asian Institute of Technology",
      abstract:
        "An end-to-end pipeline covering data ingestion, PM2.5 forecasting, model training and automated alerting.",
      keywords: [
        "PM2.5",
        "Time-series forecasting",
        "MLOps",
        "Python",
        "Alerting",
      ],
      figureCaption: "The four stages of the pipeline.",
      sections: [
        {
          title: "Approach",
          bullets: [
            "Ingest air quality data.",
            "Forecast PM2.5 with a time-series model.",
            "Train and retrain the model as new data arrives.",
            "Send an automated alert when the forecast crosses a threshold.",
          ],
        },
      ],
      links: [],
    },
  },

  {
    id: "llm-workflow-automation",
    title: "YouTube Trend Analysis Agent",
    tag: "AUTOMATION",
    kind: "personal",
    summary:
      "Automated YouTube trend analysis using n8n and Gemini, with structured data stored in Google Sheets and visualized through a custom Next.js dashboard.",
    nodes: [
      "Trigger",
      "Fetch YouTube Data",
      "Gemini LLM",
      "Google Sheets",
      "Dashboard",
    ],
    stack: ["n8n", "Google Gemini", "Google Sheets", "Next.js"],
    video:
      "https://drive.google.com/file/d/1o1O3C6kMANAqIIsLZjTSf2Eclvostt5n/preview",
    themes: ["ai", "automation", "data-visualization"],
    story: {
      prob: "Manually collecting and analyzing YouTube trends makes it difficult to monitor content opportunities efficiently.",
      how: "An automated n8n workflow fetches YouTube data, uses Gemini to analyze trends and generate structured insights, and stores the results in Google Sheets for visualization in a custom Next.js dashboard.",
      status: "Workflow and dashboard built",
    },
    detail: {
      subtitle:
        "From automated YouTube data extraction to AI-powered insights and interactive visualization",
      type: "Personal project · AI automation & data visualization",
      status: "Workflow and dashboard built",
      abstract:
        "Built an end-to-end YouTube trend analysis pipeline using n8n and Google Gemini. The workflow runs on a schedule, fetches YouTube data, processes individual records, and uses Gemini with structured-output parsing to generate consistent analytical insights. Results are appended to Google Sheets, which connects to a locally hosted Next.js dashboard for interactive data visualization.",
      keywords: [
        "n8n",
        "Google Gemini",
        "YouTube Data API",
        "Google Sheets",
        "Next.js",
        "AI automation",
        "Structured output",
        "Data visualization",
      ],
      figureCaption:
        "Automated workflow connecting YouTube data extraction, Gemini analysis, Google Sheets, and a Next.js dashboard.",
      sections: [
        {
          title: "End-to-end workflow",
          bullets: [
            "Schedule Trigger: Automatically initiates the workflow.",
            "YouTube Data Extraction: Fetches YouTube data through an API request.",
            "Data Processing: Splits the results into individual records and prepares the fields for analysis.",
            "AI-Powered Analysis: Gemini analyzes the data and returns structured outputs through an output parser.",
            "Data Storage: Appends the analyzed results to Google Sheets.",
            "Interactive Dashboard: A locally hosted Next.js frontend connects to the spreadsheet data and visualizes YouTube trends.",
          ],
        },
        {
          title: "What I learned",
          body: [
            "Designed an end-to-end pipeline that connects API-based data collection, LLM-powered analysis, structured output parsing, spreadsheet storage, and frontend visualization.",
            "Built a custom Next.js dashboard to turn spreadsheet data into an interactive interface for exploring YouTube trends and content insights.",
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: "quantum-education-website",
    title: "Quantum Education website",
    tag: "WEB · CONSULTANCY",
    kind: "personal",
    summary:
      "A consultancy website for Quantum Education, designed, built and published on Vercel with its own branding and social-sharing preview.",
    nodes: ["Idea", "Design", "Build", "Deploy on Vercel", "Live site"],
    stack: ["Vercel"],
    themes: ["product"],
    story: {
      prob: "A consultancy needs a clear, professional home online so people can find it and understand what it offers.",
      how: "Designed and built a branded website for Quantum Education, with its own logo, page title and social-sharing preview, and deployed it on Vercel.",
      status: "Live",
    },
    detail: {
      subtitle: "From a consultancy idea to a live, branded public website",
      type: "Personal project · Website",
      status: "Live",
      abstract:
        "Quantum Education is a website for a consultancy brand, published at quantum-consultancy.vercel.app. I took it from idea to a live public address: a branded site with its own logo, page title and social-sharing preview, deployed on Vercel so every update goes live online.",
      keywords: [
        "Website",
        "Consultancy",
        "Branding",
        "Social preview",
        "Vercel deployment",
      ],
      figureCaption:
        "From idea to design, build and deployment on Vercel, ending in a live public site.",
      sections: [
        {
          title: "End-to-end workflow",
          bullets: [
            "Idea: A consultancy brand, Quantum Education, that needs a public home online.",
            "Design: A branded look with its own logo and page title.",
            "Build: The website pages that present the consultancy.",
            "Deployment: The site is published on Vercel at quantum-consultancy.vercel.app.",
            "Sharing: A social-sharing preview (title, description and image) so links look right when shared.",
          ],
        },
        {
          title: "What I learned",
          body: [
            "Took a website through the whole path from idea to a public address, including branding, deployment and how a link appears when it is shared.",
          ],
        },
      ],
      links: [
        {
          label: "Visit the live site",
          url: "https://quantum-consultancy.vercel.app/",
        },
      ],
    },
  },
  {
    id: "momo-khau-website",
    title: "Momo Khau",
    tag: "WEB · FOOD",
    kind: "personal",
    summary:
      "Momo Khau is a website built as one place for all momo lovers, with its own title, description and sharing preview, live on Vercel.",
    nodes: ["Idea", "Design", "Build", "Deploy on Vercel", "Live site"],
    stack: ["Vercel"],
    themes: ["product"],
    story: {
      prob: "People who love momo have no single place built around it.",
      how: "Built Momo Khau as one place for all momo lovers, with its own title, description and social-sharing preview, and deployed it on Vercel.",
      status: "Live",
    },
    detail: {
      subtitle: "One place for all momo lovers",
      type: "Personal project · Website",
      status: "Live",
      abstract:
        "Momo Khau is a website with a simple idea: one place for everyone who loves momo. I built and published it at momokhau.vercel.app with its own title, description and social-sharing preview, deployed on Vercel.",
      keywords: [
        "Website",
        "Food",
        "Community",
        "Social preview",
        "Vercel deployment",
      ],
      figureCaption:
        "From the momo-lovers idea to design, build and deployment on Vercel, ending in a live public site.",
      sections: [
        {
          title: "End-to-end workflow",
          bullets: [
            "Idea: One place for all momo lovers.",
            'Design: A name, a tagline ("One place for all Momo Lovers") and a look built around the food.',
            "Build: The website pages for the idea.",
            "Deployment: The site is published on Vercel at momokhau.vercel.app.",
            "Sharing: A page title, description and social-sharing preview for shared links.",
          ],
        },
        {
          title: "What I learned",
          body: [
            "Turned a small, specific idea into a live website with a clear name, message and shareable link.",
          ],
        },
      ],
      links: [
        { label: "Visit the live site", url: "https://momokhau.vercel.app/" },
      ],
    },
  },
  {
    id: "closet-by-aras-website",
    title: "Closet by Aras",
    tag: "WEB · BRAND",
    kind: "personal",
    summary:
      "A brand website for Closet by Aras, designed, built and published on Vercel.",
    nodes: ["Idea", "Design", "Build", "Deploy on Vercel", "Live site"],
    stack: ["Vercel"],
    themes: ["product"],
    story: {
      prob: "A brand needs a public home online where people can find it.",
      how: "Built a website for Closet by Aras and deployed it on Vercel at a public address.",
      status: "Live",
    },
    detail: {
      subtitle: "A brand website, live on Vercel",
      type: "Personal project · Website",
      status: "Live",
      abstract:
        "Closet by Aras is a brand website I built and published on Vercel at closetbyaras.vercel.app.",
      keywords: ["Website", "Brand", "Vercel deployment"],
      figureCaption:
        "From idea to design, build and deployment on Vercel, ending in a live public site.",
      sections: [
        {
          title: "End-to-end workflow",
          bullets: [
            "Idea: A brand, Closet by Aras, that needs a public home online.",
            "Design: The look and structure of the site.",
            "Build: The website pages.",
            "Deployment: The site is published on Vercel at closetbyaras.vercel.app.",
          ],
        },
        {
          title: "What I learned",
          body: [
            "Took a brand website from idea to a live public address and kept it easy to update through Vercel.",
          ],
        },
      ],
      links: [
        {
          label: "Visit the live site",
          url: "https://closetbyaras.vercel.app/",
        },
      ],
    },
  },

  // ---- Company projects delivered at Webpoint Solutions ----
  {
    id: "halarosis-website",
    kind: "company",
    title: "Halárosis online store",
    tag: "WEBPOINT · E-COMMERCE",
    org: "Webpoint Solutions",
    role: "Project manager",
    summary:
      "An online store for Halárosis, a clean home-fragrance brand: candles in five collections, air and fabric fresheners, wax warmers, melts and diffusers, with cart, wishlist and accounts.",
    nodes: ["Browse", "Wishlist", "Cart", "Account", "Newsletter"],
    stack: ["WordPress", "WooCommerce", "Elementor"],
    themes: ["product"],
    story: {
      prob: "A fragrance brand needed an online store that builds trust in safe, clean products and makes buying simple.",
      how: "Delivered a WordPress store with WooCommerce and Elementor: a catalogue by product type and candle collection, cart, wishlist and accounts, plus trust content, customer reviews and a newsletter offer.",
      status: "Delivered",
    },
    detail: {
      subtitle: "A WordPress shop for a safe, clean home-fragrance brand",
      type: "Company project · E-commerce website",
      status: "Delivered",
      abstract:
        "Halárosis sells safe, clean and environmentally friendly home fragrance. The website is a WordPress store built with Elementor and WooCommerce, organised by product type and by five candle collections, and supported by brand-trust content, customer reviews, press mentions and a newsletter offer.",
      keywords: [
        "E-commerce",
        "WordPress",
        "WooCommerce",
        "Elementor",
        "Product catalogue",
        "Customer accounts",
      ],
      figureCaption: "How a visitor moves through the Halárosis store.",
      sections: [
        {
          title: "What the website does",
          bullets: [
            "Shop: candles (single, double and triple cotton wick) in five collections (Original, Zen, Glam, Metallic and Curve), plus air and fabric fresheners, diffusers, essential oils, wax warmers, wax melts and gift cards.",
            "Buying: product pages, cart, wishlist, customer login and registration, and a store locator.",
            "Offers: a newsletter sign-up discount, a free-shipping banner and reward-points messaging.",
            'Trust: product-safety badges (vegan, cruelty-free, free from phthalates and paraffins), customer reviews, "as featured on" press logos and an Instagram feed.',
            "Content: informative articles, about pages and shipping, return and privacy policies.",
          ],
        },
        {
          title: "My role",
          body: [
            "I coordinated this project at Webpoint Solutions as project manager, translating the client's needs into tasks for the development team and keeping delivery on track.",
          ],
        },
      ],
      links: [{ label: "Visit the live site", url: "https://halarosis.com/" }],
    },
  },
  {
    id: "lineage-journey-website",
    kind: "company",
    title: "Lineage Journey",
    tag: "WEBPOINT · WEBSITE",
    org: "Webpoint Solutions",
    role: "Project manager",
    summary:
      "A Gatsby-based website delivered for a client at Webpoint Solutions.",
    nodes: ["Client brief", "Requirements", "Build", "Launch"],
    stack: ["Gatsby", "React"],
    themes: ["product"],
    story: {
      prob: "A client needed a fast, modern website.",
      how: "Coordinated delivery of a Gatsby (React) website between the client and the developers.",
      status: "Delivered",
    },
    detail: {
      subtitle: "A React and Gatsby website for a Webpoint client",
      type: "Company project · Website",
      status: "Delivered",
      abstract:
        "Lineage Journey is a website delivered at Webpoint Solutions. It is built with Gatsby, a React-based framework that generates fast static pages.",
      keywords: ["Website", "Gatsby", "React", "Client delivery"],
      sections: [
        {
          title: "My role",
          body: [
            "I coordinated this project at Webpoint Solutions as project manager, working between the client and the developers.",
          ],
        },
      ],
      links: [
        { label: "Visit the live site", url: "https://lineagejourney.com/" },
      ],
    },
  },
  {
    id: "advent-hope-website",
    kind: "company",
    title: "Advent Hope",
    tag: "WEBPOINT · COMMUNITY",
    org: "Webpoint Solutions",
    role: "Project manager",
    summary:
      "The website and installable app for Advent Hope, a young-adult Sabbath School of the Loma Linda University Church: events calendar, announcements, programs and speakers.",
    nodes: ["Calendar", "Announcements", "Programs", "Speakers", "Get the app"],
    stack: ["WordPress", "Elementor", "Progressive web app"],
    themes: ["product"],
    story: {
      prob: "A young-adult church community needed one place to keep members informed about events, programs and speakers.",
      how: "Delivered a WordPress and Elementor website with an events calendar, announcements, programs and speakers, plus an installable web app.",
      status: "Delivered",
    },
    detail: {
      subtitle:
        "A community website with an events calendar and an installable app",
      type: "Company project · Community website",
      status: "Delivered",
      abstract:
        "Advent Hope is a young-adult Sabbath School of the Loma Linda University Church. Its website is a WordPress site built with Elementor that keeps members informed about the weekly schedule, announcements, programs and speakers, and offers an installable web app so members can keep it on their phone.",
      keywords: [
        "Community website",
        "WordPress",
        "Elementor",
        "Events calendar",
        "Progressive web app",
      ],
      figureCaption: "The main areas of the Advent Hope website.",
      sections: [
        {
          title: "What the website does",
          bullets: [
            "Events: a calendar, weekly events and announcements with dates, times and places.",
            "Programs: pages for Restoration, Bible studies, Prayer and Foundations.",
            "Speakers: an upcoming-speaker feature and an archive of past speakers, with links to live streams on YouTube and recordings on Audioverse.",
            "Community: get-involved and contact pages, FAQs, a newsletter sign-up, an offering link and social feeds.",
            'App: a "Get the App" option that installs the site as a progressive web app.',
          ],
        },
        {
          title: "My role",
          body: [
            "I coordinated this project at Webpoint Solutions as project manager, aligning the client's needs with the development work.",
          ],
        },
      ],
      links: [
        { label: "Visit the live site", url: "https://advent-hope.org/" },
      ],
    },
  },
];
