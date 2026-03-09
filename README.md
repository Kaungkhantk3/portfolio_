# Full-Stack Developer Portfolio

Personal portfolio website built to showcase my projects, technical skills, and experience as a **Full-Stack Developer**.

This project was also created to experiment with **CI/CD workflows**, automated builds, and modern frontend deployment pipelines.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Tooling
- ESLint
- GitHub Actions (CI)
- Vercel (CD)

---

## CI/CD Pipeline

This project includes a simple **CI/CD pipeline** to automate code validation and deployment.

### Continuous Integration (CI)

CI is handled using **GitHub Actions**.

Every push to the repository triggers automated checks:

- Install dependencies
- Run ESLint
- Build the project

Workflow:
Push to GitHub
-->
GitHub Actions runs
-->
Install dependencies
-->
Run ESLint
-->
Build project


This ensures the project builds successfully and maintains code quality before deployment.

---

### Continuous Deployment (CD)

Deployment is handled automatically by **Vercel**.

Whenever new code is pushed to the main branch:
Push to GitHub
-->
GitHub Actions checks build
-->
Vercel detects repository change
-->
Project automatically redeploys
-->
Live portfolio updates


This setup enables fast iteration and continuous delivery.

---

## Purpose of this Project

The goals of this portfolio are:

- Showcase my **full-stack development projects**
- Demonstrate **modern frontend architecture**
- Practice **CI/CD automation workflows**
- Deploy a production-ready portfolio for recruiters

---

## Live Website

Portfolio is deployed on Vercel.

https://portfolio-kaung-khant-kyaw.vercel.app/


---
## Author

Kaung Khant Kyaw

