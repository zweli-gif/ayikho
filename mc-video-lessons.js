/**
 * Management Communication N4 - Video Lesson Segments
 * For integration with Landoh animated lesson player
 * 8 Modules with video markers and content
 */

const mcVideoLessons = {
  module1: {
    title: "Communication Theory",
    duration: "4:30",
    videoFile: "assets/videos/module-1.mp4",
    markers: [
      {
        time: 0,
        label: "Introduction",
        content: "Communication is the exchange of messages between a sender and a receiver."
      },
      {
        time: 45,
        label: "The Five-Part Model",
        content: "Sender → Message → Channel → Receiver → Feedback. Understanding these parts is crucial."
      },
      {
        time: 120,
        label: "Barriers to Communication",
        content: "Physical, language, emotional, cultural, and organisational barriers can distort messages."
      },
      {
        time: 210,
        label: "Verbal vs Non-Verbal",
        content: "Words (verbal) + body language (non-verbal). Both matter equally in communication."
      },
      {
        time: 270,
        label: "Key Takeaway",
        content: "Master the communication model. It's the foundation of everything in this course."
      }
    ]
  },

  module2: {
    title: "Meeting Procedures",
    duration: "4:15",
    videoFile: "assets/videos/module-2.mp4",
    markers: [
      {
        time: 0,
        label: "Types of Meetings",
        content: "AGM (Annual General Meeting), Special, Committee, and Departmental meetings serve different purposes."
      },
      {
        time: 60,
        label: "Notice and Agenda",
        content: "Always send NOTICE (when/where) and AGENDA (what will be discussed) before the meeting."
      },
      {
        time: 130,
        label: "The Chairperson",
        content: "The chair keeps time, ensures fair discussion, and guides the meeting toward decisions."
      },
      {
        time: 200,
        label: "Meeting Vocabulary",
        content: "Quorum (minimum attendance), Motion (proposal), Resolution (decision after voting)."
      },
      {
        time: 255,
        label: "Minutes Matter",
        content: "Minutes record what happened: who was there, what was decided, and who does what by when."
      }
    ]
  },

  module3: {
    title: "Business Letters",
    duration: "4:00",
    videoFile: "assets/videos/module-3.mp4",
    markers: [
      {
        time: 0,
        label: "The Seven Parts",
        content: "1) Sender's address, 2) Date, 3) Recipient's address, 4) Salutation, 5) Body, 6) Closing, 7) Signature."
      },
      {
        time: 50,
        label: "Salutation Rules",
        content: "Know the recipient? Use 'Dear Mr/Ms Surname'. Don't know? Use 'Dear Sir/Madam'."
      },
      {
        time: 120,
        label: "The Body",
        content: "Three paragraphs: opening (why), middle (details), closing (action). Keep it clear and concise."
      },
      {
        time: 180,
        label: "Closing Line",
        content: "Know them? 'Yours sincerely'. Don't know them? 'Yours faithfully'. Always formal."
      },
      {
        time: 240,
        label: "Letter Types",
        content: "Enquiry (asking), Complaint (problem), Adjustment (solution), Order (buying), Application (job)."
      }
    ]
  },

  module4: {
    title: "Memos and Reports",
    duration: "4:20",
    videoFile: "assets/videos/module-4.mp4",
    markers: [
      {
        time: 0,
        label: "Memo Structure",
        content: "TO, FROM, DATE, SUBJECT at the top. Body in short, punchy paragraphs. No salutation needed."
      },
      {
        time: 60,
        label: "When to Use Memos",
        content: "Memos are internal, quick, and less formal than letters. Perfect for announcements and instructions."
      },
      {
        time: 130,
        label: "What is a Report?",
        content: "A formal investigation or analysis. Contains: title, summary, introduction, findings, recommendations, conclusion."
      },
      {
        time: 210,
        label: "Report Writing Tips",
        content: "Use formal tone, include data/evidence, make recommendations SMART (Specific, Measurable, Achievable, Relevant, Time-bound)."
      },
      {
        time: 260,
        label: "Key Difference",
        content: "Memos = quick, internal. Reports = detailed, investigative. Both must be professional and clear."
      }
    ]
  },

  module5: {
    title: "Oral Communication",
    duration: "4:10",
    videoFile: "assets/videos/module-5.mp4",
    markers: [
      {
        time: 0,
        label: "Phone Technique",
        content: "Answer within 3 rings. Greet, identify yourself and company, state purpose, listen, confirm next steps."
      },
      {
        time: 70,
        label: "Job Interview Tips",
        content: "Research company, prepare answers, dress professionally, make eye contact, speak clearly, ask questions."
      },
      {
        time: 150,
        label: "Active Listening",
        content: "Face the speaker, nod, don't interrupt, ask clarifying questions, reflect back what you understood."
      },
      {
        time: 220,
        label: "Poor Listening Habits",
        content: "Avoid: interrupting, planning your response while they talk, judging, looking at phone, daydreaming."
      },
      {
        time: 250,
        label: "Presentations",
        content: "Structure: Introduction (topic), Key points (3-5 ideas), Conclusion (summary and next steps). Practice beforehand."
      }
    ]
  },

  module6: {
    title: "Visual Communication",
    duration: "4:05",
    videoFile: "assets/videos/module-6.mp4",
    markers: [
      {
        time: 0,
        label: "Why Use Visuals?",
        content: "A picture is worth 1000 words. Charts and tables make data clear and memorable."
      },
      {
        time: 50,
        label: "Bar Charts",
        content: "Compare different categories. Example: Sales by department. Shows which is highest/lowest at a glance."
      },
      {
        time: 110,
        label: "Line Charts",
        content: "Show trends over time. Example: Monthly revenue Jan-Dec. See if it's going up, down, or staying flat."
      },
      {
        time: 170,
        label: "Pie Charts",
        content: "Show how a total is divided. Example: Budget 50% salaries, 30% rent, 20% supplies. Each slice is a percentage."
      },
      {
        time: 240,
        label: "Reading & Creating Visuals",
        content: "Always have a clear title, label your axes, keep colours consistent, and don't cram too much data into one chart."
      }
    ]
  },

  module7: {
    title: "Reading & Comprehension",
    duration: "3:50",
    videoFile: "assets/videos/module-7.mp4",
    markers: [
      {
        time: 0,
        label: "Three Reading Techniques",
        content: "Skimming (quick for main idea), Scanning (fast search for specific info), Intensive (careful, word-by-word)."
      },
      {
        time: 60,
        label: "When to Skim",
        content: "Use skimming when you need the gist fast. Read headings, first sentences, summaries. Skip details."
      },
      {
        time: 120,
        label: "When to Scan",
        content: "Use scanning when you know what you're looking for (a date, name, keyword). Search and skip other text."
      },
      {
        time: 180,
        label: "Main Idea vs Details",
        content: "Main idea = the most important point. Details = examples and numbers that support it. Distinguish between them."
      },
      {
        time: 230,
        label: "Summarising & Critical Reading",
        content: "Summaries are 1/4 to 1/3 original length, written in your own words. Always ask: Is this fact or opinion?"
      }
    ]
  },

  module8: {
    title: "Language & Editing",
    duration: "4:25",
    videoFile: "assets/videos/module-8.mp4",
    markers: [
      {
        time: 0,
        label: "Subject-Verb Agreement",
        content: "Singular subjects need singular verbs. Plural subjects need plural verbs. 'The manager IS here.' 'Employees ARE working.'"
      },
      {
        time: 60,
        label: "Verb Tense Consistency",
        content: "Don't mix tenses in same sentence. Wrong: 'She wrote and sends it.' Right: 'She wrote and sent it.'"
      },
      {
        time: 120,
        label: "South African English",
        content: "Use British spelling: organise (not organize), colour (not color), centre (not center), honour (not honor)."
      },
      {
        time: 190,
        label: "Punctuation Rules",
        content: "Period (.), comma (,), apostrophe ('), colon (:), semicolon (;). Use Oxford comma in lists: 'milk, bread, and eggs.'"
      },
      {
        time: 260,
        label: "Proofreading Tips",
        content: "Read aloud, read slowly, check each sentence, look for common errors, check formatting. Have someone else read it."
      }
    ]
  }
};

