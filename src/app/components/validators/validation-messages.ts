const errorMessages = {
    code: {
        required: 'Code is required',
        pattern: 'Code format is invalid'
    },
    name: {
        required: 'Name is required'
    },
    price: {
        range: 'Range is not valid',
        required: 'Price is required'
    },
    description: {
        maxlength: 'Up to 100 chars allowed'
    }
}

export { errorMessages as ValidationMessages }