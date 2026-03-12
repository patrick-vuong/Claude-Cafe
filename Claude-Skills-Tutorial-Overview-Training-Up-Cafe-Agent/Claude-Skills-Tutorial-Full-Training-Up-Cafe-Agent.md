---

# Claude Skills Tutorial: Training Your Café Agent

## Hiring: Claude Code Agent ready to learn Claude Skills to run the [Claude Café](https://claude-cafe.vercel.app/)
### Navigate to [Setup](https://github.com/patrick-vuong/Claude-Cafe/blob/main/Claude-Skills-Tutorial-Overview-Training-Up-Cafe-Agent/Claude-Skills-Tutorial-Full-Training-Up-Cafe-Agent.md#setup-preparing-for-agent-training) | Module 1 | Module 2 | Module 3

---
## Claude Skills Tutorial | [Breakdown module by module](https://github.com/patrick-vuong/Claude-Cafe/tree/main/Claude-Skills-Tutorial-Overview-Training-Up-Cafe-Agent)  

Welcome to **Claude Café** ! A cozy, AI-themed digital coffee shop in the AI ecosystem for AI Agents to take a break. Everything is priced in tokens instead of dollars. Customers are ordering Context Refills, Prompt Lattes, and Claude Specials!

Claude Café has been quite busy and you can't run this place alone. You need to **hire an agent**

<div align="center">
  <img width="323" height="323" alt="image" src="https://github.com/user-attachments/assets/cb51fbc0-c948-41f2-9a72-23c8b957d22f" />
</div>


Good news! you've found one. Meet Claude!  Claude is smart, fast, and ready to work. However Claude is a new hire. It's capable, but it doesn't know your café or our workflows yet. It doesn't know your menu, your workflow, your standards, or how you like things done.
That's where **Claude Skills** come in.

---
## Training Manual - Extend Claude with skills
Agent Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently. Think about skills as a set of structured instructions/training manuals. 

Agents are great out of the box. Claude can read code, answer questions, and generate files. But here's the problem:

**Without skills, Claude does things its way. With skills, Claude does things your way.**

**Example**: Imagine asking a new barista to "make a latte." They will make a latte but is it your latte? With the right foam ratio, the right temperature, served in your branded cup?