// Metadata for all modules
const mcModuleMetadata = {
  modules: [
    {
      id: 1,
      title: "Communication Theory",
      description: "Understanding the sender-message-receiver model, barriers to communication, and communication types.",
      duration: "4:30",
      estimatedMinutes: 12,
      topics: ["Communication Model", "Barriers", "Verbal vs Non-Verbal", "Formal vs Informal"]
    },
    {
      id: 2,
      title: "Meeting Procedures",
      description: "Types of meetings, notice and agenda, the chairperson's role, and how to write effective minutes.",
      duration: "4:15",
      estimatedMinutes: 13,
      topics: ["Meeting Types", "Agenda", "Minutes", "Chairperson Role", "Quorum"]
    },
    {
      id: 3,
      title: "Business Letters",
      description: "The seven-part letter format, salutations, closings, types of business letters, and professional tone.",
      duration: "4:00",
      estimatedMinutes: 12,
      topics: ["Letter Format", "Salutation & Closing", "Letter Types", "Professional Tone", "South African Examples"]
    },
    {
      id: 4,
      title: "Memos and Reports",
      description: "Writing effective memos and reports, report structure, SMART recommendations, and business documentation.",
      duration: "4:20",
      estimatedMinutes: 13,
      topics: ["Memo Structure", "Report Writing", "Findings & Recommendations", "SMART Goals", "Internal Communication"]
    },
    {
      id: 5,
      title: "Oral Communication",
      description: "Phone technique, job interviews, active listening, presentations, and speaking with confidence.",
      duration: "4:10",
      estimatedMinutes: 12,
      topics: ["Phone Technique", "Interviews", "Active Listening", "Presentations", "Body Language"]
    },
    {
      id: 6,
      title: "Visual Communication",
      description: "Understanding and creating graphs, charts, tables, and visual data interpretation.",
      duration: "4:05",
      estimatedMinutes: 12,
      topics: ["Chart Types", "Bar/Line/Pie Charts", "Tables", "Flow Charts", "Data Visualisation"]
    },
    {
      id: 7,
      title: "Reading & Comprehension",
      description: "Effective reading techniques, summarising, identifying main ideas, and critical reading skills.",
      duration: "3:50",
      estimatedMinutes: 12,
      topics: ["Skimming/Scanning", "Intensive Reading", "Main Idea vs Details", "Summarising", "Critical Reading"]
    },
    {
      id: 8,
      title: "Language & Editing",
      description: "Grammar essentials, South African English, punctuation, spelling, and proofreading techniques.",
      duration: "4:25",
      estimatedMinutes: 13,
      topics: ["Grammar", "Subject-Verb Agreement", "Verb Tense", "Spelling", "Proofreading"]
    }
  ]
};

// Export for use in Ayikho app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mcVideoLessons, mcModuleMetadata };
}
