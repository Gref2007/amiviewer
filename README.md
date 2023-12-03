# AmiViewer
Application to visualize the internal working logic of channels in asterisk. It is used with serialized AMI obtained from the [AsterNET](https://github.com/AsterNET/AsterNET).
You can find an example of used data in an *example.astl* file.

### Local use
You should have **Go** and **npm** installed.
Open terminal and run :
`$ npm install`
and then 
`$ npm run  build-prod`
Thus, you prepare on the client side.
After this run
`$ go get .`
and finally
`$ go run  .`
Open a web browser at http://localhost and use it.

### Docker use
incoming

### Develope
For develop only client-side just use the Webpack's dev server. Just run :
`$ npm run  start`
It will use a proxy to mock back and return file *answer.json*. To get your custom data, just edit this file.
For testing, **jest** is used .  You can find an example in the *NetworkLib.test.js* file.
To start test:
`$ npm run test`

You can use 
`$ npm run build`
To prepare client-side, if you only want to develop the backend.