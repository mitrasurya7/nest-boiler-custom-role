# 🚀 Nest BoilerPlate with Custom Role

Welcome to the **Nest Boilerplate with Custom Role**! This boilerplate is designed to streamline backend development for products that require advanced role-based access control (RBAC) using **NestJS** and **TypeORM**.

---

## 🔍 **Product Vision**

This boilerplate is built with a focus on **Product Thinking**, providing scalable and maintainable solutions for backend development. Whether you’re creating a small API or a complex enterprise-grade application, this guide will help you adopt best practices for developing robust backend systems.

---

## 🛠️ **Tech Stack**

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM (Object-Relational Mapper) for working with databases seamlessly.
- **Postgresql**: A Database relations for scalable database

---

## 📖 **Features**

1. **Modular Structure**  
   Organize your project into feature-specific modules for maintainability.
   
2. **Role-Based Access Control (RBAC)**  
   Handle custom roles effortlessly for secure access to application resources.
   
3. **Database Migrations**  
   Easily manage schema changes with TypeORM migrations.

---

## 🚀 **Quick Start**

Follow these steps to get started with the boilerplate:

### 1️⃣ Generate a New Module
```bash
nest g module <module_name>
```
Creates a new module to logically group related features.

### 2️⃣ Create a Controller
```bash
nest g controller <module_name>
```
Generates a controller for handling incoming requests.

### 3️⃣ Add a Service
```bash
nest g service <module_name>
```
Creates a service for the business logic and data handling.

****


## 🗄️ Database Migrations

### Generate a New Migrations
```bash
npm run migration:generate -- src/database/migrations/InitTable
```
Creates a migration file based on the current database schema changes.

### Create a Custom Migration
```bash
npm run migration:create -- src/database/migrations/CreateUsersTable.ts
```
 Generates a blank migration file to define a new table or custom changes.


****


## 🤝 Contributing

 1. Fork this repository and clone it locally.
 2. Create a new branch for your feature or bug fix.
 3. Push your changes and submit a pull request!


****

## 🌟 Stay Connected

For updates, feedback, or queries, feel free to reach out! Let’s build amazing products together. 💻🚀