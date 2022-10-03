import logo from './skull.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import MyAppBar from './myAppBar';
import FunctionsIcon from '@mui/icons-material/Functions';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AdbIcon from '@mui/icons-material/Adb';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Wallet from "./wallet";
import Modal from '@mui/material/Modal';
import makeBlockie from 'ethereum-blockies-base64';
import { makeStyles } from '@mui/material/styles';

import ABI_ERC115 from './contracts/rinkeby_erc1155Tradable.json';
import ABI_TREASURY from './contracts/rinkeby_treasury.json';

import IMG_NETWORK_ETHEREUM from './img/ethereum.svg';

const networks = {
    4 : {
        'erc1155' : '0x9b0500f4d8da6474c9db2a79e79e4cc814aaacbc',
        'treasury' : '0x28a0Aa9Bf1712d66Caaa245Efc679eA50640c6Ee',
        'erc1155_abi': ABI_ERC115,
        'treasury_abi': ABI_TREASURY,
        'rpc' : { 4 : 'https://rpc.ankr.com/eth_rinkeby' },
        'network': 'rinkeby',
        'chainid': 4
    },
    56 : {
        'network' : 'binance',
        'chainid' : 56,
        'rpc' : { 56 : 'https://bsc-dataseed-binance.org/'}
    }
}

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:`0.3em`
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#daa520',
        },
        secondary: {
            main: '#110f0b',
        },
        divider: 'rgba(0,0,0,0.45)',
        info: {
            main: '#2196f3',
        },
    },
});

class Dashboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                changeBaseURI:'',

                whitelistType:'',
                whitelistAddress:''
            }
        }

    render(){
    return (
        <><h2>Admins</h2>
            <Button variant="outlined" onClick={ e => this.props.getAdmins() } > Get Admins </Button>
            <div></div>
            <br/>
            <TextField
                fullWidth
                label="Add Address"
                onKeyUp={ e => this.setState({ addContent : e.target.value }) }
                onBlur={ e => this.setState({ addContent : e.target.value }) }
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ e => this.addFile( this.state.addPath , this.state.addContent ) } >
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    ),
                }}
            />
            <br/>

            <TextField
                fullWidth
                label="Remove Address"
                onKeyUp={ e => this.setState({ addContent : e.target.value }) }
                onBlur={ e => this.setState({ addContent : e.target.value }) }
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ e => this.addFile( this.state.addPath , this.state.addContent ) } >
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    ),
                }}
            />

            <h2>Creators</h2>
            <Button  variant="outlined"> Get Creators </ Button>
            <div></div>
            <br/>
            <TextField
                fullWidth
                label="Add Address"
                onKeyUp={ e => this.setState({ addContent : e.target.value }) }
                onBlur={ e => this.setState({ addContent : e.target.value }) }
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ e => this.addFile( this.state.addPath , this.state.addContent ) } >
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    ),
                }}
            />

            <br/>
            <TextField
                fullWidth
                label="Remove Address"
                onKeyUp={ e => this.setState({ addContent : e.target.value }) }
                onBlur={ e => this.setState({ addContent : e.target.value }) }
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ e => this.addFile( this.state.addPath , this.state.addContent ) } >
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    ),
                }}
            />

            <h2>Base URL</h2>
            <Button  variant="outlined" onClick={ this.props.getBaseURI } > Get Base URL </ Button>
            <div>{ this.props.vars.baseUrl }</div>
            <br/>
            <TextField
                fullWidth
                label="Base URL"
                onKeyUp={ e => this.setState({ changeBaseURI : e.target.value }) }
                onBlur={ e => this.setState({ changeBaseURI : e.target.value }) }
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ e => this.props.setBaseURI( this.state.changeBaseURI ) } >
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    ),
                }}
            />
            <h2>Whitelist</h2>
            <TextField
                fullWidth
                label="Token type"
                onKeyUp={ e => this.setState({ whitelistType : e.target.value }) }
                onBlur={ e => this.setState({ whitelistType : e.target.value }) }
            />

            <TextField
                fullWidth
                label="Address"
                onKeyUp={ e => this.setState({ whitelistAddress : e.target.value }) }
                onBlur={ e => this.setState({ whitelistAddress : e.target.value }) }
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={ e => this.props.setWhitelist( this.state.whitelistType , this.state.whitelistAddress ) } >
                            <SubdirectoryArrowLeftIcon />
                        </IconButton>
                    ),
                }}
            />
            <h2>Questionaires</h2>
            <Button  variant="outlined" onClick={ e => this.props.getFiles() }> Get Submissions </ Button>
            <br/>
            <br/>

        </>

    );
    }
}



