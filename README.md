User Service API

Backend-сервис для управления пользователями с авторизацией, ролями и системой блокировки аккаунтов.

Проект реализован на **Express + TypeScript + Prisma + PostgreSQL + JWT**.

---

# Функционал

## Аутентификация

- Регистрация пользователя
- Логин пользователя
- JWT авторизация

## Пользователи

- Получение пользователя по ID
- Получение списка пользователей (только ADMIN)
- Блокировка / разблокировка пользователя

## Система доступа

- Role-based access control (USER / ADMIN)
- Self-access (пользователь может работать со своим аккаунтом)
- Admin access (полный доступ)

---

# Технологии

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- Zod (валидация)
- dotenv

---

# Установка и запуск

## 1. Клонировать проект

```bash
git clone https://github.com/avell37/test-effective
cd test-effective
```

## 2. Установить зависимости

```bash
npm install
```

## 3. Настроить окружение

Создать .env файл:

```bash
DATABASE_URL="your database url here, e.g. postgres://user:password@localhost:5432/mydb?schema=public&sslmode=disable"
JWT_SECRET="your jwt secret here, e.g. a long random string"
PORT=5000
```

## 4. Подготовить Prisma ORM

```bash
npx prisma generate
npx prisma db push
```

## 5. Запуск проекта

```bash
npm run dev
```

---

# Архитектура проекта

src

- controllers/
- services/
- routes/
- middleware/
- validators/
- prisma/
- error/
- types/
- app.ts
- server.ts

# Авторизация

Используется JWT токен, заголовок запроса должен содержать bearer токен.

# Роли

USER:

1. доступ к своему профилю
2. блокировка своего аккаунта

ADMIN:

1. доступ ко всем пользователям
2. блокировка любого пользователя
3. получение списка пользователей

# API Endpoints

## Auth

### Регистрация

- POST /auth/register
- Body:
    ```bash
    {
        "fullName": "John Doe",
        "birthDate": "2000-01-01",
        "email": "john@mail.com",
        "password": "123456"
    }
    ```

### Логин

- POST /auth/login
- Body:

```bash
{
  "email": "john@mail.com",
  "password": "123456"
}
```

- Response:

```bash
{
  "token": "jwt_token"
}
```

## Users

### Получить пользователя по ID

GET /users/:id
(Доступен админу или самому пользователю)

### Получить всех пользователей

GET /users
(Доступен только админу)

### Блокировка / разблокировка пользователя

PATCH /users/:id/block
(Доступен админу или самому пользователю)
