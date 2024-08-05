// Middleware functions
const middleware1 = async (req, res, next) => {
    console.log("Middleware 1");
    // Perform some operations
    next(); // Call next to pass control to the next middleware
  };
  
  const middleware2 = async (req, res, next) => {
    console.log("Middleware 2");
    // Perform some operations
    if (someCondition) {
      return res.json({ success: false, msg: "Condition failed" });
    }
    next(); // Call next to pass control to the next middleware
  };
  
  // Handler function
  export async function handler(req) {
    const response = await RunMiddlewares(req, [middleware1, middleware2]);
    return response;
  }
  
  export {handler as GET};
  