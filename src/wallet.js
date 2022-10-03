import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { create } from 'ipfs';
import CircularProgress from '@mui/material/CircularProgress';

export default class Wallet extends React.Component {

 constructor(props){
     super(props);
     this.state = {
        starting: false,
        limbo :false,
        online: false,
        a1:"",
        a2:"",
        a3:"",
        a4:"",
        a5:"",
        a6:"",
        a7:"",
        a8:"",
        a9:"",
        a10:"",
        a11:"",
     }
     this.node = null;
 }

    start = async () => {
        try{
            this.setState({starting:true});
            this.node = await create( );
            this.setState({ starting: false, online: this.node.isOnline() });
        } catch(e) {
            console.error(e);
        }
    }

   end = async () => {
        await this.node.stop()
    }

    componentWillUnmount() {
        if ( null != this.node && this.node.isOnline ) this.end();
    }

   addFile = async ( path, content ) => {
        if ( ! this.node.isOnline() && ( !path && ! content ) ) return;
        let data = {};
        if ( path ) data["path"] = path;
        if ( content ) data["content"] = content;
        const result = await this.node.add( data )
        console.log(`File added: ${ JSON.stringify(  result ) }`);
        this.props.submitHash( result.cid.toString() );
        this.setState({limbo : true});
   }

    render(){
        if ( this.props.isHolder ) {
            return (
                <>
                    <h1>Holder</h1>
                </>
            );
        } else if ( this.props.isWitelisted ) {
            return (
                <>
                    <h1>Welcome</h1>
           <Button sx={{ mt: 1, mr: 1 }} type="button" variant="outlined" onClick={ e => {
               console.log(`TODO: mint`);
                } }>
          Submit
        </Button>

                </>
            );
        } else if ( this.props.hasIPFSHash ) {
            return (
                <h1>Patience is a virtue</h1>
            );
        } else if ( this.state.limbo ) return <><br/><CircularProgress /></>;
        else {
            return this.questionaire();
        }
    }

    filledOut = () => {
        return (
            this.state.a1 &&
            this.state.a2 &&
            this.state.a3 &&
            this.state.a4 &&
            this.state.a5 &&
            this.state.a6 &&
            this.state.a7 &&
            this.state.a8 &&
            this.state.a9 &&
            this.state.a10 &&
            this.state.a11 );
    }

    questionaire = () => {
        return <form  >
        { this.state.online === true ?
            <><h1>Questions</h1>
        <Typography textAlign="left">
            What motivates you?
                </Typography>
      <TextField
                fullWidth
                multiline
                id="input-with-icon-textfield"
                label="... "
                onKeyUp={ e => this.setState({ a1 : e.target.value }) }
                onBlur={ e => this.setState({ a1 : e.target.value }) }
            />
        <Typography textAlign="left">


What is one personal goal you are currently trying to achieve?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a2 : e.target.value }) }
                onBlur={ e => this.setState({ a2 : e.target.value }) }
            />


        <Typography textAlign="left">
If you didn’t have to work, what would you do?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a3 : e.target.value }) }
                onBlur={ e => this.setState({ a3 : e.target.value }) }
            />

        <Typography textAlign="left">

What do success and failure look like to you?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a4 : e.target.value }) }
                onBlur={ e => this.setState({ a4 : e.target.value }) }
            />


        <Typography textAlign="left">
What are your values?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a5 : e.target.value }) }
                onBlur={ e => this.setState({ a5 : e.target.value }) }
            />

        <Typography textAlign="left">

What are your strengths and weaknesses?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a6 : e.target.value }) }
                onBlur={ e => this.setState({ a6 : e.target.value }) }
            />
        <Typography textAlign="left">


What are some things that are outside of your comfort zone?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a7 : e.target.value }) }
                onBlur={ e => this.setState({ a7 : e.target.value }) }
            />

        <Typography textAlign="left">

What are you trying to improve on?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a8 : e.target.value }) }
                onBlur={ e => this.setState({ a8 : e.target.value }) }
            />
        <Typography textAlign="left">


What makes you special?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a9 : e.target.value }) }
                onBlur={ e => this.setState({ a9 : e.target.value }) }
            />
        <Typography textAlign="left">


What is your number one goal?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a10 : e.target.value }) }
                onBlur={ e => this.setState({ a10 : e.target.value }) }
            />
        <Typography textAlign="left">


Who are 10 of your biggest influences alive or dead?
                </Typography>
      <TextField
                fullWidth
                multiline
                label="... "
                onKeyUp={ e => this.setState({ a11 : e.target.value }) }
                onBlur={ e => this.setState({ a11 : e.target.value }) }
            />
            { this.filledOut() &&
                <Button sx={{ mt: 1, mr: 1 }} type="button" variant="outlined" onClick={ e => {
                    this.addFile( null , JSON.stringify(
                        [
                            this.state.a1,
                            this.state.a2,
                            this.state.a3,
                            this.state.a4,
                            this.state.a5,
                            this.state.a6,
                            this.state.a7,
                            this.state.a8,
                            this.state.a9,
                            this.state.a10,
                            this.state.a11
                        ]
                    ) );
                } }>
          Submit
               </Button> }
                <br/>
            </> : this.state.starting ? <><br/><CircularProgress /></> :
                <><br/><Typography textAlign="Left">Before you start your journey some questions must be answered.</Typography>
                    <Button sx={{ mt: 1, mr: 1 }} type="button" variant="outlined" onClick={ this.start } >
       <Typography textAlign="center">Begin</Typography>
       </Button></> }



        <br/>
    </form>
    }

}
