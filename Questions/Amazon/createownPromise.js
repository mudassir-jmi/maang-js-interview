
/*

Can you implement a MyPromise Class by yourself?
At least it should match following requirements
new promise: new MyPromise((resolve, reject) => {})
chaining : MyPromise.prototype.then() then handlers should be called asynchronously
rejection handler: MyPromise.prototype.catch()
static methods: MyPromise.resolve(), MyPromise.reject().
This is a challenging problem. Recommend you read about Promise thoroughly first.

*/

class MyPromise {
    constructor(executor) {
      this.state = "pending"; // Initial state
      this.value = undefined; // Resolved value or rejection reason
      this.handlers = []; // To store then/catch handlers
  
      const resolve = (value) => {
        this.updateState("fulfilled", value);
      };
  
      const reject = (reason) => {
        this.updateState("rejected", reason);
      };
  
      try {
        executor(resolve, reject);
      } catch (error) {
        reject(error);
      }
    }
  
    updateState(state, value) {
      if (this.state !== "pending") return; // State can only change once
      this.state = state;
      this.value = value;
      this.executeHandlers();
    }
  
    executeHandlers() {
      if (this.state === "pending") return; // Execute only if settled
      this.handlers.forEach(({ onFulfilled, onRejected, resolve, reject }) => {
        try {
          if (this.state === "fulfilled") {
            if (onFulfilled) {
              resolve(onFulfilled(this.value));
            } else {
              resolve(this.value);
            }
          } else {
            if (onRejected) {
              resolve(onRejected(this.value));
            } else {
              reject(this.value);
            }
          }
        } catch (error) {
          reject(error);
        }
      });
      this.handlers = []; // Clear handlers after execution
    }
  
    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
        this.handlers.push({
          onFulfilled,
          onRejected,
          resolve,
          reject,
        });
        if (this.state !== "pending") {
          this.executeHandlers();
        }
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
  
  // Example Usage:
  const myPromise = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve("Success!"), 1000);
  });
  
  myPromise
    .then((value) => {
      console.log("Resolved with:", value);
      return "Next Value";
    })
    .then((nextValue) => {
      console.log("Chained with:", nextValue);
    })
    .catch((error) => {
      console.error("Caught error:", error);
    });
  
  MyPromise.resolve("Immediate Value").then((value) => console.log(value));
  MyPromise.reject("Rejected Reason").catch((reason) => console.error(reason));
  
  