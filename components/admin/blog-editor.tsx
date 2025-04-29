"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Label } from "@/components/ui/label"

// Import Jodit dynamically to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 min-h-[400px] bg-gray-50">Loading editor...</div>,
})

interface BlogEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const editorRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const [editorContent, setEditorContent] = useState(value)

  useEffect(() => {
    setIsMounted(true)
    setEditorContent(value)
  }, [value])

  const handleUpdate = (newContent: string) => {
    setEditorContent(newContent)
    onChange(newContent)
  }

  const config = {
    readonly: false,
    height: 500,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "align",
      "|",
      "ul",
      "ol",
      "|",
      "table",
      "link",
      "image",
      "video",
      "|",
      "hr",
      "eraser",
      "copyformat",
      "|",
      "undo",
      "redo",
      "|",
      "fullsize",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    removeButtons: ["about"],
    disablePlugins: "drag-and-drop-element",
  }

  if (!isMounted) {
    return <div className="border rounded-md p-4 min-h-[400px] bg-gray-50">Loading editor...</div>
  }

  return (
    <div className="space-y-2">
      <Label>Content</Label>
      <JoditEditor ref={editorRef} value={editorContent} config={config} onBlur={handleUpdate} onChange={() => {}} />
    </div>
  )
}
