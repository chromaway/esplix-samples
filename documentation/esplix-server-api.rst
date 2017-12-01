Esplix Server API
====================

Esplix Server API methods are called through JSON-RPC (specifically, JSON-RPC 2.0 over HTTP).

A single server can work with multiple user contexts, each of which might have different set of contract instances and different
blockchain connection. The context of a contract is referenced using the URL of the server.
Example: ``http://localhost:5535/alice/jsonrpc`` is the server's JSON-RPC URL corresponding to context named  ``alice``.

Functions
-----------

getContractInstanceIDs()
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all instance IDs from a specific context.

args: none.

getFields(chainID)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all fields from a contract.

args:

* ``chainID``: contract instance ID

getFieldInfo(chainID)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns information on the requested field of a contract.

args:

* ``chainID``: contract instance ID

getApplicableActions(chainID)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all applicable actions from a contract.

args:

* ``chainID``: contract instance ID

getActionParams(chainID, actionName)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Returns all params of a specific action.

args:

* ``chainID``: contract instance ID
* ``actionName``: name of the requested action

performAction(chainID, actionName, actionArgs)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Performs an action in a contract.

args:

* ``chainID``: contract instance ID
* ``actionName``: name of the requested action
* ``actionArgs``: arguments to be passed to the action

createContractInstance(contractHash, params)
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
