const clientType = {
    REWARD: 'reward',
    REGULAR: 'regular',

    isValid: function(type) {
        return type === this.REWARD || type === this.REGULAR
    }
}

module.exports = clientType;