const CONTEXT_DASHBOARD = "dashboard";
const CONTEXT_ACCOUNT = "account";

class  App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            connected : false,
            showMenu: false,
            message: null,
            context:'',
            address: '',
            addressImgSrc: '',
            network: '',
            isAdmin: false,
            isCreater: false,
            isWitelisted: false,
            isHolder: false,
            hasIPFSHash: false,
            baseUrl:"",

        }
        this.web3Modal = null;
        this.erc1155 = null;
        this.treasury = null;
        this.web3 = null;
    }

    eventHandler( what , data ) {
        console.log( `eventHandler(${what}, ${data} )`);
        switch( what ) {
            case "connected" : {
                if ( data ) this.setState({network:'?'});
                else this.end();

            } break;
            case "context": {
                this.setState({ context : data });
            } break;
            case "message": {
                this.setState({ message : data });
            } break;
        }
    }


    start = async () => {
        try{

            if ( ! ( this.state.network in networks ) ) {
                this.setState({message:'CHAINID_INVALID'});
                return;
            }

            const providerOptions = {
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        rpc : networks[ this.state.network ]['rpc'],
                        network : networks[ this.state.network ]['network'],
                        chainId : this.state.network,
                        infuraId: "INFURA_ID" // required
                    }
                }
            };
            this.web3Modal = new Web3Modal({
                cacheProvider: false,
                providerOptions
            });

            const provider = await this.web3Modal.connect();

            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts: string[]) => {
                console.log(accounts);
                this.setState({message:'ACCOUNT_CHANGE'});
            });
            // Subscribe to chainId change
            provider.on("chainChanged", (chainId: number) => {
                if ( ! ( chainId in networks ) ) {
                    this.setState({message:'CHAINID_CHANGED'});
                    this.end();
                } else this.setState({message:'CHAINID_CHANGED'});
            });
            // Subscribe to provider connection
            provider.on("connect", (info: { chainId: number }) => {
                console.log(info);
            });
            // Subscribe to provider disconnection
            provider.on("disconnect", (error: { code: number; message: string }) => {
                console.log(error);
                this.end();
            });

            this.web3 = new Web3(provider);
            const accounts = await this.web3.eth.getAccounts();
            const addr = accounts[0];

            this.setState({"connected": true,
                "message":"connected",
                "address": addr,
                "addressImgSrc": makeBlockie( addr )
            },
                this.initERC1155
            );

        } catch(e) {
            console.error(e);
        }
    }

    ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000";

    erc1155HasRoleAdmin = async () => {
        this.erc1155.methods.hasRole( this.ADMIN_ROLE , this.state.address ).call().then( rslt => {
            console.log(`erc1155HasRoleAdmin() rslt: ${rslt}`);
            this.setState({isAdmin:rslt});
        }).catch( e => console.error(e));
    }

    erc1155GetAdmins = async () => {
        console.log(`erc1155GetAdmins()`);
    }

    erc1155AddAdmin = async ( anAddress ) => {
        console.log(`erc1155AddAdmin()`);
    }

    erc1155RmvAdmin = async ( anAddress ) => {
        console.log(`erc1155RmvAdmin()`);
    }

    erc1155GetCreators = async () => {
        console.log(`erc1155GetCreators()`);
    }

    erc1155AddCreator = async ( anAddress ) => {
        console.log(`erc115AddCreator()`);
    }

    erc1155RmvCreator = async ( anAddress ) => {
        console.log(`erc1155RmvCreator()`);
    }

    erc1155Holdings = async => {
        console.log(`erc1155Holdings()`);
    }

    erc1155HasRoleCreator = async () => {
        this.erc1155.methods.hasRole( this.CREATOR_ROLE , this.state.address ).call().then( rslt => {
            console.log(`erc1155HasRoleCreator() rslt: ${rslt}`);
            this.setState({isCreater:rslt});
        }).catch( e => console.error(e));
    }

    erc1155AmHolder = async ( tokenId ) => {
        this.erc1155.methods.balanceOf( this.state.address , tokenId ).call().then( rslt => {
            console.log(`balanceOf() rslt: ${rslt}`);
            this.setState({isHolder:rslt>0});
        }).catch( e => console.error(e));
    }

    erc1155GetBaseUrl = async () => {
        this.erc1155.methods.baseMetadataURI().call().then( r => {
            this.setState( { baseUrl:r } );
        } ).catch( e => console.error(e));
    }

    erc1155SetBaseUrl = async ( url ) => {
        if ( ! url ) return;
        this.erc1155.methods.setURI( url ).send({ from: this.state.address }).then( r => {
            this.setState( { baseUrl : url } );
        }).catch( e => console.error(e));
    }

    treasuryAmWhitelisted = async () => {
        this.treasury.methods.mintWhitelist( this.state.address ).call().then( rslt => {
            console.log(`treasuryAmWhitelisted() => ${ rslt } `);
        });
    }

    treasurySetWhitelist = async ( anId , anAddress ) => {
        console.log(` treasurySetWhitelist()  `);
    }

    treasuryGetFiles = async () => {
        console.log(` treasuryGetFiles();  `);
    }

    treasryClaim = async () => {
        console.log(`treasuruClaim()`);
    }

    treasuryHasHash = async () => {
        this.treasury.events.AddedIPFSHash({
            filter: { owner: this.state.address },
            fromBlock: 0
        }, (function(error, event){
            console.log(`error= ${error} event=${event}`);
            this.setState({ hasIPFSHash : true });
        } ).bind(this) ).on('data', ( function(event){
            this.setState({ hasIPFSHash : true });
            console.log(`on(data) ${event}`); // same results as the optional callback above
        } ).bind(this) );
    }

    treasuryAddFile = async ( cid ) => {
        if ( ! cid ) return;
        this.treasury.methods.addFile( cid ).send( { from: this.state.address } ).then( r => {
            console.log("file added");
        });
    }

    initERC1155 = async () => {
        if ( ! ( this.state.network in networks ) ) return;
        this.erc1155 = new this.web3.eth.Contract(
            networks[ this.state.network ]['erc1155_abi'],
            networks[ this.state.network ]['erc1155'] );
        this.erc1155HasRoleAdmin();
        this.CREATOR_ROLE = await this.erc1155.methods.CREATOR_ROLE().call();
        this.erc1155HasRoleCreator();
        this.erc1155AmHolder( "1" );
        this.initTreasury();
    }

    initTreasury = async () => {
        this.treasury = new this.web3.eth.Contract(
            networks[ this.state.network ]['treasury_abi'],
            networks[ this.state.network ]['treasury'] );
        this.treasuryAmWhitelisted();
        this.treasuryHasHash();
    }

    end = async () => {
        if ( this.web3Modal !== null ) {
            this.web3Modal.clearCachedProvider();
            this.setState({"connected": false,"message":"disconnected","context":""});
        }
    }

    stmp = () => {
        let d = new Date();
        return `${ d.getHours()  }:${ d.getMinutes() }:${ d.getSeconds() }`;
    }

    render(){

        return (
            <div className="App">
                <ThemeProvider theme={theme}>
                    <MyAppBar connected={this.state.connected}
                        src={ this.state.addressImgSrc }
                        isCreater={ this.state.isCreater }
                        isAdmin={ this.state.isAdmin }
                        callback={this.eventHandler.bind(this)} />
                    <Container maxWidth="sm">
                        { this.state.context === CONTEXT_DASHBOARD ?
                            <Dashboard
                                vars={this.state}
                                getBaseURI={this.erc1155GetBaseUrl}
                                setBaseURI={this.erc1155SetBaseUrl}
                                setWhitelist={this.treasurySetWhitelist}
                                getFiles={this.treasuryGetFiles}
                                getAdmins={this.erc1155GetAdmins}
                                addAdmin={this.erc1155AddAdmin}
                                rmvAdmin={this.erc1155RmvAdmin}
                            /> :
                                this.state.context === CONTEXT_ACCOUNT ?
                                    <Wallet
                                        hasIPFSHash={this.state.hasIPFSHash}
                                        isWitelisted={this.state.isWitelisted}
                                        isHolder={this.state.isHolder}
                                        submitHash={this.treasuryAddFile}
                                    /> : <><img src={logo} style={{width:`70%`,margin:`2em 0 0 0`}}  className="blink" alt="logo" /><h1>Σ • Δ = </h1></> }
                    </Container>
                    <Modal
                        open={ this.state.network === '?'  }
                        close = {null}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={ e => this.setState({network:'4'}, this.start) }>
                                        <ListItemIcon>
                                            <Icon >
                                                <img style={{height:`100%`,textAlign:`center`}} src={ IMG_NETWORK_ETHEREUM } />
                                            </Icon>
                                        </ListItemIcon>
                                        <ListItemText primary="Rinkeby" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Modal>
                    <Snackbar
                        open={ this.state.message != null }
                        autoHideDuration={6000}
                        onClose={ e => this.setState({ message : null}) }
                        message={ this.state.message }
                    />
                </ThemeProvider>
            </div>
        );
    }
}
export default App;
