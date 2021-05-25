import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    title: {
        fontSize: 40,
    },
}));

export default function FormPropsTextFields() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Login
                </Typography>
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField required id="standard-required" label="Required" defaultValue="Email" />
                <TextField required id="standard-required" label="Required" defaultValue="Password" />
                <Button variant="contained" color="primary">
                            Login
                </Button>
            </div>

        </form>
            </CardContent>
        </Card>
    );
}