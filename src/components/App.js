import React, { Component } from 'react'
import Navbar from './Navbar'
import './App.css'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Main from './Main'

class App extends Component {
  
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()

    //Load euroToken
    const euroTokenData = DaiToken.networks[networkId]
    if(euroTokenData) {
      const euroToken = new web3.eth.Contract(DaiToken.abi, euroTokenData.address)
      this.setState({euroToken})
      let euroTokenBalance = await euroToken.methods.balanceOf(this.state.account).call()
      this.setState({euroTokenBalance: euroTokenBalance.toString()})
    }
    else {
      window.alert('EuroToken contract not deployed to detected network')
    }

    //Load galaxyToken
    const galaxyTokenData = DappToken.networks[networkId]
    if(galaxyTokenData) {
      const galaxyToken = new web3.eth.Contract(DappToken.abi, galaxyTokenData.address)
      this.setState({galaxyToken})
      let galaxyTokenBalance = await galaxyToken.methods.balanceOf(this.state.account).call()
      this.setState({galaxyTokenBalance: galaxyTokenBalance.toString()})
    }
    else {
      window.alert('GalaxyToken contract not deployed to detected network')
    }

    //Load tokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({tokenFarm})
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({stakingBalance: stakingBalance.toString()})
    }
    else {
      window.alert('tokenFarm contract not deployed to detected network')
    }

    this.setState({loading: false})
  }
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  stakeTokens = (amount) => {
    this.setState({ loading: true })
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
  }
  
  unstakeTokens=(amount) => {
    this.setState({loading: true})
    this.state.tokenFarm.methods.unstakeTokens().send({from: this.state.account}).on('transactionHash', (hash) => {
      this.setState({loading: false})
    })
  }

  //Dai is euro
  //Dapp is galaxy
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      euroToken: {},
      galaxyToken: {},
      tokenFarm: {},
      euroTokenBalance: '0',
      galaxyTokenBalance: '0',
      stakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    }
    else {
      content = <Main
        euroTokenBalance={this.state.euroTokenBalance}
        galaxyTokenBalance={this.state.galaxyTokenBalance}
        stakingBalance={this.state.stakingBalance}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
