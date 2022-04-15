import { Link } from 'react-router-dom';

function Index(props) {
    // create state to hold form data
    const [newForm, setNewForm] = useState({
        name: "",
        description: "",
        code: "",
    })
    
    // handle change in the form so whatever you put in the form (your changes) will be set as state
    const handleChange = (event) => {
        setNewForm((prevState) => ({
            // spread operator for state - include all of prevState
            ...prevState,
            // this captures the whatever is put in the value of the form
            [event.target.name]: event.target.value,
        }))
    }
    
    // handle submit for form - like an event handler
    const handleSubmit = (event) => {
        // preventDefault here stops the form from submitting before a user is ready
        event.preventDefault()
        // this will create a new thing based on the form state
        props.createThings(newForm)
        // this will reset the input fields to blank after submission
        setNewForm({
            name: "",
            description: "",
            code: "",
        })
    }

    const loaded = () => {
        // map across all things in database
        return props.things.map((thing) => (
            // whenever you use .map, the most parent element must have a key attribute with a unique value, so use ._id
            <div key={thing._id} className="thing">
                <Link to={`/things/${thing._id}`}>
                <h1>{thing.name}</h1>
                </Link>
                <p>{thing.description}</p>
            </div>
        ))
    }

// we have a loaded and loading function to give the browser time to render the database items
    const loading = () => {
        return <h1>Loading...</h1>
    }

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
          // we use a ternary operator here
          {props.things ? loaded() : loading()}
          // if there are things in the database to render, run the loaded function
          // if there is nothing in the database to render, run the loading function
        </section>
      )      
}

export default Index