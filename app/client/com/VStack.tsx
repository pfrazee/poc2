'use client'
import { PropsWithChildren } from 'react'

export function VStack({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-col gap-4">{children}</div>
}
