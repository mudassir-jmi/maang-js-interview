# MAANG JavaScript Interview Questions

Welcome to the **MAANG JavaScript Interview Questions** repository! This repo contains thoughtfully crafted JavaScript coding challenges to help you prepare for interviews with top-tier tech companies like Meta, Amazon, Apple, Netflix, and Google (MAANG). Dive into these questions to sharpen your problem-solving skills and understand critical JavaScript concepts.

## 📚 What's Inside?

### 1. **Fetch with Auto Retry**
- **Problem**: Handle API call failures due to network issues by automatically retrying the fetch request.
- **Solution**: Implement a `fetchWithAutoRetry(fetcher, count)` function that retries a fetch request until the maximum retry count is reached.

### 2. **Custom Promise Implementation**
- **Problem**: Understand how Promises work under the hood by implementing your own `MyPromise` class.
- **Solution**:
  - Create a class `MyPromise` supporting the following features:
    - `then()` for chaining.
    - `catch()` for handling rejections.
    - Static methods: `MyPromise.resolve()` and `MyPromise.reject()`.
  - Ensure `then` and `catch` handlers execute asynchronously.

## 🚀 Quick Start

To try these solutions locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/mudassir-jmi/maang-js-interview
   ```

2. Navigate to the project directory:
   ```bash
   cd maang-js-interview
   ```

3. Open the code in your favorite editor:
   ```bash
   code .
   ```

4. Run the examples:
   - Use Node.js to execute the files:
     ```bash
     node fetchWithAutoRetry.js
     ```

## 📁 File Structure

```
maang-js-interview/
Amazon/
```

## 🛠️ Key Features

- **Practical Problems**: Questions designed to simulate real-world challenges.
- **Detailed Solutions**: Clear and concise implementations for better understanding.
- **Scalable Code**: Solutions that follow best practices and handle edge cases.

## 💡 Why These Questions?

These challenges focus on core JavaScript concepts like:
- Handling asynchronous operations with Promises.
- Understanding promise chaining and error handling.
- Implementing retry logic for robust API calls.

Preparing these types of problems will not only help you ace interviews but also deepen your understanding of JavaScript.

## 📄 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code.

---

Happy Coding! ✨

