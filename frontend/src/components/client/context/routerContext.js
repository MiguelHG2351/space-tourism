import React from 'react'

export const RouterContext = React.createContext(null)

if (process.env.NODE_ENV !== 'production') {
  RouterContext.displayName = 'RouterContext'
}
