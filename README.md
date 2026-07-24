# Ameeffy Portfolio — Enhanced Edition

A responsive React + Vite portfolio for Ar-Ameeff M. Adjarail.

## Design upgrades

- Premium dark and light themes
- Animated hero with pointer-based depth effect
- Scroll reveal animations and progress indicator
- Responsive mobile navigation
- Glassmorphism cards and bento-style layouts
- Redesigned About, Journal, Education, Skills, Projects, Certificates, and Contact sections
- Accessible reduced-motion support
- Functional contact form that opens the visitor's email app
- Cleaner project links, metadata, and page structure

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, normally `http://localhost:5173`.

## Production check

```bash
npm run build
npm run preview
```

## Push this version to the existing GitHub repository

The safest method is to clone the repository first, then copy the enhanced files into the cloned folder.

```bash
git clone https://github.com/Ameeffy/Ameeff-portfolio.git
cd Ameeff-portfolio
```

Delete the old project files inside the cloned folder **but keep the hidden `.git` folder**. Copy all enhanced portfolio files into it, then run:

```bash
npm install
npm run build
git status
git add .
git commit -m "Redesign portfolio with premium responsive UI"
git push origin main
```

### Clone alternatives

Use only one of these:

```bash
# HTTPS
git clone https://github.com/Ameeffy/Ameeff-portfolio.git

# SSH — requires an SSH key connected to GitHub
git clone git@github.com:Ameeffy/Ameeff-portfolio.git

# GitHub CLI — requires GitHub CLI and gh auth login
gh repo clone Ameeffy/Ameeff-portfolio
```

### Fix the remote URL when needed

```bash
git remote -v
git remote set-url origin https://github.com/Ameeffy/Ameeff-portfolio.git
git remote -v
```
