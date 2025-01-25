class MyPromise {
    constructor(executor) {
      this.state = "pending"; // Can be 'pending', 'fulfilled', or 'rejected'
      this.value = undefined; // The resolved value or rejection reason
      this.handlers = []; // Stores then/catch handlers
  
      const resolve = (value) => {
        if (this.state !== "pending") return;
        this.state = "fulfilled";
        this.value = value;
        this.handlers.forEach(this.handle.bind(this));
      };
  
      const reject = (reason) => {
        if (this.state !== "pending") return;
        this.state = "rejected";
        this.value = reason;
        this.handlers.forEach(this.handle.bind(this));
      };
  
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    handle(handler) {
      if (this.state === "fulfilled") {
        if (handler.onFulfilled) {
          setTimeout(() => {
            try {
              handler.resolve(handler.onFulfilled(this.value));
            } catch (error) {
              handler.reject(error);
            }
          }, 0);
        } else {
          handler.resolve(this.value);
        }
      } else if (this.state === "rejected") {
        if (handler.onRejected) {
          setTimeout(() => {
            try {
              handler.resolve(handler.onRejected(this.value));
            } catch (error) {
              handler.reject(error);
            }
          }, 0);
        } else {
          handler.reject(this.value);
        }
      } else {
        this.handlers.push(handler);
      }
    }
  
    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        this.handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve,
          reject,
        });
      });
    }
  
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  
    static resolve(value) {
      return new MyPromise((resolve) => resolve(value));
    }
  
    static reject(reason) {
      return new MyPromise((_, reject) => reject(reason));
    }
  }
  
  // Example Usage
  const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
  });
  
  promise
    .then((value) => {
      console.log("Resolved with:", value);
      return "Another success";
    })
    .then((value) => console.log("Chained with:", value))
    .catch((error) => console.error("Error:", error));
  
  const rejectedPromise = MyPromise.reject("Immediate rejection");
  rejectedPromise.catch((error) => console.error("Caught rejection:", error));
  