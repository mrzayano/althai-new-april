"use client"

import { useSearchParams } from "next/navigation"
import type { ReactNode } from "react"

interface ClientSearchParamsProps {
  children: (searchParams: URLSearchParams) => ReactNode
}

export function ClientSearchParams({ children }: ClientSearchParamsProps) {
  const searchParams = useSearchParams()
  return <>{children(searchParams)}</>
}
