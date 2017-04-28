"use strict";
{
  const btoa = require('btoa');
  const codes = JSON.parse( require('fs').readFileSync( "codes.json", {encoding:'utf8'} ) );
  let url = process.argv[2];

  let code = '';
  if ( url.startsWith('http://') ) {
    code += '00';
    url = url.slice(7);
  } else if ( url.startsWith('https://') ) {
    code += '01';
    url = url.slice(8);
  } else {
    throw new TypeError( "Invalid scheme ", url );
  }

  if ( /^[^:]+:[^@]+@/.test( url ) ) {
    code += '1';
    const auth = url.slice(0, url.indexOf('@') );
    console.warn( "Need to add encoded auth to code here" );
    console.log( "Auth", auth );
    url = url.slice( url.indexOf('@') + 1 );
  } else {
    code += '0';
  }

  const port = url.indexOf(':')
  const slash = url.indexOf('/')
  const len = url.length;
  let host = '';
  let portNumber = null;

  if ( port == -1 ) {
    if ( slash == -1 ) {
      host = url;
      url = '';
    } else {
      host = url.slice(0, slash);
      url = url.slice(slash);
    }
    console.log("host", host );
  } else {
    host = url.slice(0, port );
    if ( slash == -1 ) {
      portNumber = parseInt( url.slice( port + 1 ) );
      url = '';
    } else {
      portNumber = parseInt( url.slice( port + 1, slash ) );
      url = url.slice(slash);
    }
    console.log("host", host, "port number", portNumber );
  }


  console.log( code, url );
}
