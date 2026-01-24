# Contributing to PostContent

Thank you for your interest in contributing to PostContent! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of experience level, background, or identity.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Give and accept constructive feedback graciously
- Focus on what's best for the community

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory remarks
- Public or private harassment
- Publishing others' private information

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/post-content.git
cd post-content/content-generator
```

### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/slubbles/post-content.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Set Up Environment

```bash
cp .env.example .env.local
```

Add required environment variables (see README.md for details).

### 6. Run Development Server

```bash
npm run dev
```

---

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run the development server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Sync with Upstream

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill out the PR template
- Submit!

---

## 🎨 Code Style

### TypeScript/JavaScript

- **TypeScript**: All new code must be TypeScript
- **Strict Mode**: Enable strict type checking
- **No `any`**: Avoid using `any` type
- **Naming**:
  - Variables/functions: `camelCase`
  - Components: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`
  - Files: `kebab-case.tsx` or `PascalCase.tsx` for components

### React

- **Functional Components**: Use function components with hooks
- **Component Organization**:
  ```typescript
  // 1. Imports
  import { useState } from "react"
  
  // 2. Types/Interfaces
  interface Props { ... }
  
  // 3. Component
  export function MyComponent({ prop }: Props) {
    // 4. Hooks
    const [state, setState] = useState()
    
    // 5. Functions
    const handleClick = () => { ... }
    
    // 6. Effects
    useEffect(() => { ... }, [])
    
    // 7. Render
    return <div>...</div>
  }
  ```

### Styling

- **Tailwind CSS**: Use Tailwind utility classes
- **No Inline Styles**: Avoid inline `style` props
- **Responsive**: Mobile-first approach
- **Dark Mode**: Support dark mode when applicable

### File Organization

```
app/
├── api/              # API routes
├── (auth)/           # Auth pages
└── dashboard/        # Dashboard pages

components/
├── ui/               # Reusable UI components
└── feature-name.tsx  # Feature-specific components

lib/
├── auth.ts           # Auth utilities
├── db.ts             # Database client
└── utils.ts          # General utilities
```

---

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(generate): add thread generation support"

# Bug fix
git commit -m "fix(auth): resolve login redirect issue"

# Documentation
git commit -m "docs: update README with deployment instructions"

# Multiple changes
git commit -m "feat(api): add rate limiting to generation endpoints

- Implement in-memory rate limiting
- Add 10 req/min limit for AI generation
- Return 429 status with Retry-After header"
```

### Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line under 72 characters
- Reference issues: `fixes #123` or `closes #456`

---

## 🔍 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Commit messages follow conventions
- [ ] Branch is up-to-date with `main`
- [ ] No merge conflicts

### PR Template

When opening a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tests pass
```

### Review Process

1. **Automated Checks**: CI/CD runs automatically
2. **Code Review**: Maintainers review your code
3. **Requested Changes**: Make updates if needed
4. **Approval**: PR is approved
5. **Merge**: Maintainer merges to `main`

---

## 🧪 Testing

### Manual Testing

```bash
# Start development server
npm run dev

# Test in browser
open http://localhost:3000
```

### Areas to Test

- **Authentication**: Login, signup, logout
- **Generation**: Create posts, threads, replies
- **History**: View, filter, delete posts
- **Subscription**: Upgrade, cancel, manage
- **Profile**: Update avatar, settings
- **Responsive**: Mobile, tablet, desktop

### Database Testing

```bash
# Open Prisma Studio
npx prisma studio

# Test database queries
# Verify data integrity
```

---

## 🏗️ Project Structure

### Key Directories

- `app/` - Next.js pages and API routes
- `components/` - React components
- `lib/` - Utility functions and configurations
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `types/` - TypeScript type definitions

### Important Files

- `app/layout.tsx` - Root layout
- `lib/auth.ts` - Authentication config
- `lib/db.ts` - Prisma client
- `prisma/schema.prisma` - Database schema
- `tailwind.config.ts` - Tailwind configuration

---

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Update to latest version
3. Reproduce in clean environment

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
Add screenshots if applicable

**Environment**
- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 1.0.0]
```

---

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check existing feature requests
2. Describe the problem it solves
3. Provide example use cases
4. Suggest implementation if possible

---

## 📞 Getting Help

- **Documentation**: [postcontent.io/docs](https://postcontent.io/docs)
- **GitHub Issues**: [Ask a question](https://github.com/slubbles/post-content/issues)
- **Email**: dev@postcontent.io

---

## 🎉 Recognition

Contributors are recognized in:
- GitHub contributors page
- Release notes
- About page on website

Thank you for contributing to PostContent! 🚀
