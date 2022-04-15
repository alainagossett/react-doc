# Build a React app
### React is a component-based JavaScript library for building user interfaces.  
It allows for multi-page rendering without refreshing the browser.  

1. Navigate to a location on your computer where you want to build the project. Change into that folder
```
mkidr React
cd React
```
2. Run the command that creates a React Project
```
npx create-react-app <APP_NAME>
```
3. Once installed, open the project in your code builder and run 
```
npm start
```
  - The browser should open with a React logo to confirm your app is working

4. Install dependencies
```
npm install react-router-dom sass
```
## App hierarchy should look like:
- -> App  
  - -> Header  
  - -> Main |state: things|  
    - -> Switch  
      - -> Route |path: "/"|  
        - -> Index |Props: things, createThings|  
      - -> Route |path="/things/:id|  
        - -> Show |Props: things, updateThings, deleteThings|  


5. Create components and pages directories
```
mkdir src/components
mkdir src/pages
```

6. In components, create app components files
```
touch src/components/Header.js
touch src/components/Main.js
touch src/components/Footer.js
```

7. In pages, create JSX template files
```
touch src/pages/Index.js
touch src/pages/Show.js
```

8. Inside ever components page, we will start with the same boilerplate:
```JavaScript
function Component(props) {
    return <h1>Component Name</h1>
}

export default Component
```
> ***REMEMBER:*** any time you return JSX, there must be one overarching parent element (usually a `<div>`)

9. Add your components to App.js
```JavaScript
// in App.js

import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
     <Header />
     <Main />
     <Footer />
    </div>
  );
}

export default App;
```
10. Set up your routes in Main.js
  - These routes should line up with your backend routes
```JavaScript
// in Main.js

import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
    return (
    <main>
        <Switch>
            <Route exact path='/'>
                <Index />
            </Route>
            <Route path='/things/:id' render={(rp) => <Show {...rp} />} />
        </Switch>
    </main>

    )
}

export default Main
```
> Switch is no longer used in React Router v6 and newer  

> Routes are chosen based on best match instead of being traversed in order like they used to with Switch  

> Use `<Routes>` everywhere you'd use `<Switch>`

11. Set up navigation in Header.js
```Javascript
// in Header.js

import { Link } from 'react-router-dom'

function Header(props) {
    return (
        <nav className='nav'>
            <Link to='/'>
                <div>App</div>
            </Link>
        </nav>
    )
}

export default Header
```

12. Use state in Main.js so it can be shared between Index and Show
  > We need Main.js to have:  
    1. State to hold list of things  
    2. Function to make api call for thing (talk to our backend)  
    3. Function to create new thing (talk to our backend)  
    4. *useEffect* to make initial call for things list  
    5. Pass the thing state and the create function to Index

```JavaScript
// in Main.js
// import useEffect and useState
import { useEffect, useState } from 'react';

// under function Main(props) {

const[things, setThings] = useState(null)

const URL = 'http://localhost:3000/things/'
// we will eventually update this to the deployed link
// make sure this matches your root route from the backend

const getThings = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setThings(data)
}

const createThings = async (thing) => {
    await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(person),
    })
    getThings()
}

useEffect(() => getThings(), [])
```

13. Display your database items in Index.js
```JavaScript
import { Link } from 'react-router-dom';

// under function Index (props) {
    const loaded = () => {
        return props.things.map((thing) => (
            <div key={thing._id} className="thing">
                <Link to={`/things/${thing._id}`}>
                <h1>{thing.name}</h1>
                </Link>
                <p>{thing.description}</p>
            </div>
        ))
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return props.things ? loaded() : loading()
```

14. Add a form to Index.js
  > The form should have:  
    1. State to hold form data  
    2. Form inputs in JSX  
    3. handleChange function to allow state to control the form  
    4. handleSubmit function to handle form submission  

```JavaScript
// add this to the top of the Index function
const [newForm, setNewForm] = useState({
    name: "",
    description: "",
    code: "",
})

const handleChange = (event) => {
    setNewForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
    }))
}

const handleSubmit = (event) => {
    event.preventDefault()
    props.createThings(newForm)
    setNewForm({
        name: "",
        description: "",
        code: "",
    })
}

// add this under the loading function
return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.code}
          name="code"
          placeholder="code"
          onChange={handleChange}
        />
        <input type="submit" value="Create Thing" />
      </form>
      {props.things ? loaded() : loading()}
    </section>
  )
```