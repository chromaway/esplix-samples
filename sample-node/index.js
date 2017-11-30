const fs = require('fs');
const esplix = require('esplix-node-sdk');

runSample = async function runSample() {
  context = new esplix.EsplixContext(esplix.dummyConfig());
  await context.initialize();
  const contractDefinition = context.contractDefinitionManager.registerDefinition(
    fs.readFileSync("contracts/futuristic.r2o"));
  await context.principalIdentity.generateIdentity();
  const contractInstance = await context.contractInstanceManager.createContractInstance(
            contractDefinition, { SELLER: context.principalIdentity.getPublicKey() }
        );
  await contractInstance.performAction("OFFER", {"PROPERTY-ID": "Frobla" });
  await contractInstance.performAction("INVITE-BROKER", { "BROKER-PK": brokerPubKey });
}

//random generated key
const brokerPubKey = "034aa67361b1b0b9d88c2eb0c2f25321cfef8e0abcd5ec2affbefa71c4d0fe4459";

runSample().then( () => {
  console.log('done');
}).catch( err => {
    console.error(err);
});
