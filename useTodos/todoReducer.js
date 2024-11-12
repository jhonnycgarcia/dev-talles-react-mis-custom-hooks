
export const todoReducer = (initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD':
            return [ ...initialState, payload ];
        case 'DELETE':
            return initialState.filter(todo => todo.id !== payload);
        case 'TOGGLE':
            return initialState.map(todo => {
                if(todo.id === payload) {
                    return { ...todo, done: !todo.done };
                }
                return todo;
            });
        default:
            return initialState;
    }
};