import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { 
  Terminal, Send, CheckCircle2, AlertCircle, Bot, GitCommit,
  ExternalLink, Menu, X, ChevronRight, Mail, 
  Globe, Layers3, FileUser, GraduationCap, ArrowRight, Activity, Check, ShieldCheck,
  ShoppingBag, Server, Monitor, Brain, Zap, ArrowUpRight, Globe2
} from 'lucide-react';
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiTailwindcss,
  SiSupabase,
  SiDocker,
  SiVercel,
  SiRailway,
  SiGit,
  SiGithub,
  SiKalilinux
} from 'react-icons/si';
import * as THREE from 'three';

/* -------------------------------------------------------------------------- */
/*                               LANGUAGE TYPES & STORE                       */
/* -------------------------------------------------------------------------- */

type Language = 'en' | 'km';

/* -------------------------------------------------------------------------- */
/*                               TRANSLATIONS ARCHITECTURE                    */
/* -------------------------------------------------------------------------- */

const translations = {
  en: {
    langCode: 'EN',
    langName: 'ENGLISH',
    langNative: 'English Interface',
    langSwitchLabel: 'EN / ខ្មែរ',
    nav: {
      about: '[ABOUT]',
      capabilities: '[CAPABILITIES]',
      projects: '[PROJECTS]',
      copilot: '[COPILOT]',
      contact: '[CONTACT]',
      menuTitle: '// NAVIGATION MENU'
    },
    boot: {
      systemBoot: 'JJ // SYSTEM BOOT',
      envInit: 'PORTFOLIO ENVIRONMENT INITIALIZING',
      secureEnv: 'SECURE ENVIRONMENT',
      initializing: 'INITIALIZING...',
      online: 'ONLINE',
      logs: [
        "[01] INITIALIZING CORE SYSTEM............. OK",
        "[02] LOADING AI ARCHITECTURE............. OK",
        "[03] MOUNTING DIGITAL SYSTEMS............ OK",
        "[04] ESTABLISHING SECURE CONNECTION...... OK",
        "[05] LOADING PORTFOLIO ENVIRONMENT....... OK"
      ],
      systemReady: 'SYSTEM READY.',
      waitingAuth: 'WAITING FOR HUMAN AUTHORIZATION...',
      authControl: '// SYSTEM ACCESS CONTROL',
      readyTitle: 'ARE YOU READY',
      readySubTitle: 'TO ENTER MY PORTFOLIO?',
      readyDesc: 'The system is initialized. Your access request is ready.',
      enterBtn: '[ ENTER PORTFOLIO → ]',
      authorizingBtn: '[ AUTHORIZING... ACCESS GRANTED ]',
      authRequired: 'AUTHENTICATION REQUIRED TO PROCEED',
      footerTitle: 'JJ // AI ENGINEER & FULL-STACK ARCHITECT',
      footerLoc: 'CAMBODIA'
    },
    langModal: {
      protocol: 'JJ // LANGUAGE PROTOCOL',
      ready: 'SYSTEM READY.',
      subText: 'Please select your preferred interface language.',
      waiting: 'LANGUAGE PROTOCOL: WAITING FOR INPUT',
      enBtnSub: 'Continue in English',
      kmBtnSub: 'បន្តជាភាសាខ្មែរ',
      confirmTitle: 'LANGUAGE PROTOCOL ACCEPTED',
      confirmSelected: 'Selected interface:',
      continueBtn: '[ CONTINUE → ]'
    },
    hero: {
      focus: '// AI ENGINEERING & FULL-STACK',
      available: 'AVAILABLE FOR COLLABORATION',
      greeting: "Hello, I'm",
      subtitle: 'AI ENGINEER & FULL-STACK ARCHITECT',
      desc: 'Based in Cambodia. Building intelligent systems, machine learning architectures, and scalable full-stack applications with clean code and rigorous research-driven methodologies.',
      hoverCard: 'Build intelligent systems that create real-world impact.',
      locTitle: 'CAMBODIA',
      locSub: 'Location // Global Reach',
      aiTitle: 'AI ENG',
      aiSub: 'Primary Focus & Major',
      fsTitle: 'FULL-STACK',
      fsSub: 'Systems Architecture',
      mobileDesc: 'Building intelligent systems, AI-powered applications, and scalable full-stack products.',
      viewProjects: 'VIEW PROJECTS',
      contactMe: 'CONTACT ME'
    },
    about: {
      headingCode: '// Information',
      headingText: 'About Me',
      bio1: "Hi, I'm JJ, an 18-year-old aspiring AI Engineer and Full-Stack Developer from Cambodia. I have recently completed my Grade 12 (Baccalaureate) examination and am preparing to begin my first year of college, continuing my deep dive into Artificial Intelligence and Software Engineering.",
      bio2: "My technical journey started in Grade 9 writing foundational HTML and CSS projects. In 2022, following the public release of ChatGPT, I became obsessed with Artificial Intelligence and how it accelerates software creation. Since then, I’ve spent thousands of hours experimenting with AI tools, building end-to-end systems, and refining development workflows.",
      arsenal: '// TECHNICAL ARSENAL & TOOLS',
      feBe: 'Frontend & Backend',
      infra: 'Infrastructure & DevOps',
      philosophyTitle: '// CORE PHILOSOPHY',
      philosophyQuote: '"Every problem has a solution. With enough research, patience, and persistence, any challenge can be solved."',
      hoverRoadmap: 'HOVER TO VIEW EVOLUTION ROADMAP',
      roadmapTitle: '// EVOLUTION ROADMAP',
      viewJourney: 'VIEW MY JOURNEY',
      closeBtn: 'CLOSE',
      r2021Title: 'Foundations & First Code',
      r2021Desc: 'Wrote initial HTML & CSS projects.',
      r2022Title: 'AI Revolution',
      r2022Desc: 'Deep dive into ChatGPT and LLMs.',
      r2026Title: 'Baccalaureate',
      r2026Desc: 'Graduated Grade 12 in Cambodia.',
      rPresTitle: 'AI Engineering',
      rPresDesc: 'College major in AI Engineering.'
    },
    capabilities: {
      tag: '// WHAT I CAN BUILD FOR YOU',
      titleMain: 'TURN YOUR IDEA INTO A',
      titleItalic: 'WORKING SYSTEM.',
      desc: 'Websites, business systems, e-commerce platforms, POS systems, AI tools, automation, and custom software — designed around what you actually need.',
      purposeTag: '// CORE PURPOSE:',
      purposeQuote: '"Tell me what is making your business or workflow difficult. I can design and build the digital system that makes it easier."',
      gridHeader: '// TELL ME WHAT YOU NEED',
      clickHint: '[CLICK ANY CARD FOR BLUEPRINT]',
      modalSystemBlueprint: 'SYSTEM BLUEPRINT',
      problemTag: 'PROBLEM / CHALLENGE',
      solutionTag: 'ENGINEERED SOLUTION',
      deliverablesTag: 'DELIVERABLES & FEATURES',
      techUsedTag: 'TECHNOLOGIES USED',
      clientValueTag: 'CLIENT VALUE',
      implementationTag: 'ENGINEERING IMPLEMENTATION',
      useCasesTag: 'RECOMMENDED USE CASES',
      closeBlueprint: 'CLOSE BLUEPRINT'
    },
    projects: {
      tag: '// FEATURED WORK',
      titleMain: 'SELECTED',
      titleItalic: 'PROJECTS',
      desc: 'A collection of AI architectures, web products, and digital platforms engineered with high precision.',
      inspectBtn: 'INSPECT ARCHITECTURE',
      viewLiveBtn: 'LIVE DEMO →',
      activeDeploy: 'ACTIVE DEPLOY',
      underMaintenance: 'UNDER MAINTENANCE',
      carouselHeader: 'CAROUSEL VIEW',
      techStackTag: 'TECH STACK',
      builtTag: 'KEY IMPLEMENTATIONS',
      roleTag: 'MY ROLE',
      statusTag: 'DEPLOYMENT STATUS',
      closeProject: 'CLOSE PROJECT DETAILS'
    },
    copilot: {
      tag: '// INTERACTIVE TERMINAL',
      copilotTitle: 'JJ_AGENT COPILOT',
      status: 'KERNEL AGENT v2.5 // ONLINE',
      suggestedTag: 'SUGGESTED TELEMETRY PROMPTS',
      placeholder: 'Type your query here...',
      sendBtn: 'SEND',
      prompts: [
        "What can you build for me?",
        "What is your tech stack?",
        "Tell me about your AI projects.",
        "What is your development approach?"
      ],
      defaultReply: 'JJ_AGENT v2.5 initialized. Ask me anything about my AI engineering stack, capabilities, or development roadmap.',
      responses: {
        build: "I design and build complete digital products—websites, business management systems, e-commerce stores, POS terminals, AI tools, and custom backend automation pipelines.",
        stack: "My production stack includes React, TypeScript, Tailwind CSS, Python, FastAPI, Supabase (PostgreSQL), Docker, Railway, Vercel, and specialized LLM APIs.",
        projects: "Deployed projects include the Smart BAC II Education Platform and the AI Math Learning System, alongside custom UI systems and automated document engines.",
        approach: "I follow a continuous 8-stage product development process: Discover → Plan → Design → Build → Integrate → Test → Deploy → Improve."
      }
    },
    roadmap: {
      tag: '// DEVELOPMENT PROCESS',
      titleMain: '8-STAGE PRODUCT',
      titleItalic: 'ENGINEERING',
      subDesc: 'A research-backed methodology designed for reliability, performance, and continuous evolution.',
      stepTag: 'STAGE',
      clientValueLabel: 'CLIENT VALUE:'
    },
    techWall: {
      tag: '// SYSTEM CORE',
      titleMain: 'TECHNOLOGY',
      titleItalic: 'STACK',
      subDesc: 'Production-ready tools, frameworks, and deployment environments utilized in active projects.',
      clickDetails: 'CLICK FOR ARCHITECTURAL JUSTIFICATION',
      projectsUsedLabel: 'PROJECTS UTILIZED IN:',
      reasonLabel: 'WHY THIS TOOL WAS CHOSEN:'
    },
    contact: {
      tag: '// TRANSMISSION TERMINAL',
      titleMain: 'INITIATE',
      titleItalic: 'CONTACT',
      subDesc: 'Have a project, system requirement, or technical inquiry? Send a direct transmission.',
      nameLabel: 'YOUR NAME / ORGANIZATION',
      emailLabel: 'EMAIL ADDRESS',
      scopeLabel: 'PROJECT SCOPE / INQUIRY',
      namePlaceholder: 'e.g. John Doe',
      emailPlaceholder: 'e.g. john@company.com',
      scopePlaceholder: 'Describe your project or inquiry details here...',
      submitBtn: 'TRANSMIT MESSAGE',
      sendingBtn: 'TRANSMITTING...',
      successMsg: 'Transmission received successfully. I will get back to you shortly.',
      errorMsg: 'Transmission failed to send. Please try again or email directly.'
    }
  },
  km: {
    langCode: 'ខ្មែរ',
    langName: 'ភាសាខ្មែរ',
    langNative: 'ភាសាខ្មែរ',
    langSwitchLabel: 'ខ្មែរ / EN',
    nav: {
      about: '[អំពីខ្ញុំ]',
      capabilities: '[សេវាកម្ម]',
      projects: '[គម្រោង]',
      copilot: '[AI ជំនួយការ]',
      contact: '[ទំនាក់ទំនង]',
      menuTitle: '// ម៉ឺនុយប្រព័ន្ធ'
    },
    boot: {
      systemBoot: 'JJ // ដំឡើងប្រព័ន្ធ',
      envInit: 'កំពុងរៀបចំប្រព័ន្ធ PORTFOLIO',
      secureEnv: 'បរិស្ថានសុវត្ថិភាព',
      initializing: 'កំពុងដំណើរការ...',
      online: 'អនឡាញ',
      logs: [
        "[01] កំពុងដំឡើងប្រព័ន្ធ CORE............. រួចរាល់",
        "[02] កំពុងផ្ទុកស្ថាបត្យកម្ម AI............. រួចរាល់",
        "[03] កំពុងភ្ជាប់ប្រព័ន្ធឌីជីថល............ រួចរាល់",
        "[04] កំពុងបង្កើតការតភ្ជាប់សុវត្ថិភាព...... រួចរាល់",
        "[05] កំពុងរៀបចំផ្ទៃ PORTFOLIO....... រួចរាល់"
      ],
      systemReady: 'ប្រព័ន្ធរួចរាល់។',
      waitingAuth: 'រង់ចាំការអនុញ្ញាតចូលប្រើប្រាស់...',
      authControl: '// ការគ្រប់គ្រងការចូលប្រើប្រាស់',
      readyTitle: 'តើអ្នករួចរាល់ហើយឬនៅ',
      readySubTitle: 'ដើម្បីចូលមើល PORTFOLIO របស់ខ្ញុំ?',
      readyDesc: 'ប្រព័ន្ធត្រូវបានដំឡើងរួចរាល់។ សំណើចូលប្រើប្រាស់របស់អ្នកបានស្វែងរកឃើញ។',
      enterBtn: '[ ចូលមើល PORTFOLIO → ]',
      authorizingBtn: '[ កំពុងផ្ទៀងផ្ទាត់... ទទួលបានសិទ្ធិ ]',
      authRequired: 'ត្រូវការការផ្ទៀងផ្ទាត់ដើម្បីបន្ត',
      footerTitle: 'JJ // វិស្វករ AI & ស្ថាបត្យករ FULL-STACK',
      footerLoc: 'ប្រទេសកម្ពុជា'
    },
    langModal: {
      protocol: 'JJ // ពិធីសារកំណត់ភាសា',
      ready: 'ប្រព័ន្ធរួចរាល់។',
      subText: 'សូមជ្រើសរើសភាសាចុចបញ្ជាប្រព័ន្ធរបស់អ្នក។',
      waiting: 'ពិធីសារភាសា៖ រង់ចាំការជ្រើសរើស',
      enBtnSub: 'Continue in English',
      kmBtnSub: 'បន្តជាភាសាខ្មែរ',
      confirmTitle: 'ការកំណត់ភាសាបានជោគជ័យ',
      confirmSelected: 'ភាសាដែលបានជ្រើសរើស៖',
      continueBtn: '[ បន្ត → ]'
    },
    hero: {
      focus: '// វិស្វកម្ម AI & FULL-STACK',
      available: 'បើកទទួលការសហការ',
      greeting: 'សួស្តី ខ្ញុំបាទ',
      subtitle: 'វិស្វករ AI & ស្ថាបត្យករ FULL-STACK',
      desc: 'មានមូលដ្ឋាននៅកម្ពុជា។ ផ្តោតលើការបង្កើតប្រព័ន្ធឆ្លាតវៃ ស្ថាបត្យកម្ម Machine Learning និងកម្មវិធី Full-Stack ដែលមានដំណើរការខ្ពស់ ប្រកបដោយកូដស្អាតបាត និងវិធីសាស្ត្រស្រាវជ្រាវច្បាស់លាស់។',
      hoverCard: 'បង្កើតប្រព័ន្ធឆ្លាតវៃដែលបង្កើតផលប្រយោជន៍ពិតប្រាកដ។',
      locTitle: 'កម្ពុជា',
      locSub: 'ទីតាំង // គម្រោងសកល',
      aiTitle: 'វិស្វកម្ម AI',
      aiSub: 'ជំនាញ និងទិសដៅចម្បង',
      fsTitle: 'FULL-STACK',
      fsSub: 'ស្ថាបត្យកម្មប្រព័ន្ធ',
      mobileDesc: 'បង្កើតប្រព័ន្ធឆ្លាតវៃ កម្មវិធីដើរដោយ AI និងផលិតផល Full-Stack ប្រកបដោយប្រសិទ្ធភាព។',
      viewProjects: 'មើលគម្រោង',
      contactMe: 'ទំនាក់ទំនង'
    },
    about: {
      headingCode: '// ព័ត៌មានផ្ទាល់ខ្លួន',
      headingText: 'អំពីខ្ញុំ',
      bio1: "សួស្តី! ខ្ញុំបាទឈ្មោះ JJ អាយុ ១៨ ឆ្នាំ ជាអ្នកសិក្សាស្រាវជ្រាវ និងអភិវឌ្ឍន៍វិស្វកម្ម AI និង Full-Stack មកពីប្រទេសកម្ពុជា។ ខ្ញុំបានបញ្ចប់ការសិក្សាថ្នាក់បាក់ឌុប (ថ្នាក់ទី ១២) ថ្មីៗនេះ ហើយកំពុងរៀបចំខ្លួនចូលរៀនឆ្នាំទី ១ នៅមហាវិទ្យាល័យ ដោយបន្តផ្តោតលើជំនាញសិប្បនិម្មិត (AI) និងវិស្វកម្មសូហ្វវែរ។",
      bio2: "ដំណើរការបច្ចេកវិទ្យារបស់ខ្ញុំបានចាប់ផ្តើមតាំងពីថ្នាក់ទី ៩ ជាមួយនឹងការសរសេរកូដដំបូង HTML និង CSS។ នៅឆ្នាំ ២០២២ បន្ទាប់ពីការចេញផ្សាយ ChatGPT ខ្ញុំបានចាប់អារម្មណ៍យ៉ាងខ្លាំងលើបច្ចេកវិទ្យា AI និងរបៀបដែលវាជួយពន្លឿនការបង្កើតសូហ្វវែរ។ ចាប់តាំងពីពេលនោះមក ខ្ញុំបានចំណាយពេលរាប់ពាន់ម៉ោងក្នុងការពិសោធន៍ឧបករណ៍ AI បង្កើតប្រព័ន្ធពេញលេញ និងកែលម្អដំណើរការសរសេរកូដ។",
      arsenal: '// បច្ចេកវិទ្យា និងឧបករណ៍ប្រើប្រាស់',
      feBe: 'Frontend & Backend',
      infra: 'Infrastructure & DevOps',
      philosophyTitle: '// ទស្សនវិជ្ជាស្នូល',
      philosophyQuote: '"រាល់បញ្ហាតែងតែមានដំណោះស្រាយ។ ដោយមានការស្រាវជ្រាវ ការអត់ធ្មត់ និងការខិតខំប្រឹងប្រែង រាល់ការតស៊ូទាំងអស់សុទ្ធតែអាចជំនះបាន។"',
      hoverRoadmap: 'ដាក់កណ្តុរលើរូបភាពដើម្បីមើលផ្លូវនៃការវិវត្ត',
      roadmapTitle: '// ផ្លូវនៃការវិវត្ត',
      viewJourney: 'មើលដំណើរការរបស់ខ្ញុំ',
      closeBtn: 'បិទ',
      r2021Title: 'មូលដ្ឋានគ្រឹះ & កូដដំបូង',
      r2021Desc: 'ចាប់ផ្តើមសរសេរគម្រោង HTML & CSS ដំបូង។',
      r2022Title: 'បដិវត្តន៍ AI',
      r2022Desc: 'សិក្សាស៊ីជម្រៅលើ ChatGPT និង LLM។',
      r2026Title: 'បញ្ចប់ថ្នាក់បាក់ឌុប',
      r2026Desc: 'ប្រឡងជាប់សញ្ញាបត្រមធ្យមសិក្សាទុតិយភូមិ។',
      rPresTitle: 'វិស្វកម្ម AI',
      rPresDesc: 'ចូលរៀនជំនាញវិស្វកម្ម AI នៅមហាវិទ្យាល័យ។'
    },
    capabilities: {
      tag: '// អ្វីដែលខ្ញុំអាចបង្កើតជូនអ្នកបាន',
      titleMain: 'ប្រែក្លាយគំនិតរបស់អ្នកឱ្យទៅជា',
      titleItalic: 'ប្រព័ន្ធដំណើរការពិត។',
      desc: 'គេហទំព័រ, ប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម, ប្រព័ន្ធហាងទំនិញអនឡាញ, ប្រព័ន្ធ POS, ឧបករណ៍ AI, ប្រព័ន្ធស្វ័យប្រវត្តិកម្ម និងសូហ្វវែរផ្ទាល់ខ្លួន — បង្កើតឡើងយ៉ាងស៊ីសង្វាក់គ្នាទៅតាមតម្រូវការជាក់ស្តែងរបស់អ្នក។',
      purposeTag: '// គោលបំណងស្នូល៖',
      purposeQuote: '"សូមប្រាប់ខ្ញុំពីអ្វីដែលកំពុងធ្វើឱ្យអាជីវកម្ម ឬការងាររបស់អ្នកជួបការលំបាក។ ខ្ញុំអាចឌីហ្សាញ និងសរសេរប្រព័ន្ធឌីជីថលដែលជួយសម្រួលការងារទាំងនោះឱ្យកាន់តែងាយស្រួល។"',
      gridHeader: '// ជ្រើសរើសសេវាកម្មដែលអ្នកត្រូវការ',
      clickHint: '[ចុចលើកាតនីមួយៗដើម្បីមើលប្លង់ប្រព័ន្ធ]',
      modalSystemBlueprint: 'ប្លង់ស្ថាបត្យកម្មប្រព័ន្ធ',
      problemTag: 'បញ្ហា / ការលំបាក',
      solutionTag: 'ដំណោះស្រាយវិស្វកម្ម',
      deliverablesTag: 'សមិទ្ធផល & លក្ខណៈពិសេស',
      techUsedTag: 'បច្ចេកវិទ្យាប្រើប្រាស់',
      clientValueTag: 'តម្លៃ និងផលប្រយោជន៍អតិថិជន',
      implementationTag: 'ការអនុវត្តផ្នែកវិស្វកម្ម',
      useCasesTag: 'ករណីប្រើប្រាស់ដែលសមស្រប',
      closeBlueprint: 'បិទប្លង់ប្រព័ន្ធ'
    },
    projects: {
      tag: '// គម្រោងលេចធ្លោ',
      titleMain: 'គម្រោង',
      titleItalic: 'ដែលបានជ្រើសរើស',
      desc: 'ការប្រមូលផ្តុំនៃស្ថាបត្យកម្ម AI ផលិតផលឌីជីថល និងប្រព័ន្ធវ៉ែបដែលបានបង្កើតឡើងដោយប្រកដដោយគុណភាពខ្ពស់។',
      inspectBtn: 'ពិនិត្យមើលស្ថាបត្យកម្ម',
      viewLiveBtn: 'មើលការដំឡើជាក់ស្តែង →',
      activeDeploy: 'កំពុងដំណើរការផ្សាយ',
      underMaintenance: 'កំពុងថែទាំប្រព័ន្ធ',
      carouselHeader: 'ទិដ្ឋភាពបែប CAROUSEL',
      techStackTag: 'TECH STACK',
      builtTag: 'មុខងារសំខាន់ៗដែលបានសរសេរ',
      roleTag: 'តួនាទីរបស់ខ្ញុំ',
      statusTag: 'ស្ថានភាពប្រព័ន្ធ',
      closeProject: 'បិទព័ត៌មានលម្អិតគម្រោង'
    },
    copilot: {
      tag: '// AI ប្រព័ន្ធបញ្ជា',
      copilotTitle: 'JJ_AGENT AI ជំនួយការ',
      status: 'KERNEL AGENT v2.5 // អនឡាញ',
      suggestedTag: 'សំណួរដែលបានណែនាំ',
      placeholder: 'វាយបញ្ចូលសំណួររបស់អ្នកនៅទីនេះ...',
      sendBtn: 'ផ្ញើ',
      prompts: [
        "តើអ្នកអាចបង្កើតអ្វីខ្លះសម្រាប់ខ្ញុំ?",
        "តើ Tech Stack របស់អ្នកមានអ្វីខ្លះ?",
        "ប្រាប់ខ្ញុំអំពីគម្រោង AI របស់អ្នក។",
        "តើដំណើរការអភិវឌ្ឍរបស់អ្នកយ៉ាងដូចម្តេច?"
      ],
      defaultReply: 'JJ_AGENT v2.5 ត្រូវបានដំណើការ។ អ្នកអាចសួរខ្ញុំអំពីបច្ចេកវិទ្យា AI សេវាកម្ម ឬដំណើរការអភិវឌ្ឍន៍បាន។',
      responses: {
        build: "ខ្ញុំឌីហ្សាញ និងបង្កើតផលិតផលឌីជីថលពេញលេញ—គេហទំព័រ, ប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម, ប្រព័ន្ធហាងទំនិញអនឡាញ, ប្រព័ន្ធ POS, ឧបករណ៍ AI និងប្រព័ន្ធស្វ័យប្រវត្តិកម្ម Backend។",
        stack: "បច្ចេកវិទ្យាស្នូលរបស់ខ្ញុំរួមមាន React, TypeScript, Tailwind CSS, Python, FastAPI, Supabase (PostgreSQL), Docker, Railway, Vercel និង AI APIs។",
        projects: "គម្រោងដែលបានដាក់ឱ្យប្រើប្រាស់រួមមាន Smart BAC II Education Platform និង AI Math Learning System ព្រមទាំងប្រព័ន្ធ UI និងប្រព័ន្ធបង្កើតឯកសារស្វ័យប្រវត្តិ។",
        approach: "ខ្ញុំអនុវត្តតាមដំណើរការអភិវឌ្ឍន៍ ៨ ជំហាន៖ ស្រាវជ្រាវ → រៀបចំផែនការ → ឌីហ្សាញ → សរសេរកូដ → ភ្ជាប់ប្រព័ន្ធ → ធ្វើតេស្ត → ដាក់ឱ្យប្រើប្រាស់ → កែលម្អជាប្រចាំ។"
      }
    },
    roadmap: {
      tag: '// ដំណើរការអភិវឌ្ឍន៍',
      titleMain: 'វិស្វកម្មផលិតផល',
      titleItalic: '៨ ជំហាន',
      subDesc: 'វិធីសាស្ត្រផ្អែកលើការស្រាវជ្រាវ ដើម្បីធានានូវភាពត្រឹមត្រូវ ប្រសិទ្ធភាព និងការវិវត្តជាប្រចាំ។',
      stepTag: 'ជំហាន',
      clientValueLabel: 'តម្លៃសម្រាប់អតិថិជន៖'
    },
    techWall: {
      tag: '// បច្ចេកវិទ្យាស្នូល',
      titleMain: 'TECH STACK',
      titleItalic: 'បច្ចេកវិទ្យា',
      subDesc: 'ឧបករណ៍ ក្របខ័ណ្ឌការងារ និងបរិស្ថាន Cloud ដែលត្រូវប្រើប្រាស់ក្នុងគម្រោងជាក់ស្តែង។',
      clickDetails: 'ចុចដើម្បីមើលមូលហេតុនៃការជ្រើសរើស',
      projectsUsedLabel: 'គម្រោងដែលបានប្រើប្រាស់៖',
      reasonLabel: 'មូលហេតុនៃការជ្រើសរើស៖'
    },
    contact: {
      tag: '// ស្ថានីយផ្ញើសារ',
      titleMain: 'ចាប់ផ្តើម',
      titleItalic: 'ទំនាក់ទំនង',
      subDesc: 'មានគម្រោង តម្រូវការប្រព័ន្ធ ឬសំណួរផ្នែកបច្ចេកវិទ្យា? សូមផ្ញើសារផ្ទាល់មកកាន់ខ្ញុំ។',
      nameLabel: 'ឈ្មោះរបស់អ្នក / ក្រុមហ៊ុន',
      emailLabel: 'អាសយដ្ឋានអ៊ីមែល',
      scopeLabel: 'ព័ត៌មានលម្អិតនៃគម្រោង / សំណួរ',
      namePlaceholder: 'ឧទាហរណ៍៖ សុខ ជា',
      emailPlaceholder: 'ឧទាហរណ៍៖ sok.chea@company.com',
      scopePlaceholder: 'រៀបរាប់អំពីគម្រោង ឬតម្រូវការរបស់អ្នកនៅទីនេះ...',
      submitBtn: 'ផ្ញើសារឥឡូវនេះ',
      sendingBtn: 'កំពុងផ្ញើ...',
      successMsg: 'សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ ខ្ញុំនឹងឆ្លើយតបត្រឡប់ទៅវិញឆាប់ៗនេះ។',
      errorMsg: 'ការផ្ញើសារបរាជ័យ។ សូមព្យាយាមម្តងទៀត ឬផ្ញើអ៊ីមែលដោយផ្ទាល់។'
    }
  }
};

