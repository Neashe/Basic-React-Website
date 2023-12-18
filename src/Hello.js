import Cat from "./images/cat.jpg"
const Hello = () => {
    return ( 
        <div>
        <h1>Hello</h1>
        <img src={Cat} alt="kotek" width = "50%" />
        </div>
     );
}
 
export default Hello