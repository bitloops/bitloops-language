---
sidebar_position: 1
sidebar_label: Installation
title: Bitloops CLI - How to Install Bitloops
description: This article explains how to install the open source Bitloops CLI and begin using it to build high-quality, robust, flexible and maintainable systems using your favourite AI agent.
keywords:
  [
    bitloops,
    software engineering,
    coding,
    software development,
    AI,
    AI coding,
    AI development,
    claude code,
    cursor,
    gemini,
    opencode,
  ]
---

# Installation

Choose one of the following methods to install the Bitloops CLI.

## Install with curl

On Unix-like systems (Linux, macOS), you can install the CLI using the official install script:

```bash
curl -sL https://bitloops.com/install.sh | bash
```

To uninstall:

```bash
curl -sL https://bitloops.com/install.sh | bash -s -- --uninstall
```

:::tip
Downloading and running scripts from the internet can be a security risk. You may want to [download the script](https://bitloops.com/install.sh) first, review its contents, then run it with `bash install.sh`.
:::

## Install with Homebrew

If you use [Homebrew](https://brew.sh/) on macOS or Linux:

```bash
brew install bitloops
```

If the formula is in a custom tap:

```bash
brew tap bitloops/tap
brew install bitloops
```

## Install with Cargo

If you have [Rust](https://www.rust-lang.org/tools/install) and Cargo installed, you can install the CLI from [crates.io](https://crates.io):

```bash
cargo install bitloops
```

---

After installation, verify by running:

```bash
bitloops --help
```
