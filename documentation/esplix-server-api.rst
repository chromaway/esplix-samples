Esplix Server API
====================

Esplix Server API methods are called through JSON-RPC.
When using an external JSON RPC clients, the context of a contract is referenced using the URL of the server.

Example: ``http://localhost:5535/alice/jsonrpc`` is the server's JSON-RPC URL while ``alice`` is the name of the context.

Functions
-----------

getContractInstanceIDs()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all instance IDs from a specific context.

args: none.

getFields()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all fields from a contract.

args:

* ``chainID``: contract instance ID

getFieldInfo()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns information on the requested field of a contract.

args:

* ``chainID``: contract instance ID

getApplicableActions()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all applicable actions from a contract.

args:

* ``chainID``: contract instance ID

getActionParams()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all params of a specific action.

args:

* ``chainID``: contract instance ID
* ``actionName``: name of the requested action

performAction()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Performs an action in a contract.

args:

* ``chainID``: contract instance ID
* ``actionName``: name of the requested action
* ``actionArgs``: arguments to be passed to the action

createContractInstance()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Creates a new contract instance.

args:

* ``contractHash``: the hash of the contract to make an instance of
* ``params``: contract initialization params

Sample Code
-----------
Before running this sample, make sure you start the server. You can then connect to it using the ``jayson`` npm module::

  const jayson = require("jayson");
  const client =  jayson.client.http("http://localhost:5535/alice/jsonrpc");

  client.request('createContractInstance', ["a7d3410a253e8754f8d9676e74c21af82ccd4e7866441417007d721638b4533c", {SELLER: "0000"}], function(err, response) {
    if(err) throw err;
    console.log("Contract instance ID: "+response.result);

    client.request('getFields', [response.result], function(err, response) {
      if(err) throw err;
      console.log("Contract fields:");
      console.log(response.result);
    });
  });
