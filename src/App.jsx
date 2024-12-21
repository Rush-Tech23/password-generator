
import { useState, useCallback, useEffect, useRef  } from "react"


function App() {
 const [length, setLength] = useState(8);
 const [numberAllowed, setNumberAllowed] = useState(false);
 const [charAllowed, setCharAllowed] = useState(false);
const [password, setPassword] = useState ("");

const passwordRef = useRef(null)

const passWordGenerator= useCallback(()=>{
  let pass = ""
  let str = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  
  if (numberAllowed) str += "0123456789";
  if (charAllowed) str += "!@#$%^&*";
  for (let i =1; i < length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
   pass += str.charAt(char)
  }
 setPassword(pass)
} ,[length, numberAllowed, charAllowed, setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password)
},[ password])

useEffect(()=>{
passWordGenerator()
},[length, numberAllowed, charAllowed, passWordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-4 py-4 my-8 text-orange-400 bg-gray-600">
        <h1 className="text-4xl text-center text-white mb-4">Password Generator</h1>
        <div className="flex shadow overflow-hidden mb-4">
          <input
          placeholder="Password"
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="outline-none py-3 px-4 w-full rounded-md"
          />
          <button className="bg-blue-700 px-3 py-2 text-white rounded-md  hover:bg-blue-900 " onClick={copyPasswordToClipboard} >Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex text-sm gap-x-1">
        <input
        type="range"
        min={8}
        max={50}
        value={length}
        className="cursor-pointer bg-blue-500" 
        onChange={(e)=>{setLength (e.target.value)}}
        
        />
        <label>Length: {length}</label>
        </div>
        <div className="flex gap-x-1">
          <input
          type="checkbox"
          id="numberInput"
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed ((prev)=> !prev)
          }}
          />
          <label>Numbers</label>

        </div>

        <div className="flex gap-x-1">
          <input
          type="checkbox"
          id="characterInput"
          defaultChecked={charAllowed}
          onChange={()=>{
            setCharAllowed ((prev)=> !prev)
          }}
          />
          <label>Characters</label>

        </div>

        </div>
      </div>
    </>
  );
}

export default App
