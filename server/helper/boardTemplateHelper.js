import { OpenAI } from "openai/client.js";
import Board from "../models/Board.js";
import List from "../models/List.js";
import Card from "../models/Card.js";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LIST_TITLES = ["Todo", "Doing", "In Review", "Done", "Closed"];

/**
 * Asks Claude to generate a structured task breakdown for the given project.
 * Returns a parsed array of card objects.
 */
async function generateTasksFromAI({ title, description, frontend, backend }) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a senior software engineer and technical mentor creating a guided, learn-by-doing project breakdown.

Your job is to generate structured development tasks for a project. Each task is a self-contained learning unit — the developer will read it, understand what to build, why it matters, and exactly how to implement it step by step.

Respond ONLY with a valid JSON object with a single key "tasks" whose value is an array of task objects.

Each task object must have exactly these keys:
- "title": string — short task name, max 10 words, prefixed with the layer e.g. "[Backend]", "[Frontend]", "[Setup]", "[Database]", "[Auth]", "[DevOps]"
- "description": string — the full technical write-up (see format rules below)
- "ai_prompt": string — optional AI assistant prompt, only include when genuinely useful for code generation

FORMAT RULES for "description":
Write the description as a single string using \\n for newlines. Structure it exactly like this:

## Overview
1-2 sentences on what this task is and why it exists in the project.

## What You Will Build
Bullet list of the concrete deliverable(s) for this task.

## Technical Requirements
Detailed bullet list of requirements. Be specific:
- For frontend tasks: include pages and component structure, props, state, validation rules, UI behavior, accessibility notes, and which API endpoints to call.
- For backend tasks: include route method + path, controller logic, middleware, error cases, and HTTP status codes to return.
- For database/model tasks: include the full schema with field names, types, constraints, indexes, and relationships to other models.
- For auth tasks: include the strategy, token structure, storage approach, and security considerations.
- For setup/config tasks: include folder structure, config files, environment variables, and tooling.

## Step-by-Step Implementation
Numbered steps walking the developer through building this task from scratch. Each step should be a full sentence with enough detail that a junior developer can follow without guessing.

## Definition of Done
Short checklist: how the developer knows this task is complete and working correctly.`,
      },
      {
        role: "user",
        content: `Generate 14 to 20 ordered development tasks to build this project from scratch, following a logical implementation order (setup → backend models → backend routes → frontend pages → integration → testing → deployment).

Project Details:
- Title: ${title}
- Description: ${description || "No description provided."}
- Frontend: ${frontend}
- Backend: ${backend}

Important:
- Treat each task as a guided learning unit, not just a to-do item.
- Be technically precise and specific to the ${frontend} + ${backend} stack.
- Cover: project setup, environment config, database models, authentication, core API routes, frontend pages/components, state management, API integration, error handling, and deployment.
- The "ai_prompt" field is optional — only include it when a coding assistant prompt would meaningfully accelerate implementation (e.g. boilerplate generation, complex logic). Leave it as an empty string "" otherwise.`,
      },
    ],
    temperature: 0.3,
    max_tokens: 8000,
  });

  let tasks;
  try {
    const raw = completion.choices[0].message.content;
    const parsed = JSON.parse(raw);
    tasks = parsed.tasks;
  } catch {
    console.error(
      "AI returned non-JSON:",
      completion.choices[0].message.content,
    );
    throw new Error("AI returned an unexpected response. Please try again.");
  }

  return tasks;
}

/**
 * Main export: generates a full board with 5 lists and AI-generated cards under "Todo".
 * @param {object} params - { title, description, frontend, backend, ownerId }
 * @returns {object} - The created board with populated lists and cards
 */
export async function generateBoardWithTemplate({
  title,
  description,
  frontend,
  backend,
  ownerId,
}) {
  // 1. Generate tasks from AI
  const tasks = await generateTasksFromAI({
    title,
    description,
    frontend,
    backend,
  });

  // 2. Create the board
  const board = await Board.create({
    title,
    owner: ownerId,
    status: "active",
  });

  // 3. Create the 5 lists in order
  const lists = await Promise.all(
    LIST_TITLES.map((listTitle, index) =>
      List.create({
        title: listTitle,
        board: board._id,
        order: index,
        status: "active",
      }),
    ),
  );

  // 4. Find the "Todo" list (index 0)
  const todoList = lists[0];

  // 5. Create cards under Todo with AI-generated tasks
  const cards = await Promise.all(
    tasks.map((task, index) => {
      const aiSection = task.ai_prompt
        ? `\n\n---\n\n> 💡 **Optional AI Prompt:** ${task.ai_prompt}`
        : "";

      return Card.create({
        title: task.title,
        description: `${task.description}${aiSection}`,
        list: todoList._id,
        order: index,
        status: "active",
      });
    }),
  );

  // 6. Return the full board structure
  const listsWithCards = lists.map((list) => ({
    ...list.toObject(),
    cards:
      list._id.toString() === todoList._id.toString()
        ? cards.map((c) => c.toObject())
        : [],
  }));

  return {
    board: board.toObject(),
    lists: listsWithCards,
  };
}
