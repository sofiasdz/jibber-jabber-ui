import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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

        <form className={classes.root} noValidate autoComplete="off">
            <div>
         <Typography className={classes.title} color="textSecondary" gutterBottom>
                           My Profile
                       </Typography>
                  <TextField
                          id="standard-read-only-input"
                          label="Read Only"
                          defaultValue="UserName"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                          <TextField
                                  id="standard-read-only-input"
                                  label="Read Only"
                                  defaultValue="Email"
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                  <TextField
                          id="standard-read-only-input"
                          label="Read Only"
                          defaultValue="Nick"
                          InputProps={{
                            readOnly: true,
                          }}
                        />

            </div>

        </form>
    );
}