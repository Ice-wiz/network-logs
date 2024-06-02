const fs = require('fs');
const data = JSON.parse(fs.readFileSync('output.json', 'utf8'));

// Count the occurrences of different event types
const eventTypeCounts = {};
data.forEach(obj => {
    const eventType = obj.event_type;
    eventTypeCounts[eventType] = (eventTypeCounts[eventType] || 0) + 1;
});

// Log the count of occurrences for each event type
Object.keys(eventTypeCounts).forEach(eventType => {
    console.log(`Number of occurrences of "${eventType}": ${eventTypeCounts[eventType]}`);
});


const actionTypes = [];
data.forEach(obj => {
    if (obj.alert) {
        const actionType = obj.alert.action;
        actionTypes.push(actionType);
    }
});

console.log(new Set(actionTypes));