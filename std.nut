// TSquirrel Standard Library

// Float
::ftoi <- function(n) { return n.tointeger(); }
::ftos <- function(n) { return n.tostring(); }
::ftoc <- function(n) { return n.tochar(); }

// Integer
::itoc <- function(n) { return n.tochar(); }
::itof <- function(n) { return n.tofloat(); }
::itos <- function(n) { return n.tostring(); }

// Function
::acall <- function(fn, args) { return fn.acall(args); }
::bindenv <- function(fn, contextObject) { return fn.bindenv(contextObject); }
::pacall <- function(fn, arguments) { return fn.pacall(arguments); }

::typeOf <- function(a) { return typeof a; }
