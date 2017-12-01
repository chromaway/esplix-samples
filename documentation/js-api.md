# Esplix documentation

## Classes

### EsplixContext

EsplixContext coordinates objects required for Esplix client operations, provides means
of configuration and persistence. A context is usually assoicated with single user's identity.

At minimum, context constructor requires an initialized Ratatosk engine, which itself
consists of execution engine and consensus engine. Additionally, mailbox and persister objects
can be passed in parameters.

A helper function can be used to prepare parameters for EsplixContext constructor.
E.g. `new EsplixContext(helper.dummyConfig())` will create a context with dummy configuration
useful for testing.

A context must be initialized before its used, which is done by calling `initialize()` asynchronous function.

Context exposes a number of public properties. Following properties might be useful
to a typical Esplix application:

 * principalIdentity: identity of a user associated with the context, including his keypair
 * contractDefinitionManager: used to register and enumerate contract definitions
 * contractInstanceManager: used to create new contract instances and list existing ones

Following proprties are also public, but are for internal use (might also be used for
debugging applications):

 * mailbox: Send and receive messages
 * messageDispatcher: Process received messages
 * invitationManager: Invite other users to contracts (by sending them messages)

### PrincipalIdentity

PrincipalIdentity represents a keypair of a user associated with the context. The object is created and initialized by the context.

Identity is originally blank and needs to be set up in one of ways:

 * `importIdentity(data)`: imports existing keypair, represented with a JSON object `{pubKey: '...', privKey: '...'}`.
    (Specific format depends on Ratatosk engine being used)
 * `generateIdentity()`: generates a new random keypair

Once identity is set up, it will be perisisted by the context.

Public API:

 * `isSetUp()`
 * `getPublicKey()`: returns a string
 * `getPrivateKey()`: returns a string (e.g. WIF)
 * `getID()`: usually same as public key



### ContractDefinitionManager

ContractDefinitionManager is used to register and enumerate contract definitions. It is
created & initialized by a context (shouldn't be directly instantiated by an application).

Methods:

 * `registerDefinition(data)`: registers a definition previously prepared using Ratatosk compiler. Expects data as Buffer.
 * `registerDefinitionFromURL(url)`
 * `getByContractHash(hash)`: retrieve a contract definition by a contract hash (which is passed in hex encoding). Returns `undefined` if no such contract was previously registered
 * `getAllDefinitions()`: returns an array of all registered definitions

### ContractDefinition

ContractDefinition objects are created via ContractDefinitionManager, they should not be constructed directly.

Public API:

 * `contractHash` field: serves as an identifier of a contract code
 * `getInitParams()`: returns a [parameter descriptor object](#parameter-descriptor-object) with parameters which are neccessary for contract instance initialization
 * `name` field: user-readable name, might be `undefined`

Internal API:

 * `async beforeAction (contractInstance, action, params)`: used by ContractInstance to trigger
  automatical actions, such as invitations

### ContractInstanceManager

ContractInstanceManager is used to create contract instances and enumerate contract existing contract instance a context is aware of. It is
created & initialized by a context (shouldn't be directly instantiated by an application).

Public API:

 * `getContractInstances()`: returns all contract instances
 * `getIntanceByChainID(id)`: returns a specific instance by chainID
 * `async joinContractInstance(chainID, metadata)`: joins contract instance which already
   exists in a blockchain. metadata is usually undefined.
 * `async createContractInstance(contractDefinition, parameters)`: create new contract instance; contractDefinition should be obtained from ContractDefinitionManager;; parmaeters must be according to contract definition's `getInitParams()`

### ContractInstance

ContractInstance objects are created by ContractInstanceManager, they should not be constructed directly.

Public API:

 * `getChainID()`: returns a chain identifier, which is an unique identifier of a contract instance within a blockchain
 * `getFields()`: returns fields of the current state of the contract instance, in form of an object (example: `{someField: 42}`
 * `getApplicableActions()`: returns a list of actions which context's user can perform in the current state of the contract instance; returns an array of action names
 * `getApplicableActions(pubkeys)`: returns actions which other users might take
 * `getActionParams(actionName)`: returns a list of parameters which are necessary to perform an action; in a form of a [parameter descriptor object](#parameter-descriptor-object)
 * `getFieldInfo()`: TODO: returns description of contract's fields, in in a form of a [parameter descriptor object](#parameter-descriptor-object)

## Data formats

### Parameter descriptor object

A list of parameters an action takes, a list of contract inititalization parameters and a list of contract's fields is described using a parameter descriptor object format. It is a JSON
object with following structure:

    {
     "<parameter-name>": {"type": "<parameter-type>", "description": "<parameter-description>"}
    }

E.g.:

    {
       buyerName: {type: 'string', description: "Name of an buyer"},
       buyerPK: {type: 'pubkey', description: "Buyer's public key"}
    }

A description is optional (might be null).

Possible types are:

 * STRING
 * PUBKEY
 * ARRAY
 * INTEGER

