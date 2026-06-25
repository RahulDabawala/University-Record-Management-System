# Git Workflow Guide

This guide explains the recommended Git workflow for contributing to the **University Record Management System** project.

---

# 1. Clone the Repository

Clone the repository from GitHub:

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd University-Record-Management-System
```

---

# 2. Check the Current Branch

To see which branch you are currently on:

```bash
git branch
```

The active branch will be marked with `*`.

---

# 3. Update the Main Branch

Before starting new work, ensure your local `main` branch is up to date:

```bash
git checkout main
git pull origin main
```

---

# 4. Create a Feature Branch

Do **not** work directly on the `main` branch.

Create a feature branch for the task you are working on:

```bash
git checkout -b feature/<short-description>
```

Examples:

```bash
git checkout -b feature/database-schema
git checkout -b feature/student-queries
git checkout -b feature/gui
git checkout -b feature/testing
git checkout -b docs/report
```

---

# 5. Make Your Changes

Complete your work on your feature branch.

Check which files have changed at any time using:

```bash
git status
```

---

# 6. Commit Your Changes

Stage your changes:

```bash
git add .
```

Commit using a short, descriptive message:

```bash
git commit -m "Create initial database schema"
```

Other examples:

* Add student enrolment queries
* Implement MySQL connection
* Add GUI layout
* Update report documentation

---

# 7. Push Your Branch

Push your feature branch to GitHub:

```bash
git push origin feature/<short-description>
```

Example:

```bash
git push origin feature/database-schema
```

---

# 8. Create a Pull Request

Once your work is complete:

1. Push your branch to GitHub.
2. Open the repository on GitHub.
3. Click **Compare & pull request**.
4. Provide a short description of your changes.
5. Create the Pull Request to merge into the **main** branch.

---

# Good Practices

* Pull the latest version of `main` before starting work.
* Use a separate branch for each feature or task.
* Keep commits small and focused.
* Write clear commit messages.
* Test your work before creating a Pull Request.
* If you are unsure about a Git command, ask the team before using commands such as `git reset`, `git rebase`, or `git push --force`.

---

# Branch Structure

The project uses the following branch structure:

```text
main
├── feature/database-schema
├── feature/student-queries
├── feature/gui
├── feature/testing
└── docs/report
```

* **main** – The primary branch containing the latest stable version of the project.
* **feature/*** – Individual branches used for developing specific features or tasks.
