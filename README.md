# 🚀 Funkey Assessment Project Setup 

## 🛠 Tech Stack

- **Next.js** — React Framework  
- **TypeScript** — TypeSafety  
- **Tailwind CSS** — Utility-First CSS Framework  
- **Prisma** — ORM for Database Access  
- **PostgreSQL** — Database  
- **Zod** — Type-safe Validation Library  
- **React Hook Form** — Form Handling  
- **pnpm** — Package Manager  

---

## 📦 Project Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

---

### 2. Configure Environment Variables

Create a `.env` file in the project root and add your PostgreSQL connection details:

```ini
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/mydatabase"
```

**Note:**  
- Replace `postgres` with your PostgreSQL username if different  
- Replace `mysecretpassword` with your actual password  
- Replace `mydatabase` with your actual database name  

---

### 3. Prisma Setup

Generate Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

---

### 4. Start the Development Server

```bash
pnpm run dev
```

The application will be running at: [http://localhost:3000](http://localhost:3000)


## 📂 Project Structure

```
/prisma         # Prisma schema & migrations  
/app            # Next.js pages  
/components     # Reusable UI components  
/features       # Application features
/utils          # Utility functions  
```

---



