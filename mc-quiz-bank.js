/**
 * Management Communication N4 - Quiz Bank
 * 8 Modules × 5 Questions = 40 Total Questions
 * Format: { q: question, options: [4 options], correct: index, explanation: explanation, topic: topic }
 */

const mcQuizBank = {
  module1: [
    {
      q: "What are the five main components of the communication model?",
      options: [
        "Sender, message, receiver, channel, and feedback",
        "Sender, message, barrier, channel, and conclusion",
        "Speaker, listener, words, paper, and understanding",
        "Person, idea, medium, audience, and result"
      ],
      correct: 0,
      explanation: "The communication model has five key parts: Sender (who sends), Message (what is sent), Channel (how it travels), Receiver (who gets it), and Feedback (the response).",
      topic: "Communication Model"
    },
    {
      q: "Which of the following is a physical barrier to communication?",
      options: [
        "Disagreement about ideas",
        "Loud noise in the office",
        "Using complicated vocabulary",
        "Different cultural beliefs"
      ],
      correct: 1,
      explanation: "Physical barriers are environmental obstacles like noise, poor lighting, or distance. Loud noise prevents the message from being heard clearly.",
      topic: "Barriers to Communication"
    },
    {
      q: "What is the difference between verbal and non-verbal communication?",
      options: [
        "Verbal is spoken; non-verbal is written",
        "Verbal uses words; non-verbal uses body language, tone, and gestures",
        "Verbal is formal; non-verbal is informal",
        "Verbal is accurate; non-verbal is unclear"
      ],
      correct: 1,
      explanation: "Verbal communication uses spoken or written words. Non-verbal communication includes body language, facial expressions, tone of voice, and gestures. Both are equally important.",
      topic: "Types of Communication"
    },
    {
      q: "When would you use formal communication in the workplace?",
      options: [
        "During lunch break with colleagues",
        "Sending an official memo about new safety procedures",
        "Chatting with friends at the desk",
        "Telling a joke to lighten the mood"
      ],
      correct: 1,
      explanation: "Formal communication is used for official matters that need documentation and formality, such as memos, letters, reports, and policy announcements. It's permanent and official.",
      topic: "Formal vs Informal Communication"
    },
    {
      q: "What is active listening?",
      options: [
        "Staying quiet while someone talks",
        "Planning your response while the other person is speaking",
        "Fully paying attention, showing understanding, and confirming what was said",
        "Listening to what you want to hear and ignoring the rest"
      ],
      correct: 2,
      explanation: "Active listening means really paying attention, making eye contact, nodding, asking clarifying questions, and reflecting back what you understood. It shows respect and prevents misunderstandings.",
      topic: "Active Listening"
    }
  ],

  module2: [
    {
      q: "What is the main purpose of a meeting agenda?",
      options: [
        "To record what was discussed",
        "To tell people what will be discussed in order",
        "To announce the time and location",
        "To assign tasks to attendees"
      ],
      correct: 1,
      explanation: "An agenda lists the topics to be discussed and in what order. It's sent before the meeting so everyone knows what to expect and can prepare.",
      topic: "Agenda"
    },
    {
      q: "What must be included in meeting minutes?",
      options: [
        "Every word that was spoken",
        "Only the most important decisions",
        "Date, attendees, decisions made, and action items (who does what by when)",
        "The personal opinions of the chairperson"
      ],
      correct: 2,
      explanation: "Minutes record: date/time/location, who was present, agenda items discussed, decisions made (resolutions), and action items with deadlines. This creates an official record.",
      topic: "Meeting Minutes"
    },
    {
      q: "What is the chairperson's role in a meeting?",
      options: [
        "Make all the decisions",
        "Dominate the conversation",
        "Keep time, ensure fair discussion, manage conflict, and guide the meeting",
        "Take notes and record the minutes"
      ],
      correct: 2,
      explanation: "The chairperson (or chair) runs the meeting. They keep discussion on track, allocate speaking time fairly, manage conflict, and ensure the meeting stays on schedule.",
      topic: "Chairperson's Role"
    },
    {
      q: "What is a quorum?",
      options: [
        "A formal decision made by voting",
        "The minimum number of people needed for the meeting to be valid",
        "Permission to speak at a meeting",
        "A written record of the meeting"
      ],
      correct: 1,
      explanation: "A quorum is the minimum number of members required to be present for a meeting to proceed. Without a quorum, decisions made are not valid. The required number varies by organisation.",
      topic: "Meeting Procedures"
    },
    {
      q: "Which type of meeting discusses the year's financial performance and elects directors?",
      options: [
        "Committee meeting",
        "Department meeting",
        "Special meeting",
        "Annual General Meeting (AGM)"
      ],
      correct: 3,
      explanation: "An AGM (Annual General Meeting) is held once per year. Shareholders or members meet to review annual performance, vote on important matters, and elect board members.",
      topic: "Types of Meetings"
    }
  ],

  module3: [
    {
      q: "What is the correct order of parts in a business letter?",
      options: [
        "Address, date, salutation, body, closing, signature",
        "Sender's address, date, recipient's address, salutation, body, closing, signature",
        "Date, salutation, sender's address, body, closing, recipient's address",
        "Salutation, body, signature, date, address"
      ],
      correct: 1,
      explanation: "Correct order: 1) Sender's address (letterhead), 2) Date, 3) Recipient's address, 4) Salutation (Dear...), 5) Body (message), 6) Closing (Yours sincerely), 7) Signature.",
      topic: "Business Letter Format"
    },
    {
      q: "Which salutation is correct when you don't know the recipient's name?",
      options: [
        "Dear John",
        "Hi there",
        "Dear Sir/Madam",
        "Hello buddy"
      ],
      correct: 2,
      explanation: "When you don't know the specific person's name, use 'Dear Sir/Madam' or 'Dear Sir or Madam'. Use 'Dear Mr/Ms [surname]' if you know their name.",
      topic: "Business Letter Salutation"
    },
    {
      q: "What is the correct closing for a business letter when you know the recipient's name?",
      options: [
        "See you later",
        "Yours faithfully",
        "Yours sincerely",
        "Best wishes"
      ],
      correct: 2,
      explanation: "Use 'Yours sincerely' when you know the recipient's name. Use 'Yours faithfully' when you don't know their name. Both are formal and appropriate for business.",
      topic: "Business Letter Closing"
    },
    {
      q: "What is a letter of enquiry?",
      options: [
        "A letter complaining about poor service",
        "A letter asking for information or details",
        "A letter offering a solution to a problem",
        "A letter placing a business order"
      ],
      correct: 1,
      explanation: "A letter of enquiry asks for information. Example: 'Can you please send me details about your business account packages?' It seeks information from the recipient.",
      topic: "Types of Business Letters"
    },
    {
      q: "Which of the following shows the wrong tone for a business letter?",
      options: [
        "I am writing to request information about your services.",
        "We would appreciate your prompt response.",
        "Yo, can you send me stuff?",
        "Please advise on the next steps."
      ],
      correct: 2,
      explanation: "Business letters must be professional and formal. 'Yo, can you send me stuff?' is too casual and disrespectful. Always use formal tone, complete sentences, and proper grammar.",
      topic: "Tone in Business Writing"
    }
  ],

  module4: [
    {
      q: "What is the main difference between a memo and a letter?",
      options: [
        "Memos are longer",
        "Memos are internal (within the company); letters are external",
        "Memos require signatures; letters don't",
        "Memos are more formal"
      ],
      correct: 1,
      explanation: "Memos are internal documents sent to colleagues or staff. Letters are external documents sent to people outside the organisation. Both must be professional but memos are faster and less formal than letters.",
      topic: "Memo vs Letter"
    },
    {
      q: "What must be included at the start of a memo?",
      options: [
        "Only the sender's name",
        "TO, FROM, DATE, SUBJECT",
        "TO and FROM only",
        "A salutation like 'Dear Sir'"
      ],
      correct: 1,
      explanation: "A memo always includes: TO (recipient), FROM (sender), DATE (when written), and SUBJECT (topic). This information appears at the top before the body text.",
      topic: "Memo Structure"
    },
    {
      q: "What is a report?",
      options: [
        "A quick message to a colleague",
        "A formal investigation or analysis with findings and recommendations",
        "A list of tasks to complete",
        "An informal email"
      ],
      correct: 1,
      explanation: "A report is a detailed, formal document that investigates or analyses a topic. It includes: title, executive summary, introduction, findings (with data), recommendations, and conclusion.",
      topic: "What is a Report"
    },
    {
      q: "What should recommendations in a report be?",
      options: [
        "Long and detailed with lots of explanation",
        "Vague and general (like 'improve things')",
        "SMART: Specific, Measurable, Achievable, Relevant, Time-bound",
        "The writer's personal opinion without evidence"
      ],
      correct: 2,
      explanation: "Good recommendations are SMART. Instead of 'Improve customer service', write: 'Train all staff on standards by 30 April 2025. Measure success by tracking satisfaction scores. Target 85% by June 2025.'",
      topic: "Report Recommendations"
    },
    {
      q: "What tone should be used in a report?",
      options: [
        "Casual and friendly",
        "Very emotional and personal",
        "Formal, objective, and fact-based",
        "Humorous and entertaining"
      ],
      correct: 2,
      explanation: "Reports must be formal and objective. Use facts and data, not personal opinions. Say 'Sales increased 20%' not 'Sales got way better'. Avoid emotional language and stick to evidence.",
      topic: "Report Tone"
    }
  ],

  module5: [
    {
      q: "When answering a business phone call, what should you do first?",
      options: [
        "Complain about being busy",
        "Greet the caller and identify your company/department",
        "Ask them to hold without explaining",
        "Put them on speaker phone immediately"
      ],
      correct: 1,
      explanation: "Answer within 3 rings with a professional greeting: 'Good morning, Capitec Bank, how can I help?' Identify the company and department, and offer to help. This creates a professional first impression.",
      topic: "Telephone Technique"
    },
    {
      q: "What is active listening?",
      options: [
        "Staying quiet until it's your turn to talk",
        "Planning your response while someone else speaks",
        "Fully paying attention, understanding, and confirming what was said",
        "Looking at your phone while someone talks"
      ],
      correct: 2,
      explanation: "Active listening means: face the speaker, make eye contact, nod, don't interrupt, ask clarifying questions, and reflect back what you understood. It shows respect and prevents misunderstandings.",
      topic: "Active Listening"
    },
    {
      q: "What should you do before a job interview?",
      options: [
        "Show up without planning",
        "Research the company, prepare answers, dress professionally, arrive early",
        "Only dress nicely",
        "Arrive right on time (no early)"
      ],
      correct: 1,
      explanation: "Before an interview: research the company, prepare answers to common questions (Tell me about yourself, Why do you want this job?), dress professionally, and arrive 10 minutes early. This shows preparation and respect.",
      topic: "Job Interview Preparation"
    },
    {
      q: "Which of these is a poor listening habit?",
      options: [
        "Making eye contact",
        "Asking clarifying questions",
        "Planning your response while the other person speaks",
        "Nodding to show understanding"
      ],
      correct: 2,
      explanation: "Planning your response while someone else is talking means you're not fully listening. You might miss important information. Instead, listen fully, THEN formulate your response.",
      topic: "Poor Listening Habits"
    },
    {
      q: "How should you structure a presentation?",
      options: [
        "Start with details, end with the main idea",
        "Introduction (why), key points (what), conclusion (action)",
        "Just talk and hope people understand",
        "Presentation doesn't need structure"
      ],
      correct: 1,
      explanation: "Structure: 1) Introduction (topic and relevance), 2) Key points (3-5 main ideas with examples), 3) Conclusion (summary and next steps). This keeps the audience engaged and informed.",
      topic: "Presentation Structure"
    }
  ],

  module6: [
    {
      q: "Which chart type is best for showing how a budget is divided among departments?",
      options: [
        "Line chart",
        "Pie chart",
        "Bar chart",
        "Flow chart"
      ],
      correct: 1,
      explanation: "A pie chart shows how a total is divided into parts/percentages. Example: Budget = 50% salaries, 30% rent, 20% supplies. Each slice represents a portion of the whole.",
      topic: "Chart Types"
    },
    {
      q: "Which chart type best shows sales trends from January to December?",
      options: [
        "Pie chart",
        "Table only",
        "Line chart",
        "Flow chart"
      ],
      correct: 2,
      explanation: "A line chart shows trends over time. The horizontal axis shows time (months), the vertical axis shows values (sales). You can see if the trend is going up, down, or flat.",
      topic: "Chart Types for Trends"
    },
    {
      q: "What is the purpose of a table in a business document?",
      options: [
        "Make the document prettier",
        "Organise data in rows and columns for exact numbers",
        "Replace all written explanations",
        "Nothing important"
      ],
      correct: 1,
      explanation: "Tables organise data clearly in rows and columns. Best for exact numbers or when you have many data points. A table with names, departments, and salaries is clearer than writing it out.",
      topic: "Tables"
    },
    {
      q: "When reading a graph, what should you check first?",
      options: [
        "The colours used",
        "The title and axis labels (what is being shown?)",
        "How many lines or bars there are",
        "Who created it"
      ],
      correct: 1,
      explanation: "Always start by reading the title (What is this showing?), then check the axes: What's on X (horizontal)? What's on Y (vertical)? What units (Rands, units, people)? This tells you what the graph represents.",
      topic: "Reading Graphs"
    },
    {
      q: "What is a flow chart used for?",
      options: [
        "Showing financial data",
        "Displaying percentages of a total",
        "Illustrating steps in a process or decision path",
        "Comparing multiple categories"
      ],
      correct: 2,
      explanation: "A flow chart shows the sequence of steps or decisions in a process. Example: 'How to apply for leave' or 'Customer complaint procedure'. It uses arrows to show the flow from start to end.",
      topic: "Flow Charts"
    }
  ],

  module7: [
    {
      q: "If you need to find a specific date in a long document quickly, which reading technique should you use?",
      options: [
        "Skimming",
        "Scanning",
        "Intensive reading",
        "Speed reading"
      ],
      correct: 1,
      explanation: "Scanning means looking for specific information (like a date, name, or keyword) by skipping over other text. It's fast and focused on finding exactly what you need.",
      topic: "Reading Techniques"
    },
    {
      q: "What is skimming used for?",
      options: [
        "Understanding every detail",
        "Finding one specific piece of information",
        "Getting the main idea quickly",
        "Reading word by word"
      ],
      correct: 2,
      explanation: "Skimming means reading quickly to understand the main idea. Read headings, first sentences, and summaries. Skip detailed examples. Used when you need the gist fast without reading everything.",
      topic: "Skimming"
    },
    {
      q: "What is the difference between the main idea and supporting details?",
      options: [
        "Main idea is written first, details are written last",
        "Main idea is the most important point; details are examples that back it up",
        "They are the same thing",
        "Main idea is numbers; details are words"
      ],
      correct: 1,
      explanation: "Main idea = the most important point (the 'why' of the document). Supporting details = examples, numbers, and explanations that prove the main idea. Example: Main idea: 'Sales increased.' Details: '20% growth in Q1, especially in the East region.'",
      topic: "Main Idea vs Details"
    },
    {
      q: "When summarising a document, you should:",
      options: [
        "Copy sentences word-for-word",
        "Rewrite the main ideas in your own words, keeping it brief",
        "Include every detail so nothing is missed",
        "Change the meaning to make it interesting"
      ],
      correct: 1,
      explanation: "A summary is short (1/4 to 1/3 of original length) and written in your own words. Keep main ideas, drop details. Example: A 200-word email becomes a 50-word summary.",
      topic: "Summarising"
    },
    {
      q: "What should you ask to read critically?",
      options: [
        "How long is this document?",
        "Is this fact or opinion? Is the evidence strong? Who wrote it and why?",
        "What color is the text?",
        "When was it created?"
      ],
      correct: 1,
      explanation: "Critical reading means questioning: Is this true (fact) or someone's view (opinion)? Is there good evidence? Could there be bias? Who is the author and what's their motive? Don't just accept everything as true.",
      topic: "Critical Reading"
    }
  ],

  module8: [
    {
      q: "Which sentence has correct subject-verb agreement?",
      options: [
        "The staff are meeting at 2pm",
        "The team are meeting at 2pm",
        "The manager are here",
        "The reports is ready"
      ],
      correct: 0,
      explanation: "'Staff' is plural, so use 'are'. 'Team' can be singular ('is') or plural ('are') depending on context. 'Manager' is singular ('is'). 'Reports' is plural ('are'). Match verb to subject number.",
      topic: "Subject-Verb Agreement"
    },
    {
      q: "Which sentence has correct verb tense consistency?",
      options: [
        "She wrote the report and sends it to the manager",
        "She writes the report and sent it to the manager",
        "She wrote the report and sent it to the manager",
        "She is writing and sent the report"
      ],
      correct: 2,
      explanation: "Don't mix tenses. If you start in past ('wrote'), stay in past ('sent'). Both actions happened at roughly the same time, so use the same tense. Wrong: 'wrote...sends'. Right: 'wrote...sent'.",
      topic: "Verb Tense Consistency"
    },
    {
      q: "Which is the correct South African/British English spelling?",
      options: [
        "organize, color, analyze",
        "organise, colour, analyse",
        "Both are equally correct",
        "American spelling is used in SA"
      ],
      correct: 1,
      explanation: "South Africa uses British/Commonwealth spelling: organise (not organize), colour (not color), centre (not center), honour (not honor). This is the standard in SA business writing.",
      topic: "SA English Spelling"
    },
    {
      q: "Which sentence is punctuated correctly?",
      options: [
        "Please buy milk, bread, and eggs",
        "Please buy milk bread, and eggs",
        "Please buy milk, bread and eggs",
        "Please buy; milk, bread, and eggs"
      ],
      correct: 0,
      explanation: "Use the Oxford comma (comma before 'and' in lists). 'milk, bread, AND eggs' is clearest. This is the standard in formal SA/British English business writing.",
      topic: "Punctuation"
    },
    {
      q: "What makes writing concise?",
      options: [
        "Using longer, fancier words",
        "Repeating the same idea multiple times",
        "Using 10 words instead of 20 to say the same thing",
        "Adding lots of adjectives"
      ],
      correct: 2,
      explanation: "Concise writing is clear and brief. Instead of 'In order to make sure that all staff have the information, please send it to them', write 'Please send the information to all staff.' Same message, fewer words.",
      topic: "Conciseness"
    }
  ]
};

// Export for use in Ayikho app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = mcQuizBank;
}
