# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🎓 SeniorSays

> **Bridging the gap between Campus Seniors and Juniors.** > An open-source interview experience and resume repository built with React and Appwrite.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Appwrite](https://img.shields.io/badge/Backend-Appwrite-f02e65?logo=appwrite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## 📖 Overview

**SeniorSays** is a community-driven platform designed to democratize placement preparation. It connects "Juniors" (Consumers) with "Seniors" (Contributors). Seniors share their detailed interview journeys, outcome statuses, and resumes, while Juniors can filter through these experiences to prepare for specific companies and roles.

The application features a sleek **Dark Mode** UI, a rich text editor for writing stories, and secure resume downloads.

---

## ✨ Key Features

### 1. 👥 Role-Based Access
* **Juniors (Guests/Users):** Can view the dashboard and summaries. Must log in to read full stories or download resumes.
* **Seniors (Contributors):** Can create posts, upload resumes (PDF), and manage their own content.
* **Admin (Moderator):** "Super Admin" logic implemented to allow specific users (developers) to moderate/delete any content.

### 2. 📊 Data-Rich Dashboard
* **Stats Counter:** Real-time display of Total Experiences, Companies Covered, and Resumes Available.
* **Smart Filtering:** Filter experiences by Company (TCS, Microsoft, etc.) and Role (SDE, Analyst, HR).
* **Status Badges:** Visual indicators for "Selected" (Green), "Rejected" (Red), and Difficulty Ratings (1-5 stars).

### 3. 📝 The "Share Experience" Workflow
* **Rich Text Editor (TinyMCE):** formatting support for code snippets, bold text, and lists.
* **Custom Metadata:** Fields for Company Name, Role Type (Intern/Full Time), and Outcome.
* **Resume Storage:** Integrated file upload for resumes (.pdf, .jpg) via Appwrite Storage.

---

## 🛠️ Tech Stack

**Frontend:**
* [React.js](https://reactjs.org/) - UI Library
* [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
* [React Router](https://reactrouter.com/) - Navigation
* [Tailwind CSS](https://tailwindcss.com/) - Styling (Dark Theme)
* [TinyMCE](https://www.tiny.cloud/) - Rich Text Editor
* [React Hook Form](https://react-hook-form.com/) - Form Handling

**Backend (BaaS):**
* [Appwrite](https://appwrite.io/) - Auth, Database, and Storage buckets.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* An Appwrite Cloud account (or self-hosted instance)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/seniorsays.git](https://github.com/your-username/seniorsays.git)
    cd seniorsays
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory. Add your Appwrite credentials:
    ```env
    VITE_APPWRITE_URL="[https://cloud.appwrite.io/v1](https://cloud.appwrite.io/v1)"
    VITE_APPWRITE_PROJECT_ID="your_project_id"
    VITE_APPWRITE_DATABASE_ID="your_database_id"
    VITE_APPWRITE_COLLECTION_ID="your_collection_id"
    VITE_APPWRITE_BUCKET_ID="your_bucket_id"
    ```

4.  **Run the Project**
    ```bash
    npm run dev
    ```

---

## 🗄️ Database Schema (Appwrite)

To replicate this project, set up your Appwrite Database Collection with the following attributes:

| Attribute Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | Yes | Title of the post |
| `slug` | String | Yes | Unique ID for URL |
| `content` | String | Yes | HTML content from RTE |
| `companyName` | String | Yes | e.g., Amazon, Wipro |
| `roleType` | String | Yes | Internship / Full Time |
| `status` | String | Yes | Selected / Rejected |
| `difficulty` | Integer| Yes | 1 to 5 |
| `featuredImage`| String | Yes | File ID for the Resume (PDF) |
| `userId` | String | Yes | ID of the author |

---

## 👮 Admin & Moderation Logic

The application uses a dual-layer moderation system:

1.  **Owner Logic:** Standard users can only `Edit` or `Delete` posts they created.
2.  **Super Admin Logic:**
    A constant `ADMIN_EMAIL` is defined in the configuration. If the logged-in user matches this email, they bypass ownership checks and can delete *any* post (useful for spam removal).

    ```javascript
    // Logic Snippet
    const isAuthor = userData.$id === post.userId;
    const isAdmin = userData.email === conf.adminEmail;

    if (isAuthor || isAdmin) {
        <DeleteButton />
    }
    ```

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for the College Community</p>

