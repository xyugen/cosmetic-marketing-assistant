import React from 'react'
import { ChatProvider } from './_components/chat-context'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChatProvider>
      {children}
    </ChatProvider>
  )
}

export default Layout