/* -------------------------------------------------------------------------- */
/*                               PROJECT DATA                                 */
/* -------------------------------------------------------------------------- */

interface Project {
  id: string;
  number: string;
  title: string;
  displayTitle: string;
  category: string;
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  problem: Record<Language, string>;
  built: Record<Language, string[]>;
  techStack: string[];
  role: Record<Language, string>;
  image?: string;
  status: 'ACTIVE_DEPLOY' | 'UNDER_MAINTENANCE';
  url?: string;
  icon?: React.ReactNode;
}

const projects: Project[] = [
  {
    id: '01',
    number: 'PROJECT_01',
    title: 'Smart-System-BACII-Education-Platform',
    displayTitle: 'Smart BAC II Education Platform',
    category: 'EDUCATION / AI / FULL-STACK',
    description: {
      en: 'An AI-powered learning platform designed to help Cambodian Grade 12 students study, practice, and prepare for the BAC II examination.',
      km: 'ប្រព័ន្ធសិក្សាដើរដោយ AI ដែលត្រូវបានរចនាឡើងដើម្បីជួយសិស្សថ្នាក់ទី ១២ នៅកម្ពុជា ក្នុងការសិក្សា អនុវត្តលំហាត់ និងត្រៀមប្រឡងបាក់ឌុប។'
    },
    longDescription: {
      en: 'Smart BAC II Education Platform is a comprehensive digital learning solution designed specifically for Cambodian high school students preparing for their national grade 12 examinations.',
      km: 'Smart BAC II Education Platform គឺជាដំណោះស្រាយសិក្សាឌីជីថលដ៏ទូលំទូលាយ ដែលត្រូវបានរចនាឡើងយ៉ាងពិសេសសម្រាប់សិស្សវិទ្យាល័យកម្ពុជាដែលកំពុងត្រៀមប្រឡងថ្នាក់ជាតិទី ១២។'
    },
    problem: {
      en: 'Grade 12 students face limited access to real-time tutoring, structured Cambodian curriculum study materials, and automated practice exam feedback.',
      km: 'សិស្សថ្នាក់ទី ១២ ជួបប្រទះការលំបាកក្នុងការទទួលបានការបង្រៀនបន្ថែមភ្លាមៗ កង្វះខាតឯកសារសិក្សាតាមកម្មវិធីសិក្សាជាតិ និងការកែប្រែកម្រងសំណួរអនុវត្តដោយស្វ័យប្រវត្តិ។'
    },
    built: {
      en: [
        'Interactive subject practice modules tailored to Grade 12 curriculum',
        'AI assistant providing step-by-step problem explanations',
        'Student performance tracking and weak-area diagnostic dashboard',
        'Responsive, low-latency interface engineered for mobile and web'
      ],
      km: [
        'ម៉ូឌុលអនុវត្តលំហាត់តាមមុខវិជ្ជាស្របតាមកម្មវិធីសិក្សាថ្នាក់ទី ១២',
        'AI ជំនួយការដែលពន្យល់ដំណោះស្រាយលំហាត់ជំហានៗ',
        'ផ្ទាំងគ្រប់គ្រងតាមដានលទ្ធផលសិក្សា និងស្វែងរកចំណុចខ្សោយរបស់សិស្ស',
        'ចំណុចប្រទាក់លឿន រហ័ស ទ្រទ្រង់ទាំងលើទូរស័ព្ទ និងកុំព្យូទ័រ'
      ]
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Supabase'],
    role: {
      en: 'AI Engineering + Full-Stack Architect',
      km: 'វិស្វករ AI + ស្ថាបត្យករ Full-Stack'
    },
    image: '/learning.jpg', 
    status: 'ACTIVE_DEPLOY',
    url: 'https://bakdub.vercel.app/'
  },
  {
    id: '02',
    number: 'PROJECT_02',
    title: 'AI-Math-Learning-System',
    displayTitle: 'AI Math Learning System',
    category: 'EDUCATION / AI / MATH',
    description: {
      en: 'An interactive mathematics learning platform that helps students practice problems, understand concepts, and improve performance through AI-assisted feedback.',
      km: 'ប្រព័ន្ធរៀនគណិតវិទ្យាអន្តរកម្មដែលជួយសិស្សអនុវត្តលំហាត់ យល់ដឹងពីគំនិតរូបមន្ត និងពង្រឹងសមត្ថភាពតាមរយៈការណែនាំពី AI។'
    },
    longDescription: {
      en: 'An intelligent mathematics workspace that transforms static problem sets into interactive, adaptive learning experiences with immediate feedback loops.',
      km: 'កន្លែងធ្វើលំហាត់គណិតវិទ្យាឆ្លាតវៃដែលផ្លាស់ប្តូរកម្រងលំហាត់ធម្មតាឱ្យទៅជាបទពិសោធន៍សិក្សាអន្តរកម្ម និងឆ្លើយតបភ្លាមៗ។'
    },
    problem: {
      en: 'Traditional math tools show answers without breaking down logical steps, leaving students stuck when solving complex equations independently.',
      km: 'ឧបករណ៍គណិតវិទ្យាទូទៅបង្ហាញតែចម្លើយចុងក្រោយដោយមិនបានបំបែកជំហាននៃការគិត ធ្វើឱ្យសិស្សជួបការលំបាកពេលដោះស្រាយលំហាត់ស្មុគស្មាញដោយខ្លួនឯង។'
    },
    built: {
      en: [
        'Step-by-step mathematical reasoning pipeline',
        'Dynamic quiz generator based on individual student accuracy',
        'Fast vector retrieval for instant formula and concept lookup',
        'Clean formula rendering and interactive scratchpad workspace'
      ],
      km: [
        'ប្រព័ន្ធពន្យល់ហេតុផលគណិតវិទ្យាតាមជំហានច្បាស់លាស់',
        'ប្រព័ន្ធបង្កើតកម្រងសំណួរស្វ័យប្រវត្តិតាមកម្រិតសមត្ថភាពសិស្ស',
        'ការស្វែងរករូបមន្ត និងមេរៀនលឿនរហ័សតាម Vector Search',
        'ការបង្ហាញរូបមន្តគណិតវិទ្យាច្បាស់លាស់ និងក្តារខៀនឌីជីថល'
      ]
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Vector Search'],
    role: {
      en: 'Full-Stack Developer + AI Integration',
      km: 'អ្នកអភិវឌ្ឍន៍ Full-Stack + ការតភ្ជាប់ AI'
    },
    image: '/Math.jpg', 
    status: 'ACTIVE_DEPLOY',
    url: 'https://math-quiz-khmer.vercel.app/'
  },
  {
    id: '03',
    number: 'PROJECT_03',
    title: 'PureAxis-UI-Framework',
    displayTitle: 'PureAxis UI Framework',
    category: 'UI SYSTEM / FRONTEND',
    description: {
      en: 'A reusable interface system focused on building consistent, modern, high-performance web experiences.',
      km: 'ប្រព័ន្ធ UI ដែលអាចយកទៅប្រើប្រាស់ឡើងវិញបាន ផ្តោតលើការបង្កើតគេហទំព័រដែលមានល្បឿនលឿន និងរចនាសម្ព័ន្ធស្អាតបាត។'
    },
    longDescription: {
      en: 'A modular design system and React component library engineered for dark-mode, high-density dashboard and engineering interfaces.',
      km: 'បណ្តុំ Component React និង Design System ដែលត្រូវបានបង្កើតឡើងយ៉ាងពិសេសសម្រាប់ផ្ទាំងគ្រប់គ្រង Dashboard បែប Dark-mode។'
    },
    problem: {
      en: 'Building bespoke engineering UI components repeatedly creates code duplication, inconsistent styling, and slow product execution.',
      km: 'ការបង្កើត UI ជាថ្មីម្តងហើយម្តងទៀតធ្វើឱ្យកូដស្មុគស្មាញ ការរចនាមិនស៊ីសង្វាក់គ្នា និងខាតបង់ពេលក្នុងការអភិវឌ្ឍ។'
    },
    built: {
      en: [
        'Accessible, highly customizable core UI primitives',
        'Performance-optimized motion primitives utilizing Framer Motion',
        'Strict TypeScript design token architecture',
        'Interactive design tokens documentation'
      ],
      km: [
        'បណ្តុំ UI Component ដែលងាយស្រួលកែច្នៃ និងប្រើប្រាស់',
        'ការប្រើប្រាស់ Framer Motion សម្រាប់ Animation ស្រាលនិងលឿន',
        'ស្ថាបត្យកម្ម Design Token ជាមួយ TypeScript ត្រឹមត្រូវ',
        'ឯកសារណែនាំការប្រើប្រាស់ Design Tokens ពេញលេញ'
      ]
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    role: {
      en: 'Frontend Architect',
      km: 'ស្ថាបត្យករ Frontend'
    },
    status: 'UNDER_MAINTENANCE',
    icon: <Layers3 className="w-10 h-10 text-red-500" />
  },
  {
    id: '04',
    number: 'PROJECT_04',
    title: 'CV-Generator-System',
    displayTitle: 'CV Generator System',
    category: 'PRODUCTIVITY / AI / DOCUMENTS',
    description: {
      en: 'A web-based CV creation system designed to help users build professional resumes through a guided and structured workflow.',
      km: 'ប្រព័ន្ធបង្កើតប្រវត្តិរូបសង្ខេប (CV) អនឡាញដែលជួយអ្នកប្រើប្រាស់បង្កើត Resume បែបអាជីពតាមរយៈជំហានងាយៗ។'
    },
    longDescription: {
      en: 'An automated document generator that translates user input into clean, ATS-compliant professional resumes and portfolio metadata.',
      km: 'ប្រព័ន្ធបង្កើតឯកសារស្វ័យប្រវត្តិដែលបម្លែងព័ត៌មានរបស់អ្នកប្រើប្រាស់ទៅជា CV បែបស្តង់ដារ ATS ប្រកបដោយភាពទាក់ទាញ។'
    },
    problem: {
      en: 'Job seekers struggle with formatting, phrasing achievements effectively, and generating modern print-ready portfolio resumes.',
      km: 'អ្នកស្វែងរកការងារតែងតែជួបការលំបាកក្នុងការរៀបចំទម្រង់ CV ការសរសេរពិពណ៌នាបទពិសោធន៍ និងការទាញយកជាឯកសារ PDF ស្អាតបាត។'
    },
    built: {
      en: [
        'Real-time live document preview engine',
        'AI content polishing and phrase optimization assistant',
        'Structured PDF compilation pipeline',
        'Customizable dark/light aesthetic export templates'
      ],
      km: [
        'ប្រព័ន្ធមើលគំរូ CV ភ្លាមៗក្នុងពេលវាយបញ្ចូលព័ត៌មាន',
        'AI ជំនួយការក្នុងការកែលម្អសំណេរ និងការប្រើប្រាស់ពាក្យពេចន៍',
        'ប្រព័ន្ធបង្កើត និងទាញយកឯកសារ PDF លឿនរហ័ស',
        'ទម្រង់រចនា CV ច្រើនជម្រើសទាំងបែប Dark និង Light'
      ]
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'PDF Kit'],
    role: {
      en: 'Full-Stack Developer',
      km: 'អ្នកអភិវឌ្ឍន៍ Full-Stack'
    },
    status: 'UNDER_MAINTENANCE',
    icon: <FileUser className="w-10 h-10 text-red-500" />
  },
  {
    id: '05',
    number: 'PROJECT_05',
    title: 'E-Learning-Program',
    displayTitle: 'E-Learning Platform',
    category: 'EDUCATION / LEARNING',
    description: {
      en: 'A digital learning environment designed to make online education more accessible, structured, and engaging.',
      km: 'បរិស្ថានសិក្សាឌីជីថលដែលធ្វើឱ្យការសិក្សាអនឡាញកាន់តែងាយស្រួល មានរចនាសម្ព័ន្ធច្បាស់លាស់ និងមានអន្តរកម្ម។'
    },
    longDescription: {
      en: 'A flexible, modern learning management environment built to deliver structured courses, video lessons, and interactive assessments.',
      km: 'ប្រព័ន្ធគ្រប់គ្រងការសិក្សាទំនើបដែលត្រូវបានបង្កើតឡើងដើម្បីផ្តល់នូវវគ្គសិក្សា វីដេអូមេរៀន និងការធ្វើតេស្តស្ទង់សមត្ថភាព។'
    },
    problem: {
      en: 'Conventional learning platforms are often cluttered, slow on mobile connections, and lack real-time progress indicators.',
      km: 'ប្រព័ន្ធសិក្សាទូទៅភាគច្រើនមានភាពស្មុគស្មាញ យឺតនៅលើទូរស័ព្ទដៃ និងខ្វះប្រព័ន្ធតាមដានការសិក្សាជាក់ស្តែង។'
    },
    built: {
      en: [
        'Streamlined course navigation and lesson playback environment',
        'Real-time student progress tracking and quiz scoring',
        'Secure enrollment and user management backend',
        'Mobile-first responsive interface design'
      ],
      km: [
        'ប្រព័ន្ធទស្សនាវីដេអូមេរៀន និងការរុករកវគ្គសិក្សាងាយស្រួល',
        'ការតាមដានការសិក្សា និងការដាក់ពិន្ទុការធ្វើតេស្តភ្លាមៗ',
        'ប្រព័ន្ធគ្រប់គ្រងគណនី និងការចុះឈ្មោះចូលរៀនមានសុវត្ថិភាព',
        'ការរចនាសម្របតាមអេក្រង់ទូរស័ព្ទដៃបានយ៉ាងល្អឥតខ្ចោះ'
      ]
    },
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    role: {
      en: 'Full-Stack Developer',
      km: 'អ្នកអភិវឌ្ឍន៍ Full-Stack'
    },
    status: 'UNDER_MAINTENANCE',
    icon: <GraduationCap className="w-10 h-10 text-red-500" />
  }
];

/* -------------------------------------------------------------------------- */
/*                         CAPABILITIES / SERVICES DATA                       */
/* -------------------------------------------------------------------------- */

interface CapabilityService {
  id: string;
  number: string;
  title: Record<Language, string>;
  shortDesc: Record<Language, string>;
  tags: string[];
  icon: React.ReactNode;
  problem: Record<Language, string>;
  solution: Record<Language, string>;
  deliverables: Record<Language, string[]>;
  techStack: { name: string; category: string }[];
  clientValue: Record<Language, string>;
  engineeringImpl: Record<Language, string>;
  useCases: Record<Language, string[]>;
}

const capabilityServices: CapabilityService[] = [
  {
    id: 'websites',
    number: '01',
    title: {
      en: 'Professional Websites',
      km: 'គេហទំព័រអាជីព (Professional Websites)'
    },
    shortDesc: {
      en: 'Modern, fast, responsive websites built around your brand, customers, and business goals.',
      km: 'គេហទំព័រទំនើប ល្បឿនលឿន ទ្រទ្រង់គ្រប់ឧបករណ៍ បង្កើតឡើងដើម្បីឆ្លុះបញ្ចាំងពីម៉ាកសញ្ញា និងគោលដៅអាជីវកម្មរបស់អ្នក។'
    },
    tags: ['BUSINESS', 'BRANDING', 'RESPONSIVE', 'FULL-STACK'],
    icon: <Globe className="w-6 h-6 text-red-500" />,
    problem: {
      en: 'Your business may have a great product or service, but without a fast, professional online presence, potential customers struggle to understand what you offer, trust your brand, or contact you.',
      km: 'អាជីវកម្មរបស់អ្នកអាចមានផលិតផល ឬសេវាកម្មល្អ ប៉ុន្តែប្រសិនបើគ្មានគេហទំព័រផ្លូវការ និងលឿនរហ័ស អតិថិជនពិបាកយល់ពីសេវាកម្ម ខ្វះទំនុកចិត្ត ឬពិបាកក្នុងការទំនាក់ទំនង។'
    },
    solution: {
      en: 'I design and build high-performance, modern websites that present your business clearly, build instant trust, and give clients a smooth way to discover, inquire, and interact with you on any device.',
      km: 'ខ្ញុំឌីហ្សាញ និងបង្កើតគេហទំព័រដែលមានល្បឿនលឿន និងទាក់ទាញ ដែលបង្ហាញពីអាជីវកម្មរបស់អ្នកយ៉ាងច្បាស់លាស់ បង្កើតទំនុកចិត្តភ្លាមៗ និងផ្តល់ភាពងាយស្រួលដល់អតិថិជនក្នុងការទំនាក់ទំនង។'
    },
    deliverables: {
      en: [
        'Modern, custom user interface & brand styling',
        'Mobile + tablet + desktop fully responsive design',
        'Backend API & database integration when required',
        'Admin functionality & content management options',
        'Contact & inquiry forms with direct notifications',
        'SEO optimization & edge production deployment'
      ],
      km: [
        'ការរចនា UI ប្លែក និងស្របតាមអត្តសញ្ញាណអាជីវកម្ម',
        'ការបង្ហាញយ៉ាងល្អឥតខ្ចោះលើទូរស័ព្ទ Tablet និងកុំព្យូទ័រ',
        'ការភ្ជាប់ប្រព័ន្ធ Backend API និង Database តាមតម្រូវការ',
        'ប្រព័ន្ធគ្រប់គ្រងអត្ថបទ និងទិន្នន័យ (Admin Dashboard)',
        'ទម្រង់ទំនាក់ទំនងដែលមានការជូនដំណឹងភ្លាមៗ',
        'រៀបចំ SEO និងដាក់ឱ្យប្រើប្រាស់លើ Cloud ស្ដង់ដារ'
      ]
    },
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Supabase', category: 'Database & Auth' },
      { name: 'Vercel', category: 'Global Hosting' }
    ],
    clientValue: {
      en: 'More professional online presence → Easier customer discovery → Stronger brand trust → Higher lead conversion.',
      km: 'វត្តមានអនឡាញកាន់តែមានអាជីព → អតិថិជនស្វែងរកឃើញងាយស្រួល → បង្កើនទំនុកចិត្ត → បង្កើនអតិថិជនគោលដៅ។'
    },
    engineeringImpl: {
      en: 'Built with React component architecture, Tailwind styling tokens, serverless backend handlers, and automated CI/CD deployment.',
      km: 'បង្កើតឡើងដោយរចនាសម្ព័ន្ធ React, Tailwind styling, Serverless Backend និងប្រព័ន្ធដំឡើង CI/CD ស្វ័យប្រវត្តិ។'
    },
    useCases: {
      en: [
        'Company & Corporate Websites',
        'Professional Business Profiles',
        'Personal Brand & Portfolio Sites',
        'High-Converting Landing Pages',
        'Service Provider Websites',
        'Custom Portals with Backend Logic'
      ],
      km: [
        'គេហទំព័រក្រុមហ៊ុន និងអាជីវកម្ម',
        'ទំព័រណែនាំអាជីវកម្មផ្លូវការ',
        'គេហទំព័របង្ហាញស្នាដៃ និងអត្តសញ្ញាណផ្ទាល់ខ្លួន',
        'Landing Page សម្រាប់ផ្សព្វផ្សាយផលិតផល',
        'គេហទំព័រសេវាកម្មផ្សេងៗ',
        'ប្រព័ន្ធ Portal ផ្ទាល់ខ្លួនជាមួយ Backend'
      ]
    }
  },
  {
    id: 'ecommerce',
    number: '02',
    title: {
      en: 'E-Commerce & Payments',
      km: 'ប្រព័ន្ធហាងទំនិញអនឡាញ (E-Commerce & Payments)'
    },
    shortDesc: {
      en: 'Sell products online with a complete shopping experience, order management, and payment integration.',
      km: 'លក់ផលិតផលតាមអនឡាញជាមួយប្រព័ន្ធទិញទំនិញពេញលេញ ការគ្រប់គ្រងការកុម្ម៉ង់ និងការទូទាត់ប្រាក់។'
    },
    tags: ['ONLINE STORE', 'PAYMENTS', 'ORDERS', 'AUTOMATION'],
    icon: <ShoppingBag className="w-6 h-6 text-red-500" />,
    problem: {
      en: 'Selling through manual social media messages and spreadsheets is slow, prone to missed orders, difficult to manage as inventory grows, and frustrating for buyers.',
      km: 'ការលក់ទំនិញតាមការឆាត និងការកត់ត្រាក្នុង Spreadsheet មានភាពយឺតយ៉ាវ ងាយជ្រោះកុម្ម៉ង់ ពិបាកគ្រប់គ្រងស្តុក និងធ្វើឱ្យអតិថិជនរង់ចាំយូរ។'
    },
    solution: {
      en: 'A complete custom online store that presents your catalog clearly, manages real-time carts, automates checkout flows, and handles payment processing structured for your target market.',
      km: 'ប្រព័ន្ធហាងទំនិញអនឡាញពេញលេញដែលបង្ហាញបញ្ជីទំនិញច្បាស់លាស់ គ្រប់គ្រងកន្រ្តកទំនិញ ទូទាត់ប្រាក់ស្វ័យប្រវត្តិ និងសម្រួលដល់ការលក់កាន់តែលឿន។'
    },
    deliverables: {
      en: [
        'Interactive product catalog with category filters & search',
        'Shopping cart & seamless multi-step checkout workflow',
        'Customer accounts & order history portal',
        'Admin dashboard for products, stock, and status updates',
        'ABA / KHQR / payment provider integration (subject to API availability)',
        'Automated email/message order receipts and alerts'
      ],
      km: [
        'បញ្ជីទំនិញអន្តរកម្ម មានប្រព័ន្ធតម្រង និងការស្វែងរក',
        'ប្រព័ន្ធកន្រ្តកទំនិញ និងការបង់ប្រាក់ងាយស្រួល',
        'គណនីអតិថិជន និងការមើលប្រវត្តិទិញទំនិញ',
        'ផ្ទាំងគ្រប់គ្រងស្តុក ផលិតផល និងស្ថានភាពការកុម្ម៉ង់',
        'ការភ្ជាប់ប្រព័ន្ធទូទាត់ប្រាក់ (ABA / KHQR តាមការផ្តល់ API)',
        'សារជូនដំណឹងការទិញទំនិញស្វ័យប្រវត្តិ'
      ]
    },
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Supabase', category: 'Database & Security' },
      { name: 'Payment APIs', category: 'Checkout' },
      { name: 'Vercel', category: 'Cloud' }
    ],
    clientValue: {
      en: 'More products visible online → Faster checkout process → Automated order tracking → Centralized inventory control.',
      km: 'បង្ហាញផលិតផលបានច្រើន → ទូទាត់ប្រាក់លឿន → តាមដានការកុម្ម៉ង់ស្វ័យប្រវត្តិ → គ្រប់គ្រងស្តុកទំនិញចំគោលដៅ។'
    },
    engineeringImpl: {
      en: 'Relational database schema for orders and items, atomic checkout state management, encrypted tokenized transaction callbacks.',
      km: 'រចនាសម្ព័ន្ធ Relational Database សម្រាប់ទំនិញ និងការកុម្ម៉ង់ ប្រព័ន្ធទូទាត់ប្រាក់មានសុវត្ថិភាពខ្ពស់។'
    },
    useCases: {
      en: [
        'Retail & Fashion Online Stores',
        'Digital Product Sales Platforms',
        'Subscription & Service Checkout',
        'Local Business Online Ordering',
        'Custom Shopping Web Apps'
      ],
      km: [
        'ហាងលក់ខោអាវ និងទំនិញរាយអនឡាញ',
        'ប្រព័ន្ធលក់ផលិតផលឌីជីថល',
        'ប្រព័ន្ធបង់ប្រាក់សេវាកម្មប្រចាំខែ',
        'ប្រព័ន្ធបញ្ជាទិញទំនិញសម្រាប់អាជីវកម្មក្នុងស្រុក',
        'កម្មវិធីទិញទំនិញតាម Web Custom'
      ]
    }
  },
  {
    id: 'business-systems',
    number: '03',
    title: {
      en: 'Custom Business Systems',
      km: 'ប្រព័ន្ធគ្រប់គ្រងអាជីវកម្ម (Custom Business Systems)'
    },
    shortDesc: {
      en: 'If your business relies on manual work, spreadsheets, messages, or repetitive processes, I can turn that workflow into a custom system.',
      km: 'ប្រសិនបើអាជីវកម្មរបស់អ្នកពឹងផ្អែកលើការងារដោយដៃ ឯកសារ spreadsheet ឬការងារជាន់ៗគ្នា ខ្ញុំអាចបម្លែងវាទៅជាប្រព័ន្ធគ្រប់គ្រងឌីជីថល។'
    },
    tags: ['CUSTOM SYSTEM', 'WORKFLOW', 'MANAGEMENT', 'AUTOMATION'],
    icon: <Server className="w-6 h-6 text-red-500" />,
    problem: {
      en: 'Businesses waste dozens of hours each week handling staff schedules, customer bookings, inventory counts, and invoices across disconnected spreadsheets and chat groups.',
      km: 'អាជីវកម្មខាតបង់ពេលរាប់ម៉ោងក្នុងមួយសប្តាហ៍លើការកត់ត្រាកាលវិភាគបុគ្គលិក ការកក់របស់អតិថិជន ស្តុក និងវិក្កយបត្រតាមសារ និង spreadsheet កាត់ផ្តាច់ពីគ្នា។'
    },
    solution: {
      en: 'I translate your messy paper or spreadsheet operations into a single, secure digital system built around how your business actually runs, eliminating repetitive administrative stress.',
      km: 'ខ្ញុំបម្លែងការងារស្មុគស្មាញរបស់អ្នកទៅជាប្រព័ន្ធគ្រប់គ្រងឌីជីថលតែមួយដែលមានសុវត្ថិភាព ស្របតាមដំណើរការអាជីវកម្មពិតប្រាកដ កាត់បន្ថយការងាររដ្ឋបាលដែលជាន់គ្នា។'
    },
    deliverables: {
      en: [
        'Centralized management dashboard with real-time stats',
        'Role-based permissions (Admin, Manager, Staff)',
        'Customer, staff, and booking tracking databases',
        'Automated workflow triggers and task assignments',
        'Document management and PDF export generators',
        'Secure authentication and activity audit logging'
      ],
      km: [
        'ផ្ទាំងគ្រប់គ្រងរួម ដែលបង្ហាញទិន្នន័យជាក់ស្តែង (Real-time)',
        'ការកំណត់សិទ្ធិប្រើប្រាស់ (Admin, Manager, Staff)',
        'ប្រព័ន្ធរក្សាទិន្នន័យអតិថិជន បុគ្គលិក និងការកក់',
        'ការចាត់ចែងការងារ និងការជូនដំណឹងស្វ័យប្រវត្តិ',
        'ប្រព័ន្ធគ្រប់គ្រងឯកសារ និងទាញយកជា PDF',
        'ប្រព័ន្ធសុវត្ថិភាព និងការកត់ត្រាសកម្មភាពប្រើប្រាស់'
      ]
    },
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'FastAPI', category: 'Backend Engine' },
      { name: 'Supabase', category: 'PostgreSQL DB' },
      { name: 'Docker', category: 'Containerization' },
      { name: 'Railway', category: 'Backend Hosting' }
    ],
    clientValue: {
      en: 'Less manual administrative work → Fewer operational errors → Centralized business data → Effortless team management.',
      km: 'កាត់បន្ថយការងាររដ្ឋបាល → កាត់បន្ថយកំហុសឆ្គង → ប្រមូលផ្តុំទិន្នន័យអាជីវកម្មនៅកន្លែងតែមួយ → គ្រប់គ្រងក្រុមការងារបានងាយស្រួល។'
    },
    engineeringImpl: {
      en: 'RESTful API architecture using FastAPI, relational PostgreSQL constraints, JWT-based role authorization, and scalable server instances.',
      km: 'ស្ថាបត្យកម្ម RESTful API ដោយ FastAPI, PostgreSQL Database, ប្រព័ន្ធសុវត្ថិភាព JWT Role-based និង Cloud Server។'
    },
    useCases: {
      en: [
        'Employee & Attendance Systems',
        'Client Management & Booking Portals',
        'Internal Operations Dashboards',
        'Document & Billing Management Systems',
        'Custom Industry Administrative Tools'
      ],
      km: [
        'ប្រព័ន្ធគ្រប់គ្រងបុគ្គលិក និងវត្តមាន',
        'ប្រព័ន្ធគ្រប់គ្រងអតិថិជន និងការកក់',
        'ផ្ទាំងគ្រប់គ្រងប្រតិបត្តិការផ្ទៃក្នុង',
        'ប្រព័ន្ធគ្រប់គ្រងវិក្កយបត្រ និងឯកសារ',
        'ឧបករណ៍គ្រប់គ្រងរដ្ឋបាលតាមអាជីវកម្មជាក់ស្តែង'
      ]
    }
  },
  {
    id: 'pos',
    number: '04',
    title: {
      en: 'POS Systems',
      km: 'ប្រព័ន្ធ POS លក់នៅបញ្ជរ (POS Systems)'
    },
    shortDesc: {
      en: 'Point-of-sale systems designed to make selling, inventory, reporting, and daily operations easier.',
      km: 'ប្រព័ន្ធលក់នៅបញ្ជរដែលបង្កើតឡើងដើម្បីសម្រួលដល់ការលក់ ការគ្រប់គ្រងស្តុក របាយការណ៍ និងប្រតិបត្តិការប្រចាំថ្ងៃ។'
    },
    tags: ['POS', 'INVENTORY', 'SALES', 'REPORTING'],
    icon: <Monitor className="w-6 h-6 text-red-500" />,
    problem: {
      en: 'Retail stores and food outlets suffer from long customer lines, untracked inventory leaks, inaccurate end-of-day counts, and complex legacy software.',
      km: 'ហាងទំនិញ និងហាងអាហារជួបប្រទះការរង់ចាំយូររបស់អតិថិជន ការបាត់បង់ស្តុកដោយមិនដឹងខ្លួន របាយការណ៍ប្រចាំថ្ងៃមិនច្បាស់លាស់ និងសូហ្វវែរចាស់ៗស្មុគស្មាញ។'
    },
    solution: {
      en: 'A fast, intuitive Point-of-Sale interface engineered for high-speed counter operations, real-time stock deduction, quick receipts, and clear daily management reporting.',
      km: 'ប្រព័ន្ធ POS ទំនើប និងលឿនរហ័ស ឌីហ្សាញឡើងសម្រាប់គិតលុយនៅបញ្ជរ កាត់ស្តុកភ្លាមៗ បោះពុម្ពវិក្កយបត្រលឿន និងផ្តល់របាយការណ៍លក់ច្បាស់លាស់។'
    },
    deliverables: {
      en: [
        'High-speed touch-friendly sales counter interface',
        'Product catalog, variations, and barcode lookup',
        'Real-time inventory deduction and stock level warnings',
        'Customer records, loyalty tracking, and receipt generation',
        'Daily, weekly, and monthly revenue analytics dashboards',
        'Multi-staff login with manager permissions and cash audit'
      ],
      km: [
        'ផ្ទៃបញ្ជាគិតលុយលឿន រហ័ស និងងាយចុចលើអេក្រង់',
        'បញ្ជីទំនិញ ប្រភេទជម្រើស និងការស្កេន Barcode',
        'ការកាត់ស្តុកភ្លាមៗ និងការប្រាប់ដំណឹងពេលអស់ស្តុក',
        'ប្រព័ន្ធសមាជិកអតិថិជន និងការបោះពុម្ពវិក្កយបត្រ',
        'របាយការណ៍ចំណូលប្រចាំថ្ងៃ ប្រចាំសប្តាហ៍ និងប្រចាំខែ',
        'ការគ្រប់គ្រងគណនីបុគ្គលិក និងការពិនិត្យប្រាក់ក្នុងថត'
      ]
    },
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'FastAPI', category: 'Backend API' },
      { name: 'Supabase', category: 'Database' },
      { name: 'Railway', category: 'Cloud Server' }
    ],
    clientValue: {
      en: 'Faster checkout queues → Accurate inventory visibility → Instant sales analytics → Zero end-of-day math headaches.',
      km: 'គិតលុយលឿន → ដឹងចំនួនស្តុកច្បាស់លាស់ → មើលរបាយការណ៍លក់ភ្លាមៗ → មិនបាច់ឈឺក្បាលទូទាត់បញ្ជីចុងម៉ោង។'
    },
    engineeringImpl: {
      en: 'Optimized local UI cache for zero latency checkout, transactional database commits for stock consistency, aggregated reporting queries.',
      km: 'បច្ចេកវិទ្យា Local UI Cache សម្រាប់គិតលុយគ្មាន Latency, Database Commit ការពារការខុសស្តុក និង Query របាយការណ៍លឿន។'
    },
    useCases: {
      en: [
        'Restaurants & Coffee Shops',
        'Retail Stores & Boutiques',
        'Supermarkets & Convenience Stores',
        'Service Counters & Salons',
        'Multi-Branch Sales Operations'
      ],
      km: [
        'ភោជនីយដ្ឋាន និងហាងកាហ្វេ',
        'ហាងលក់ខោអាវ និងហាងទំនិញ',
        'ម៉ាត និងហាងទំនិញប្រចាំថ្ងៃ',
        'ហាងកាត់សក់ និងហាងថែរក្សាសម្ផស្ស',
        'អាជីវកម្មដែលមានច្រើនសាខា'
      ]
    }
  },
  {
    id: 'ai-analytics',
    number: '05',
    title: {
      en: 'AI Analytics & Intelligence',
      km: 'ប្រព័ន្ធវិភាគទិន្នន័យ AI (AI Analytics & Intelligence)'
    },
    shortDesc: {
      en: 'Turn your business data and documents into useful insights, analysis, recommendations, and intelligent workflows.',
      km: 'បម្លែងទិន្នន័យ និងឯកសារអាជីវកម្មរបស់អ្នកឱ្យទៅជាព័ត៌មានវិភាគដ៏មានប្រយោជន៍ ការណែនាំ និងដំណើរការឆ្លាតវៃ។'
    },
    tags: ['AI', 'ANALYTICS', 'INSIGHTS', 'DECISION SUPPORT'],
    icon: <Brain className="w-6 h-6 text-red-500" />,
    problem: {
      en: 'Businesses sit on piles of customer records, sales reports, and operational PDFs, but lack the time or tools to extract meaningful insights to guide decisions.',
      km: 'អាជីវកម្មមានទិន្នន័យអតិថិជន របាយការណ៍លក់ និងឯកសារ PDF ជាច្រើន ប៉ុន្តែខ្វះពេល ឬឧបករណ៍ដើម្បីទាញយកព័ត៌មានជំនួយដល់ការសម្រេចចិត្ត។'
    },
    solution: {
      en: 'I embed specialized AI models and intelligence pipelines directly into your software, allowing you to converse with your data, summarize complex documents, and spot operational trends automatically.',
      km: 'ខ្ញុំភ្ជាប់ប្រព័ន្ធ AI ទៅក្នុងសូហ្វវែររបស់អ្នក ដែលអនុញ្ញាតឱ្យអ្នកសួរដេញដោលជាមួយទិន្នន័យ សង្ខេបឯកសារស្មុគស្មាញ និងមើលឃើញនិន្នាការអាជីវកម្មដោយស្វ័យប្រវត្តិ។'
    },
    deliverables: {
      en: [
        'AI-powered business analytics & insight generators',
        'Document analysis pipelines (PDFs, reports, contracts)',
        'Custom internal AI assistant tuned to your operations',
        'Automated weekly intelligence and trend summaries',
        'Smart customer query routing and automated categorization',
        'Interactive executive decision support dashboards'
      ],
      km: [
        'ប្រព័ន្ធវិភាគទិន្នន័យអាជីវកម្មដើរដោយ AI',
        'ប្រព័ន្ធអាន និងសង្ខេបឯកសារ (PDF, របាយការណ៍, កិច្ចសន្យា)',
        'AI ជំនួយការផ្ទៃក្នុងសម្របតាមអាជីវកម្មរបស់អ្នក',
        'ការសង្ខេបរបាយការណ៍ និងនិន្នាការប្រចាំសប្តាហ៍ស្វ័យប្រវត្តិ',
        'ការបែងចែកសំណួរអតិថិជន និងការឆ្លើយតបឆ្លាតវៃ',
        'ផ្ទាំងវិភាគទិន្នន័យសម្រាប់អ្នកគ្រប់គ្រង'
      ]
    },
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Python', category: 'AI Core' },
      { name: 'FastAPI', category: 'Microservices' },
      { name: 'Supabase', category: 'Vector Store' },
      { name: 'LLM / AI APIs', category: 'Intelligence' }
    ],
    clientValue: {
      en: 'More useful business insights → Faster data analysis → Smarter operational decisions → Reduced reporting overhead.',
      km: 'ទទួលបានព័ត៌មានវិភាគច្បាស់លាស់ → វិភាគទិន្នន័យលឿន → ធ្វើការសម្រេចចិត្តអាជីវកម្មត្រឹមត្រូវ → កាត់បន្ថយពេលធ្វើរបាយការណ៍។'
    },
    engineeringImpl: {
      en: 'Vector embeddings retrieval (RAG pipeline), structured prompt engineering, asynchronous microservice processing in Python FastAPI.',
      km: 'ការប្រើប្រាស់ Vector Embeddings (RAG Pipeline), Prompt Engineering និង Python FastAPI Microservices។'
    },
    useCases: {
      en: [
        'Business Performance Analytics',
        'Automated Document Processing',
        'Internal Customer Support AI Agents',
        'Executive Intelligence Dashboards',
        'AI Recommendation Engines'
      ],
      km: [
        'ការវិភាគប្រសិទ្ធភាពអាជីវកម្ម',
        'ការដំណើរការ និងអានឯកសារស្វ័យប្រវត្តិ',
        'AI ជំនួយការបម្រើអតិថិជនផ្ទៃក្នុង',
        'ផ្ទាំងវិភាគទិន្នន័យសម្រាប់ថ្នាក់ដឹកនាំ',
        'ប្រព័ន្ធណែនាំផលិតផល AI'
      ]
    }
  },
  {
    id: 'automation',
    number: '06',
    title: {
      en: 'Automation & Remote Systems',
      km: 'ប្រព័ន្ធស្វ័យប្រវត្តិកម្ម (Automation & Remote Systems)'
    },
    shortDesc: {
      en: 'Automate repetitive work and connect your tools so your business can operate with less manual effort.',
      km: 'ធ្វើស្វ័យប្រវត្តិកម្មការងារដែលជាន់គ្នា និងភ្ជាប់ឧបករណ៍ឌីជីថលរបស់អ្នកចូលគ្នា ដើម្បីឱ្យអាជីវកម្មដំណើរការដោយកាត់បន្ថយកម្លាំងមនុស្ស។'
    },
    tags: ['AUTOMATION', 'REMOTE', 'INTEGRATION', 'WORKFLOW'],
    icon: <Zap className="w-6 h-6 text-red-500" />,
    problem: {
      en: 'Staff members spend hours copying numbers from one tool to another, sending manual reminder messages, and triggering daily routines manually.',
      km: 'បុគ្គលិកចំណាយពេលរាប់ម៉ោងក្នុងការចម្លងលេខពីប្រព័ន្ធមួយទៅប្រព័ន្ធមួយទៀត ការផ្ញើសាររំលឹកដោយដៃ និងការធ្វើការងារដដែលៗរៀងរាល់ថ្ងៃ។'
    },
    solution: {
      en: 'I build automated background pipelines that bridge your existing tools, automatically transfer data, send instant alerts, and run scheduled tasks while you sleep.',
      km: 'ខ្ញុំបង្កើតប្រព័ន្ធស្វ័យប្រវត្តិកម្មនៅខាងក្រោយ (Background Pipeline) ដែលតភ្ជាប់កម្មវិធីរបស់អ្នក បញ្ជូនទិន្នន័យស្វ័យប្រវត្តិ ផ្ញើសារជូនដំណឹង និងធ្វើការងារតាមពេលវេលាកំណត់។'
    },
    deliverables: {
      en: [
        'Custom API integrations between distinct software systems',
        'Automated Telegram / Email / WhatsApp notifications',
        'Scheduled background syncs and nightly batch processing',
        'Remote system status and monitoring control panels',
        'AI-driven workflow triggers and automated data cleanup',
        'Error logging and automatic failure recovery hooks'
      ],
      km: [
        'ការភ្ជាប់ API រវាងកម្មវិធីផ្សេងៗគ្នា',
        'ប្រព័ន្ធផ្ញើសារជូនដំណឹងស្វ័យប្រវត្តិ (Telegram / Email / WhatsApp)',
        'ការធ្វើបច្ចុប្បន្នភាពទិន្នន័យតាមម៉ោង និងពេលយប់ស្វ័យប្រវត្តិ',
        'ផ្ទាំងតាមដានស្ថានភាពប្រព័ន្ធពីចម្ងាយ',
        'ប្រព័ន្ធស្វ័យប្រវត្តិកម្មដំណើរការដោយ AI',
        'ប្រព័ន្ធកត់ត្រាកំហុស និងការជួសជុលស្វ័យប្រវត្តិ'
      ]
    },
    techStack: [
      { name: 'Python', category: 'Core Scripting' },
      { name: 'FastAPI', category: 'Webhook Server' },
      { name: 'APIs & Webhooks', category: 'Integration' },
      { name: 'Docker', category: 'Execution Environment' },
      { name: 'Railway', category: 'Background Hosting' }
    ],
    clientValue: {
      en: 'Less repetitive manual labor → Elimination of human copy-paste errors → Faster execution → Focus on core business growth.',
      km: 'កាត់បន្ថយការងារដោយដៃដដែលៗ → លុបបំបាត់កំហុសចម្លងទិន្នន័យ → ការងារលឿនរហ័ស → មានពេលផ្តោតលើការរីកចម្រើនអាជីវកម្ម។'
    },
    engineeringImpl: {
      en: 'Asynchronous event listeners, cron job schedules, webhook handlers, fault-tolerant retry queues with alert notifications.',
      km: 'ការប្រើប្រាស់ Asynchronous Event Listeners, Cron Jobs, Webhooks និង Fault-tolerant Retry Queues។'
    },
    useCases: {
      en: [
        'Cross-Platform Data Synchronization',
        'Automated Customer Alerts & Reminders',
        'Scheduled Data Backups & Exports',
        'Remote Operations Monitoring',
        'Automated Invoice & Email Workflows'
      ],
      km: [
        'ការធ្វើបច្ចុប្បន្នភាពទិន្នន័យរវាងប្រព័ន្ធផ្សេងៗ',
        'ការផ្ញើសាររំលឹកអតិថិជនស្វ័យប្រវត្តិ',
        'ការ Backup និងទាញយកទិន្នន័យតាមកាលវិភាគ',
        'ការតាមដានប្រតិបត្តិការពីចម្ងាយ',
        'ប្រព័ន្ធវិក្កយបត្រ និងអ៊ីមែលស្វ័យប្រវត្តិ'
      ]
    }
  }
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/* -------------------------------------------------------------------------- */
/*                         GLOBAL MOTION PRIMITIVES                           */
/* -------------------------------------------------------------------------- */

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: PREMIUM_EASE } 
  }
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(2px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: PREMIUM_EASE } 
  }
};

