// TSquirrel Standard Library

// Float
function ftoi(n) {
	return n.tointeger();
}

function ftos(n) {
	return n.tostring();
}

function ftoc(n) {
	return n.tochar();
}

// Integer
function itoc(n) {
	return n.tochar();
}
function itof(n) {
	return n.tofloat();
}
function itos(n) {
	return n.tostring();
}

// Function
function acall(fn, args) {
	return fn.acall(args)
}

function bindenv(fn, contextObject) {
	return f.bindenv(fn, contextObject)
}

function pacall(fn, arguments) {
	return fn.pacall(fn, arguments)
}

function typeOf(a) {
	return typeof(a)
}