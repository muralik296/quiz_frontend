import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            Page Not Found
            <h5>Looks you have followed a broken link or entered a URL that doesn't exist on our website</h5>
            <NavLink exact to='/login' end><strong>Visit Home</strong></NavLink>
        </>
    )
}