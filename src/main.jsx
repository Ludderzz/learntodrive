import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

class Boundary extends Component {
  state = { bad: false }
  static getDerivedStateFromError() { return { bad: true } }
  componentDidCatch(e) { console.error(e) }
  render() {
    return this.state.bad
      ? <main style={{ padding: 32, font: '16px system-ui' }}><h1>Something went wrong</h1><p>Please refresh the page.</p></main>
      : this.props.children
  }
}
createRoot(document.getElementById('root')).render(<Boundary><App /></Boundary>)
