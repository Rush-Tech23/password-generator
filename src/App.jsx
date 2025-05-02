import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passWordGenerator();
  }, [length, numberAllowed, charAllowed, passWordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-lg shadow-xl rounded-2xl px-6 py-8 text-orange-400 bg-gray-700 backdrop-blur-lg"
      >
        <h1 className="text-4xl text-center text-white font-bold mb-6">
          Password Generator 🔐
        </h1>

        <div className="flex items-center shadow-inner rounded-md overflow-hidden bg-white mb-6">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="outline-none px-4 py-3 w-full text-gray-800 text-lg font-mono"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 hover:bg-blue-800 transition px-4 py-3 text-white font-semibold"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </motion.button>
        </div>

        <div className="flex flex-col gap-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <label htmlFor="lengthRange" className="text-lg font-medium">
              Length: <span className="text-orange-400">{length}</span>
            </label>
            <input
              id="lengthRange"
              type="range"
              min={8}
              max={50}
              value={length}
              className="cursor-pointer w-2/3 accent-orange-400"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="accent-orange-400"
            />
            <label htmlFor="numberInput" className="text-md">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-orange-400"
            />
            <label htmlFor="characterInput" className="text-md">
              Include Special Characters
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
