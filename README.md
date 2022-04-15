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

9. Add your components to App.js
```JavaScript
// in App.js


```
