import React from 'react'
import { useActionState } from 'react'

const CodeExplainForm = () => {
  return (
    <div className='w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg'>
        <form>
            <label className="block mb-2 semibold">
                Language:
            </label>
            <select name="language" className="border rounded-lg p-2 w-full mb-4 bg-transparent">
                <option value="javascript">Javascript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
            </select>

            <label className="block mb-2 font-semibold">
                Your Code:
            </label>
            <textarea
                name="code"
                required
                placeholder = "Paste your code here..."
                classname = "border rounded-lg w-full p-3 font-mono text-sm bg-transparent mini-h-[150px]" />
            {/* </textarea> */}
            <button 
            type = "submit"
            className='mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50'
            >Explain Code 
            </button>
        </form>
    </div>
  )
}

export default CodeExplainForm