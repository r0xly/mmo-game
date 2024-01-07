let totalGuests = 0;

function generateGuestName() {
    totalGuests++;

    return "Guest" +  totalGuests.toString() + Math.floor(1000 + Math.random() * 9000);
}

export function authenticateConnection(userToken) {
    if (!userToken)
        return {
            username: generateGuestName(),
            id: totalGuests,
        };
    
    // TO-DO: account authetnication and registration 
    return false;
}