/* -------------------------------------------------------------------------- */
/*                       BOOT SEQUENCE THREE.JS SYSTEM CORE                  */
/* -------------------------------------------------------------------------- */

const BootSystemCoreCanvas: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    currentMount.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Glowing Red Central Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Inner Glowing Core Solid
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Thin Circular Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xdc2626, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // Particles
    const particlesCount = isMobile ? 25 : 55;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.05,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      coreGroup.rotation.y = elapsedTime * 0.4;
      coreGroup.rotation.x = elapsedTime * 0.25;

      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.z = -elapsedTime * 0.3;

      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  return <div ref={mountRef} className="w-full h-full" />;
};

/* -------------------------------------------------------------------------- */
/*                          DESKTOP SPECIFIC HELPERS                          */
/* -------------------------------------------------------------------------- */

const TypewriterHeading: React.FC<{ language: Language }> = ({ language }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = language === 'km' ? "// ព័ត៌មានផ្ទាល់ខ្លួន\nអំពីខ្ញុំ" : "// Information\nAbout Me";
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    setDisplayText('');
    if (isInView) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 45);
      return () => clearInterval(timer);
    }
  }, [isInView, language, fullText]);

  return (
    <div ref={ref} className="min-h-[110px]">
      <span className="text-xs tracking-widest uppercase text-red-500 block mb-2 whitespace-pre-line font-mono">
        {displayText.split('\n')[0]}
      </span>
      <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight mb-6">
        {displayText.split('\n')[1] || <span>&nbsp;</span>}
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2.5 h-7 bg-red-600 ml-1.5 align-middle shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        />
      </h2>
    </div>
  );
};

