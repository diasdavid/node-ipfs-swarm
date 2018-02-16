'use strict'

const Connection = require('interface-connection').Connection
const pull = require('pull-stream')

module.exports = (protocol, _conn, observer) => {
  const conn = new Connection()
  if (_conn.peerInfo) {
    conn.setPeerInfo(_conn.peerInfo)
  }

  _conn.setPeerInfo = (pi) => {
    conn.setPeerInfo(pi)
  }

  const stream = {
    source: pull(_conn.source, observer.incoming(protocol, _conn.peerInfo)),
    sink: pull(observer.outgoing(protocol, _conn.peerInfo), _conn.sink)
  }
  conn.setInnerConn(stream, _conn.info)

  return conn
}
