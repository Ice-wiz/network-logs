import React from 'react';
import { Container, Typography, Grid, Paper, AppBar, Toolbar } from '@mui/material';
import EventTypeBarChart from './EventTypeBarChart';
import CategoryPieChart from './CategoryPieChart';
import AlertsOverTimeChart from './AlertsOverTimeChart';
import { getSortedEventTypeCounts, getSortedCategoryCounts, getSortedAlertsOverTime, getTopSourceIPs, getTopDestIPs, getSignatureCounts } from '../data';
import TopSourceIPsChart from './TopSourceIPsChart';
import TopDestIPsChart from './TopDestIPsChart';
import SignatureBarChart from './SignatureBarChart';

const Dashboard = () => {
  // Get data for event type counts
  const eventTypeCounts = getSortedEventTypeCounts();
  const eventTypeData = Object.keys(eventTypeCounts).map(eventType => ({
    name: eventType,
    count: eventTypeCounts[eventType],
  }));

  // Get data for category counts
  const categoryCounts = getSortedCategoryCounts();

  // Get data for alerts over time
  const alertsOverTime = getSortedAlertsOverTime();

  // Get data for top source IPs
  const topSourceIPs = getTopSourceIPs();

  // Get data for top destination IPs
  const topDestIPs = getTopDestIPs();

  // Get data for signature counts
  const signatureCounts = getSignatureCounts();
  const signatureData = Object.entries(signatureCounts).map(([signature, count]) => ({
    signature,
    count
  }));

  return (
    <Container>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Network Security Monitoring Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6" component="h1" gutterBottom>
                Event Type Dashboard
              </Typography>
              <EventTypeBarChart data={eventTypeData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6" component="h1" gutterBottom>
                Alerts by Category
              </Typography>
              <CategoryPieChart data={categoryCounts} />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6" component="h1" gutterBottom>
                Top Source IPs Triggering Alerts
              </Typography>
              <TopSourceIPsChart data={topSourceIPs} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
              <Typography variant="h6" component="h1" gutterBottom>
                Top Destination IPs Targeted by Alerts
              </Typography>
              <TopDestIPsChart data={topDestIPs} />
            </Paper>
          </Grid>
        </Grid>
        <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" component="h1" gutterBottom>
            Alerts Over Time (All the alerts are of Severity : 2)
          </Typography>
          <AlertsOverTimeChart data={alertsOverTime} />
        </Paper>
        <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" component="h1" gutterBottom>
            Causes of Alerts
          </Typography>
          <SignatureBarChart data={signatureData} />
        </Paper>
      </Container>
    </Container>
  );
};

export default Dashboard;
