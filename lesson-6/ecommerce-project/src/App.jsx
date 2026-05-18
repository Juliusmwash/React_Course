import { Route, Routes, } from 'react-router'
import { HomePage } from './assets/pages/HomePage'
import { Header } from './assets/pages/Header'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      <Route
        index // path="/" is the same as index
        element={
          <>
            <Header />
            <HomePage />
          </>
        }
      />
      <Route
        path="/products"
        element={<h1>Products Page</h1>}
      />
       <Route
        path="/contact"
        element={<h1>Contact Page</h1>}
      />
    </Routes>
  )
}

export default App
