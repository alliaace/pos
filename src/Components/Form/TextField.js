import { Grid } from '@material-ui/core'
import React from 'react'

export default function TextField(props) {
    return (
        <React.Fragment>
            <Grid item xs={3} style={{ height: 35, backgroundColor: 'red' }}>
                {props.title}
                {props.required &&
                    <span style={{ color: 'red', fontSize: 22 }}>*</span>
                }
            </Grid>
            <Grid item xs={9} style={{ backgroundColor: 'green', height: 35, marginBottom: 10 }}
                style={props.style}
            >
                {!props.type ?
                    <input
                        required={props.required}
                        id={props.id}
                        name={props.name}
                        label={props.label}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        style={{ borderWidth: 0.1, width: '100%', height: 35, }}

                    /> :
                    <textarea
                        style={{ width: '100%', height: 70, }}
                        required={props.required}
                        id={props.id}
                        name={props.name}
                        label={props.label}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                    />
                }
            </Grid>
        </React.Fragment>
    )
}
