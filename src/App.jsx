import React, { useActionState, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import "./style.css";
import Login from "./components/loginPage";
import Chat from "./components/chatPage";

function App(){
  return (
    <>
    <Chat/>
    
    </>
  );
}

export default App;




















// function App(){
//   const [name,setName]=useState('');
//   function handleName(event){
//     if(event.target.value.length>5){
//       setName("invalid should be less than 5")
//     }
//     else{
//       setName('')
//     }
//   }
//   return (
//     <div>
//       <input type="text" placeholder="name" onChange={handleName} />
//       <span style={{ color: "red" }}>{name}</span>
//       <br />
//       <br />
//       <input type="password" placeholder="password" />
//       <br />
//       <br />
//       <button disabled={name} style={{ color: "blue" }}>submit</button>
//     </div>
//   );
// }


// function App(){
//   useEffect(()=>{
//     call()
//   },[])
//   async function call() {
//     const res=await fetch('https://dummyjson.com/users');
//     const json=await res.json();
//     console.log(json) 
//   } 
//   return (
//     <h1>hello</h1>
//   )
// }
// function App() {
//   return (
//     <BrowserRouter>
//       <Link to="/">hello</Link>
//       <Link to="/b">bye</Link>
//       <Routes>
//         <Route path="/" element={<h1>hello</h1>} />
//         <Route path="/b" element={<h1>bye</h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



// function App(){
//   const [value,changeVal]=useState('')
//   return (
//     <div style={{ backgroundColor: "yellow", padding: 20 }}>
//       <SubjectContext.Provider value={value} >
//         <select onClick={(event)=>changeVal(event.target.value)}>
//           <option value=" ">select</option>
//           <option value="maths">maths</option>
//           <option value="science">science</option>
//           <option value="english">english</option>
//         </select>
//         <h1>class</h1>
//         <Student />
//       </SubjectContext.Provider>
//     </div>
//   );
// }


// const B = styled.button`
//   color: red;
//   background-color: yellow;
//   width: 100px;
//   &:hover {
//     background-color: #222;
//   }
// `;

// function App(){
//   const [name,setName]=useState('');
//   function handle(event){
//     setName(event.target.value)
//   }
//   return (
//     <div>
//     <input type="text" placeholder="name" value={name} onChange={handle} />
//     <h1>name:{name}:{name.length}</h1>
//     </div>)
// }
// function App(){
//   const h = "hello world";
//   const [name, setName] = useState(h);
//     function show() {
//       setName(h);
//     }
//     function hide() {
//       setName("");
//     }
//   return (
//     <div>
//       <h1 style={{ color: "red" }}>see</h1>
//       {name ? <h1>{name}</h1> : null}
//       {!name ? <B onClick={show}>show</B> : null}
//       {name ? <B onClick={hide}>hide</B> : null}
//     </div>
//   );
// }

// function App(){
//   const [count, setCount] = useState(0);

//   function increase() {
//     setCount(count + 1);
//   }
//   function reset() {
//     setCount(count-1);
//   }
//   return (
//     <div>
//       <h1 style={{ color: "blue" }}>count is now : {count}</h1>
//       <br />
//       <h3>increase</h3>
//       <B onClick={increase}>click</B>
//       <h3>decrease</h3>
//       <B onClick={reset}>click</B>
//       <br />
//     </div>
//   );
// }

// function App() {
//   const [name, setName] = useState('');

//   function handleChange(event) {
//     setName(event.target.value);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     alert(name);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="name"
//           id="user"
//           value={name}
//           onChange={handleChange}
//         />
//         <button type="submit">submit</button>
//       </form>
//     </div>
//   );
// }



// function App(){
//   const handler =(event)=>{
//     event.preventDefault()
//     console.log(document.querySelector("#user").value)
//   }
//   return (
//     <div>
//       <form action="" method="post" onSubmit={handler}>
//         <input type="text" placeholder="name" id="user" />
//         <br />
//         <input type="password" placeholder="pass" id="pass" />
//         <br />
//         <button>submit</button>
//       </form>
//     </div>
//   );
// }

// function App(){
//   const [subjcet,change]=useState('c')
//   return (
//     <div>
//       <input type="radio" onChange={(event)=>{change('c')}} value={'c'} name="subjct" id="c" />
//       <label htmlFor="c">c</label>
//       <br />
//       <input type="radio" onChange={(event)=>{change('node')}} value={'node'}  name="subjct" id="node" />
//       <label htmlFor="node">node</label>
//       <h1>subjcet= {subjcet}</h1>
//     </div>
//   );
// }
//CLOCK
// function App(){
//   const [time,setTIme]=useState(0);
//   useEffect(() => {
//    const interval= setInterval(() => {
//       setTIme(new Date().toLocaleTimeString());
//     }, 1000);

//     return ()=> clearInterval(interval)
//   },[]);
//   return(
//     <div>
//       <h1>time:{time}</h1>
//     </div>
//   )
// }

// function App(){
//   const ref = useRef(null);
//   function handler(){
//     ref.current.focus()
//   }
//   return (
//     <div>
//       <h1 className="css">a</h1>
//       <input ref={ref} type="name" placeholder="name" />
//       <br /> 
//       <button onClick={handler}>click</button>
//     </div>
//   );
// }


// function App(){
//   const [a,b]=useState(1)
//   const [c, d] = useState(1);
//   useEffect(()=>{
//     console.log('b')
//   })
//   function call(){
// console.log('a') 
//  }
//   // call()
//   return (
//     <div>
//       <h1>hi</h1>
//       <button onClick={() => b(a + 1)}>a:{a}</button>
//       <button onClick={() => d(c + 1)}>b:{c}</button>
//     </div>
//   );
// }




// function App() {
//   const [a, b] = useState(false); 

//   return ( 
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm text-center">
//         <h2 className="mt-4 text-xl font-bold text-gray-800">Shekhar Pawar</h2>
//         <p className="text-gray-600">Full-Stack Developer</p>

//         <h3 className="mt-2 text-sm text-gray-500">
//           {a ? "Following" : "Not Following"}
//         </h3>

//         <button
//           onClick={() => b(!a)}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//         >
//           {a ? "Unfollow" : "Follow"}
//         </button>
//       </div>
//     </div>
//   );
// }
// function hello() {
//   return "hi";
// }
// function App(){
//   // function hello(){
//   //   return "hieieie"
//   // }
//   const [count,changeCount] = useState(true)
//   [name,setName] = useState('')
//   // const name ="shekhar  "
//   return (
//     <div className="App">
//       {/* <Welcome name={name} /> */}
//         <input type="text" onChange={(event) =>setName(event.target.name) } placeholder="name" />
//         <br />
//       <p>hello {name ? name : "shkhar"}</p>
//       <h1>{hello()}</h1>
//       <br />
//       <button
//         onClick={() => {
//           alert(hello());
//         }}
//       >
//         click
//       </button>
//       <br />
//       <h1>{count}</h1>
//       <button
//         onClick={() => {
//           changeCount(!count);
//         }}
//       >
//         count
//       </button>
//       {count ? <h1>{name}</h1> : null}
//     </div>
//   );
// }