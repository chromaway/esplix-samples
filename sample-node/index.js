const fs = require('fs');
const esplix = require('esplix-node-sdk');

const usePostchain = (process.argv.length > 2 && process.argv[2] === "postchain");

const esplixConfig = (usePostchain) ?
      // postchain configuration using public Postchain server
      esplix.postchainConfig("http://main-message-store.esplix1.chromaway.net",
			     "http://messaging.esplix1.chromaway.net")
      // local simulation
      : esplix.dummyConfig();

//random generated key
const brokerPubKey = "034aa67361b1b0b9d88c2eb0c2f25321cfef8e0abcd5ec2affbefa71c4d0fe4459";

const runSample = async function runSample() {
  context = new esplix.EsplixContext(esplixConfig);
  await context.initialize();
  const contractDefinition = context.contractDefinitionManager.registerDefinition(
    fs.readFileSync("contracts/futuristic.r2o"));

  // this generates random keypair
  await context.principalIdentity.generateIdentity();
  
  const contractInstance = await context.contractInstanceManager.createContractInstance(
            contractDefinition, { SELLER: context.principalIdentity.getPublicKey() }
        );
  await contractInstance.performAction("OFFER", {"PROPERTY-ID": "Frobla" });
  await contractInstance.performAction("INVITE-BROKER", { "BROKER-PK": brokerPubKey });
}


runSample().then( () => {
  console.log('done');
}).catch( err => {
    console.error(err);
});
