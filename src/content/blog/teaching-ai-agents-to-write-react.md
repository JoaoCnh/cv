---
title: 'Teaching AI agents to write React'
description: "I wrote a skill that tells AI agents how I want React components written. Here's what's in it and why."
pubDate: '2026-09-16'
heroImage: '../../assets/blog-teaching-ai-agents-to-write-react.png'
---

Ask an AI agent to create some React code and it'll work, but their standards are really low to what could be considered organised and efficient code.

You'll generate some code, open up a pull request and you'll see the same things every time. Outdated type usage (`React.FC`), misusage of `useEffect`, over-reliance on `useMemo` and `useCallback`, a11y and html semantic tragedies, performance nightmares and the list can go on an on.

Some of these are issues you would catch immediately, you'd find them after some time and that could mean an entire rewrite is in order because fixing stuff is just too time consuming.

I need my efficiency to be boosted by setting simple standards of code quality an agent can follow. The result is [create-react-component](https://github.com/JoaoCnh/create-react-component), an open source agent skill that makes an agent write React + TypeScript components and hooks the way I would.

## What is a skill?

A skill is a folder with a `SKILL.md` file in it. It often has a name, description and a list of instructions for agents. The agent will read the description and if your request matches, it will load the rest. This is useful to not bloat a session.

The one I created is built from what I've seen developers ask agents: "create a X component", "add a Y hook", etc. I mostly use it for scaffolding and geetting jump-started quickly. I never trust the generated logic and you shouldn't either, you'll thank me later eventually.

Installing it is easy with one command and it works with any agent that understands `SKILL.md` files:

```bash
npx skills add joaocnh/create-react-component
```

## Respect your surroundings

This is extremely important. Before writing anything, the agent should go and look at the project it's working on. Since it's based in Typescript React, it should first look at the `tsconfig.json` file, see where component files are located and what naming conventions are used, which test runner is being used and check the React version.
If the project already has an opinion, the agent should respect it.

## The rules

The rules I went with are some basic rules I like to follow. Most of them don't act on the actual contents of the component because that is going to be adjusted on a component by component basis.

No `React.FC` Named export, props type exported as `ComponentNameProps`, wrap native elements properly.

```tsx
import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

export const Button = ({ type = 'button', ...props }: ButtonProps) => {
  return <button type={type} {...props} />;
};
```

State can often be derived and does not need syncing. It's 2026, almost 2027 and we still see AIs do this.

```tsx
// a second piece of state that has to be kept in sync by hand
const [todos, setTodos] = useState<Todo[]>([]);
const [openCount, setOpenCount] = useState(0);

useEffect(() => {
  setOpenCount(todos.filter((todo) => !todo.done).length);
}, [todos]);

// or just compute it
const openCount = todos.filter((todo) => !todo.done).length;
```

`useMemo` and `useCallback`, even before the compiler, caused more issues than they solved. They were crutches for bad React code and were really only useful on some select cases. Most people do not know how to use them and so AIs can't either. My agents do not use them. [This is a useful read](https://react.dev/learn/you-might-not-need-an-effect).

## Make it yours

All the rules live in one [`SKILL.md`](https://github.com/JoaoCnh/create-react-component/blob/main/SKILL.md). If your team prefers `interface` over `type`, lays out folders differently or has a styling setup to encode, edit the file. That's the whole point: it's a style guide the agent actually reads.

It's MIT licensed at [github.com/JoaoCnh/create-react-component](https://github.com/JoaoCnh/create-react-component). If it generates something you wouldn't approve in review, tell me, because that's the next rule.
