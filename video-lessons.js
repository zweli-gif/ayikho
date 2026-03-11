/**
 * AYIKHO Video Lessons Data
 * Accounting modules with full segment structure
 * Pure data file - no DOM manipulation or player logic
 */

window.AYIKHO_VIDEO_LESSONS = {
  modules: [
    {
      id: 1,
      title: "Accounting Concepts & Principles",
      duration: "3:45",
      markers: [
        { time: "0:00", label: "Why do we need rules for accounting?" },
        { time: "1:00", label: "The Big 6 concepts explained" },
        { time: "2:15", label: "How GAAP keeps businesses honest" },
        { time: "3:00", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 1: Accounting Concepts & Principles",
          lines: ["MODULE 1: Accounting Concepts & Principles"],
          duration: 3300
        },
        {
          type: "voice",
          text: "So imagine you run a spaza shop in Soweto. You sell chips, airtime, cold drinks. You need to keep track of your money, right? But here's the thing -- you can't just write stuff any way you want.",
          duration: 8200
        },
        {
          type: "board",
          text: "Why Rules?: So everyone reads the numbers the same way",
          lines: ["Why Rules?", "So everyone reads the numbers the same way"],
          highlights: ["SAME WAY"],
          duration: 3800
        },
        {
          type: "voice",
          text: "There are 6 main concepts that control how we record transactions. Think of them like the rules of the game. If everyone follows the same rules, the numbers make sense to anyone who reads them.",
          duration: 7100
        },
        {
          type: "board",
          text: "THE BIG 6:",
          lines: [
            "THE BIG 6:",
            "1. Entity Concept",
            "2. Going Concern",
            "3. Historical Cost",
            "4. Prudence",
            "5. Materiality",
            "6. Matching Principle"
          ],
          highlights: ["ENTITY CONCEPT", "GOING CONCERN", "HISTORICAL COST", "PRUDENCE", "MATERIALITY", "MATCHING PRINCIPLE"],
          duration: 4200
        },
        {
          type: "voice",
          text: "Number one -- the Entity Concept. Your business is NOT you. Even if you own the spaza shop, the shop's money and your personal money must be kept separate. Your tuckshop isn't your personal piggy bank!",
          duration: 6900
        },
        {
          type: "board",
          text: "Entity Concept: Business ≠ Owner",
          lines: ["Entity Concept: Business ≠ Owner", "Keep personal and business money SEPARATE"],
          highlights: ["SEPARATE"],
          duration: 3500
        },
        {
          type: "voice",
          text: "Number two -- Going Concern. We assume the business will keep running. It's not shutting down tomorrow. This matters because it affects how we value things.",
          duration: 5400
        },
        {
          type: "board",
          text: "Going Concern: Business will continue operating",
          lines: ["Going Concern: Business will continue operating"],
          duration: 2900
        },
        {
          type: "voice",
          text: "Number three -- Historical Cost. We record things at what we actually paid. If you bought a fridge for R3,000, it goes in the books at R3,000 -- even if it's worth R5,000 today.",
          duration: 6700
        },
        {
          type: "board",
          text: "Historical Cost: Record at PURCHASE price",
          lines: ["Historical Cost: Record at PURCHASE price"],
          highlights: ["PURCHASE"],
          duration: 2900
        },
        {
          type: "voice",
          text: "Number four -- Prudence. Be careful! Don't overstate what you have. If you think a customer might not pay, record it as a loss. Better to be safe.",
          duration: 5700
        },
        {
          type: "board",
          text: "Prudence: Don't overstate assets or income",
          lines: ["Prudence: Don't overstate assets or income", "Be cautious with estimates"],
          duration: 3200
        },
        {
          type: "voice",
          text: "Number five -- Materiality. Small stuff doesn't need its own category. If you buy a R10 pen, you don't need to track it as an asset for 5 years. Use common sense.",
          duration: 6500
        },
        {
          type: "board",
          text: "Materiality: Only track items big enough to matter",
          lines: ["Materiality: Only track items big enough to matter"],
          duration: 3100
        },
        {
          type: "voice",
          text: "And number six -- the Matching Principle. Match your expenses to the income they helped create. If you buy stock in January and sell it in February, the cost goes with February's income.",
          duration: 7200
        },
        {
          type: "board",
          text: "Matching Principle: Expenses matched to the income they generate",
          lines: ["Matching Principle: Expenses matched to the income they generate"],
          duration: 3200
        },
        {
          type: "voice",
          text: "All these rules come from something called GAAP -- Generally Accepted Accounting Practice. It's like the constitution of accounting. GAAP stops businesses from lying about their numbers.",
          duration: 6800
        },
        {
          type: "board",
          text: "GAAP = Generally Accepted Accounting Practice → The rules that keep everyone honest",
          lines: ["GAAP = Generally Accepted Accounting Practice", "The rules that keep everyone honest"],
          highlights: ["GAAP", "EVERYONE HONEST"],
          duration: 3600
        },
        {
          type: "voice",
          text: "Quick recap! Six concepts: Entity, Going Concern, Historical Cost, Prudence, Materiality, and Matching. Exam tip -- they LOVE asking you to identify which concept applies to a scenario. So make sure you can tell them apart. Let's go crush the interactive exercise next!",
          duration: 9000
        },
        {
          type: "board",
          text: "EXAM TIP: Know which concept fits which scenario",
          lines: ["EXAM TIP: Know which concept fits which scenario", "This is worth 15-20 marks in the final!"],
          highlights: ["EXAM TIP"],
          duration: 3600
        }
      ]
    },
    {
      id: 2,
      title: "Double Entry & The Accounting Equation",
      duration: "3:42",
      markers: [
        { time: "0:00", label: "What is the Accounting Equation?" },
        { time: "1:12", label: "Assets, Liabilities & Capital explained" },
        { time: "2:05", label: "Why every transaction touches two accounts" },
        { time: "3:00", label: "Quick recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 2: Double Entry & The Accounting Equation",
          lines: ["MODULE 2: Double Entry & The Accounting Equation"],
          duration: 3300
        },
        {
          type: "voice",
          text: "Here's the golden rule: everything a business owns, came from somewhere. Either the owner put it in, or someone lent it. That's the whole equation.",
          duration: 5700
        },
        {
          type: "board",
          text: "Assets = Liabilities + Capital",
          lines: ["Assets = Liabilities + Capital", "(What you HAVE = What you OWE + What the OWNER put in)"],
          highlights: ["HAVE", "OWE", "OWNER"],
          duration: 3400
        },
        {
          type: "voice",
          text: "Let's say Sipho opens a car wash. He puts in R10,000 of his own money and borrows R5,000 from Capitec. Now he has R15,000 in assets.",
          duration: 5800
        },
        {
          type: "board",
          text: "Sipho's Car Wash:",
          lines: [
            "Sipho's Car Wash:",
            "Assets: R15,000",
            "Liabilities: R5,000 (Capitec loan)",
            "Capital: R10,000 (Sipho's money)",
            "15,000 = 5,000 + 10,000 ✓"
          ],
          duration: 4100
        },
        {
          type: "voice",
          text: "Assets are what the business owns -- cash, equipment, vehicles. Liabilities are what it owes -- loans, creditors. Capital is what the owner invested.",
          duration: 5900
        },
        {
          type: "board",
          text: "Assets 🏢 = What business OWNS",
          lines: [
            "Assets 🏢 = What business OWNS",
            "Liabilities 💳 = What business OWES",
            "Capital 👤 = Owner's investment"
          ],
          highlights: ["OWNS", "OWES"],
          duration: 3600
        },
        {
          type: "voice",
          text: "Now here's the magic -- Double Entry. Every single transaction affects exactly TWO accounts. Always. No exceptions.",
          duration: 5400
        },
        {
          type: "board",
          text: "DOUBLE ENTRY RULE: Every transaction = 2 accounts affected",
          lines: [
            "DOUBLE ENTRY RULE: Every transaction = 2 accounts affected",
            "One DEBIT + One CREDIT"
          ],
          highlights: ["DOUBLE ENTRY", "DEBIT", "CREDIT"],
          duration: 3400
        },
        {
          type: "voice",
          text: "Remember DEAD CLIC! Debits increase Expenses, Assets, and Drawings. Credits increase Liabilities, Income, and Capital. That's your cheat code.",
          duration: 6000
        },
        {
          type: "board",
          text: "DEAD CLIC:",
          lines: [
            "DEAD CLIC:",
            "Debits increase: Expenses, Assets, Drawings",
            "Credits increase: Liabilities, Income, Capital"
          ],
          highlights: ["DEAD CLIC"],
          duration: 3500
        },
        {
          type: "voice",
          text: "So when Sipho buys equipment for R3,000 cash: Equipment goes UP (debit) and Cash goes DOWN (credit). Two accounts, always balanced.",
          duration: 5800
        },
        {
          type: "board",
          text: "Example: Buy equipment R3,000",
          lines: [
            "Example: Buy equipment R3,000",
            "Debit: Equipment +R3,000",
            "Credit: Bank -R3,000",
            "Equation still balances!"
          ],
          duration: 3800
        },
        {
          type: "voice",
          text: "Exam tip -- if you can nail the accounting equation and double entry, you've got the base for literally everything else in this subject. It's in almost every question. Practice with the calculator next!",
          duration: 7500
        },
        {
          type: "board",
          text: "EXAM TIP: The equation must ALWAYS balance",
          lines: ["EXAM TIP: The equation must ALWAYS balance", "If it doesn't, something's wrong!"],
          highlights: ["EXAM TIP"],
          duration: 3200
        }
      ]
    },
    {
      id: 3,
      title: "Journals & Ledgers",
      duration: "4:00",
      markers: [
        { time: "0:00", label: "What is a Journal?" },
        { time: "1:15", label: "How to write journal entries" },
        { time: "2:30", label: "From Journal to Ledger" },
        { time: "3:15", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 3: Journals & Ledgers",
          lines: ["MODULE 3: Journals & Ledgers"],
          duration: 3300
        },
        {
          type: "voice",
          text: "A journal is the first place you write down a transaction. It's called the 'book of first entry.' Every transaction gets a date, the accounts affected, and the amounts.",
          duration: 6700
        },
        {
          type: "board",
          text: "JOURNAL = Book of First Entry",
          lines: [
            "JOURNAL = Book of First Entry",
            "Records: Date | Accounts | Debit | Credit"
          ],
          highlights: ["JOURNAL"],
          duration: 3300
        },
        {
          type: "voice",
          text: "The format is simple. The account being debited goes first, then the credit is indented below it. There's always a short narration explaining what happened.",
          duration: 6000
        },
        {
          type: "board",
          text: "Journal Entry Format:",
          lines: [
            "Journal Entry Format:",
            "Date | Dr: Account Name | Amount |",
            "Cr: Account Name | | Amount",
            "(Narration: what happened)"
          ],
          duration: 3700
        },
        {
          type: "voice",
          text: "Let's say Sipho buys cleaning equipment for R2,500 cash. The journal entry would be: Debit Equipment R2,500, Credit Bank R2,500. Narration: bought cleaning equipment.",
          duration: 6200
        },
        {
          type: "board",
          text: "Example:",
          lines: [
            "Example:",
            "Dr: Equipment R2,500",
            "Cr: Bank R2,500",
            "(Bought cleaning equipment for cash)"
          ],
          duration: 3500
        },
        {
          type: "voice",
          text: "But journals get messy if you have hundreds of transactions. So we organise everything into a Ledger -- each account gets its own page. This is called 'posting.'",
          duration: 6100
        },
        {
          type: "board",
          text: "LEDGER = Organised by account",
          lines: [
            "LEDGER = Organised by account",
            "Each account gets a T-Account:",
            "Account Name",
            "Debit | Credit"
          ],
          highlights: ["LEDGER"],
          duration: 3600
        },
        {
          type: "voice",
          text: "When you post to the ledger, you take each entry from the journal and put it in the right T-account. The debit goes on the left, credit on the right. Then you balance each account.",
          duration: 6500
        },
        {
          type: "board",
          text: "Journal → Post to Ledger → Balance accounts",
          lines: ["Journal → Post to Ledger → Balance accounts", "This is the FLOW of accounting!"],
          highlights: ["FLOW"],
          duration: 3400
        },
        {
          type: "voice",
          text: "Exam tip: they love giving you transactions and asking you to journalise them and then post to the ledger. Practice the flow -- transaction to journal to ledger. The interactive builder next will help you nail this!",
          duration: 7600
        },
        {
          type: "board",
          text: "EXAM TIP: Master the flow:",
          lines: [
            "EXAM TIP: Master the flow:",
            "Transaction → Journal → Ledger",
            "Practice makes perfect!"
          ],
          highlights: ["EXAM TIP"],
          duration: 3400
        }
      ]
    },
    {
      id: 4,
      title: "Trial Balance",
      duration: "3:50",
      markers: [
        { time: "0:00", label: "What is a Trial Balance?" },
        { time: "1:10", label: "How to extract it from ledger accounts" },
        { time: "2:20", label: "What it catches vs. what it misses" },
        { time: "3:10", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 4: Trial Balance",
          lines: ["MODULE 4: Trial Balance"],
          duration: 3300
        },
        {
          type: "voice",
          text: "Remember the accounting equation? Assets equals Liabilities plus Capital. The trial balance checks that all your debits still equal all your credits.",
          duration: 6400
        },
        {
          type: "board",
          text: "Trial Balance = Test of Balance",
          lines: ["Trial Balance = Test of Balance", "Total Debits MUST = Total Credits"],
          highlights: ["DEBITS", "CREDITS"],
          duration: 3300
        },
        {
          type: "voice",
          text: "To make one, you go through every ledger account, take the closing balance, and list it as either a debit or credit balance. Then you add up both columns.",
          duration: 6000
        },
        {
          type: "board",
          text: "How to build a Trial Balance:",
          lines: [
            "How to build a Trial Balance:",
            "1. List all accounts",
            "2. Write each closing balance",
            "3. Put it in Debit or Credit column",
            "4. Total both columns",
            "5. They must match!"
          ],
          duration: 4000
        },
        {
          type: "voice",
          text: "Assets and expenses are debit balances. Liabilities, income, and capital are credit balances. Easy way to remember -- DEAD CLIC again!",
          duration: 5600
        },
        {
          type: "board",
          text: "Debit balances: Assets, Expenses, Drawings",
          lines: [
            "Debit balances: Assets, Expenses, Drawings",
            "Credit balances: Liabilities, Income, Capital"
          ],
          highlights: ["DEBIT", "CREDIT"],
          duration: 3400
        },
        {
          type: "voice",
          text: "But here's the catch -- a trial balance doesn't catch everything. If you put the right amount in the wrong account, it still balances. If you forgot a transaction completely, it still balances.",
          duration: 6200
        },
        {
          type: "board",
          text: "TB catches: one-sided entries, math errors",
          lines: [
            "TB catches: one-sided entries, math errors",
            "TB misses: wrong accounts, missing entries, errors of principle, compensating errors"
          ],
          duration: 3900
        },
        {
          type: "voice",
          text: "Exam tip: they always ask what errors a trial balance can and cannot detect. Know both lists! Try the builder next to practice making one from scratch.",
          duration: 6500
        },
        {
          type: "board",
          text: "EXAM TIP: Know what TB catches AND misses",
          lines: ["EXAM TIP: Know what TB catches AND misses", "This appears almost every exam!"],
          highlights: ["EXAM TIP"],
          duration: 3400
        }
      ]
    },
    {
      id: 5,
      title: "Cash Receipts & Payments Journals",
      duration: "4:10",
      markers: [
        { time: "0:00", label: "Why special journals?" },
        { time: "1:00", label: "Cash Receipts Journal layout" },
        { time: "2:10", label: "Cash Payments Journal layout" },
        { time: "3:20", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 5: Cash Receipts & Payments Journals",
          lines: ["MODULE 5: Cash Receipts & Payments Journals"],
          duration: 3300
        },
        {
          type: "voice",
          text: "When cash comes IN to the business, it goes in the Cash Receipts Journal -- or CRJ. When cash goes OUT, it goes in the Cash Payments Journal -- or CPJ.",
          duration: 6200
        },
        {
          type: "board",
          text: "CRJ = Cash IN (money received)",
          lines: [
            "CRJ = Cash IN (money received)",
            "CPJ = Cash OUT (money paid)"
          ],
          highlights: ["CRJ", "CPJ"],
          duration: 3200
        },
        {
          type: "voice",
          text: "The CRJ has columns for date, details, receipt number, bank, sales, debtors control, sundry accounts, and VAT. Each column makes it easy to total at month-end.",
          duration: 6400
        },
        {
          type: "board",
          text: "CRJ Columns:",
          lines: [
            "CRJ Columns:",
            "Date | Details | Rec # | Bank | Sales | Debtors | Sundry | VAT"
          ],
          duration: 3500
        },
        {
          type: "voice",
          text: "The CPJ is similar but for payments. It has date, details, cheque number, bank, trading stock, creditors control, sundry accounts, and VAT.",
          duration: 6000
        },
        {
          type: "board",
          text: "CPJ Columns:",
          lines: [
            "CPJ Columns:",
            "Date | Details | Chq # | Bank | Stock | Creditors | Sundry | VAT"
          ],
          duration: 3400
        },
        {
          type: "voice",
          text: "The key thing is -- the Bank column is your total. All the other columns must add up to the Bank column on each line. That's your cross-check.",
          duration: 6000
        },
        {
          type: "board",
          text: "Golden Rule: Bank column = Sum of all other columns",
          lines: ["Golden Rule: Bank column = Sum of all other columns", "This is your error-check!"],
          highlights: ["GOLDEN RULE"],
          duration: 3300
        },
        {
          type: "voice",
          text: "At month-end, you total each column and post the totals to the ledger. The individual sundry items get posted separately. Exam tip: they give you transactions and ask you to fill in the journal. Pay attention to which column each amount goes in!",
          duration: 7800
        },
        {
          type: "board",
          text: "EXAM TIP: Practice placing amounts in correct columns",
          lines: [
            "EXAM TIP: Practice placing amounts in correct columns",
            "Bank must always balance with other columns!"
          ],
          highlights: ["EXAM TIP"],
          duration: 3600
        }
      ]
    },
    {
      id: 6,
      title: "Debtors & Creditors Journals",
      duration: "4:00",
      markers: [
        { time: "0:00", label: "Credit transactions explained" },
        { time: "1:10", label: "The Debtors Journal" },
        { time: "2:15", label: "The Creditors Journal" },
        { time: "3:15", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 6: Debtors & Creditors Journals",
          lines: ["MODULE 6: Debtors & Creditors Journals"],
          duration: 3300
        },
        {
          type: "voice",
          text: "A debtor is someone who owes YOU money. They bought goods on credit and will pay later. The Debtors Journal records all credit SALES.",
          duration: 6200
        },
        {
          type: "board",
          text: "DEBTOR = They owe US",
          lines: [
            "DEBTOR = They owe US",
            "Debtors Journal = Credit SALES",
            "Columns: Date | Customer | Invoice # | Amount | VAT"
          ],
          highlights: ["DEBTOR"],
          duration: 3600
        },
        {
          type: "voice",
          text: "So when Zandile's Spaza Shop sells R1,200 of goods on credit to a school, that goes in the Debtors Journal. The school is now a debtor.",
          duration: 6000
        },
        {
          type: "board",
          text: "Example: Sold R1,200 on credit to school",
          lines: [
            "Example: Sold R1,200 on credit to school",
            "Debtors Journal: School | Inv 045 | R1,200 | R156.52 VAT"
          ],
          duration: 3700
        },
        {
          type: "voice",
          text: "A creditor is someone you OWE money to. You bought goods on credit and will pay later. The Creditors Journal records all credit PURCHASES.",
          duration: 6200
        },
        {
          type: "board",
          text: "CREDITOR = We owe THEM",
          lines: [
            "CREDITOR = We owe THEM",
            "Creditors Journal = Credit PURCHASES",
            "Columns: Date | Supplier | Invoice # | Amount | VAT"
          ],
          highlights: ["CREDITOR"],
          duration: 3600
        },
        {
          type: "voice",
          text: "When Zandile buys R3,000 of stock from a wholesaler on credit, that goes in the Creditors Journal. The wholesaler is now a creditor.",
          duration: 6000
        },
        {
          type: "board",
          text: "Example: Bought R3,000 stock on credit",
          lines: [
            "Example: Bought R3,000 stock on credit",
            "Creditors Journal: Wholesaler | Inv 112 | R3,000 | R391.30 VAT"
          ],
          duration: 3800
        },
        {
          type: "voice",
          text: "Exam tip: don't mix them up! Debtors Journal is for SALES on credit. Creditors Journal is for PURCHASES on credit. If it's cash, it goes in the CRJ or CPJ instead!",
          duration: 6600
        },
        {
          type: "board",
          text: "EXAM TIP: Debtors Journal = CREDIT SALES",
          lines: [
            "EXAM TIP: Debtors Journal = CREDIT SALES",
            "Creditors Journal = CREDIT PURCHASES",
            "Cash? Use CRJ/CPJ instead!"
          ],
          highlights: ["EXAM TIP"],
          duration: 3600
        }
      ]
    },
    {
      id: 7,
      title: "Value Added Tax (VAT)",
      duration: "4:00",
      markers: [
        { time: "0:00", label: "What is VAT?" },
        { time: "1:00", label: "Output VAT vs Input VAT" },
        { time: "2:15", label: "The VAT settlement" },
        { time: "3:15", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 7: Value Added Tax (VAT)",
          lines: [
            "MODULE 7: Value Added Tax (VAT)",
            "South Africa: 15%"
          ],
          highlights: ["VAT"],
          duration: 3400
        },
        {
          type: "voice",
          text: "Here's the key: VAT is not the business's money. The business collects it from customers and passes it to SARS. It's like being a tax collection agent.",
          duration: 6400
        },
        {
          type: "board",
          text: "VAT = Tax collected for SARS",
          lines: ["VAT = Tax collected for SARS", "Business is the middleman!"],
          highlights: ["VAT", "SARS"],
          duration: 3100
        },
        {
          type: "voice",
          text: "When you SELL something, the VAT you charge is called Output VAT. When you BUY something, the VAT you pay is called Input VAT.",
          duration: 5800
        },
        {
          type: "board",
          text: "Output VAT = VAT on SALES (you collect)",
          lines: [
            "Output VAT = VAT on SALES (you collect)",
            "Input VAT = VAT on PURCHASES (you pay)",
            "Formula: VAT = Price × 15/115"
          ],
          highlights: ["OUTPUT VAT", "INPUT VAT"],
          duration: 3600
        },
        {
          type: "voice",
          text: "At the end of the month, you calculate: Output VAT minus Input VAT. If Output is more, you owe SARS the difference. If Input is more, SARS owes YOU a refund.",
          duration: 6600
        },
        {
          type: "board",
          text: "VAT Settlement: Output VAT - Input VAT = Amount owed to SARS",
          lines: [
            "VAT Settlement: Output VAT - Input VAT = Amount owed to SARS",
            "If positive → Pay SARS",
            "If negative → SARS pays you"
          ],
          highlights: ["OUTPUT VAT", "INPUT VAT"],
          duration: 3800
        },
        {
          type: "voice",
          text: "Let's say Naledi's shop collected R4,500 Output VAT and paid R2,800 Input VAT this month. She owes SARS: R4,500 minus R2,800 = R1,700.",
          duration: 6000
        },
        {
          type: "board",
          text: "Naledi's VAT:",
          lines: [
            "Naledi's VAT:",
            "Output: R4,500",
            "Input: R2,800",
            "Owes SARS: R1,700"
          ],
          duration: 3400
        },
        {
          type: "voice",
          text: "In the books, you use three accounts: VAT Input, VAT Output, and VAT Control. Exam tip: the VAT calculation question appears almost every exam. Make sure you can calculate VAT from an inclusive price -- multiply by 15 and divide by 115!",
          duration: 7800
        },
        {
          type: "board",
          text: "EXAM TIP: VAT from inclusive price:",
          lines: [
            "EXAM TIP: VAT from inclusive price:",
            "VAT = Amount × 15 ÷ 115",
            "This WILL be in your exam!"
          ],
          highlights: ["EXAM TIP"],
          duration: 3500
        }
      ]
    },
    {
      id: 8,
      title: "Year-End Adjustments",
      duration: "4:30",
      markers: [
        { time: "0:00", label: "Why adjustments at year-end?" },
        { time: "1:15", label: "Depreciation (Straight-Line Method)" },
        { time: "2:30", label: "Other adjustments: prepaid, accrued, bad debts" },
        { time: "3:30", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 8: Year-End Adjustments",
          lines: [
            "MODULE 8: Year-End Adjustments",
            "Why? To make sure the books reflect REALITY"
          ],
          duration: 3400
        },
        {
          type: "voice",
          text: "The biggest one is depreciation. Your assets lose value over time. A delivery van that cost R120,000 isn't worth R120,000 after 5 years of use.",
          duration: 6500
        },
        {
          type: "board",
          text: "DEPRECIATION = Loss in value over time",
          lines: [
            "DEPRECIATION = Loss in value over time",
            "Straight-Line Method: (Cost - Residual Value) ÷ Useful Life"
          ],
          highlights: ["DEPRECIATION"],
          duration: 3700
        },
        {
          type: "voice",
          text: "For Sipho's car wash, if the equipment cost R30,000, has a residual value of R6,000, and lasts 6 years: that's R30,000 minus R6,000 divided by 6 = R4,000 per year.",
          duration: 6700
        },
        {
          type: "board",
          text: "Sipho's Equipment:",
          lines: [
            "Sipho's Equipment:",
            "Cost: R30,000",
            "Residual: R6,000",
            "Life: 6 years",
            "Depreciation: R4,000/year"
          ],
          duration: 3800
        },
        {
          type: "voice",
          text: "But there are other adjustments too. Prepaid expenses -- rent you paid in advance that covers next year. Accrued expenses -- electricity you used but haven't been billed for yet.",
          duration: 6300
        },
        {
          type: "board",
          text: "Other Adjustments:",
          lines: [
            "Other Adjustments:",
            "1. Prepaid Expenses (paid ahead)",
            "2. Accrued Expenses (used but not billed)",
            "3. Accrued Income (earned but not received)",
            "4. Bad Debts (customers who won't pay)"
          ],
          duration: 4000
        },
        {
          type: "voice",
          text: "And provision for bad debts -- some customers will never pay, and you need to account for that loss.",
          duration: 4500
        },
        {
          type: "board",
          text: "Bad Debts:",
          lines: [
            "Bad Debts:",
            "Write off debtor",
            "Provision: Estimate future losses",
            "(Usually a % of total debtors)"
          ],
          duration: 3800
        },
        {
          type: "voice",
          text: "Exam tip: depreciation is almost always in the exam. Know the straight-line formula cold. They also love asking you to calculate prepaid and accrued amounts -- read the dates carefully!",
          duration: 6800
        },
        {
          type: "board",
          text: "EXAM TIP: Know the depreciation formula!",
          lines: [
            "EXAM TIP: Know the depreciation formula!",
            "(Cost - Residual) ÷ Life = Annual depreciation",
            "Watch dates for prepaid/accrued!"
          ],
          highlights: ["EXAM TIP"],
          duration: 3600
        }
      ]
    },
    {
      id: 9,
      title: "Financial Statements",
      duration: "4:30",
      markers: [
        { time: "0:00", label: "The two big financial statements" },
        { time: "1:15", label: "Income Statement (Profit & Loss)" },
        { time: "2:30", label: "Balance Sheet" },
        { time: "3:30", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 9: Financial Statements",
          lines: [
            "MODULE 9: Financial Statements",
            "The final products of accounting!"
          ],
          duration: 3400
        },
        {
          type: "voice",
          text: "First -- the Income Statement, also called the Statement of Comprehensive Income. It tells you: did the business make money or lose money this period?",
          duration: 6300
        },
        {
          type: "board",
          text: "INCOME STATEMENT:",
          lines: [
            "INCOME STATEMENT:",
            "Revenue - Cost of Sales = Gross Profit",
            "Gross Profit - Expenses = Net Profit (or Loss)"
          ],
          highlights: ["INCOME STATEMENT"],
          duration: 3700
        },
        {
          type: "voice",
          text: "You start with revenue -- all the money from sales. Subtract cost of sales to get gross profit. Then subtract all other expenses like rent, salaries, depreciation. What's left is your net profit.",
          duration: 6600
        },
        {
          type: "board",
          text: "Structure:",
          lines: [
            "Structure:",
            "Sales xxx",
            "- Cost of Sales (xxx)",
            "= Gross Profit xxx",
            "- Operating Expenses (xxx)",
            "= Net Profit/Loss xxx"
          ],
          duration: 4000
        },
        {
          type: "voice",
          text: "Second -- the Balance Sheet, also called the Statement of Financial Position. It's a snapshot of what the business owns and owes on a specific date.",
          duration: 6100
        },
        {
          type: "board",
          text: "BALANCE SHEET:",
          lines: [
            "BALANCE SHEET:",
            "Assets = Liabilities + Owner's Equity",
            "Snapshot at a SPECIFIC date"
          ],
          highlights: ["BALANCE SHEET"],
          duration: 3500
        },
        {
          type: "voice",
          text: "The balance sheet has three sections: Assets at the top -- split into non-current and current. Then liabilities -- also split into non-current and current. And finally, owner's equity.",
          duration: 6400
        },
        {
          type: "board",
          text: "Balance Sheet Structure:",
          lines: [
            "Balance Sheet Structure:",
            "ASSETS (Non-current + Current)",
            "LIABILITIES (Non-current + Current)",
            "OWNER'S EQUITY (Capital + Retained income)"
          ],
          duration: 3700
        },
        {
          type: "voice",
          text: "Key difference: the Income Statement covers a PERIOD, like January to December. The Balance Sheet is a SNAPSHOT on ONE date, like 31 December.",
          duration: 6000
        },
        {
          type: "board",
          text: "Income Statement = Period (Jan-Dec)",
          lines: [
            "Income Statement = Period (Jan-Dec)",
            "Balance Sheet = Date (31 Dec)",
            "Don't mix them up!"
          ],
          duration: 3400
        },
        {
          type: "voice",
          text: "Exam tip: financial statements are worth the most marks in the exam. Know the format by heart! Practice building them from a trial balance. The builder exercise next will give you exactly that.",
          duration: 7200
        },
        {
          type: "board",
          text: "EXAM TIP: Worth the MOST marks!",
          lines: [
            "EXAM TIP: Worth the MOST marks!",
            "Know the format perfectly",
            "Practice from Trial Balance data"
          ],
          highlights: ["EXAM TIP"],
          duration: 3600
        }
      ]
    },
    {
      id: 10,
      title: "Bank Reconciliation",
      duration: "4:00",
      markers: [
        { time: "0:00", label: "Why bank and books don't match" },
        { time: "1:00", label: "The four key differences" },
        { time: "2:15", label: "Full reconciliation walkthrough" },
        { time: "3:15", label: "Recap + exam tip" }
      ],
      segments: [
        {
          type: "board",
          text: "MODULE 10: Bank Reconciliation",
          lines: [
            "MODULE 10: Bank Reconciliation",
            "Why don't the bank and books match?"
          ],
          duration: 3400
        },
        {
          type: "voice",
          text: "There are four main reasons the bank statement and your cashbook don't agree. Let's call them the Big Four differences.",
          duration: 5400
        },
        {
          type: "board",
          text: "THE 4 KEY DIFFERENCES:",
          lines: [
            "THE 4 KEY DIFFERENCES:",
            "1. Outstanding Deposits",
            "2. Unpresented Cheques",
            "3. Bank Charges",
            "4. Direct Debits/Credits"
          ],
          highlights: ["KEY DIFFERENCES"],
          duration: 3700
        },
        {
          type: "voice",
          text: "Outstanding deposits -- you deposited money but the bank hasn't processed it yet. Unpresented cheques -- you wrote a cheque but the person hasn't cashed it yet.",
          duration: 6100
        },
        {
          type: "board",
          text: "Outstanding Deposits: In YOUR books, not yet at BANK",
          lines: [
            "Outstanding Deposits: In YOUR books, not yet at BANK",
            "Unpresented Cheques: In YOUR books, not yet at BANK",
            "→ Both are TIMING differences"
          ],
          duration: 3700
        },
        {
          type: "voice",
          text: "Bank charges -- the bank took fees but you didn't know about them yet. Direct debits and credits -- payments or deposits the bank made that you haven't recorded.",
          duration: 6000
        },
        {
          type: "board",
          text: "Bank Charges: At BANK, not in your books yet",
          lines: [
            "Bank Charges: At BANK, not in your books yet",
            "Direct Debits: At BANK, not in your books yet",
            "→ These need JOURNAL ENTRIES to fix"
          ],
          highlights: ["JOURNAL ENTRIES"],
          duration: 3800
        },
        {
          type: "voice",
          text: "Here's the key: timing differences like outstanding deposits and unpresented cheques appear on the bank reconciliation statement only. But bank corrections like charges and direct debits need journal entries to update your cashbook.",
          duration: 7000
        },
        {
          type: "board",
          text: "IMPORTANT: Timing differences → Reconciliation statement only",
          lines: [
            "IMPORTANT: Timing differences → Reconciliation statement only",
            "Bank corrections → Update YOUR cashbook!"
          ],
          highlights: ["IMPORTANT", "TIMING", "BANK CORRECTIONS"],
          duration: 3600
        },
        {
          type: "voice",
          text: "Exam tip: the reconciliation question is a guaranteed 20+ marks. Start with the bank balance, adjust for timing differences, and you should arrive at the cashbook balance. Practice identifying what goes where!",
          duration: 7000
        },
        {
          type: "board",
          text: "EXAM TIP: Worth 20+ marks!",
          lines: [
            "EXAM TIP: Worth 20+ marks!",
            "Start with bank balance",
            "Adjust for timing differences",
            "Must end at cashbook balance!"
          ],
          highlights: ["EXAM TIP"],
          duration: 3700
        }
      ]
    }
  ]
};

// Ensure the object is properly exported
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.AYIKHO_VIDEO_LESSONS;
}
