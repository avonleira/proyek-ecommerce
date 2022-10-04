import { useState } from 'react';
import dynamic from 'next/dynamic'
// import JoditReact from "jodit-react-ts"

import MainLayout from "../layouts/main/MainLayout"

const JoditReact = dynamic(() => import("jodit-react-ts"), {
  ssr: false
})

function TextEditor() {
  const [value, setValue] = useState<string>();
  
  return (
    <MainLayout>
      <section className="my-container py-8">
        <div className="mb-2">
          <JoditReact onChange={(content) => setValue(content)} config={{ placeholder: "Rich Text Editor Test Page..." }} defaultValue="" />
        </div>
        <div className="prose">
          {value}
        </div>
      </section>
    </MainLayout>
  )
}

export default TextEditor