const SystemEngineeringModelCanvas: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xdc2626, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2, 50);
    cyanLight.position.set(-5, -5, 2);
    scene.add(cyanLight);

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0xdc2626,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    systemGroup.add(coreMesh);

    const wireframeGeometry = new THREE.IcosahedronGeometry(1.48, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    systemGroup.add(wireframeMesh);

    const ringGroup1 = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.9 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup1.add(ring1);
    systemGroup.add(ringGroup1);

    const ringGroup2 = new THREE.Group();
    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.1, metalness: 0.9 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringGroup2.add(ring2);
    systemGroup.add(ringGroup2);

    const particlesCount = isMobile ? 30 : 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.06,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      systemGroup.rotation.y = elapsedTime * 0.2 + targetX * 0.6;
      systemGroup.rotation.x = elapsedTime * 0.15 + targetY * 0.6;

      ringGroup1.rotation.z = elapsedTime * 0.35;
      ringGroup2.rotation.z = -elapsedTime * 0.25;

      coreMesh.rotation.y = -elapsedTime * 0.4;
      wireframeMesh.rotation.y = -elapsedTime * 0.4;

      const heartbeatScale = 1 + Math.sin(elapsedTime * 1.5) * 0.015;
      coreMesh.scale.set(heartbeatScale, heartbeatScale, heartbeatScale);
      wireframeMesh.scale.set(heartbeatScale, heartbeatScale, heartbeatScale);

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div className={`relative w-full ${isMobile ? 'h-[240px]' : 'h-[320px] md:h-[380px]'} flex items-center justify-center bg-[#0e0e0e]/50 border border-red-900/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.12)] group`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10"></div>
      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center bg-black/70 backdrop-blur-md px-3 py-2 border border-red-900/40 rounded-lg pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] text-red-400 font-mono uppercase tracking-widest">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span>SYSTEM ARCHITECTURE ENGINE</span>
        </div>
        {!isMobile && <span className="text-[10px] text-zinc-500 font-mono">[INTERACTIVE MODEL]</span>}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           MAIN MASTER COMPONENT                            */
/* -------------------------------------------------------------------------- */

export const PortfolioMaster: React.FC = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);
    return () => window.removeEventListener('resize', handleCheckMobile);
  }, []);

  // LANGUAGE STATE MANAGEMENT WITH PERSISTENCE
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language');
    return saved === 'km' ? 'km' : 'en';
  });

  const [hasSavedLanguage, setHasSavedLanguage] = useState<boolean>(() => {
    return !!localStorage.getItem('portfolio-language');
  });

  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [selectedTempLang, setSelectedTempLang] = useState<Language | null>(null);
  const [isLangConfirmed, setIsLangConfirmed] = useState<boolean>(false);
  const [isSwitchingLang, setIsSwitchingLang] = useState<boolean>(false);

  // Translation lookup shortcut
  const t = translations[language];

  // REFACTORED BOOT/LOADING STATE MACHINE
  type BootState = 'booting' | 'ready' | 'language' | 'authorizing' | 'entered';
  const [bootState, setBootState] = useState<BootState>('booting');
  const [visibleLogIndex, setVisibleLogIndex] = useState<number>(0);

  // 3-SECOND AUTOMATIC TIMELINE
  useEffect(() => {
    if (bootState !== 'booting') return;

    const logTimers = [
      setTimeout(() => setVisibleLogIndex(1), 1000),
      setTimeout(() => setVisibleLogIndex(2), 1400),
      setTimeout(() => setVisibleLogIndex(3), 1800),
      setTimeout(() => setVisibleLogIndex(4), 2200),
      setTimeout(() => setVisibleLogIndex(5), 2600),
      setTimeout(() => {
        if (!hasSavedLanguage) {
          setBootState('language');
          setShowLanguageModal(true);
        } else {
          setBootState('ready');
        }
      }, 3000)
    ];

    return () => logTimers.forEach(t => clearTimeout(t));
  }, [bootState, hasSavedLanguage]);

  const handleSelectLanguage = (lang: Language) => {
    setSelectedTempLang(lang);
  };

  const handleConfirmLanguageSelection = () => {
    if (!selectedTempLang) return;
    setIsLangConfirmed(true);
    localStorage.setItem('portfolio-language', selectedTempLang);
    setLanguage(selectedTempLang);
    setHasSavedLanguage(true);

    setTimeout(() => {
      setShowLanguageModal(false);
      setIsLangConfirmed(false);
      setSelectedTempLang(null);
      setBootState('ready');
    }, 600);
  };

  const handleOpenLanguageSwitcher = () => {
    setSelectedTempLang(language);
    setShowLanguageModal(true);
  };

  const handleDirectLanguageSwitch = (newLang: Language) => {
    if (newLang === language) {
      setShowLanguageModal(false);
      return;
    }
    setIsSwitchingLang(true);
    localStorage.setItem('portfolio-language', newLang);
    
    setTimeout(() => {
      setLanguage(newLang);
      setShowLanguageModal(false);
      setIsSwitchingLang(false);
    }, 300);
  };

  const handleAuthorizeClick = () => {
    if (bootState !== 'ready') return;
    setBootState('authorizing');
    setTimeout(() => {
      setBootState('entered');
    }, 800);
  };

  // Roadmap Hover-Follow Motion Values
  const cursorX = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const smoothXPercent = useTransform(smoothX, (v) => `${v}%`);
  const [isRoadmapHovered, setIsRoadmapHovered] = useState(false);
  const roadmapCardRef = useRef<HTMLDivElement>(null);

  const handleRoadmapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!roadmapCardRef.current) return;
    const rect = roadmapCardRef.current.getBoundingClientRect();
    const xRelative = e.clientX - rect.left;
    const percent = (xRelative / rect.width) * 100;
    const clampedPercent = Math.max(7, Math.min(93, percent));
    cursorX.set(clampedPercent);
  };

  const [formData, setFormData] = useState({ sender_name: '', sender_email: '', project_scope: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      { role: 'assistant', content: t.copilot.defaultReply }
    ]);
  }, [language]);

  const [isProcessing, setIsProcessing] = useState(false);

  const [activeTechModal, setActiveTechModal] = useState<{
    name: string;
    category: string;
    desc: string;
    projectsUsed: string;
    reason: string;
    icon?: React.ReactNode;
  } | null>(null);

  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // SELECTED CAPABILITY DETAIL MODAL STATE
  const [activeCapabilityModal, setActiveCapabilityModal] = useState<CapabilityService | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoadmapMobile, setShowRoadmapMobile] = useState(false);
  const [hoveredRoadmapNode, setHoveredRoadmapNode] = useState<number | null>(null);

  // Esc Key support & Body Scroll Locking for Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showLanguageModal && bootState === 'entered') {
          setShowLanguageModal(false);
        }
        setActiveCapabilityModal(null);
        setActiveProjectModal(null);
        setActiveTechModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLanguageModal, bootState]);

  useEffect(() => {
    if (activeCapabilityModal || activeProjectModal || activeTechModal || (showLanguageModal && bootState === 'entered')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeCapabilityModal, activeProjectModal, activeTechModal, showLanguageModal, bootState]);

  useEffect(() => {
    if (isCarouselHovered || isMobileDevice) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarouselHovered, isMobileDevice]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Transmission failed.');
      setStatus('success');
      setFormData({ sender_name: '', sender_email: '', project_scope: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Server connection error.');
    }
  };

  const handleCopilotSubmit = (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();
    const query = promptOverride || input;
    if (!query.trim() || isProcessing) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsProcessing(true);

    setTimeout(() => {
      let responseContent = `Processed query "${query}" successfully.`;
      const q = query.toLowerCase();

      if (q.includes('build') || q.includes('តើអ្នកអាចបង្កើត') || q.includes('សេវាកម្ម')) {
        responseContent = t.copilot.responses.build;
      } else if (q.includes('stack') || q.includes('tech') || q.includes('បច្ចេកវិទ្យា')) {
        responseContent = t.copilot.responses.stack;
      } else if (q.includes('project') || q.includes('គម្រោង') || q.includes('ai')) {
        responseContent = t.copilot.responses.projects;
      } else if (q.includes('approach') || q.includes('ដំណើរការ') || q.includes('អភិវឌ្ឍ')) {
        responseContent = t.copilot.responses.approach;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      setIsProcessing(false);
    }, 800);
  };

  const roadmapNodes = [
    {
      num: "01",
      title: "DISCOVER",
      summary: language === 'km' ? "យល់ដឹងពីគោលដៅអាជីវកម្ម និងបញ្ហាក្នុងការងារ" : "Understand your business goals & workflow pain points",
      details: language === 'km' ? ["ពិគ្រោះយោបល់ជាមួយអតិថិជន", "កំណត់តម្រូវការប្រព័ន្ធ", "ស្វែងយល់ពីអ្នកប្រើប្រាស់", "កំណត់វិសាលភាពគម្រោង"] : ["Client Consultation", "Requirement Discovery", "User Persona Setup", "Scope Definition"],
      clientValue: language === 'km' ? "ខ្ញុំយល់ពីបញ្ហាអាជីវកម្មពិតប្រាកដមុនពេលចាប់ផ្តើមសរសេរកូដ។" : "I understand the real business problem before writing any code."
    },
    {
      num: "02",
      title: "PLAN",
      summary: language === 'km' ? "រៀបចំស្ថាបត្យកម្ម ទិន្នន័យ និងប្លង់ប្រព័ន្ធ" : "Define architecture, data models & system blueprints",
      details: language === 'km' ? ["ឌីហ្សាញប្លង់ប្រព័ន្ធ", "បង្កើតរចនាសម្ព័ន្ធ Database", "រៀបចំ API Blueprint", "កំណត់កាលវិភាគការងារ"] : ["System Schemas", "Database Modeling", "API Routing Blueprint", "Milestone Roadmap"],
      clientValue: language === 'km' ? "អ្នកទទួលបានផែនការច្បាស់លាស់នៃអ្វីដែលត្រូវបង្កើត។" : "You get a structured plan of exactly what will be built."
    },
    {
      num: "03",
      title: "DESIGN",
      summary: language === 'km' ? "ឌីហ្សាញ UI/UX ទំនើប និងទាក់ទាញស្របតាមម៉ាកសញ្ញា" : "Craft clean, modern UI/UX tailored to your brand",
      details: language === 'km' ? ["គូរ Wireframes", "បង្កើត Prototype អន្តរកម្ម", "រចនាសម្រាប់គ្រប់អេក្រង់", "ធានាស្តង់ដារ Accessibility"] : ["Wireframes", "Interactive Prototypes", "Responsive Systems", "Accessibility Standards"],
      clientValue: language === 'km' ? "អតិថិជនរបស់អ្នកទទួលបានប្រព័ន្ធដែលងាយស្រួលប្រើ និងមានភាពទាក់ទាញ។" : "Your customers get an intuitive, premium interface."
    },
    {
      num: "04",
      title: "BUILD",
      summary: language === 'km' ? "សរសេរកូដប្រព័ន្ធ Full-Stack Frontend & Backend" : "Full-stack frontend & backend product engineering",
      details: language === 'km' ? ["React / TypeScript UI", "FastAPI / Python Logic", "Supabase DB & Auth", "សរសេរ Business Logic"] : ["React / TypeScript UI", "FastAPI / Python Logic", "Supabase DB & Auth", "Business Logic"],
      clientValue: language === 'km' ? "គំនិតរបស់អ្នកក្លាយជាប្រព័ន្ធឌីជីថលដែលដំណើរការបានពេញលេញ។" : "Your idea turns into a fully functioning digital system."
    },
    {
      num: "05",
      title: "INTEGRATE",
      summary: language === 'km' ? "ភ្ជាប់ប្រព័ន្ធទូទាត់ប្រាក់ AI Models និង APIs" : "Connect payments, AI models & third-party APIs",
      details: language === 'km' ? ["ភ្ជាប់ Payment Provider APIs", "រៀបចំ LLM & Vector Pipelines", "កំណត់ Webhooks ស្វ័យប្រវត្តិ", "ភ្ជាប់ប្រព័ន្ធផ្ញើសារជូនដំណឹង"] : ["Payment Provider APIs", "LLM & Vector Pipelines", "Automated Webhooks", "Notification Channels"],
      clientValue: language === 'km' ? "សូហ្វវែររបស់អ្នកភ្ជាប់ទំនាក់ទំនងយ៉ាងរលូនជាមួយប្រព័ន្ធបង់ប្រាក់ AI និងឧបករណ៍ខាងក្រៅ។" : "Your software connects seamlessly to payments, AI, and external tools."
    },
    {
      num: "06",
      title: "TEST",
      summary: language === 'km' ? "ធ្វើតេស្តគុណភាព ល្បឿន សុវត្ថិភាព និងការបង្ហាញលើគ្រប់ឧបករណ៍" : "Rigorous quality, speed, security & cross-device checks",
      details: language === 'km' ? ["ពង្រឹងសុវត្ថិភាពប្រព័ន្ធ", "ពិនិត្យការបង្ហាញលើទូរស័ព្ទ", "វាស់ស្ទង់ល្បឿន Latency", "ធ្វើ End-to-End Testing"] : ["Security Hardening", "Mobile Usability Check", "Edge Latency Audit", "End-to-End Testing"],
      clientValue: language === 'km' ? "ផលិតផលរបស់អ្នកដំណើរការដោយជឿទុកចិត្តបាន ដោយគ្មាន Bug ឬការគាំងប្រព័ន្ធ។" : "Your product operates reliably without unexpected bugs or crashes."
    },
    {
      num: "07",
      title: "DEPLOY",
      summary: language === 'km' ? "ដាក់ប្រព័ន្ធឱ្យដំណើរការលើ Cloud Infrastructure សកល" : "Ship production systems to global cloud infrastructure",
      details: language === 'km' ? ["Vercel Edge & Railway", "កំណត់ Domain ផ្ទាល់ខ្លួន", "រៀបចំ SSL & Env Safety", "ដំឡើង CI/CD Deployment"] : ["Vercel Edge & Railway", "Custom Domain Config", "SSL & Env Hardening", "CI/CD Deployment"],
      clientValue: language === 'km' ? "ប្រព័ន្ធរបស់អ្នកដាក់ឱ្យប្រើប្រាស់ជាផ្លូវការប្រកបដោយរលូនសម្រាប់អតិថិជន។" : "Your system goes live smoothly for real customers to use."
    },
    {
      num: "08",
      title: "IMPROVE",
      summary: language === 'km' ? "តាមដានប្រសិទ្ធភាព កែប្រែ និងបន្ថែមមុខងារថ្មីៗ" : "Monitor performance, squash bugs & add future features",
      details: language === 'km' ? ["តាមដាន Real-time Telemetry", "កែប្រែតាមមតិអតិថិជន", "បង្កើនល្បឿនប្រព័ន្ធ", "ពង្រីកសមត្ថភាពបន្ថែម"] : ["Real-time Telemetry", "User Feedback Refinements", "Performance Tuning", "Ongoing Scalability"],
      clientValue: language === 'km' ? "ប្រព័ន្ធឌីជីថលរបស់អ្នកបន្តអភិវឌ្ឍទៅមុខស្របតាមការរីកចម្រើននៃអាជីវកម្ម។" : "Your digital asset continues to evolve as your business grows."
    }
  ];

  const techWallData = [
    { 
      name: "React", 
      category: "Frontend", 
      desc: language === 'km' ? "បណ្ណាល័យ Component UI សម្រាប់បង្កើតកម្មវិធី Web ដែលមានល្បឿនលឿន និងរចនាសម្ព័ន្ធស្អាតបាត។" : "Component-based UI library for building scalable, responsive web applications.", 
      projectsUsed: "Portfolio, BAC II Platform, Math Learning System", 
      reason: language === 'km' ? "ជ្រើសរើសដោយសារភាពងាយស្រួលក្នុងការគ្រប់គ្រង Component និងប្រព័ន្ធ Ecosystem ធំទូលាយ។" : "Chosen for component modularity and vast ecosystem support.",
      icon: <SiReact className="w-5 h-5 text-zinc-400 group-hover:text-[#61DAFB] transition-colors" aria-hidden="true" /> 
    },
    { 
      name: "TypeScript", 
      category: "Language", 
      desc: language === 'km' ? "ភាសាដែលពង្រីកពី JavaScript ដើម្បីបន្ថែម Type Safety ការពារកំហុសកូដ និងងាយស្រួលថែទាំ។" : "Typed superset of JavaScript ensuring robust type safety and maintainability.", 
      projectsUsed: "All Core Web Products", 
      reason: language === 'km' ? "លុបបំបាត់ Runtime Errors និងផ្តល់ការណែនាំកូដបានយ៉ាងត្រឹមត្រូវក្នុង IDE។" : "Eliminates runtime errors and provides pristine IDE autocomplete.",
      icon: <SiTypescript className="w-5 h-5 text-zinc-400 group-hover:text-[#3178C6] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Python", 
      category: "Backend / AI", 
      desc: language === 'km' ? "ភាសាស្នូលសម្រាប់ស្ថាបត្យកម្ម Backend Server និងការសរសេរកូដតភ្ជាប់ AI Models។" : "Core language for backend server architectures and AI model integration scripts.", 
      projectsUsed: "BAC II AI Backend, Fast Vector Pipeline", 
      reason: language === 'km' ? "ជាស្តង់ដារឧស្សាហកម្មសម្រាប់ AI, Machine Learning និងការសរសេរ Script ស្វ័យប្រវត្តិ។" : "Industry standard for AI, machine learning, and rapid scripting.",
      icon: <SiPython className="w-5 h-5 text-zinc-400 group-hover:text-[#3776AB] transition-colors" aria-hidden="true" />
    },
    { 
      name: "FastAPI", 
      category: "Backend", 
      desc: language === 'km' ? "Framework របស់ Python ដែលមានប្រសិទ្ធភាពខ្ពស់សម្រាប់បង្កើត RESTful APIs មានល្បឿនលឿន។" : "High-performance Python web framework for building fast RESTful APIs.", 
      projectsUsed: "AI Microservices & Math Engine API", 
      reason: language === 'km' ? "ល្បឿនលឿនបំផុត បង្កើត Swagger Docs ដោយស្វ័យប្រវត្តិ និងទ្រទ្រង់ Async ផ្ទាល់។" : "Blazing speed, automatic Swagger docs, and native async support.",
      icon: <SiFastapi className="w-5 h-5 text-zinc-400 group-hover:text-[#009688] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Tailwind CSS", 
      category: "Styling", 
      desc: language === 'km' ? "Utility-first CSS framework សម្រាប់ឌីហ្សាញចំណុចប្រទាក់ Dark Mode ប្រកបដោយភាពច្នៃប្រឌិត។" : "Utility-first CSS framework for crafting bespoke dark editorial interfaces.", 
      projectsUsed: "All Web Interfaces", 
      reason: language === 'km' ? "ល្បឿនលឿនក្នុងការឌីហ្សាញ និងរក្សាភាពស៊ីសង្វាក់គ្នានៃការរចនាបានល្អឥតខ្ចោះ។" : "Unmatched styling speed and pristine design consistency.",
      icon: <SiTailwindcss className="w-5 h-5 text-zinc-400 group-hover:text-[#06B6D4] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Supabase", 
      category: "Database", 
      desc: language === 'km' ? "ប្រព័ន្ធជំនួស Firebase បែប Open-source ដែលមាន PostgreSQL, Auth និង Realtime ស្រាប់។" : "Open-source Firebase alternative with PostgreSQL, Auth, and Realtime features.", 
      projectsUsed: "BAC II Platform & User Storage", 
      reason: language === 'km' ? "ផ្តល់នូវប្រព័ន្ធទិន្នន័យភ្លាមៗ ជាមួយនឹងគោលការណ៍សុវត្ថិភាពទិន្នន័យរឹងមាំ។" : "Provides instant database scaffolding with robust security policies.",
      icon: <SiSupabase className="w-5 h-5 text-zinc-400 group-hover:text-[#3ECF8E] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Docker", 
      category: "DevOps", 
      desc: language === 'km' ? "ឧបករណ៍ Containerization សម្រាប់វេចខ្ចប់កម្មវិធី និងទិន្នន័យដើម្បីរត់បានយ៉ាងជឿជាក់លើគ្រប់ប្រព័ន្ធ។" : "Containerization tool for packaging applications and dependencies reliably.", 
      projectsUsed: "Local Development & Backend Services", 
      reason: language === 'km' ? "ធានាថាកម្មវិធីដំណើរការដូចគ្នាទាំងលើកុំព្យូទ័រអភិវឌ្ឍន៍ និងលើ Cloud Server។" : "Ensures identical environments across development and production.",
      icon: <SiDocker className="w-5 h-5 text-zinc-400 group-hover:text-[#2496ED] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Vercel", 
      category: "Cloud", 
      desc: language === 'km' ? "ផ្លាតហ្វម Cloud សម្រាប់ដាក់ឱ្យប្រើប្រាស់ Static Sites និង Frontend Serverless។" : "Cloud platform for static sites and serverless frontend deployments.", 
      projectsUsed: "Frontend Applications & Demos", 
      reason: language === 'km' ? "ការដាក់ឱ្យប្រើប្រាស់លឿនរហ័សទូទាំងពិភពលោក មាន SSL និងល្បឿន Edge ខ្ពស់។" : "Instant global deployments, SSL, and optimal edge performance.",
      icon: <SiVercel className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true" />
    },
    { 
      name: "Railway", 
      category: "Cloud", 
      desc: language === 'km' ? "ផ្លាតហ្វម Infrastructure សម្រាប់ដាក់ឱ្យប្រើប្រាស់ Backend Services, Databases និង APIs។" : "Infrastructure platform for deploying backend services, databases, and APIs.", 
      projectsUsed: "FastAPI & Python Pipelines", 
      reason: language === 'km' ? "ការគ្រប់គ្រង Server ងាយស្រួល និងការកំណត់ Environment Variables ដោយរលូន។" : "Effortless server management and seamless environment variable sync.",
      icon: <SiRailway className="w-5 h-5 text-zinc-400 group-hover:text-[#0B0D0E] dark:group-hover:text-white transition-colors" aria-hidden="true" />
    },
    { 
      name: "Git", 
      category: "Versioning", 
      desc: language === 'km' ? "ប្រព័ន្ធគ្រប់គ្រងកំណែកូដ (Version Control System) សម្រាប់តាមដានការផ្លាស់ប្តូរកូដ។" : "Distributed version control system for tracking changes in source code.", 
      projectsUsed: "All Repositories", 
      reason: language === 'km' ? "ចាំបាច់បំផុតសម្រាប់ការរក្សាប្រវត្តិកូដ និងការគ្រប់គ្រងការកែប្រែកូដ។" : "Essential for tracking code history and managing code revisions.",
      icon: <SiGit className="w-5 h-5 text-zinc-400 group-hover:text-[#F05032] transition-colors" aria-hidden="true" />
    },
    { 
      name: "GitHub", 
      category: "Versioning", 
      desc: language === 'km' ? "ផ្លាតហ្វម Cloud សម្រាប់រក្សាទុកកូដ Git ការពិនិត្យកូដ និងការធ្វើស្វ័យប្រវត្តិកម្ម CI/CD។" : "Cloud platform for git repository hosting, code reviews, and CI/CD automation.", 
      projectsUsed: "All Repositories", 
      reason: language === 'km' ? "ស្តង់ដារឧស្សាហកម្មសម្រាប់ការគ្រប់គ្រងគម្រោង និងការធ្វើការរួមគ្នា។" : "Industry benchmark for project management and remote team collaboration.",
      icon: <SiGithub className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true" />
    },
    { 
      name: "VS Code", 
      category: "Environment", 
      desc: language === 'km' ? "កម្មវិធីសរសេរកូដដ៏មានប្រជាប្រិយភាព ដែលបំពាក់នូវ AI Extensions ជាច្រើន។" : "Extensible source code editor tailored with custom AI extensions.", 
      projectsUsed: "Primary Workspace", 
      reason: language === 'km' ? "បណ្តុំ Extension ដ៏សម្បូរបែប និងការភ្ជាប់ជាមួយ Terminal បានយ៉ាងល្អ។" : "Unrivaled extension ecosystem and deep terminal integration.",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/visual-studio-code.svg"
          alt=""
          aria-hidden="true"
          className="w-5 h-5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
        />
      )
    },
    { 
      name: "Kali Linux", 
      category: "Security", 
      desc: language === 'km' ? "ប្រព័ន្ធប្រតិបត្តិការ Linux ផ្តោតលើការពិនិត្យសុវត្ថិភាព និងការធ្វើតេស្តបណ្តាញ network។" : "Linux distribution focused on security auditing and network testing.", 
      projectsUsed: "Security & System Hardening Audits", 
      reason: language === 'km' ? "ឧបករណ៍សំខាន់សម្រាប់យល់ដឹងពីសុវត្ថិភាពអ៊ីនធឺណិត និងការការពារប្រព័ន្ធ Web។" : "Essential toolkit for understanding cybersecurity and web safety.",
      icon: <SiKalilinux className="w-5 h-5 text-zinc-400 group-hover:text-[#557CDA] transition-colors" aria-hidden="true" />
    }
  ];

  return (
    <div className={`min-h-screen bg-[#0c0c0c] text-[#e4e2e1] selection:bg-red-600 selection:text-white font-mono relative overflow-x-hidden ${language === 'km' ? 'font-khmer' : ''}`}>
      
      {/* Dynamic Smooth Page Transition Overlay on Language Switch */}
      <AnimatePresence>
        {isSwitchingLang && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-[#0c0c0c]/80 backdrop-blur-md pointer-events-none flex items-center justify-center"
          >
            <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              <span>UPDATING INTERFACE LANGUAGE...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-red-600 z-[100] origin-left shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        style={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
      />

      {/* REACT-POWERED CINEMATIC AI BOOT & AUTHORIZATION OVERLAY */}
      <AnimatePresence>
        {bootState !== 'entered' && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.03, 
              filter: "blur(10px)",
              transition: { duration: 0.8, ease: PREMIUM_EASE } 
            }}
            className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col justify-between p-4 sm:p-6 md:p-12 border-b border-red-900/30 overflow-hidden font-mono select-none"
          >
            {/* Background Visual Enhancements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            {/* Subtle Scanning Sweep Line */}
            <motion.div 
              animate={{ y: ['-100%', '1000%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-red-600/5 to-transparent pointer-events-none"
            />

            {/* TOP BAR */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-20 flex justify-between items-center text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 border-b border-zinc-900 pb-3"
            >
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]" />
                <span>● {t.boot.systemBoot}</span>
                <span className="text-zinc-600 hidden sm:inline ml-2">{t.boot.envInit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 hidden md:inline">[{t.boot.secureEnv}]</span>
                <span className="text-red-500 font-bold">
                  [{bootState === 'booting' ? t.boot.initializing : t.boot.online}]
                </span>
              </div>
            </motion.div>

            {/* CENTER CONTENT */}
            <div className="relative z-20 my-auto flex flex-col items-center justify-center max-w-xl mx-auto w-full py-4">
              <AnimatePresence mode="wait">
                {bootState === 'booting' && (
                  <motion.div 
                    key="booting-phase"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center w-full"
                  >
                    {/* 3D System Architecture Central Core */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: PREMIUM_EASE }}
                      className="w-48 h-48 sm:w-60 sm:h-60 relative flex items-center justify-center my-2"
                    >
                      <BootSystemCoreCanvas isMobile={isMobileDevice} />
                      <div className="absolute inset-0 rounded-full border border-red-600/20 animate-ping pointer-events-none" />
                    </motion.div>

                    {/* Sequential Boot Logs Terminal */}
                    <div className="w-full bg-[#101010]/90 border border-zinc-800/80 p-4 rounded-xl shadow-2xl space-y-2 mt-4 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 border-b border-zinc-800/60 mb-2 font-mono">
                        <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-red-500" /> SYSTEM_KERNEL_LOG</span>
                        <span>EXECUTION_MODE: AUTO</span>
                      </div>

                      <div className="space-y-1.5 text-[10px] sm:text-[11px] font-mono min-h-[120px]">
                        {t.boot.logs.map((line, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                            animate={visibleLogIndex > idx ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                            className={`flex justify-between items-center ${idx === visibleLogIndex - 1 ? 'text-zinc-200' : 'text-zinc-500'}`}
                          >
                            <span>{line.split('.............')[0]}.............</span>
                            <span className="text-red-500 font-bold ml-2">OK</span>
                          </motion.div>
                        ))}

                        {visibleLogIndex >= 5 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="pt-2 border-t border-zinc-800/60 mt-2 space-y-1"
                          >
                            <p className="text-white font-bold tracking-wider flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                              {t.boot.systemReady}
                            </p>
                            <p className="text-red-400 font-mono text-[10px] flex items-center gap-1">
                              {t.boot.waitingAuth}
                              <span className="inline-block w-1.5 h-3 bg-red-600 animate-pulse" />
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* LANGUAGE SELECTION PROTOCOL MODAL DURING BOOT */}
                {bootState === 'language' && (
                  <motion.div 
                    key="language-selection-phase"
                    initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    transition={{ duration: 0.5, ease: PREMIUM_EASE }}
                    className="w-full max-w-lg bg-[#111111]/95 border border-red-900/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(220,38,38,0.22)] relative overflow-hidden backdrop-blur-xl text-left"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-900" />
                    
                    <div className="flex items-center justify-between text-[10px] text-red-500 font-mono tracking-widest uppercase mb-4 border-b border-zinc-800/80 pb-3">
                      <div className="flex items-center gap-2">
                        <Globe2 className="w-4 h-4 text-red-500 animate-pulse" />
                        <span>{t.langModal.protocol}</span>
                      </div>
                      <span className="text-zinc-500">[SYSTEM PROTOCOL]</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight font-display mb-1">
                      {t.langModal.ready}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mb-6">
                      {t.langModal.subText}
                    </p>

                    <AnimatePresence mode="wait">
                      {!isLangConfirmed ? (
                        <motion.div 
                          key="select-cards"
                          variants={staggerContainerVariant}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4"
                        >
                          {/* ENGLISH OPTION */}
                          <motion.button
                            variants={staggerItemVariant}
                            whileHover={{ scale: 1.02, borderColor: '#dc2626' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectLanguage('en')}
                            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                              selectedTempLang === 'en' 
                                ? 'bg-red-950/40 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.3)]' 
                                : 'bg-[#161616] border-zinc-800 hover:bg-[#1a1a1a]'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-2xl font-bold font-mono text-white">EN</span>
                              {selectedTempLang === 'en' && (
                                <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">ENGLISH</h4>
                            <p className="text-[11px] text-zinc-400 font-mono">{t.langModal.enBtnSub}</p>
                          </motion.button>

                          {/* KHMER OPTION */}
                          <motion.button
                            variants={staggerItemVariant}
                            whileHover={{ scale: 1.02, borderColor: '#dc2626' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectLanguage('km')}
                            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                              selectedTempLang === 'km' 
                                ? 'bg-red-950/40 border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.3)]' 
                                : 'bg-[#161616] border-zinc-800 hover:bg-[#1a1a1a]'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-2xl font-bold font-khmer text-white">ខ្មែរ</span>
                              {selectedTempLang === 'km' && (
                                <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px]">
                                  ✓
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-bold text-white font-khmer mb-1">ភាសាខ្មែរ</h4>
                            <p className="text-[11px] text-zinc-400 font-khmer">{t.langModal.kmBtnSub}</p>
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="confirm-state"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="py-6 border-y border-zinc-800/80 my-4 text-center space-y-2 bg-red-950/20 rounded-xl"
                        >
                          <p className="text-xs text-red-400 font-mono uppercase tracking-widest font-bold">
                            {selectedTempLang === 'km' ? 'ការកំណត់ភាសាបានជោគជ័យ' : 'LANGUAGE PROTOCOL ACCEPTED'}
                          </p>
                          <p className="text-sm text-white font-mono">
                            {selectedTempLang === 'km' ? 'ភាសាដែលបានជ្រើសរើស៖ ភាសាខ្មែរ' : 'Selected interface: ENGLISH'}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isLangConfirmed && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!selectedTempLang}
                        onClick={handleConfirmLanguageSelection}
                        className={`w-full py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all mt-4 flex items-center justify-center gap-2 ${
                          selectedTempLang 
                            ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        }`}
                      >
                        {selectedTempLang === 'km' ? '[ បន្ត → ]' : '[ CONTINUE → ]'}
                      </motion.button>
                    )}

                    <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-600 font-mono uppercase">
                      <span>{t.langModal.waiting}</span>
                      <span>SECURE LOG</span>
                    </div>
                  </motion.div>
                )}

                {(bootState === 'ready' || bootState === 'authorizing') && (
                  <motion.div 
                    key="authorization-phase"
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                    transition={{ duration: 0.6, ease: PREMIUM_EASE }}
                    className="w-full max-w-md bg-[#111111] border border-red-900/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(220,38,38,0.18)] relative overflow-hidden text-center backdrop-blur-md"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-900" />
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] text-red-500 font-mono tracking-widest uppercase mb-4">
                      <ShieldCheck className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>{t.boot.authControl}</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tight font-black leading-tight">
                      {t.boot.readyTitle} <br />
                      <span className="text-red-600">{t.boot.readySubTitle}</span>
                    </h2>

                    <p className="text-xs text-zinc-400 font-mono mt-3 leading-relaxed max-w-xs mx-auto">
                      {t.boot.readyDesc}
                    </p>

                    <div className="mt-8 space-y-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAuthorizeClick}
                        disabled={bootState === 'authorizing'}
                        aria-label="Authorize access and enter portfolio"
                        className="w-full py-4 px-6 bg-[#181818] hover:bg-red-950/40 border border-red-600/80 hover:border-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {bootState === 'ready' ? (
                          <>
                            <span>{t.boot.enterBtn}</span>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-red-400">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                            <span>{t.boot.authorizingBtn}</span>
                          </div>
                        )}
                      </motion.button>

                      {bootState === 'ready' && (
                        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                          {t.boot.authRequired}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOTTOM BAR */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-20 flex justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest border-t border-zinc-900 pt-3"
            >
              <p>{t.boot.footerTitle}</p>
              <p className="hidden sm:inline">{t.boot.footerLoc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP HEADER */}
      <motion.header 
        initial={{ y: -30, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-[#0c0c0c]/85 backdrop-blur-md border-b border-[#222]/80 px-6 md:px-16 py-4 justify-between items-center transition-all duration-300"
      >
        <div className="text-xs tracking-widest uppercase text-white flex items-center gap-2 font-mono">
          <span className="w-2 h-2 bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.8)]"></span>
          <span>JJ // Portfolio</span>
        </div>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-8 text-xs tracking-widest uppercase text-red-500 font-mono">
            {[
              { name: t.nav.about, href: '#about' },
              { name: t.nav.capabilities, href: '#skills' },
              { name: t.nav.projects, href: '#projects' },
              { name: t.nav.copilot, href: '#copilot' },
              { name: t.nav.contact, href: '#contact' }
            ].map((item) => (
              <motion.a 
                key={item.href}
                href={item.href} 
                whileHover={{ x: 2, color: '#ffffff' }}
                transition={{ duration: 0.2 }}
                className="relative py-1 group"
              >
                <span>{item.name}</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[1.5px] bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.a>
            ))}
          </nav>

          {/* PERSISTENT DESKTOP LANGUAGE INDICATOR & SWITCHER */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenLanguageSwitcher}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#161616] border border-red-900/50 hover:border-red-500 rounded-lg text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
          >
            <Globe2 className="w-3.5 h-3.5 text-red-500" />
            <span>{language === 'km' ? 'ភាសា: ខ្មែរ' : 'LANG: EN'}</span>
            <span className="text-[10px] text-zinc-500 ml-1">[{t.langSwitchLabel}]</span>
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#0c0c0c]/95 backdrop-blur-md border-b border-[#222] px-5 py-3.5 flex justify-between items-center pt-[calc(0.875rem+env(safe-area-inset-top))]">
        <div className="text-xs tracking-widest uppercase text-white font-bold flex items-center gap-2 font-mono">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span>JJ // PORTFOLIO</span>
        </div>

        <div className="flex items-center gap-3">
          {/* MOBILE LANGUAGE QUICK SWITCHER BUTTON */}
          <button
            onClick={handleOpenLanguageSwitcher}
            className="px-2.5 py-1 bg-[#161616] border border-red-900/50 text-[11px] font-mono text-red-400 rounded-md"
          >
            {language === 'km' ? 'ខ្មែរ' : 'EN'}
          </button>

          <motion.button 
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(true)} 
            className="p-2 border border-red-900/40 bg-[#141414] rounded-lg text-white active:bg-red-950/40"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-5 h-5 text-red-500" />
          </motion.button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="fixed inset-0 z-[120] bg-black/95 flex flex-col justify-between p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]"
          >
            <div className="flex justify-between items-center border-b border-[#222] pb-4">
              <div className="text-xs font-mono text-red-500 font-bold tracking-widest">{t.nav.menuTitle}</div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-[#1a1a1a] border border-[#333] rounded-full text-white"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div 
              variants={staggerContainerVariant}
              initial="hidden"
              animate="visible"
              className="space-y-4 my-auto py-6"
            >
              {[
                { name: t.nav.about, href: '#about', num: '01' },
                { name: t.nav.capabilities, href: '#skills', num: '02' },
                { name: t.nav.projects, href: '#projects', num: '03' },
                { name: t.nav.copilot, href: '#copilot', num: '04' },
                { name: t.nav.contact, href: '#contact', num: '05' }
              ].map((item) => (
                <motion.a
                  key={item.num}
                  variants={staggerItemVariant}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-between p-4 bg-[#121212] border border-[#222] active:border-red-600 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-red-500 font-bold">{item.num}</span>
                    <span className="text-xl font-display uppercase tracking-tight text-white">{item.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600" />
                </motion.a>
              ))}

              {/* MOBILE MENU LANGUAGE SWITCHER CARD */}
              <div className="pt-4 border-t border-[#222]">
                <div className="flex justify-between items-center bg-[#161616] p-3 rounded-xl border border-red-900/40">
                  <span className="text-xs font-mono text-zinc-400">INTERFACE LANGUAGE:</span>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleOpenLanguageSwitcher();
                    }}
                    className="text-xs font-mono text-red-400 font-bold border border-red-600/50 px-3 py-1 rounded-lg"
                  >
                    {language === 'km' ? 'ខ្មែរ (KM)' : 'ENGLISH (EN)'}
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="border-t border-[#222] pt-4 text-center">
              <p className="text-[10px] text-zinc-500 font-mono">{t.boot.footerTitle}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSISTENT / MID-EXPERIENCE LANGUAGE SELECTION MODAL */}
      <AnimatePresence>
        {showLanguageModal && bootState === 'entered' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: PREMIUM_EASE }}
              className="w-full max-w-lg bg-[#111111] border border-red-900/60 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(220,38,38,0.25)] relative overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-900" />

              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/80 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-red-500 tracking-widest uppercase">
                  <Globe2 className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>{t.langModal.protocol}</span>
                </div>
                <button 
                  onClick={() => setShowLanguageModal(false)}
                  className="text-zinc-500 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display mb-1">
                SELECT INTERFACE LANGUAGE
              </h3>
              <p className="text-xs text-zinc-400 font-mono mb-6">
                Choose how you want to experience the portfolio interface.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                {/* ENGLISH BUTTON */}
                <button
                  onClick={() => handleDirectLanguageSwitch('en')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    language === 'en' 
                      ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.25)]' 
                      : 'bg-[#161616] border-zinc-800 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl font-bold font-mono text-white">EN</span>
                    {language === 'en' && <span className="text-red-500 text-xs">● ACTIVE</span>}
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">ENGLISH</h4>
                  <p className="text-[11px] text-zinc-400 font-mono">Continue in English</p>
                </button>

                {/* KHMER BUTTON */}
                <button
                  onClick={() => handleDirectLanguageSwitch('km')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    language === 'km' 
                      ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.25)]' 
                      : 'bg-[#161616] border-zinc-800 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl font-bold font-khmer text-white">ខ្មែរ</span>
                    {language === 'km' && <span className="text-red-500 text-xs">● ACTIVE</span>}
                  </div>
                  <h4 className="text-sm font-bold text-white font-khmer mb-1">ភាសាខ្មែរ</h4>
                  <p className="text-[11px] text-zinc-400 font-khmer">បន្តជាភាសាខ្មែរ</p>
                </button>
              </div>

              <div className="mt-6 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-600 font-mono uppercase">
                <span>SYSTEM PREFERENCE SAVED TO LOCAL STORAGE</span>
                <span>[ESC TO CLOSE]</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={bootState === 'entered' ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.9, ease: PREMIUM_EASE }}
        className="pt-16 md:pt-8"
      >
        
        {/* HERO SECTION — DESKTOP */}
        <section className="hidden md:block relative px-6 md:px-16 pt-12 pb-24 border-b border-[#222] max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex justify-between items-center mb-8 text-xs tracking-widest uppercase text-zinc-500 relative z-10 font-mono">
            <span className="text-red-500 font-semibold">{t.hero.focus}</span>
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              {t.hero.available}
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
            <motion.div 
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-15"
            >
              <span className="font-display text-[22vw] md:text-[25vw] font-black uppercase tracking-tighter text-red-600/30 leading-none whitespace-nowrap">
                PORTFOLIO
              </span>
            </motion.div>

            <motion.div 
              variants={staggerContainerVariant}
              initial="hidden"
              animate={bootState === 'entered' ? "visible" : "hidden"}
              className="lg:col-span-4 z-10 flex items-center"
            >
              <div className="space-y-6 w-full">
                <motion.span variants={staggerItemVariant} className="text-red-500 text-sm tracking-widest uppercase block font-sans">
                  {t.hero.greeting}
                </motion.span>
                <motion.h1 variants={staggerItemVariant} className="font-display text-6xl md:text-8xl font-black text-white uppercase tracking-tight leading-[0.9]">
                  JJ <br />
                  <span className="text-red-600">DEV</span>
                </motion.h1>
                <motion.p variants={staggerItemVariant} className="text-xs uppercase tracking-widest text-white font-semibold font-mono">
                  {t.hero.subtitle}
                </motion.p>
                <motion.p variants={staggerItemVariant} className="text-xs text-zinc-400 leading-relaxed font-mono">
                  {t.hero.desc}
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={bootState === 'entered' ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: PREMIUM_EASE }}
              className="lg:col-span-4 z-10 flex justify-center relative"
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                className="relative w-full max-w-[340px] h-[480px] rounded-xl overflow-hidden border border-red-900/40 bg-gradient-to-b from-red-950/20 to-[#121212] shadow-2xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity"></div>
                <img 
                  src="/profile.jpg" 
                  alt="JJ - AI Engineer" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 object-top"
                />
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="absolute bottom-6 left-6 right-6 z-20 bg-black/70 backdrop-blur-md p-4 border border-red-900/30 transition-colors group-hover:border-red-600/60"
                >
                  <p className="text-[10px] text-red-400 uppercase tracking-widest leading-relaxed font-mono">
                    {t.hero.hoverCard}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={staggerContainerVariant}
              initial="hidden"
              animate={bootState === 'entered' ? "visible" : "hidden"}
              className="lg:col-span-4 z-10 flex flex-col justify-center lg:pl-12"
            >
              <div className="space-y-8 w-full">
                {[
                  { title: t.hero.locTitle, sub: t.hero.locSub },
                  { title: t.hero.aiTitle, sub: t.hero.aiSub },
                  { title: t.hero.fsTitle, sub: t.hero.fsSub }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={staggerItemVariant}
                    whileHover={{ x: 6, borderColor: '#dc2626' }}
                    transition={{ duration: 0.2, ease: PREMIUM_EASE }}
                    className="border-l-2 border-red-600/70 pl-4 cursor-pointer group"
                  >
                    <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-red-500 transition-colors">{item.title}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-mono group-hover:text-zinc-300 transition-colors">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* HERO SECTION — MOBILE */}
        <section className="md:hidden px-5 pt-6 pb-12 border-b border-[#222] space-y-6">
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-red-500 block">
              {t.hero.focus}
            </span>
            <h1 className="font-display text-5xl font-black text-white uppercase tracking-tight leading-none">
              JJ <span className="text-red-600">DEV</span>
            </h1>
            <p className="text-xs font-mono font-bold text-white tracking-wider uppercase">
              {t.hero.subtitle}
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              {t.hero.mobileDesc}
            </p>
          </motion.div>

          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-red-900/40 bg-[#121212] shadow-xl"
          >
            <img 
              src="/profile.jpg" 
              alt="JJ - AI Engineer" 
              className="w-full h-full object-cover filter grayscale contrast-125 object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-red-900/40 rounded-xl">
              <p className="text-[10px] text-red-400 uppercase tracking-widest font-mono text-center">
                {t.hero.hoverCard}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-2.5 pt-2"
          >
            {[
              { num: '01', title: t.hero.locTitle, sub: t.hero.locSub },
              { num: '02', title: t.hero.aiTitle, sub: t.hero.aiSub },
              { num: '03', title: t.hero.fsTitle, sub: t.hero.fsSub }
            ].map((card) => (
              <motion.div 
                key={card.num} 
                variants={staggerItemVariant}
                whileTap={{ scale: 0.98 }}
                className="border border-[#222] bg-[#121212] p-3.5 rounded-xl flex items-center justify-between active:border-red-600/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-red-500 font-bold">{card.num}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{card.title}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{card.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.a 
              whileTap={{ scale: 0.96 }}
              href="#projects" 
              className="h-12 bg-red-600 text-white text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] active:bg-red-700"
            >
              {t.hero.viewProjects}
            </motion.a>
            <motion.a 
              whileTap={{ scale: 0.96 }}
              href="#contact" 
              className="h-12 border border-[#333] bg-[#141414] text-white text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center rounded-xl active:bg-[#222]"
            >
              {t.hero.contactMe}
            </motion.a>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="about" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 md:space-y-12">
              <div>
                <div className="hidden md:block">
                  <TypewriterHeading language={language} />
                </div>
                
                <div className="md:hidden mb-4">
                  <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">{t.about.headingCode}</span>
                  <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight">{t.about.headingText}</h2>
                </div>

                <div className="space-y-4 text-xs md:text-xs text-zinc-300 leading-relaxed font-sans">
                  <p>{t.about.bio1}</p>
                  <p>{t.about.bio2}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">{t.about.arsenal}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="border border-[#222] bg-[#121212] p-4 md:p-5 rounded-xl">
                    <span className="text-white font-bold uppercase block mb-2 border-b border-[#222] pb-2 font-mono">{t.about.feBe}</span>
                    <motion.div 
                      variants={staggerContainerVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-1.5 mt-2"
                    >
                      {['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Python', 'FastAPI', 'REST APIs', 'SQL', 'Supabase'].map((chip) => (
                        <motion.span 
                          key={chip} 
                          variants={staggerItemVariant}
                          whileHover={{ scale: 1.05, borderColor: '#dc2626', color: '#ffffff' }}
                          className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] text-[11px] text-zinc-300 font-mono rounded-md transition-colors cursor-pointer"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                  <div className="border border-[#222] bg-[#121212] p-4 md:p-5 rounded-xl">
                    <span className="text-white font-bold uppercase block mb-2 border-b border-[#222] pb-2 font-mono">{t.about.infra}</span>
                    <motion.div 
                      variants={staggerContainerVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-1.5 mt-2"
                    >
                      {['Docker', 'Railway', 'Vercel', 'Git', 'GitHub', 'VS Code', 'Kali Linux'].map((chip) => (
                        <motion.span 
                          key={chip} 
                          variants={staggerItemVariant}
                          whileHover={{ scale: 1.05, borderColor: '#dc2626', color: '#ffffff' }}
                          className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] text-[11px] text-zinc-300 font-mono rounded-md transition-colors cursor-pointer"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-red-600 bg-red-950/10 p-5 rounded-r-xl">
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-red-400 font-semibold mb-1">{t.about.philosophyTitle}</p>
                <blockquote className="text-xs md:text-sm text-zinc-100 italic">
                  {t.about.philosophyQuote}
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="hidden md:block relative w-full max-w-[360px] h-[520px] rounded-xl border border-red-900/40 bg-[#121212] shadow-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 z-10 pointer-events-none">
                  <img 
                    src="/profile5.jpg" 
                    alt="JJ Profile" 
                    className="w-full h-full object-cover filter grayscale contrast-125 object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 border border-red-900/40 text-center">
                    <p className="text-[10px] text-red-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-2 font-mono">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
                      {t.about.hoverRoadmap}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[#0e0e0e] p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-95 group-hover:scale-100 z-20 overflow-y-auto">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6 flex items-center gap-2 font-mono">
                      <GitCommit className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>{t.about.roadmapTitle}</span>
                    </h3>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:via-red-500 before:to-[#222]">
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block font-mono">2021</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">{t.about.r2021Title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{t.about.r2021Desc}</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block font-mono">2022</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">{t.about.r2022Title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{t.about.r2022Desc}</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block font-mono">2026</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">{t.about.r2026Title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{t.about.r2026Desc}</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-zinc-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block font-mono">PRESENT</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">{t.about.rPresTitle}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{t.about.rPresDesc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden w-full border border-red-900/40 bg-[#121212] rounded-2xl overflow-hidden shadow-xl p-5">
                <AnimatePresence mode="wait">
                  {!showRoadmapMobile ? (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 text-center"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-red-900/30">
                        <img src="/profile5.jpg" alt="JJ Profile" className="w-full h-full object-cover filter grayscale contrast-125 object-top" />
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowRoadmapMobile(true)}
                        className="w-full h-12 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl active:bg-red-700 flex items-center justify-center gap-2 font-mono"
                      >
                        <GitCommit className="w-4 h-4" />
                        {t.about.viewJourney}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="roadmap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                      <div className="flex justify-between items-center border-b border-[#222] pb-3">
                        <span className="text-xs font-mono text-red-500 font-bold uppercase">{t.about.roadmapTitle}</span>
                        <button 
                          onClick={() => setShowRoadmapMobile(false)}
                          className="text-xs text-zinc-400 border border-[#333] px-3 py-1 rounded-md font-mono"
                        >
                          {t.about.closeBtn}
                        </button>
                      </div>

                      <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:to-[#333]">
                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-red-400 font-bold block">2021</span>
                          <h4 className="text-xs font-bold text-white uppercase">{t.about.r2021Title}</h4>
                          <p className="text-[11px] text-zinc-400">{t.about.r2021Desc}</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-red-400 font-bold block">2022</span>
                          <h4 className="text-xs font-bold text-white uppercase">{t.about.r2022Title}</h4>
                          <p className="text-[11px] text-zinc-400">{t.about.r2022Desc}</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-red-400 font-bold block">2026</span>
                          <h4 className="text-xs font-bold text-white uppercase">{t.about.r2026Title}</h4>
                          <p className="text-[11px] text-zinc-400">{t.about.r2026Desc}</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-zinc-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-zinc-400 font-bold block">PRESENT</span>
                          <h4 className="text-xs font-bold text-white uppercase">{t.about.rPresTitle}</h4>
                          <p className="text-[11px] text-zinc-400">{t.about.rPresDesc}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </motion.section>

        {/* CAPABILITIES SECTION (#skills) */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="skills" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto relative overflow-hidden"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="relative z-10 space-y-16 md:space-y-24">
            
            {/* 1. SECTION HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-red-500 font-semibold">
                  <span className="w-2 h-2 bg-red-600 animate-ping rounded-full"></span>
                  <span>{t.capabilities.tag}</span>
                </div>
                <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight font-black leading-none">
                  {t.capabilities.titleMain} <span className="italic text-red-600">{t.capabilities.titleItalic}</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl">
                  {t.capabilities.desc}
                </p>

                <div className="border-l-2 border-red-600/80 bg-red-950/10 p-3.5 rounded-r-lg max-w-xl">
                  <p className="text-xs font-mono text-zinc-300">
                    <span className="text-red-400 font-bold">{t.capabilities.purposeTag} </span>
                    {t.capabilities.purposeQuote}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <SystemEngineeringModelCanvas isMobile={isMobileDevice} />
              </div>
            </div>

            {/* 2. PRIMARY CAPABILITY GRID (SIX CORE SERVICES) */}
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-red-500 flex items-center gap-2">
                  {t.capabilities.gridHeader}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">{t.capabilities.clickHint}</span>
              </div>

              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {capabilityServices.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={staggerItemVariant}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCapabilityModal(service)}
                    className="border border-[#222] bg-[#121212] hover:bg-[#161616] hover:border-red-600/80 p-6 rounded-xl space-y-4 shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Top Glow Accent on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-red-600 group-hover:to-transparent transition-all duration-500"></div>

                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-[#181818] border border-[#2a2a2a] rounded-lg group-hover:border-red-600/50 group-hover:bg-red-950/20 transition-colors">
                        {service.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-zinc-600 group-hover:text-red-500 transition-colors">
                        0{service.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors flex items-center justify-between">
                        <span>{service.title[language]}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100" />
                      </h3>
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans line-clamp-3">
                        {service.shortDesc[language]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#222] flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-[#181818] border border-[#282828] text-zinc-400 rounded group-hover:border-red-900/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="projects" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto space-y-12"
        >
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-[#222] pb-6">
            <div>
              <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">{t.projects.tag}</span>
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight">
                {t.projects.titleMain} <span className="italic text-red-600">{t.projects.titleItalic}</span>
              </h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm font-mono">
              {t.projects.desc}
            </p>
          </div>

          {/* PROJECT CAROUSEL */}
          <div 
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            className="relative bg-[#111111] border border-red-900/40 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10"
          >
            <div className="flex justify-between items-center mb-6 text-xs font-mono border-b border-[#222] pb-3">
              <span className="text-red-500 font-bold">// {t.projects.carouselHeader}</span>
              <span className="text-zinc-500">{activeIndex + 1} / {projects.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={projects[activeIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-red-500 font-bold bg-red-950/40 px-2.5 py-1 rounded border border-red-900/50">
                      {projects[activeIndex].number}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                      {projects[activeIndex].category}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                    {projects[activeIndex].displayTitle}
                  </h3>

                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                    {projects[activeIndex].description[language]}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {projects[activeIndex].techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-3 py-1 bg-[#181818] border border-[#2a2a2a] text-zinc-300 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button 
                      onClick={() => setActiveProjectModal(projects[activeIndex])}
                      className="px-5 py-3 bg-[#1c1c1c] hover:bg-red-950/40 border border-red-600/80 hover:border-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      {t.projects.inspectBtn}
                    </button>

                    {projects[activeIndex].url && (
                      <a 
                        href={projects[activeIndex].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center gap-2"
                      >
                        {t.projects.viewLiveBtn}
                      </a>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-red-900/40 bg-[#151515]">
                    {projects[activeIndex].image ? (
                      <img 
                        src={projects[activeIndex].image} 
                        alt={projects[activeIndex].displayTitle} 
                        className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#141414]">
                        {projects[activeIndex].icon}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Nav Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === activeIndex ? 'w-8 bg-red-600' : 'w-2 bg-zinc-700'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        {/* AI COPILOT SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="copilot" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto space-y-8"
        >
          <div className="border-b border-[#222] pb-6">
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">{t.copilot.tag}</span>
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight">
              {t.copilot.copilotTitle}
            </h2>
          </div>

          <div className="bg-[#101010] border border-red-900/40 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-[#181818] px-6 py-4 border-b border-zinc-800 flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-2">
                <Bot className="w-4 h-4 text-red-500" />
                JJ_AGENT_TERMINAL
              </span>
              <span className="text-red-400 font-bold">{t.copilot.status}</span>
            </div>

            <div className="p-6 space-y-4 max-h-[360px] overflow-y-auto font-mono text-xs">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-4 rounded-xl max-w-xl ${m.role === 'user' ? 'bg-red-950/40 border border-red-800/60 text-white' : 'bg-[#181818] border border-zinc-800 text-zinc-300'}`}>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">
                      {m.role === 'user' ? '// HUMAN USER' : '// JJ_AGENT'}
                    </p>
                    <p className="leading-relaxed">{m.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-2 text-red-500 items-center font-mono text-xs">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                  <span>PROCESSING TELEMETRY QUERY...</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#141414] border-t border-zinc-800 space-y-3">
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                {t.copilot.suggestedTag}:
              </div>
              <div className="flex flex-wrap gap-2">
                {t.copilot.prompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopilotSubmit(undefined, p)}
                    className="text-[11px] font-mono px-3 py-1.5 bg-[#1a1a1a] hover:bg-red-950/40 border border-zinc-800 hover:border-red-600/50 text-zinc-300 rounded-lg transition-colors text-left"
                  >
                    "{p}"
                  </button>
                ))}
              </div>

              <form onSubmit={handleCopilotSubmit} className="flex gap-2 pt-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.copilot.placeholder}
                  className="flex-1 bg-[#0c0c0c] border border-zinc-800 focus:border-red-600 rounded-xl px-4 py-3 text-xs text-white outline-none font-mono"
                />
                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all font-mono flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t.copilot.sendBtn}
                </button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* ROADMAP / DEVELOPMENT PROCESS SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto space-y-12"
        >
          <div className="border-b border-[#222] pb-6">
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">{t.roadmap.tag}</span>
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight">
              {t.roadmap.titleMain} <span className="italic text-red-600">{t.roadmap.titleItalic}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              {t.roadmap.subDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapNodes.map((node, idx) => (
              <div key={idx} className="bg-[#121212] border border-[#222] hover:border-red-600/60 p-6 rounded-xl space-y-4 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-red-500">{t.roadmap.stepTag} {node.num}</span>
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">{node.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{node.summary}</p>
                <div className="pt-2 border-t border-[#222]">
                  <p className="text-[10px] font-mono text-red-400 font-bold mb-1">{t.roadmap.clientValueLabel}</p>
                  <p className="text-[11px] text-zinc-300 italic font-sans">"{node.clientValue}"</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* TECHNOLOGY WALL SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto space-y-12"
        >
          <div className="border-b border-[#222] pb-6">
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">{t.techWall.tag}</span>
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight">
              {t.techWall.titleMain} <span className="italic text-red-600">{t.techWall.titleItalic}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              {t.techWall.subDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {techWallData.map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -4, borderColor: '#dc2626' }}
                onClick={() => setActiveTechModal(tech)}
                className="bg-[#121212] border border-[#222] p-4 rounded-xl flex flex-col items-center text-center gap-3 cursor-pointer group transition-all"
              >
                <div className="p-3 bg-[#181818] rounded-lg group-hover:bg-red-950/30 transition-colors">
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase">{tech.name}</h3>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">{tech.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="contact" 
          className="px-5 md:px-16 py-16 md:py-28 max-w-[1440px] mx-auto space-y-12"
        >
          <div className="border-b border-[#222] pb-6">
            <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">{t.contact.tag}</span>
            <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight">
              {t.contact.titleMain} <span className="italic text-red-600">{t.contact.titleItalic}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-mono max-w-md">
              {t.contact.subDesc}
            </p>
          </div>

          <div className="max-w-2xl bg-[#111111] border border-red-900/40 rounded-2xl p-6 md:p-10 shadow-2xl">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  {t.contact.nameLabel}
                </label>
                <input 
                  type="text"
                  required
                  value={formData.sender_name}
                  onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full bg-[#0c0c0c] border border-zinc-800 focus:border-red-600 rounded-xl px-4 py-3.5 text-xs text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  {t.contact.emailLabel}
                </label>
                <input 
                  type="email"
                  required
                  value={formData.sender_email}
                  onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full bg-[#0c0c0c] border border-zinc-800 focus:border-red-600 rounded-xl px-4 py-3.5 text-xs text-white outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  {t.contact.scopeLabel}
                </label>
                <textarea 
                  required
                  rows={4}
                  value={formData.project_scope}
                  onChange={(e) => setFormData({ ...formData, project_scope: e.target.value })}
                  placeholder={t.contact.scopePlaceholder}
                  className="w-full bg-[#0c0c0c] border border-zinc-800 focus:border-red-600 rounded-xl p-4 text-xs text-white outline-none font-mono resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                {status === 'loading' ? t.contact.sendingBtn : t.contact.submitBtn}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-emerald-950/40 border border-emerald-600/50 rounded-xl text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.contact.successMsg}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-950/40 border border-red-600/50 rounded-xl text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage || t.contact.errorMsg}</span>
                </div>
              )}
            </form>
          </div>
        </motion.section>

      </motion.main>

      {/* CAPABILITY BLUEPRINT MODAL */}
      <AnimatePresence>
        {activeCapabilityModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-3xl bg-[#111111] border border-red-900/60 rounded-2xl p-6 md:p-8 shadow-2xl relative my-8"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold">
                    // {t.capabilities.modalSystemBlueprint} 0{activeCapabilityModal.number}
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-tight font-display mt-1">
                    {activeCapabilityModal.title[language]}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveCapabilityModal(null)}
                  className="p-2 bg-[#181818] border border-zinc-800 hover:border-red-600 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-xs font-mono max-h-[65vh] overflow-y-auto pr-2">
                <div className="bg-[#161616] border border-zinc-800 p-4 rounded-xl">
                  <span className="text-red-400 font-bold uppercase block mb-1">// {t.capabilities.problemTag}</span>
                  <p className="text-zinc-300 leading-relaxed font-sans">{activeCapabilityModal.problem[language]}</p>
                </div>

                <div className="bg-[#161616] border border-zinc-800 p-4 rounded-xl">
                  <span className="text-red-400 font-bold uppercase block mb-1">// {t.capabilities.solutionTag}</span>
                  <p className="text-zinc-300 leading-relaxed font-sans">{activeCapabilityModal.solution[language]}</p>
                </div>

                <div>
                  <span className="text-white font-bold uppercase tracking-widest block mb-3 text-red-500">// {t.capabilities.deliverablesTag}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activeCapabilityModal.deliverables[language].map((d, i) => (
                      <div key={i} className="p-3 bg-[#161616] border border-zinc-800/80 rounded-lg text-zinc-300 flex items-start gap-2">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px]">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-white font-bold uppercase tracking-widest block mb-2 text-red-500">// {t.capabilities.techUsedTag}</span>
                  <div className="flex flex-wrap gap-2">
                    {activeCapabilityModal.techStack.map((tech) => (
                      <span key={tech.name} className="px-3 py-1 bg-[#181818] border border-zinc-800 text-zinc-300 rounded-md text-[11px]">
                        {tech.name} <span className="text-zinc-500">({tech.category})</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-900/40 p-4 rounded-xl">
                  <span className="text-red-400 font-bold uppercase block mb-1">// {t.capabilities.clientValueTag}</span>
                  <p className="text-zinc-200 font-sans">{activeCapabilityModal.clientValue[language]}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                <button 
                  onClick={() => setActiveCapabilityModal(null)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  {t.capabilities.closeBlueprint}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT INSPECTION MODAL */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-3xl bg-[#111111] border border-red-900/60 rounded-2xl p-6 md:p-8 shadow-2xl relative my-8"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold">
                    // PROJECT ARCHITECTURE INSPECTOR
                  </span>
                  <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-tight font-display mt-1">
                    {activeProjectModal.displayTitle}
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveProjectModal(null)}
                  className="p-2 bg-[#181818] border border-zinc-800 hover:border-red-600 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-xs font-mono max-h-[65vh] overflow-y-auto pr-2">
                <div className="bg-[#161616] border border-zinc-800 p-4 rounded-xl">
                  <span className="text-red-400 font-bold uppercase block mb-1">// OVERVIEW</span>
                  <p className="text-zinc-300 leading-relaxed font-sans">{activeProjectModal.longDescription[language]}</p>
                </div>

                <div className="bg-[#161616] border border-zinc-800 p-4 rounded-xl">
                  <span className="text-red-400 font-bold uppercase block mb-1">// PROBLEM ADDRESSED</span>
                  <p className="text-zinc-300 leading-relaxed font-sans">{activeProjectModal.problem[language]}</p>
                </div>

                <div>
                  <span className="text-white font-bold uppercase tracking-widest block mb-3 text-red-500">// {t.projects.builtTag}</span>
                  <div className="space-y-2">
                    {activeProjectModal.built[language].map((b, i) => (
                      <div key={i} className="p-3 bg-[#161616] border border-zinc-800/80 rounded-lg text-zinc-300 flex items-start gap-2">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px]">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#161616] border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 uppercase block mb-1">{t.projects.roleTag}</span>
                    <span className="text-white font-bold">{activeProjectModal.role[language]}</span>
                  </div>
                  <div className="p-4 bg-[#161616] border border-zinc-800 rounded-xl">
                    <span className="text-zinc-500 uppercase block mb-1">{t.projects.statusTag}</span>
                    <span className="text-red-400 font-bold">{activeProjectModal.status === 'ACTIVE_DEPLOY' ? t.projects.activeDeploy : t.projects.underMaintenance}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center">
                {activeProjectModal.url ? (
                  <a 
                    href={activeProjectModal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center gap-2"
                  >
                    <span>LAUNCH LIVE PROJECT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : <div />}

                <button 
                  onClick={() => setActiveProjectModal(null)}
                  className="px-6 py-2.5 bg-[#1a1a1a] border border-zinc-800 hover:border-red-600 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  {t.projects.closeProject}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TECH WALL DETAIL MODAL */}
      <AnimatePresence>
        {activeTechModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-[#111111] border border-red-900/60 rounded-2xl p-6 md:p-8 shadow-2xl relative"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#181818] rounded-xl border border-zinc-800">
                    {activeTechModal.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block font-bold">
                      {activeTechModal.category}
                    </span>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display">
                      {activeTechModal.name}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTechModal(null)}
                  className="p-2 bg-[#181818] border border-zinc-800 hover:border-red-600 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <p className="text-zinc-300 leading-relaxed font-sans">{activeTechModal.desc}</p>

                <div className="bg-[#161616] border border-zinc-800 p-4 rounded-xl space-y-1">
                  <span className="text-red-400 font-bold uppercase block">{t.techWall.projectsUsedLabel}</span>
                  <p className="text-zinc-300 font-sans">{activeTechModal.projectsUsed}</p>
                </div>

                <div className="bg-[#161616] border border-zinc-800 p-4 rounded-xl space-y-1">
                  <span className="text-red-400 font-bold uppercase block">{t.techWall.reasonLabel}</span>
                  <p className="text-zinc-300 font-sans">{activeTechModal.reason}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                <button 
                  onClick={() => setActiveTechModal(null)}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-[#222] bg-[#090909] py-8 px-6 md:px-16 text-xs font-mono text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 JJ // AI ENGINEER PORTFOLIO. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-4 text-red-500">
          <span>CAMBODIAN LANGUAGE SYSTEM INTEGRATED</span>
          <span>● ONLINE</span>
        </div>
      </footer>

    </div>
  );
};