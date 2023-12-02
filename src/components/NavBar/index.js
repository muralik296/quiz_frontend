import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import { AccountContext } from '../../Store/AccountContext';

function quizIconLink(isAuth, is_teacher) {
    if (is_teacher && isAuth) return '/teacherView'
    else if (!is_teacher && isAuth) return '/studentView'
    else return '/'
}

function NavBar() {
    const { is_teacher, isAuth, setAuth, data, setData, userInfo } = useContext(AccountContext);
    console.log(isAuth)

    function handleLogOut() {
        setAuth(false);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={quizIconLink(isAuth, is_teacher)} style={{ textDecoration: 'none', color: 'white' }}>
                        <QuizIcon />
                    </Link>
                </Typography>

                {
                    (isAuth) ? (
                        <Typography color="inherit">
                            {is_teacher ? 'Teacher' : 'Student'} {userInfo.name} 
                        </Typography>
                    ) : null
                }
                
                {isAuth ? (
                    <>
                        <Button color="inherit" component={Link} to={is_teacher ? "/teacherView" : "/studentView"}>
                            Home
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
                {
                    (isAuth) ? (
                        <Button color="inherit" onClick={handleLogOut}>
                            Log Out
                        </Button>
                    ) : null
                }
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
