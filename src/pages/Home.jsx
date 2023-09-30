// Home.jsx
// Name: Home
// Description: Home component with Bootstrap.
// Since: v1.0.0
// Author: @crdgom

import  RandomHomeFriends from '../components/randomHomeFriends/RandomHomeFriends';
import { Link } from 'react-router-dom';

function Home () {
    return(
        <>
        <div className="container">
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">Fetch Friend Finder</h1>
                    <p className="lead my-3">Lorem ipsum
                    dolor sit amet consectetur adipisicing elit.</p>
                    <p className="lead mb-0"><Link to="/find-new-friend" className="text-white fw-bold">Find New Friend</Link></p>
                </div>
            </div>
        </div>
        <RandomHomeFriends />
        </>
    )
}

export default Home;