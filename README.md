# 🚀 Simple Full-Stack App with Next.js and NextAuth

## 📝 Introduction
This is a small full-stack app created for learning purposes. It is built with **Next.js**, **React.js**, **MongoDB**, and **CSS Modules**. The app allows users to:
- Sign up
- Log in
- Log out
- Change their password

## 🛠️ Tech Stack
- **Next.js**: To build this full-stack application.
- **React.js**: For the frontend due to its focus on building interactive user interfaces.
- **CSS Modules**: For modular and scoped styling.
- **MongoDB**: As the database to store user data.
- **NextAuth**: For authentication and session management.
- **Sonner**: To show interactive notifications.

---

## ⚙️ The Process 

### 1. 🔑 User Signup
- **Backend**:
  1. Check if the user already exists in the database.
  2. Encrypt the user's password using **bcrypt**, a library for securely hashing passwords.
  3. Save the user's data to the database.
  4. Handle all potential errors using `try-catch` blocks and account for edge cases.

- **Frontend**:
  1. Created a signup form component.
  2. Integrated the signup API using the `fetch` method (no axios due to app simplicity).
  3. Displayed success and error notifications using **Sonner**.

### 2. 🔓 User Login
- Used the `signIn` method provided by **NextAuth** to authenticate users easily.
- Automatically redirected users to the `/profile` page after successful login.

### 3. 🔒 Protected Routes
- **Protected Pages**:
  - If a user is logged in, they cannot visit the login or signup pages.
  - If a user is not logged in, they cannot access protected routes (like `/profile`).
- Used the session status to determine access and redirect unauthenticated users.

### 4. 📝 Profile Page
- Users can change their password from this page.

#### Backend:
1. Verified the user's email.
2. Checked if the current password matches the stored hashed password.
3. Updated the password with a new encrypted one if valid.
4. Handled errors such as:
   - User not found.
   - Incorrect HTTP method.
   - Unauthenticated requests.

#### Frontend:
1. Created a form to accept the new password.
2. Sent a `PATCH` request to the `/change-password` API.
3. Displayed appropriate success or error messages.

### 5. 🚪 User Logout
- Used the `signOut` method provided by **NextAuth** for easy logout functionality.

---

## 🔍 Authentication with NextAuth

### 🌟 How NextAuth Works
NextAuth simplifies authentication in Next.js by providing a framework to handle user sessions and secure routes. It supports multiple authentication strategies, such as credentials, OAuth providers (Google, GitHub), and JWT.

### Key Concepts
#### 🔐 **JWT (JSON Web Token)**:
- JWT is a secure way to transfer data between parties.
- It consists of three parts: Header, Payload, and Signature.
  - **Header**: Contains the algorithm and token type.
  - **Payload**: Holds user information (like user ID, email, etc.).
  - **Signature**: Ensures the token wasn’t tampered with.
- NextAuth uses JWT for stateless session management.

#### 🗂️ **Session**:
- A session is a way to store information about the authenticated user during their visit.
- NextAuth manages session data automatically, but you can also access it with `getSession` or the `useSession` hook.

### 🔧 What did I learn
#### `[...nextauth].js`:
- This file configures NextAuth for the app.
- Includes options such as:
  - **Providers**: Define how users authenticate (e.g., credentials, Google, etc.).
  - **Callbacks**: Customize how tokens and sessions are handled.
- **Use Case**: Configured a credentials provider to log users in with their email and password.

#### 🖋️ `signIn()` Method:
- Logs a user in by sending their email and password to the server.
- **Parameters**:
  - `redirect`: If `true`, shows a default error page on failure. If `false`, you can handle errors in your UI.

#### 🔄 `getSession()` Method:
- Fetches the session data for the logged-in user.
- Useful for showing loading states while checking authentication.

#### 🌐 `SessionProvider`:
- Wraps the app to provide session data across all pages.
- Makes it easier to access the current user session with the `useSession` hook.

#### 🪝 `useSession` Hook:
- Returns the current session and its status (`authenticated`, `unauthenticated`, or `loading`).
- Example Use Case: Hide the login button if the user is already logged in.

#### 💾 `getServerSideProps`:
- Fetch data on the server before rendering the page.
- Use Case: On the Profile page, continuously check the session and redirect unauthenticated users to the login page.

---

## 🎓 Learning Outcomes
1. Improved understanding of backend development with Next.js.
2. Learned to implement authentication using NextAuth.
3. Understood concepts like JWT, sessions, and secure route protection.

---

## 🚀 Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/rumaisanaveed/next-auth.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

Happy coding and learning! 🎉
