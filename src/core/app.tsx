import * as React from 'react'
import Router from './router'
import ErrorBoundary from '../components/hocs/error-boundary'
import {
  MediaStateProvider,
  NavStateProvider,
  SnackProvider,
} from '@reapit/elements'
import '@reapit/elements/dist/index.css'

const App = () => {
  return (
    <ErrorBoundary>
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>
            <Router />
          </MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
    </ErrorBoundary>
  )
}

export default App
