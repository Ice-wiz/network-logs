import data from "../../output.json";

const getEventTypeCounts = () => {
  const eventTypeCounts = {};
  data.forEach((obj) => {
    const eventType = obj.event_type;
    eventTypeCounts[eventType] = (eventTypeCounts[eventType] || 0) + 1;
  });
  return eventTypeCounts;
};

export const getSortedEventTypeCounts = () => {
  const eventTypeCounts = getEventTypeCounts();
  const sortedEventTypeCounts = Object.fromEntries(
    Object.entries(eventTypeCounts).sort((a, b) => b[1] - a[1])
  );
  return sortedEventTypeCounts;
};

const getCategoryCounts = () => {
  const categoryCounts = {};
  data.forEach((obj) => {
    if (obj.alert && obj.alert.category) {
      const category = obj.alert.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });
  return categoryCounts;
};

export const getSortedCategoryCounts = () => {
  const categoryCounts = getCategoryCounts();
  const sortedCategoryCounts = Object.entries(categoryCounts).map(([key, value]) => ({
    name: key,
    value,
  }));
  return sortedCategoryCounts;
};

const getAlertsOverTime = () => {
  const alertsOverTime = {};
  data.forEach((obj) => {
    if (obj.event_type === "alert") {
      const date = new Date(obj.timestamp);
      // Round down the minutes to the nearest 30-minute interval
      const roundedMinutes = Math.floor(date.getMinutes() / 30) * 30;
      date.setMinutes(roundedMinutes);
      date.setSeconds(0);
      date.setMilliseconds(0);
      const roundedTime = date.toISOString();
      
      alertsOverTime[roundedTime] = (alertsOverTime[roundedTime] || 0) + 1;
    }
  });
  
  return Object.entries(alertsOverTime).map(([time, count]) => {
    const date = new Date(time);
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
    return { time: formattedTime, count };
  });
};
  
export const getSortedAlertsOverTime = () => {
  const alertsOverTime = getAlertsOverTime();
  return alertsOverTime.sort((a, b) => new Date(a.time) - new Date(b.time));
};

const getTopSourceIPs = (limit = 5) => {
  const sourceIPs = {};
  data.forEach((obj) => {
    const sourceIP = obj.src_ip;
    if (obj.event_type === 'alert') {
      sourceIPs[sourceIP] = (sourceIPs[sourceIP] || 0) + 1;
    }
  });
  const sortedSourceIPs = Object.entries(sourceIPs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([ip, count]) => ({ ip, count }));
  return sortedSourceIPs;
};

const getTopDestIPs = (limit = 5) => {
  const destIPs = {};
  data.forEach((obj) => {
    const destIP = obj.dest_ip;
    if (obj.event_type === 'alert') {
      destIPs[destIP] = (destIPs[destIP] || 0) + 1;
    }
  });
  const sortedDestIPs = Object.entries(destIPs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([ip, count]) => ({ ip, count }));
  return sortedDestIPs;
};

const getSignatureCounts = () => {
  const signatureCounts = {};
  data.forEach((obj) => {
    if (obj.event_type === "alert" && obj.alert && obj.alert.signature) {
      const signature = obj.alert.signature;
      signatureCounts[signature] = (signatureCounts[signature] || 0) + 1;
    }
  });

  // Convert object to array of key-value pairs and sort by count in descending order
  const sortedSignatureCounts = Object.entries(signatureCounts)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return sortedSignatureCounts;
};

export { getTopSourceIPs, getTopDestIPs, getSignatureCounts };
