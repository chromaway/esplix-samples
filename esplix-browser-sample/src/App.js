import React, { Component } from 'react';

import * as esplix from 'esplix';

let esplixConfig;
if (window.location.hash === "#postchain") {
    esplixConfig = esplix.postchainConfig(
        "http://main-message-store.esplix1.chromaway.net",
        "http://messaging.esplix1.chromaway.net"
    );
} else {
    esplixConfig = esplix.dummyConfig();
}

const futuristicContract = Buffer.from(require('./contracts/futuristic.ratc.r4o.json'), 'hex');

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { context: null, loading: false };
      this.init().then( state => this.setState( state ));

      this.createContract = () => {
          const context = this.state.context;
          this.setState({loading: true});

          context.contractInstanceManager.createContractInstance(
              context.contractDefinitionManager.getByContractHash(
                  this.state.contractHash
              ),
              { SELLER: context.principalIdentity.getPublicKey() }
          ).then(
              (instance) => {
                  this.setState({ instance, loading: false });
              }
          );
      }
  }

  async init() {
      const context = new esplix.EsplixContext(esplixConfig);
      await context.initialize();
      if (!context.principalIdentity.isSetUp())
          await context.principalIdentity.generateIdentity();

      /*
      const oilCD = await context.contractDefinitionManager.registerDefinitionFromURL(
          "http://ratc.esplix3.chromaway.net/get-compiled?name=oilload"
      );
      console.log(oilCD);*/
      const futuristicCD = context.contractDefinitionManager.registerDefinition(futuristicContract);

      setInterval(() => {
          context.update().then(() => {
              this.forceUpdate();
          })
      }, 2500);
      return { context, contractHash: futuristicCD.contractHash };
  }

  render() {
      if (!this.state.context) return <div>Initializing...</div>;

      const pubKey = this.state.context.principalIdentity.getPublicKey();
      return(
        <div>
          <h4>Public key: {pubKey}</h4>
            {
                (this.state.loading) ?
                    <p>Creating...</p> : <button onClick={this.createContract}>Create contract</button>
            }
            { (this.state.instance) &&
                <h4>Contract ChainID: {this.state.instance.getChainID()}</h4>
            }
        </div>);

  }
}

export default App;