---
sidebar_position: 1
sidebar_label: Create a Todo App
title: Bitloops Tutorial - Create a Todo App using Bitloops
description: Learn how to build a Todo app quickly and efficiently using Bitloops. You'll learn how to apply industry best practices and software design principles that lead to high-quality software
keywords:
  [
    bitloops,
    bitloops tutorial,
    todo app,
    learning programming,
    learning coding,
    software development,
    better programming,
  ]
---

# Create a Todo App

Creating a Todo App as example

## Project structure

BL needs an input folder with a setup.bl file and the essential bl files which will be transpiled.

The structure of the input folder must be as the following:

```
📦 .
 ┣ 📂To Do App                # Bounded Context Name
 ┃ ┗ 📂To Do                  # Module Name
 ┃ ┃ ┗ 📂 ...                 # Folders and files with your bl syntax
 ┗ 📜setup.bl

```

### setup.bl file

Setup file must be located in the root directory of the input folder.

#### Format

##### Language configuration

Configure which language the bl will be transpiled to.
Fow now, only TypeScript-Nest is supported and it is selected by default.  
More languages to follow.

```
Config.setLanguage(TypeScript-Nest);
```
