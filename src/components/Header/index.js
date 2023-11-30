import { Paper, Typography, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


function renderHeader(name, email_id, is_student) {
    const userType = is_student ? 'Student' : 'Teacher';

    return (
        <div>
            <Typography variant="h6">
                Name: {name}
            </Typography>
            <Typography variant="body1">
                Email Id: {email_id}
            </Typography>
            <Typography variant="body1">
                Type: {userType}
            </Typography>
        </div>
    );
}

function Header(props) {
    const { name, email_id, is_student } = props;

    return (
        <StyledPaper elevation={3}>
            {renderHeader(name, email_id, is_student)}
        </StyledPaper>
    );
}

export default Header;