**Reference:** Extend Claude with [Skills](https://code.claude.com/docs/en/skills)

---
## Setup: Preparing for Agent Training
•	Install [Node.JS](https://nodejs.org/en/download) 

•	Install [Git](https://git-scm.com/) 

•	Install [GitHub Desktop](https://desktop.github.com/download/)

•	GitHub Account:  Creating an account on [GitHub](https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github) 

### VS Code + Claude Code Setup
•	Install VS Code: [Download Visual Studio Code - Mac, Linux, Windows](https://code.visualstudio.com/download)

•	Install Claude Code in CLI Quickstart - [Claude Code Docs (macOS, Linux, WSL, Windows PowerShell, Windows CMD](https://code.claude.com/docs/en/quickstart)

•	Install [Claude Code for VS Code Extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)

•	Claude Subscription [(Pro, Max, Teams, or Enterprise)](https://claude.com/pricing) 

### Clone and Open Claude Cafe Repo in VS Code
•	Open Command Palette: CTRL+Shift+P (Windows/Linux) or CMD+Shift+P (macOS) 
<img width="481" height="66" alt="image" src="https://github.com/user-attachments/assets/fb8eef37-5a0c-4877-9143-e56408c94d82" />


•	Type Git: Clone and paste the repo [https://github.com/patrick-vuong/Claude-Agent-Cafe.git](https://github.com/patrick-vuong/Claude-Cafe.git)
```bash
https://github.com/patrick-vuong/Claude-Cafe.git
```

•	Select a local directory to save | Optional: npm install in terminal to download dependencies to run app

•	Click on Terminal -> New Terminal: claude
```bash
claude
```
<img width="975" height="294" alt="image" src="https://github.com/user-attachments/assets/4025dd31-7696-448e-aa05-1349454966ed" />

<img width="1392" height="265" alt="image" src="https://github.com/user-attachments/assets/cb08e15e-117e-4ed3-90a2-6f9049d03033" />

### Enable Skills in VS Code
•	Go to settings -> type in skill -> enable **Chat: Use Agent Skills + Chat: Use Nested Agents Md Files**
<img width="623" height="457" alt="image" src="https://github.com/user-attachments/assets/0357325d-dd71-41bf-986e-ba3d5a91cee2" />


---

# Module 1: Learn the Cafe
## Before you manage the counter, you need to learn the shop
### Step 1: Ask Claude Without a Skill

Open Claude Code in VS Code's terminal and prompt:

```
how does this app work
```
**Response:** A decent overview covering that is a Next.JS app with a Supabase PostgreSQL backend. High level User flow and some key mechanics.

**Claude without skills:** It's like asking your new hire "what does our café do?" and they say "we sell coffee, pastries to agents." This is all true but with a skill we could get a very rich answer.

### Step 2: Create the "Explain Code" Skill

Let's give Claude a training manual for understanding codebases. **Create a new skill**

**Setup the skill: in VS Code create a new folder in the file explorer**

Lets start with the parent folder and call it **.claude**
```bash
.claude
```

Then within the .claude folder create another folder and call it **skills**
```bash
skills
```

Then within the skills folder you create another folder that is the **NAME** of the skill in this case **explain-code**

```bash
explain-code
```

Finally within the **explain-code** folder we can add a **SKILL.md** file
```bash
SKILL.md
```
<img width="218" height="82" alt="image" src="https://github.com/user-attachments/assets/732d3b78-2999-433d-85f1-42c021556a0a" />

**Create the skill file**
```markdown name=.claude/skills/explain-code/SKILL.md
---
name: "explain-code"
description: "Thoroughly explain how a codebase works with deep architectural detail"
---

# Explain Code Skill

When asked to explain how an app or codebase works, follow this structured approach:

## Steps

1. **Identify the framework and tech stack**  Read `package.json`, config files, and the project structure
2. **Draw a diagram**: Use ASCII art to show the flow, structure or relationships
3. **Map the architecture**  Identify the routing pattern, state management, and data flow
4. **Walk through each major feature**  For each page/feature, explain:
   - What component renders it
   - What data it uses
   - How state flows in and out
5. **Explain the data model** Types, interfaces, and how data is structured
6. **Describe the user journey** Walk through the app as a user would experience it
7. **Highlight patterns and decisions** Why was it built this way? What patterns are used?

## Output Format

Use clear headings, code references with file paths, and a logical flow from high-level architecture down to implementation details.
```
### Step 3: Use the Skill

Lets now prompt claude again this time with the skill 
```bash
Use explain-code skill and show me how this app works
```

<img width="908" height="614" alt="image" src="https://github.com/user-attachments/assets/6b048722-02a4-4e60-8642-69ab877e4fea" />


**Response:** A very detailed response. This is how you can craft a strong prompt and use a skill to ensure to ensure that the agent always responds this way. Just like training an employee to become a master Cafe owner.

---

# Module 2: Cooking in the Kitchen
## A great cafe has a great Kitchen and recipes
### The Kitchen (Model Context Protocal) & Recipe (Skills) Analogy 
We treat Claude Code like a **AI teammate** as we have gone from pair programming to peer programming. What makes a productive is software development lifecycle are the developer tools  that help us go about different tasks ex. testing with (Playwright tool)[https://playwright.dev/]. 

Agents like Claude are extensible as we can connect tools for Claude to use via **Model Context Protocal (MCP)**. **MCP** is a open standard that allows Claude to leverage tools to gain new capabilities.

### **Imagine this:** Similar in our analogy of Claude Cafe - Claude needs great tools in the kitchen to achieve tasks for the cafe
•	**Kitchen Tools**: is our MCP where Claude can connect to different tools and complete agentic workflows

•	**Recipes**: is our skills that teach Claude workflows and best practices 

•	**Without each other**: it just becomes equipment with no direction and recipes with no tools

•	**The Result: Claude with a Kitchen (MCP) and Recipes (skills)** allows Claude to perform agentic workflows in the way you would do it and adhering all the best practices

---

### Step 1: Lets get some tools ! Setup the Playwright MCP Server
**Every Developer needs to do testing.** [Playwright MCP](https://github.com/microsoft/playwright-mcp) gives Claude the ability to **control a real web browser and perform end to end testing** for example click buttons, fill forms, navigate pages, take screenshots, and verify UI behavior.

Add the Playwright MCP server to your Claude Code configuration: So that we can use it. Enter the below in the terminal

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Start a new session for playwright to load
```
/clear
```

### Step 2: Lets explore our tools ! Learn about Playwright MCP Server

Playwright MCP can test a ton of pieces. Prompt Claude to see what Playwright can do: 

```
What can Playwright MCP do?
```

### Step 3: Use the Playwright MCP Server

Lets do some testing on our website. Prompt Claude: 
```
Can you use the Playwright MCP tool to test the shopping experience (Add item + Checkout). Make it a single agent and make it headed so I can see it.
```




