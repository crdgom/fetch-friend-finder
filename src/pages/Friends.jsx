// * Friends.jsx
// * Name: Friends
// * Description: Friends page component with Bootstrap.
// * Since: v1.0.0
// * Author: @crdgom

import ProtectedDogList from '../components/protectedDogList/protectedDogList';
import Favorites from '../components/favorites/favorites';
import { FavoritesProvider } from '../context/FavoritesContext';


function Friends () {
    return(
        <>
        <h3 className='latest-friends-title'>Lastest Friends</h3>
        <FavoritesProvider>
            <ProtectedDogList />
        </FavoritesProvider>
        </>
    )
}

export default Friends;