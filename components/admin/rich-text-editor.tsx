"use client"

import { useEffect, useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  LinkIcon,
  ImageIcon,
  Code,
  Pilcrow,
  Minus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your content here...",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full mx-auto my-4",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const addLink = () => {
    if (!linkUrl) return

    // Check if the URL has a protocol, if not add https://
    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
    setLinkUrl("")
    setIsLinkPopoverOpen(false)
  }

  const addImage = () => {
    if (!imageUrl) return

    editor?.chain().focus().setImage({ src: imageUrl }).run()
    setImageUrl("")
    setIsImagePopoverOpen(false)
  }

  if (!isMounted) {
    return <div className="border rounded-md p-4 min-h-[400px] bg-gray-50 dark:bg-gray-900">Loading editor...</div>
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="bg-muted/40 p-2 flex flex-wrap gap-1 border-b">
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={cn(editor?.isActive("bold") && "bg-muted")}
        >
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={cn(editor?.isActive("italic") && "bg-muted")}
        >
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(editor?.isActive("heading", { level: 1 }) && "bg-muted")}
        >
          <Heading1 className="h-4 w-4" />
          <span className="sr-only">Heading 1</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(editor?.isActive("heading", { level: 2 }) && "bg-muted")}
        >
          <Heading2 className="h-4 w-4" />
          <span className="sr-only">Heading 2</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(editor?.isActive("heading", { level: 3 }) && "bg-muted")}
        >
          <Heading3 className="h-4 w-4" />
          <span className="sr-only">Heading 3</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={cn(editor?.isActive("bulletList") && "bg-muted")}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={cn(editor?.isActive("orderedList") && "bg-muted")}
        >
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Ordered List</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={cn(editor?.isActive("blockquote") && "bg-muted")}
        >
          <Quote className="h-4 w-4" />
          <span className="sr-only">Quote</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={cn(editor?.isActive("codeBlock") && "bg-muted")}
        >
          <Code className="h-4 w-4" />
          <span className="sr-only">Code Block</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className={cn(editor?.isActive("paragraph") && "bg-muted")}
        >
          <Pilcrow className="h-4 w-4" />
          <span className="sr-only">Paragraph</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Horizontal Rule</span>
        </Button>

        <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" type="button" className={cn(editor?.isActive("link") && "bg-muted")}>
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Link</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="link-url">URL</Label>
                <Input
                  id="link-url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addLink()
                    }
                  }}
                />
              </div>
              <div className="flex justify-between">
                {editor?.isActive("link") && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      editor?.chain().focus().unsetLink().run()
                      setIsLinkPopoverOpen(false)
                    }}
                  >
                    Remove Link
                  </Button>
                )}
                <Button type="button" onClick={addLink} className="ml-auto">
                  Add Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover open={isImagePopoverOpen} onOpenChange={setIsImagePopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" type="button">
              <ImageIcon className="h-4 w-4" />
              <span className="sr-only">Image</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addImage()
                    }
                  }}
                />
              </div>
              <Button type="button" onClick={addImage} className="w-full">
                Add Image
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="ml-auto flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
          >
            <Undo className="h-4 w-4" />
            <span className="sr-only">Undo</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
          >
            <Redo className="h-4 w-4" />
            <span className="sr-only">Redo</span>
          </Button>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  )
}
