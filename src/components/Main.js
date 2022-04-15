import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {

    // set up State
    const[things, setThings] = useState(null)

    const URL = 'http://localhost:3000/things/'

    const getThings = async () => {
        // fetch data from the API
        const response = await fetch(URL)
        // set variable to response
        const data = await response.json()
        // set state to the data
        setThings(data)
    }

    const createThings = async (thing) => {
        // fetch API URL
        await fetch(URL, {
        // make post request to create things
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(thing),
        })
        // update list of things
        getThings()
    }

    useEffect(() => getThings(), [])
    // useEffect hook allows you to perform app actions while the function runs
    // in this case, it will perform data fetching (get things) while functions are running

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