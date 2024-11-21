// CustomerReviewPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
 
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    marginBottom: 10,
  },
});
 
const CustomerReviewPDF = ({ review }) => (
<Document>
<Page size="A4" style={styles.page}>
<Text style={styles.header}>Customer Review Overview</Text>
<View style={styles.section}>
<Text style={styles.label}>Review ID:</Text>
<Text style={styles.info}>{review.id}</Text>
</View>
<View style={styles.section}>
<Text style={styles.label}>Customer Name:</Text>
<Text style={styles.info}>{review.customerName}</Text>
</View>
<View style={styles.section}>
<Text style={styles.label}>Rating:</Text>
<Text style={styles.info}>{review.rating}</Text>
</View>
<View style={styles.section}>
<Text style={styles.label}>Review Date:</Text>
<Text style={styles.info}>{review.date}</Text>
</View>
<View style={styles.section}>
<Text style={styles.label}>Product/Service:</Text>
<Text style={styles.info}>{review.product}</Text>
</View>
<View style={styles.section}>
<Text style={styles.label}>Review:</Text>
<Text style={styles.info}>{review.reviewText}</Text>
</View>
<View style={styles.section}>
<Text style={styles.info}>{review.additionalNotes}</Text>
</View>
</Page>
</Document>
);
 
export default CustomerReviewPDF;