import React from "react";

function Auth() {
  const  handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const user = {};

      for (let entry of formData.entries()) {
                  user[entry[0]] = entry[1]
              }
      return user;
    }
    return (
       <form onSubmit={(event)=>handleSubmit(event)}>
           <input type="text" placeholder="Login" name="login"/>
           <input type="text" placeholder="Password" name="password"/>
           <button>Send</button>
       </form>
    );
}

export default Auth;