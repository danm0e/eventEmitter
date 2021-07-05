const handlers = {}

/** 
 * 1. How do we let you add more than 1 handler for the same type?
 */
const trigger = (type, ...args) => {
	// iterate and invoke each handler within this key
	handlers[type].forEach(handler => handler(...args))
}

const on = (type, handler) => {
	// if the key doesn't exist
	if(!(type in handlers)) {
		// we initialise an array with the incoming handler
		handlers[type] = [handler]	
	} else {
		// otherwise we push the new handler to the existing key
		handlers[type].push(handler)	
	}
}

on('foo', () => {
	console.log('Do foo');
});

on('foo', () => {
	console.log('Do some other foo');
});

/**
 * 2. How do we add an off method?
 */
const onFoo = () => {
	console.log('Do onFoo');
};

const off = (type, handler) => {
	// remove the matching handler within this key
	handlers[type] = handlers[type].filter(h => handler !== h)
}

on('foo', onFoo);
off('foo', onFoo);

/**
 * 3. How do I allow you to pass arbitrary arguments?
 */
on('foo', (arg1, arg2) => {
	console.log('here are my args', arg1, arg2)
})

// Usage
trigger('foo', 1, 2)
	// log: Do Foo
	// log: Do some other Foo
	// log: here are my args 1 2
