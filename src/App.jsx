import { useCallback, useEffect, useRef, useState } from 'react'

// import './App.css'  

function App() {

  const [length, setLength] = useState("6")
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "123456789";
    if (charAllowed) str += "!@#$%^&*()-+={}[]";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordTOClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  
  useEffect(() => {
    passwordGenerator()
  },[length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="w-full max-w-md shadow-md mx-auto rounded-lg px-4 py-3 my-12 bg-gray-700 text-orange-500">
        <h1 className="text-center text-white my-3">Password Generator...</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3 cursor-pointer"
            readOnly
            ref={passwordRef}
            />
          <button onClick={copyPasswordTOClipboard} className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 ">Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
        <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label> length : {length }</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            id="numberInput"
            onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
            />
            <label> Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked = {charAllowed}
            id="numberInput"
            onChange={() => {
            setcharAllowed((prev) => !prev);
            }}
            />
            <label>Charaters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
